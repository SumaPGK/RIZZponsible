import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, Image,
  ActivityIndicator, TouchableOpacity, RefreshControl, Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TaskCard from '../components/TaskCard';
import { getTasks, updateTask, deleteTask } from '../services/api';
import styles from './TasksScreen.styles';
import colors from '../constants/colors';

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('pending');

  const fetchTasks = useCallback(async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch tasks');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [fetchTasks])
  );

  const handleComplete = async (id) => {
    try {
      await updateTask(id, { status: 'done' });
      fetchTasks();
    } catch (error) {
      Alert.alert('Error', 'Failed to complete task');
    }
  };

  const handleDelete = async (id) => {
    Alert.alert('Delete Task', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          try {
            await deleteTask(id);
            fetchTasks();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete task');
          }
        }
      }
    ]);
  };

  const filteredTasks = tasks.filter(t => t.status === filter);
  const filters = ['pending', 'in_progress', 'done'];

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <View>
            <Text style={styles.heading}>RIZZponsible</Text>
            <Text style={styles.subheading}>{filteredTasks.length} tasks</Text>
          </View>
        </View>
      </View>

      <View style={styles.filters}>
        {filters.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.replace('_', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {
            setRefreshing(true);
            fetchTasks();
          }} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No {filter.replace('_', ' ')} tasks</Text>
            <Text style={styles.emptySubText}>Use the Chat tab to add tasks with AI</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
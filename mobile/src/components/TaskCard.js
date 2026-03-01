import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './TaskCard.styles';
import colors from '../constants/colors';

const priorityColor = (priority) => {
  if (priority === 'high') return colors.high;
  if (priority === 'medium') return colors.medium;
  return colors.low;
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'No deadline';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function TaskCard({ task, onComplete, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={[styles.priorityBar, { backgroundColor: priorityColor(task.priority) }]} />
      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        {task.description ? <Text style={styles.description}>{task.description}</Text> : null}
        {task.notes ? <Text style={styles.notes}>📝 {task.notes}</Text> : null}
        <View style={styles.footer}>
          <Text style={styles.deadline}>📅 {formatDate(task.deadline)}</Text>
          <View style={[styles.badge, { backgroundColor: priorityColor(task.priority) + '20' }]}>
            <Text style={[styles.badgeText, { color: priorityColor(task.priority) }]}>
              {task.priority}
            </Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.completeBtn} onPress={() => onComplete(task.id)}>
            <Text style={styles.completeBtnText}>✓ Complete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(task.id)}>
            <Text style={styles.deleteBtnText}>🗑 Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

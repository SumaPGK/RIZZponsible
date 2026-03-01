import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import TasksScreen from './src/screens/TasksScreen';
import ChatScreen from './src/screens/ChatScreen';
import VoiceScreen from './src/screens/VoiceScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E5E7EB',
            paddingBottom: 8,
            paddingTop: 8,
            height: 64,
          },
          tabBarActiveTintColor: '#6C63FF',
          tabBarInactiveTintColor: '#6B7280',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="Tasks"
          component={TasksScreen}
          options={{
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>✓</Text>,
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>💬</Text>,
          }}
        />
        <Tab.Screen
          name="Voice"
          component={VoiceScreen}
          options={{
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🎙️</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

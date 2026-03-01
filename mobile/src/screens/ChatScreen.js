import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, Alert, Image, KeyboardAvoidingView, Platform, Keyboard
} from 'react-native';
import { chatWithAI } from '../services/api';
import styles from './ChatScreen.styles';

const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'ai',
      text: 'Hi! I am RIZZponsible, your personal task assistant. Tell me what you need to do and I will manage it for you. Try saying "Add a task to call the dentist tomorrow"',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const scrollViewRef = useRef(null);
  const isAtBottom = useRef(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      isAtBottom.current = true;
      scrollToBottom();
    });
    return () => keyboardDidShowListener.remove();
  }, []);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;
    isAtBottom.current = distanceFromBottom < 50;
  };

  const scrollToBottom = () => {
    if (isAtBottom.current) {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    isAtBottom.current = true;
    scrollToBottom();

    try {
      const response = await chatWithAI(userMessage.text, conversationHistory);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: response.data.reply,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setConversationHistory(response.data.conversation_history);
      isAtBottom.current = true;
      scrollToBottom();
    } catch (error) {
      Alert.alert('Error', 'Failed to get response from AI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <View>
            <Text style={styles.heading}>RIZZponsible</Text>
            <Text style={styles.subheading}>Chat Assistant</Text>
          </View>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        contentContainerStyle={styles.messagesList}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={scrollToBottom}
        bounces={true}
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={true}
      >
        {messages.map(item => (
          <View
            key={item.id}
            style={[
              styles.messageBubble,
              item.role === 'user' ? styles.userBubble : styles.aiBubble
            ]}
          >
            <Text style={item.role === 'user' ? styles.userText : styles.aiText}>
              {item.text}
            </Text>
            <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
          </View>
        ))}
      </ScrollView>

      {loading && (
        <View style={styles.typingContainer}>
          <Text style={styles.typingText}>Assistant is typing...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          multiline
          blurOnSubmit={true}
          returnKeyType="send"
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          style={[styles.sendBtn, (!input.trim() || loading) && styles.sendBtnDisabled]}
          onPress={sendMessage}
          disabled={!input.trim() || loading}
        >
          <Text style={styles.sendBtnText}>↑</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
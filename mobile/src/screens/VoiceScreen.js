import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useAudioRecorder, AudioModule, RecordingPresets } from 'expo-audio';
import * as FileSystem from 'expo-file-system/legacy';
import { transcribeAudio, chatWithAI } from '../services/api';
import styles from './VoiceScreen.styles';

export default function VoiceScreen() {
  const [status, setStatus] = useState('idle');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const startRecording = async () => {
    try {
      const permission = await AudioModule.requestRecordingPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Required', 'Please allow microphone access.');
        return;
      }
      await audioRecorder.record();
      setStatus('recording');
      setTranscript('');
      setResponse('');
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording');
      setStatus('idle');
    }
  };

  const stopRecording = async () => {
    try {
      setStatus('processing');
      await audioRecorder.stop();
      const uri = audioRecorder.uri;

      const formData = new FormData();
      formData.append('file', {
        uri: uri,
        name: 'recording.m4a',
        type: 'audio/m4a',
      });

      const transcribeResponse = await transcribeAudio(formData);
      const transcriptText = transcribeResponse.data.transcript;
      setTranscript(transcriptText);

      const aiResponse = await chatWithAI(transcriptText);
      setResponse(aiResponse.data.reply);
    } catch (error) {
      Alert.alert('Error', 'Failed to process voice command');
    } finally {
      setStatus('idle');
    }
  };

  const handlePress = async () => {
    if (status === 'processing') return;
    if (status === 'idle') await startRecording();
    if (status === 'recording') await stopRecording();
  };

  const getStatusText = () => {
    if (status === 'recording') return '🔴 Listening...';
    if (status === 'processing') return '⏳ Processing...';
    return 'Tap to speak';
  };

  const getMicStyle = () => {
    if (status === 'recording') return [styles.micButton, styles.micButtonRecording];
    if (status === 'processing') return [styles.micButton, styles.micButtonProcessing];
    return styles.micButton;
  };

  const getMicIcon = () => {
    if (status === 'processing') return '⏳';
    if (status === 'recording') return '⏹';
    return '🎙️';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <View>
            <Text style={styles.heading}>RIZZponsible</Text>
            <Text style={styles.subheading}>Voice Assistant</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.statusText}>{getStatusText()}</Text>

        {transcript ? (
          <Text style={styles.transcriptText}>"{transcript}"</Text>
        ) : (
          <Text style={styles.transcriptText}>Your speech will appear here...</Text>
        )}

        <TouchableOpacity
          style={getMicStyle()}
          onPress={handlePress}
          disabled={status === 'processing'}
        >
          <Text style={styles.micIcon}>{getMicIcon()}</Text>
        </TouchableOpacity>

        <Text style={styles.hintText}>
          {status === 'idle' ? 'Tap the mic and speak your task' : ''}
          {status === 'recording' ? 'Tap again to stop recording' : ''}
          {status === 'processing' ? 'Please wait...' : ''}
        </Text>

        {response ? (
          <View style={styles.responseContainer}>
            <Text style={styles.responseLabel}>Assistant Response</Text>
            <Text style={styles.responseText}>{response}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
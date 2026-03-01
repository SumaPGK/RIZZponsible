import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  subheading: {
    fontSize: 14,
    color: colors.subtext,
    marginTop: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  transcriptText: {
    fontSize: 15,
    color: colors.subtext,
    textAlign: 'center',
    marginBottom: 48,
    fontStyle: 'italic',
    minHeight: 40,
  },
  micButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  micButtonRecording: {
    backgroundColor: colors.danger,
    shadowColor: colors.danger,
  },
  micButtonProcessing: {
    backgroundColor: colors.subtext,
    shadowColor: colors.subtext,
  },
  micIcon: {
    fontSize: 40,
  },
  hintText: {
    fontSize: 14,
    color: colors.subtext,
    marginTop: 24,
    textAlign: 'center',
  },
  responseContainer: {
    marginTop: 32,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  responseLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  responseText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
},
  logo: {
    width: 80,
    height: 80,
    borderRadius: 12,
},
});

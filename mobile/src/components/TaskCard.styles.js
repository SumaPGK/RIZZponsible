import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  priorityBar: {
    width: 4,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  content: {
    flex: 1,
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.subtext,
    marginBottom: 4,
  },
  notes: {
    fontSize: 13,
    color: colors.subtext,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  deadline: {
    fontSize: 13,
    color: colors.subtext,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  completeBtn: {
    flex: 1,
    backgroundColor: colors.success + '15',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeBtnText: {
    color: colors.success,
    fontWeight: '600',
    fontSize: 13,
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: colors.danger + '15',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteBtnText: {
    color: colors.danger,
    fontWeight: '600',
    fontSize: 13,
  },
});

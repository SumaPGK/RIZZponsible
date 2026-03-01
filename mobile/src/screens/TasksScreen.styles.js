import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: colors.card,
    marginBottom: 8,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 13,
    color: colors.subtext,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  filterTextActive: {
    color: '#fff',
  },
  empty: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.subtext,
  },
  emptySubText: {
    fontSize: 14,
    color: colors.subtext,
    marginTop: 8,
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

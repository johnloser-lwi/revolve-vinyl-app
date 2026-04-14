// Shared style objects — used via spread in component inline styles.
// In React Native, Text doesn't inherit color from View, so each Text
// component needs an explicit color. Use the `colors` object for consistency.

export const colors = {
  bg: '#111111',
  bgDark: '#0d0d0d',
  card: '#161616',
  card2: '#151515',
  orange: '#F05A00',
  text: '#ece7e7',
  textMuted: 'rgba(255,255,255,0.4)',
  border: 'rgba(255,255,255,0.08)',
};

export const S = {
  // Round icon button (back arrow, heart, etc.)
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Orange pill button wrapper (use alongside orangeBtnText)
  orangeBtn: {
    backgroundColor: '#F05A00',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  // Text inside orange button
  orangeBtnText: {
    color: '#000',
    fontFamily: 'BarlowCondensed_900Black',
    fontSize: 13,
    letterSpacing: 2.6,
    textTransform: 'uppercase',
  },

  // Genre / filter pill wrapper
  tag: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(240,90,0,0.4)',
    backgroundColor: 'rgba(240,90,0,0.1)',
    paddingVertical: 6,
    paddingHorizontal: 14,
  },

  // Text inside tag pill
  tagText: {
    fontSize: 11,
    fontFamily: 'BarlowCondensed_700Bold',
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    color: '#ff7f2f',
  },

  // Horizontal padding used on most screen content
  px: { paddingHorizontal: 20 },
};

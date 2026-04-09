export const S = {
  phone: {
    width: '100%',
    height: '100%',
    background: '#111111',
    color: '#ece7e7',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  scroll: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  px: { paddingLeft: 20, paddingRight: 20 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#ece7e7',
    flexShrink: 0,
  },
  orangeBtn: {
    background: '#F05A00',
    color: '#000',
    border: 'none',
    borderRadius: 999,
    padding: '10px 20px',
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: 13,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  tag: {
    borderRadius: 999,
    border: '1px solid rgba(240,90,0,0.4)',
    background: 'rgba(240,90,0,0.1)',
    padding: '6px 14px',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#ff7f2f',
    fontFamily: "'Barlow Condensed', sans-serif",
  },
};

export const pageVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export const pageTransition = { duration: 0.28, ease: [0.4, 0, 0.2, 1] };

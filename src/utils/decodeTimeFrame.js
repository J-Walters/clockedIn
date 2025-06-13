export const decodeTimeFrame = (value) => {
  const map = {
    r1800: 'Past 30 minutes',
    r3600: 'Past hour',
    r7200: 'Past 2 hours',
    r86400: 'Past 24 hours',
  };
  return map[value] || '';
};

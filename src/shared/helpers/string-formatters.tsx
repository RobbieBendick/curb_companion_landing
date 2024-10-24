/// Returns a formatted string of the days inputted
export const dayParser = (days: string[]): string => {
  if (days.length === 0) return '';
  if (days.length === 1) return days[0];
  if (days.length === 2) return days.join(' and ');
  if (days.length === 5 && !days.includes('Saturday') && !days.includes('Sunday')) return 'Every week day';
  if (days.length === 7) return 'Every day';

  // if more than 5 days then return the only first 3 letters of each day
  if (days.length > 5) {
    return `${days.map((day) => day.slice(0, 3)).join(', ')}`;
  }

  return `${days.slice(0, -1).join(', ')} and ${days.slice(-1)}`;
};

export const hourParser = (time: string): string => {
  let hour = Number(time.split(':')[0]);
  let minute = Number(time.split(':')[1]);
  let pm = false;
  if (hour >= 12) {
    pm = true;
    hour -= 12;
  }
  return `${hour === 0 ? 12 : hour}:${minute < 10 ? `0${minute}` : minute}${pm ? 'pm' : 'am'}`;
};

export const removeZeroFromNumIfNecessary = (num: Number) => {
  let numString = num.toString();
  let dotIndex: Number | undefined;
  for (var i = 0; i < numString.length; i++) {
    if (numString[i] === '.') {
      dotIndex = i;
      if (numString[i + 1] === '0') return numString.slice(0, i);
    }
  }
  if (dotIndex) {
    return `${numString.slice(0, Number(dotIndex) + 2)}`;
  }
};

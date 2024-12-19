import {padStart} from 'lodash';

export const secondsToTime = (seconds?: number): string => {
  if (!seconds) {
    return '00:00';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = padStart(minutes.toString(), 2, '0');
  const formattedSeconds = padStart(remainingSeconds.toString(), 2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

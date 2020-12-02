import React, { useEffect, useState } from 'react';
import { Tracking } from './TaskList';

export const Timer: React.FC<{ tracking: Tracking }> = (tracking) => {
  console.log('Tracking NAME: ', tracking.tracking.name);

  const start: Date = new Date(tracking.tracking.created);
  const [current, setTimer] = useState<Date>();
  const duration: number = current ? current.getTime() - start.getTime() : 0;

  const formatDuration = (ms: number): string => {
    return new Date(ms).toISOString().slice(11, -1);
  };

  const output = formatDuration(duration);

  useEffect(() => {
    setInterval(() => setTimer(new Date()), 1000);
  }, [current]);

  return <div>{output}</div>;
};

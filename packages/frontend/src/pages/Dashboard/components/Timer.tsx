import React, { useEffect, useState } from 'react';

export const Timer: React.FC<{}> = () => {
  const [timer, setTimer] = useState<number>(0);
  setTimeout(() => {
    setTimer(timer + 1);
  }, 1000);
  useEffect(() => {
    setTimeout(() => setTimer(timer + 1), 1000);
  }, [setTimer]);

  return <div>{timer}</div>;
};

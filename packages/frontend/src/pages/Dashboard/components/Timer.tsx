import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Tracking } from './TaskList';

const TimerContainer = styled.div`
  transition-duration: 0.4s;
  transition-property: box-shadow, border-color;
  border: 1px solid rgb(230, 230, 230);

  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: #c04545;
  color: #000;
  position: fixed;
  justify-content: center;

  bottom: 0;
  right: 0;
  width: 30%;
  height: 72px;
  margin-bottom: 16px;
`;

const TimerTitle = styled.div`
  margin: auto;
  font-weight: bolder;
`;

const TimerDescription = styled.div`
  margin: auto;
  font-weight: 600;
`;

export const Timer: React.FC<{}> = () => {
  const [lastTracking, setTracking] = useState<Tracking>();
  const [current, setTimer] = useState<Date>();
  let output: string = '';
  let start = new Date();

  const patchTracking = async () => {
    await fetch(`/api/tracking/${lastTracking?.id}`, {
      body: JSON.stringify({
        created: lastTracking?.created,
        description: lastTracking?.description,
        endTime: lastTracking?.endTime,
        name: lastTracking?.name,
        startTime: lastTracking?.startTime,
        updatedAt: lastTracking?.updatedAt,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
    });
  };

  const fetchTracking = async () => {
    const trackingRequest = await fetch(`/api/tracking/${localStorage.getItem('lastTracking')}`, {
      headers: { 'content-type': 'application/json' },
    });
    if (trackingRequest.status === 200) {
      const trackingJSON = await trackingRequest.json();
      setTracking(trackingJSON.data);
    }
  };

  const formatDuration = (ms: number): string => {
    return new Date(ms).toISOString().slice(11, -1);
  };

  if (lastTracking) {
    start = new Date(lastTracking?.created);
    const duration: number = current ? current.getTime() - start.getTime() : 0;
    localStorage.setItem('run', 'true');
    output = formatDuration(duration);
  }

  useEffect(() => {
    fetchTracking();
  }, []);

  useEffect(() => {
    setInterval(() => setTimer(new Date()), 1000);
    return () => {
      if (!localStorage.getItem('run')) {
        console.log('hi');
        if (lastTracking && current) {
          lastTracking.startTime = formatDuration(start.getTime());
          lastTracking.endTime = formatDuration(current.getTime());
          patchTracking();
        }
      }
      output = 'finished';
    };
  }, [current]);

  return (
    <TimerContainer>
      <TimerTitle>Tacking: {lastTracking?.name}</TimerTitle>
      <TimerDescription>time elapsed: {output}</TimerDescription>
    </TimerContainer>
  );
};

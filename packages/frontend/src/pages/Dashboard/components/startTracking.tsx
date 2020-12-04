import React, { useState, ChangeEvent } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Task, Tracking } from './TaskList';

export const AddTrackingForm: React.FC<{ afterSubmit: () => void; task: Task }> = ({ afterSubmit, task }) => {
  const [values, setValues] = useState({
    description: '',
    name: '',
  });
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trackingRequest = await fetch(`/api/tracking/${task.id}`, {
      body: JSON.stringify({
        ...values,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    if (trackingRequest.status === 200) {
      const trackingJSON = await trackingRequest.json();
      const tracking: Tracking = trackingJSON.data;
      if (tracking) {
        localStorage.setItem('lastTracking', tracking?.id);
      }
    }
    afterSubmit();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Input name="name" type="text" label="Name" onChange={fieldDidChange} required={true} value={values.name} />
      <Input
        name="description"
        label="Description"
        type="text"
        onChange={fieldDidChange}
        required={true}
        value={values.description}
      />
      <Button type="submit">Start Tracking</Button>
    </form>
  );
};

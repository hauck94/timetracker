import React, { useState, ChangeEvent } from 'react';
import { Button } from '../../../components/button/Button';
import { Input } from '../../../components/input/Input';
import { Tracking } from './TaskList';

export const AddTrackingForm: React.FC<{ afterSubmit: () => void; taskID: string }> = ({ afterSubmit, taskID }) => {
  const [values, setValues] = useState({
    description: '',
    name: '',
    startTime: new Date(new Date().getTime() + 3600000).toISOString().slice(11, 19),
  });
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trackingRequest = await fetch(`/api/tracking/${taskID}`, {
      body: JSON.stringify({
        ...values,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    if (trackingRequest.status === 200) {
      const trackingJSON = await trackingRequest.json();
      const tracking: Tracking = trackingJSON.data;
      console.log(new Date(new Date().getTime() + 3600000).toISOString().slice(11, 19));

      console.log(tracking);
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

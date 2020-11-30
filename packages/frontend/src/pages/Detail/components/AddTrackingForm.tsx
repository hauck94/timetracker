import React, { useState, ChangeEvent } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Task } from '../../Dashboard/components/TaskList';

export const AddTrackingForm: React.FC<{
  task: Task;
  afterSubmit: () => void;
}> = ({ afterSubmit, task }) => {
  const [values, setValues] = useState({
    description: '',
    name: '',
  });
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    await fetch(`/api/tracking/${task.id}`, {
      body: JSON.stringify({
        ...values,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
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
      <Button type="submit">Add Tracking</Button>
    </form>
  );
};

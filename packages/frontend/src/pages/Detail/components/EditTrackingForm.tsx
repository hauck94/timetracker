import React, { useState, ChangeEvent } from 'react';
import { Button, DangerButton } from '../../../components/button/Button';
import { Input } from '../../../components/input/Input';
import { Tracking } from '../../Dashboard/components/TaskList';

interface EditTrackingFormState {
  name: string;
  description: string;
  created: string;
  endTime: string;
  startTime: string;
  updatedAt: string;
}

export const EditTrackingForm: React.FC<{
  afterSubmit: () => void;
  tracking: Tracking;
}> = ({ afterSubmit, tracking }) => {
  const [values, setValues] = useState<EditTrackingFormState>(tracking);
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`/api/tracking/${tracking.id}`, {
      body: JSON.stringify({
        ...values,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
    });

    afterSubmit();
  };

  const deleteTracking = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch(`/api/tracking/${tracking.id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    });
    afterSubmit();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Input name="name" type="text" label="Name" onChange={fieldDidChange} required={true} value={values.name || ''} />
      <Input
        name="description"
        label="Description"
        type="text"
        onChange={fieldDidChange}
        required={true}
        value={values.description || ''}
      />
      <Input
        name="created"
        label="Created At"
        type="text"
        onChange={fieldDidChange}
        required={true}
        value={values.created || ''}
      />
      <Input
        name="updatedAt"
        label="Updated At"
        type="text"
        onChange={fieldDidChange}
        required={true}
        value={values.updatedAt || ''}
      />
      <Input
        name="startTime"
        label="StartedAt"
        type="text"
        onChange={fieldDidChange}
        required={true}
        value={values.startTime || ''}
      />
      <Input
        name="endTime"
        label="EndedAt"
        type="text"
        onChange={fieldDidChange}
        required={true}
        value={values.endTime || ''}
      />

      <Button type="submit" data-testid="submit-tracking-form">
        Edit Tracking
      </Button>
      <DangerButton onClick={deleteTracking} data-testid="delete-tracking-form">
        Delete Tracking
      </DangerButton>
    </form>
  );
};

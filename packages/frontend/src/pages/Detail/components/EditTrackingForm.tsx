import React, { useContext, useState, ChangeEvent } from 'react';
import { Button, DangerButton } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { StyledLink } from '../../../components/Link';
import { SelectInput, Option } from '../../../components/SelectInput';
import { labelContext } from '../../../contexts/LabelContext';
import { Tracking } from '../../Dashboard/components/TransactionList';
import { Task } from './TrackingList';

interface EditTrackingFormState {
  name: string;
  description: string;
  labels: Option[];
}

export const EditTrackingForm: React.FC<{
  afterSubmit: () => void;
  tracking: Tracking;
}> = ({ afterSubmit, tracking }) => {
  const {
    labels,
    actions: { refetch: refetchLabels },
  } = useContext(labelContext);
  const [values, setValues] = useState<EditTrackingFormState | Tracking>(tracking); // Workaround -> vorher: useState<EditTaskFormState>(task)
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

    await refetchLabels();
    afterSubmit();
  };

  const deleteTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch(`/api/tracking/${tracking.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      });
    afterSubmit();
  };
  return (
    <form onSubmit={onSubmitForm}>
       <Input
          name="name"
          type="text"
          label="Name"
          onChange={fieldDidChange}
          required
        />
        <Input
          name="description"
          label="Description"
          type="text"
          onChange={fieldDidChange}
          required
        />
      <Button type="submit">Edit Task</Button>
      <DangerButton onClick={deleteTask}>Delete Transaction</DangerButton>
      <StyledLink to ="/task">Tracking</StyledLink>
    </form>
  );
};

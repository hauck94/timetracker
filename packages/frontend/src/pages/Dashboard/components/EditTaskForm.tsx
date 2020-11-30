import React, { useContext, useState, ChangeEvent } from 'react';
import { Button, DangerButton } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { SelectInput, Option } from '../../../components/SelectInput';
import { labelContext } from '../../../contexts/LabelContext';
import { Task } from './TaskList';

interface EditTaskFormState {
  name: string;
  description: string;
  labels: Option[];
}

export const EditTaskForm: React.FC<{
  afterSubmit: () => void;
  task: Task;
}> = ({ afterSubmit, task }) => {
  const {
    labels,
    actions: { refetch: refetchLabels },
  } = useContext(labelContext);
  const [values, setValues] = useState<EditTaskFormState>(task);
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('values', values);

    await fetch(`/api/task/${task.id}`, {
      body: JSON.stringify({
        ...values,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
    });

    console.log(
      JSON.stringify({
        ...values,
      }),
    );

    await refetchLabels();
    afterSubmit();
  };

  const deleteTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch(`/api/task/${task.id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
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

      <SelectInput
        label="Labels"
        options={labels}
        initialState={{ inputValue: '', selectedOptions: values.labels }}
        onChangeSelectedOptions={(options) => {
          console.log('options change', options);
          setValues({ ...values, labels: options });
        }}
      />
      <Button type="submit">Edit Task</Button>
      <DangerButton onClick={deleteTask}>Delete Task</DangerButton>
    </form>
  );
};

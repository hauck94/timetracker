import React, { useContext, useState, ChangeEvent } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { SelectInput, Option } from '../../../components/SelectInput';
import { labelContext } from '../../../contexts/LabelContext';

export const AddTaskForm: React.FC<{ afterSubmit: () => void }> = ({ afterSubmit }) => {
  const {
    labels,
    actions: { refetch: refetchLabels },
  } = useContext(labelContext);
  const [values, setValues] = useState({
    description: '',
    labels: [] as Option[],
    name: '',
    value: '',
  });
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    await fetch('/api/task', {
      body: JSON.stringify({
        ...values,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    await refetchLabels();
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
        onChangeSelectedOptions={(options) => {
          console.log('options change', options);
          setValues({ ...values, labels: options });
        }}
      />
      <Button type="submit">Add Task</Button>
    </form>
  );
};

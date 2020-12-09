import React, { useContext, useState, ChangeEvent } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { SelectInput, Option } from '../../../components/SelectInput';
import { labelContext } from '../../../contexts/LabelContext';

export const AddTaskForm: React.FC<{ afterSubmit: () => void }> = ({ afterSubmit }) => {
  const {
    actions: { refetch: refetchLabels },
  } = useContext(labelContext);
  const [values, setValues] = useState({
    description: '',
    name: '',
  });
  const [labels, setLabels] = useState<Option[]>([]);
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch('/api/task', {
      body: JSON.stringify({
        ...values,
        labels,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    console.log(JSON.stringify(labels));

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
          setValues({ ...values });
          setLabels(options);
        }}
      />
      <Button type="submit">Add Task</Button>
    </form>
  );
};

import React, { useContext, useState, ChangeEvent } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { SelectInput, Option } from "../../../components/SelectInput";
import { labelContext } from "../../../contexts/LabelContext";

export const AddTaskForm: React.FC<{ afterSubmit: () => void }> = ({
  afterSubmit,
}) => {
  const {
    labels,
    actions: { refetch: refetchLabels },
  } = useContext(labelContext);
  const [values, setValues] = useState({
    name: "",
    description: "",
    value: "",
    labels: [] as Option[],
  });
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        value: Math.abs(parseFloat(values.value)).toString(),
      }),
    });
    await refetchLabels();
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
        value={values.name}
      />
      <Input
        name="description"
        label="Description"
        type="text"
        onChange={fieldDidChange}
        required
        value={values.description}
      />
      <SelectInput
        label="Labels"
        options={labels}
        onChangeSelectedOptions={(options) => {
          console.log("options change", options);
          setValues({ ...values, labels: options });
        }}
      />
      <Button type="submit">Add Task</Button>
    </form>
  );
};

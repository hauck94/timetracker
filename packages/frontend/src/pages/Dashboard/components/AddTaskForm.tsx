import React, { useState, ChangeEvent, useContext } from "react";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { labelContext } from "../../../contexts/LabelContext";
import { SelectInput, Option } from "../../../components/SelectInput";

export const AddTaskForm: React.FC<{ afterSubmit: () => void }> = ({
  afterSubmit,
}) => {
  const {
    labels,
    actions: { refetch: refetchTags },
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
      }),
    });
    await refetchTags();
    afterSubmit();
  };
  return (
    <>
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
    </>
  );
};
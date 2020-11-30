import React, { useState, ChangeEvent } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Task } from "../../Dashboard/components/TaskList";

export const AddTrackingForm: React.FC<{
  task: Task;
  afterSubmit: () => void;
}> = ({ afterSubmit, task }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
  });
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    await fetch("/api/tracking/" + task.id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
      }),
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
      <Button type="submit">Add Tracking</Button>
    </form>
  );
};

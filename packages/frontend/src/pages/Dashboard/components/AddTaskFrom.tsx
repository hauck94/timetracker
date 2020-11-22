import React, { useContext, useState, ChangeEvent } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

export const AddTaskForm: React.FC<{ afterSubmit: () => void }> = ({
  afterSubmit,
}) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
  }); 
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log();
    
    await fetch("/api/task", {
      body: JSON.stringify({
        ...values,
      }),
      headers: { "Content-Type": "application/json"},
      method: "POST",
    });
    afterSubmit();
  };
  return (
    <form onSubmit={onSubmitForm} data-testid="add-task-form">
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

      <Button type="submit">Add Task</Button>
    </form>
  );
};

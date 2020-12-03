import React, { useState, ChangeEvent } from "react";
//import { authContext } from "../../../contexts/AuthenticationContext";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

export const AddTaskForm: React.FC<{ afterSubmit: () => void }> = ({
  afterSubmit,
}) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    value: "",
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
    afterSubmit();
  };
  return (
    <>
      <h3>Add Task</h3>

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
        <Input
          name="label"
          label="Label"
          type="text"
          onChange={fieldDidChange}
        />
        <Button type="submit">Add Task</Button>
      </form>
    </>
  );
};
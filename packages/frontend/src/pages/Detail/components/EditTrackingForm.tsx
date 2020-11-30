import React, { useContext, useState, ChangeEvent } from "react";
import { Button, DangerButton } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { SelectInput } from "../../../components/SelectInput";
import { labelContext } from "../../../contexts/LabelContext";
import { Option } from "../../../components/SelectInput";
import { Tracking } from "../../Dashboard/components/TaskList";

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
    console.log("values", values);

    await fetch(`/api/tracking/${tracking.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
      }),
    });

    console.log(
      JSON.stringify({
        ...values,
      })
    );
    afterSubmit();
  };

  const deleteTracking = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch(`/api/tracking/${tracking.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
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
        value={values.name || ""}
      />
      <Input
        name="description"
        label="Description"
        type="text"
        onChange={fieldDidChange}
        required
        value={values.description || ""}
      />
      <Input
        name="created"
        label="Created At"
        type="text"
        onChange={fieldDidChange}
        required
        value={values.created || ""}
      />
      <Input
        name="updatedAt"
        label="Updated At"
        type="text"
        onChange={fieldDidChange}
        required
        value={values.updatedAt || ""}
      />
      <Input
        name="startTime"
        label="Started At"
        type="text"
        onChange={fieldDidChange}
        required
        value={values.startTime || ""}
      />
      <Input
        name="endTime"
        label="Ended At"
        type="text"
        onChange={fieldDidChange}
        required
        value={values.endTime || ""}
      />

      <Button type="submit">Edit Tracking</Button>
      <DangerButton onClick={deleteTracking}>Delete Tracking</DangerButton>
    </form>
  );
};

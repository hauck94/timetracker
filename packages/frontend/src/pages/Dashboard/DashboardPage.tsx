import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { AddButton } from "./components/AddButton";
import { AddTaskForm } from "./components/AddTaskFrom";
import { Task, TaskItem, TaskList } from "./components/TaskList";

export const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [addTaskVisible, setAddTaskVisible] = useState(false);


  const fetchTask = async () => {
    const taskRequest = await fetch("/api/task", {
      headers: { "content-type": "application/json" },
    });
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      console.log(taskJSON);
      setTasks(taskJSON.data);
    }
  };
  useEffect(() => {
    console.log("use effect");

    fetchTask();
  }, []);

  return (
    <>
      <h1>Dashborad FWE</h1>

      <AddButton
        onClick={() => {
          setAddTaskVisible(true);
        }}
      />
      {addTaskVisible && (
        <AddTaskForm
          afterSubmit={() => {
            setAddTaskVisible(false);
            fetchTask();
          }}
        />
      )}

      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task}></TaskItem>
        ))}
      </TaskList>
    </>
  );
};

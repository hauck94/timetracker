import React from "react";
import styled from "styled-components/macro";
import {
  Label,
  Task,
  TaskItem,
  TaskList,
  Tracking,
} from "./components/TaskList";

const Labels: Label[] = [
  {
    id: 1,
    created: new Date(),
    name: "Uni",
    tasks: [],
    updatedAt: new Date(),
  },
  {
    id: 2,
    created: new Date(),
    name: "Arbeit",
    tasks: [],
    updatedAt: new Date(),
  },
];

const tasks: Task[] = [
  {
    created: new Date(),
    description: "Baue eine Website mittels Angular im Frontend",
    name: "Angular Website",
    id: 2,
    labels: Labels,
    trackings: [],
    updatedAt: new Date(),
  },
  {
    created: new Date(),
    description: "Baue eine Website mittels React im Frontend",
    name: "Fortgeschrittene Webentwicklung",
    id: 1,
    labels: [],
    trackings: [],
    updatedAt: new Date(),
  },
];

const trackings: Tracking[] = [
  {
    created: new Date(),
    description: "test",
    endTime: "",
    id: 1,
    name: "test Tracking",
    startTime: "",
    task: tasks[0],
    updatedAt: new Date(),
  },
];

export const DashboardPage = () => {
  return (
    <>
      <h1>Dashborad FWE</h1>

      <TaskList>
        {tasks.map((task) => (
          <TaskItem task={task}></TaskItem>
        ))}
      </TaskList>
    </>
  );
};

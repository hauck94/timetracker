import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { AddButton} from "./components/AddButton";
import { Task, TaskItem, TaskList } from "./components/TransactionList";
import { AddTaskForm } from "./components/AddTaskForm";
import { Modal } from "../../components/Modal";
import {
  SelectInput,
  SelectAction,
  SelectState,
  LabelProps,
  initialReducer,
} from "../../components/SelectInput";

export const DashboardPage =  () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [addTaskVisible, setAddTaskVisible] = useState(false);

  const fetchTasks = async () => {
    const taskRequest = await fetch("/api/task", {
      headers: { "content-type": "application/json" },
    });
    console.log(taskRequest);
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      setTasks(taskJSON.data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Layout>
      <div
        css={`
          display: flex;
          flex-direction: row;
          width: 100%;
        `}
      >
        <div>
          <h2>Dashboard</h2>
          <AddButton
            onClick={() => {
              setAddTaskVisible(true);
            }}
          />

        </div>
      </div>
      {addTaskVisible && (
        <Modal
        title="Add Task"
        onCancel={() => {
            setAddTaskVisible(false);
            //fetchTasks();
          }}
        >
      <AddTaskForm
            afterSubmit={() => {
              setAddTaskVisible(false);
              fetchTasks();
            }}
          />
        </Modal>
      )}
      <TaskList>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
          >
          </TaskItem>
        ))}
      </TaskList>
    </Layout>
  );
};
import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { Modal } from "../../components/Modal";
import {
  AddButton,
  StartTrackingButton,
  StopTrackingButton,
} from "./components/AddButton";
import { AddTaskForm } from "./components/AddTaskForm";
import { EditTaskForm } from "./components/EditTaskForm";
import { Task, TaskItem, TaskList } from "./components/TaskList";
import { Timer } from "./components/Timer";

export default () => {
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [addTimer, setAddTimer] = useState(false);
  const fetchTasks = async function () {
    const taskRequest = await fetch("/api/task", {
      headers: { "content-type": "application/json" },
    });
    console.log(taskRequest);
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      setTasks(taskJSON.data);
    }
  };

  const createTracking = async (task: Task) => {
    const trackingRequest = await fetch(`/api/tracking/${task.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: task.name,
        description: "test 2",
      }),
    });
    console.log(trackingRequest);
    fetchTasks();
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
              if (!editTask) {
                setAddTaskVisible(true);
              }
            }}
          />
        </div>
      </div>
      {addTaskVisible && (
        <Modal
          title="Add Task"
          onCancel={() => {
            setAddTaskVisible(false);
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
      {editTask && (
        <Modal
          title="Edit Task"
          onCancel={() => {
            setEditTask(null);
          }}
        >
          <EditTaskForm
            afterSubmit={() => {
              setEditTask(null);
              fetchTasks();
            }}
            task={editTask}
          />
        </Modal>
      )}

      <TaskList>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            onClick={() => {
              if (!addTaskVisible) {
                setEditTask(task);
              }
            }}
            task={task}
          >
            {addTimer && <Timer></Timer>}

            <StartTrackingButton
              onClick={() => {
                createTracking(task);
                setAddTimer(true);
              }}
            />
            <StopTrackingButton />
          </TaskItem>
        ))}
      </TaskList>
    </Layout>
  );
};

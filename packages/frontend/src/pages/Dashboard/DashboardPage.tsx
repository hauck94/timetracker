import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { Modal } from "../../components/Modal";
import { SelectInput } from "../../components/SelectInput";
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
      setTasks(taskJSON.data);
      console.log("tasks", taskJSON);
    }
  };

  useEffect(() => {
    console.log("use effect");
    fetchTask();
  }, []);

  return (
    <>
      <Layout>
        <SelectInput
          label="Tags"
          options={[
            { id: "1", label: "React" },
            { id: "2", label: "Javascript" },
          ]}
        />
        <div
          css={`
            display: flex;
            flex-direction: row;
            width: 100%;
          `}
        >
          <div>
            <h2>Home</h2>
            <p
              css={`
                font-size: 36px;
                margin: 0;
              `}
            ></p>
          </div>
          <div
            css={`
              flex: 1;
              justify-content: flex-end;
              display: flex;
              align-items: top;
            `}
          >
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
            }}
          >
            <AddTaskForm
              afterSubmit={() => {
                setAddTaskVisible(false);
                fetchTask();
              }}
            />
          </Modal>
        )}
        <TaskList>
          {tasks.map((task) => (
            <TaskItem task={task} key={task.id}></TaskItem>
          ))}
        </TaskList>
      </Layout>
    </>
  );
};

import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Layout } from "../../components/Layout";
import { Modal } from "../../components/Modal";
import { AddButton } from "./components/AddButton";
import { AddTaskForm } from "./components/AddTaskForm";
import { EditTaskForm } from "./components/EditTaskForm";
import { Task, TaskItem, TaskList } from "./components/TaskList";

const CurrentBalance = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.secondaryFontColor};
`;

export default () => {
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

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
          ></TaskItem>
        ))}
      </TaskList>
    </Layout>
  );
};

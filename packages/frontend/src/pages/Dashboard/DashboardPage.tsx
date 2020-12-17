import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { AddButton, ShowTrackingButton } from "./components/Buttons";
import { Task, TaskItem, TaskList, TaskWrapper } from "./components/TransactionList";
import { AddTaskForm } from "./components/AddTaskForm";
import { Modal } from "../../components/Modal";
//import {SelectInput, SelectAction, SelectState, LabelProps, initialReducer, } from "../../components/SelectInput";
import { EditTaskForm } from "./components/EditTaskForm";
import { useHistory } from 'react-router-dom';


export const DashboardPage =  () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const history = useHistory();

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
           <TaskWrapper>
           <TaskItem 
           onClick={() => {
             if (!addTaskVisible) {
               setEditTask(task);
             }
           }}
           task={task}
         >
          </TaskItem>
          <ShowTrackingButton
          onClick={() => {
              history.push("/task/" + task.id);
          }}
          >
          </ShowTrackingButton>
         </TaskWrapper>
        ))}
      </TaskList>
    </Layout>
  );
};
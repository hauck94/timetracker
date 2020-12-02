import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Modal } from '../../components/Modal';
import {
  AddButton,
  EditTrackingButton,
  FilterTaskButton,
  StartTrackingButton,
  StopTrackingButton,
} from './components/Buttons';
import { AddTaskForm } from './components/AddTaskForm';
import { EditTaskForm } from './components/EditTaskForm';
import { AddTrackingForm } from './components/startTracking';
import { Task, TaskItem, TaskList } from './components/TaskList';
import { Timer } from './components/Timer';

export default () => {
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [startTrackingVisible, setStartTrackingVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [addTimer, setAddTimer] = useState(false);
  const history = useHistory();

  const fetchTasks = async () => {
    const taskRequest = await fetch('/api/task', {
      headers: { 'content-type': 'application/json' },
    });
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      setTasks(taskJSON.data);
    }
  };

  const routeChange = (id: string) => {
    const path = `/task/${id}`;
    history.push(path);
  };

  const sortArray = () => {
    const sorted = [...tasks].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setTasks(sorted);
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
          <FilterTaskButton onClick={() => sortArray()} />
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
            {addTimer && <Timer />}

            <StartTrackingButton
              onClick={() => {
                if (!startTrackingVisible) {
                  setStartTrackingVisible(true);
                }
                setAddTimer(true);
              }}
            />
            <StopTrackingButton />
            <EditTrackingButton onClick={() => routeChange(task.id)} />
            {startTrackingVisible && (
              <Modal
                title="Start Tracking"
                onCancel={() => {
                  setStartTrackingVisible(false);
                }}
              >
                <AddTrackingForm
                  afterSubmit={() => {
                    setStartTrackingVisible(false);
                    fetchTasks();
                  }}
                  task={task}
                />
              </Modal>
            )}
          </TaskItem>
        ))}
      </TaskList>
    </Layout>
  );
};

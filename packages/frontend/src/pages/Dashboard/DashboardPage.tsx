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
import { Task, TaskItem, TaskList, Tracking } from './components/TaskList';
import { Timer } from './components/Timer';

export default () => {
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [startTrackingVisible, setStartTrackingVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [taskTracking, setTaskTracking] = useState<Task>();
  const [addTracking, setAddTracking] = useState<Tracking | null>(null);
  const history = useHistory();

  const sortTrackingsByCreated = (task: Task) => {
    task.trackings.sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });
  };

  const fetchTasks = async () => {
    const taskRequest = await fetch('/api/task', {
      headers: { 'content-type': 'application/json' },
    });
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      setTasks(taskJSON.data);
      [...tasks].forEach((task) => {
        console.log('before', task.trackings);

        sortTrackingsByCreated(task);

        console.log('after', task.trackings);
      });
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

  const findTaskById = (id: string) => {
    
    fetchTasks();
    const task = [...tasks].filter((taskT) => taskT.id === id);
    if (task.length) {
      return task[0];
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
            
            {addTracking && <Timer tracking={addTracking} />}

            <StartTrackingButton
              onClick={() => {
                if (!startTrackingVisible) {
                  setStartTrackingVisible(true);
                }
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
                  task={task}
                  afterSubmit={
                    () => {
                      setStartTrackingVisible(false);
                      fetchTasks();

                      console.log("find", findTaskById(task.id));

                      findTaskById(task.id);
                    }
                    // setAddTracking(task.trackings[task.trackings.length - 1]);
                  }
                />
              </Modal>
            )}
          </TaskItem>
        ))}
      </TaskList>
    </Layout>
  );
};

import React, { useState, useEffect, ChangeEvent } from 'react';
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
import { Input } from '../../components/Input';

export default () => {
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [startTrackingVisible, setStartTrackingVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTask, setFilteredTask] = useState<Task[]>([]);

  const [addTracking] = useState<Tracking | null>(null);
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

      setFilteredTask(taskJSON.data);
      [...tasks].forEach((task) => {
        sortTrackingsByCreated(task);
      });
    }
  };

  const routeChange = (id: string) => {
    const path = `/task/${id}`;
    history.push(path);
  };

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    filterArray(e.target.name, e.target.value);
  };

  const filterArray = (type: string, input: string) => {
    switch (type) {
      case 'name':
        const filteredByName = tasks.filter((task) => {
          return task.name.toLocaleLowerCase().indexOf(input) !== -1;
        });
        setFilteredTask(filteredByName);
        break;
      case 'description':
        const filteredByDescription = tasks.filter((task) => {
          return task.description.toLocaleLowerCase().indexOf(input) !== -1;
        });
        setFilteredTask(filteredByDescription);
        break;
      case 'label':
        let filterByLabel: Task[] = [];
        tasks.forEach((task) => {
          task.labels.filter((label) => {
            if (label.name.toLocaleLowerCase().indexOf(input) !== -1) {
              filterByLabel.push(task);
            }
          });
        });
        if (input === '') {
          filterByLabel = tasks;
        }
        filterByLabel = filterByLabel.filter((val, id, array) => array.indexOf(val) === id);
        setFilteredTask(filterByLabel);
        break;
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
          <FilterTaskButton />
          <Input name="name" type="text" label="Name" onChange={fieldDidChange} required={true} />
          <Input name="description" type="text" label="description" onChange={fieldDidChange} required={true} />
          <Input name="label" type="text" label="label" onChange={fieldDidChange} required={true} />
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
        {filteredTask.map((task) => (
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

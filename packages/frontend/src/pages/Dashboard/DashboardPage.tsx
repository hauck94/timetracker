import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Modal } from '../../components/Modal';
import {
  AddButton,
  EditTrackingButton,
  PauseTrackingButton,
  StartTrackingButton,
  StopTrackingButton,
} from './components/Buttons';
import { AddTaskForm } from './components/AddTaskForm';
import { EditTaskForm } from './components/EditTaskForm';
import { AddTrackingForm } from './components/startTracking';
import { Task, TaskItem, TaskList } from './components/TaskList';
import { TimerContainer, TimerDescription, TimerTitle } from './components/Timer';
import { Input } from '../../components/input/Input';
import { FilterPanel } from './components/FilterPanel';

export default () => {
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [startTrackingVisible, setStartTrackingVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTask, setFilteredTask] = useState<Task[]>([]);
  const [trackingTaskEvent, setTrackingTaskEvent] = useState('');
  const history = useHistory();
  // Timer
  const [seconds, setSeconds] = useState(
    localStorage.getItem('pause') === 'true' ? (new Date().getTime() - Number(localStorage.getItem('time'))) / 1000 : 0,
  );
  const [isRunning, setIsRunning] = useState(
    localStorage.getItem('time') === null ||
      localStorage.getItem('time') === '0' ||
      localStorage.getItem('pause') === 'true'
      ? false
      : true,
  );
  const [isPause, setIsPause] = useState(localStorage.getItem('pause') === 'true' ? true : false);

  useEffect(() => {
    console.log(isRunning);

    if (isRunning) {
      if (localStorage.getItem('time') === null || localStorage.getItem('time') === '0') {
        const actualTime = new Date().getTime().toString();
        localStorage.setItem('time', actualTime);
      } else {
        const now = new Date().getTime();
        const past = Number(localStorage.getItem('time'));
        const duration = now - past;
        setSeconds(duration / 1000);
      }
      const id = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);

      return () => clearInterval(id);
    }
    return undefined;
  }, [isRunning]);

  const fetchTracking = async () => {
    const trackingRequest = await fetch(`/api/tracking/${localStorage.getItem('lastTracking')}`, {
      headers: { 'content-type': 'application/json' },
    });
    if (trackingRequest.status === 200) {
      const trackingJSON = await trackingRequest.json();
      const past = Number(localStorage.getItem('time'));

      await fetch(`/api/tracking/${trackingJSON.data.id}`, {
        body: JSON.stringify({
          created: trackingJSON.data.created,
          description: trackingJSON.data.description,
          // endtime is duration + start time + 1h winter time - 2 seconds delay
          endTime: new Date((seconds + 3600 - 2) * 1000 + past).toISOString().substr(11, 8),
          name: trackingJSON.data.name,
          startTime: trackingJSON.data.startTime,
          updatedAt: trackingJSON.data.updatedAt,
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'PATCH',
      });
    }
  };

  // Timer End

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
          return task.name.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) !== -1;
        });
        setFilteredTask(filteredByName);
        break;
      case 'description':
        const filteredByDescription = tasks.filter((task) => {
          return task.description.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) !== -1;
        });
        setFilteredTask(filteredByDescription);
        break;
      case 'label':
        let filterByLabel: Task[] = [];
        tasks.forEach((task) => {
          task.labels.filter((label) => {
            if (label.name.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) !== -1) {
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
          <FilterPanel>
            <svg
              width="3em"
              height="3em"
              viewBox="0 0 16 16"
              className="bi bi-funnel"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
            </svg>
            <Input
              name="name"
              type="text"
              label="Task Name"
              onChange={fieldDidChange}
              data-testid="filter-name-button"
            />
            <Input
              name="description"
              type="text"
              label="Task Description"
              onChange={fieldDidChange}
              data-testid="filter-description-button"
            />
            <Input
              name="label"
              type="text"
              label="Label Name"
              onChange={fieldDidChange}
              data-testid="filter-label-button"
            />
          </FilterPanel>
          <AddButton
            data-testid="add-task-button"
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
            {isRunning ? (
              <PauseTrackingButton
                data-testid="task-tracking-pause"
                onClick={async () => {
                  setIsRunning(false);
                  await fetchTracking();
                  localStorage.setItem('pause', 'true');
                  setIsPause(true);
                }}
              />
            ) : (
              <StartTrackingButton
                data-testid="task-tracking-start"
                onClick={() => {
                  if (seconds < 1) {
                    setStartTrackingVisible(true);
                    setTrackingTaskEvent(task.id);
                  } else {
                    setStartTrackingVisible(true);
                    setTrackingTaskEvent(task.id);
                    localStorage.setItem('time', new Date().getTime().toString());
                  }
                  localStorage.removeItem('pause');
                  setIsPause(false);
                }}
              />
            )}

            <StopTrackingButton
              data-testid="task-tracking-stop"
              onClick={async () => {
                setIsRunning(false);
                if (localStorage.getItem('pause') === 'true' || localStorage.getItem('pause') === null) {
                  await fetchTracking();
                }
                setSeconds(0);
                localStorage.setItem('time', '0');
                localStorage.removeItem('pause');
                setIsPause(false);
              }}
            />
            <EditTrackingButton onClick={() => routeChange(task.id)} />
            {startTrackingVisible && (
              <Modal
                title={localStorage.getItem('time') === '0' ? 'Start Tracking' : 'Continue Tracking'}
                onCancel={() => {
                  setStartTrackingVisible(false);
                }}
              >
                <AddTrackingForm
                  taskID={trackingTaskEvent}
                  afterSubmit={() => {
                    setIsRunning(true);
                    setStartTrackingVisible(false);
                    fetchTasks();
                  }}
                />
              </Modal>
            )}
          </TaskItem>
        ))}
      </TaskList>
      {localStorage.getItem('time') !== '0' && localStorage.getItem('time') !== null && (
        <TimerContainer>
          {isPause && <TimerTitle>Paused Tracking</TimerTitle>}
          <TimerDescription>time elapsed: {new Date(seconds * 1000).toISOString().substr(11, 8)}</TimerDescription>
        </TimerContainer>
      )}
    </Layout>
  );
};

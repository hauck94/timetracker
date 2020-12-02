import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Layout } from '../../components/Layout';
import { Modal } from '../../components/Modal';
import { AddButton } from '../Dashboard/components/Buttons';
import { Task, Tracking } from '../Dashboard/components/TaskList';
import { AddTrackingForm } from './components/AddTrackingForm';
import { EditTrackingForm } from './components/EditTrackingForm';
import { TrackingList, TrackingItem } from './components/TrackingList';

export interface ITaskRouteParams {
  id: string;
}

export default () => {
  const [task, setTask] = useState<Task>();
  const [editTracking, setEditTracking] = useState<Tracking | null>(null);
  const [addTrackingVisible, setAddTrackingVisible] = useState(false);
  const { id } = useParams<ITaskRouteParams>();

  const fetchSingelTask = async () => {
    const taskRequest = await fetch(`/api/task/${id}`, {
      headers: { 'content-type': 'application/json' },
    });
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      setTask(taskJSON.data);
    }
  };

  useEffect(() => {
    fetchSingelTask();
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
          <h1>{task?.name}</h1>
          <h3>{task?.trackings.length} Trackings</h3>
          <AddButton
            onClick={() => {
              if (!editTracking) {
                setAddTrackingVisible(true);
              }
            }}
          />
        </div>
      </div>
      {addTrackingVisible && task && (
        <Modal
          title="Add Tracking"
          onCancel={() => {
            setAddTrackingVisible(false);
          }}
        >
          <AddTrackingForm
            afterSubmit={() => {
              setAddTrackingVisible(false);
              fetchSingelTask();
            }}
            task={task}
          />
        </Modal>
      )}
      {editTracking && (
        <Modal
          title="Edit Tracking"
          onCancel={() => {
            setEditTracking(null);
          }}
        >
          <EditTrackingForm
            afterSubmit={() => {
              setEditTracking(null);
              fetchSingelTask();
            }}
            tracking={editTracking}
          />
        </Modal>
      )}
      <TrackingList>
        {task?.trackings.map((tracking) => (
          <TrackingItem
            key={tracking.id}
            onClick={() => {
              setEditTracking(tracking);
            }}
            tracking={tracking}
          />
        ))}
      </TrackingList>
    </Layout>
  );
};

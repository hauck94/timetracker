import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { AddButton, ShowTrackingButton} from "../Dashboard/components/Buttons";
import { Task, TrackingItem, TrackingList } from "./components/TrackingList";
import { AddTrackingForm } from "./components/AddTrackingForm";
import { Modal } from "../../components/Modal";
import { EditTrackingForm } from "./components/EditTrackingForm";
import { Tracking } from "../Dashboard/components/TransactionList";
import { useParams } from "react-router";

export interface ITaskRouteParams {
  taskId: string;
}

export const DetailPage =  () => {
  const [task, setTask] = useState<Task>();
  const [addTrackingVisible, setAddTrackingVisible] = useState(false);
  const [editTracking, setEditTracking] = useState<Tracking | null>(null);
  const {taskId} = useParams<ITaskRouteParams>();

  const fetchTask = async () => {
    const taskRequest = await fetch("/api/task/" + taskId, {
      headers: { "content-type": "application/json" },
    });
    console.log(taskRequest);
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      setTask(taskJSON.data);
    }
  };

  useEffect(() => {
    fetchTask();
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
          <h2>Detail</h2>
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
            //fetchTask();
          }}
        >
      <AddTrackingForm
            afterSubmit={() => {
              setAddTrackingVisible(false);
              fetchTask();
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
              fetchTask();
            }}
            tracking={editTracking}
          />
        </Modal>
      )}
      <TrackingList>
        {task?.trackings.map((tracking) => (
           <TrackingItem 
           onClick={() => {
             if (!addTrackingVisible) {
               setEditTracking(tracking);
             }
           }}
           tracking={tracking}
         >
         </TrackingItem>
        ))
        }
      </TrackingList>
    </Layout>
  );
};
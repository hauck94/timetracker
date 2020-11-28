import React, { Children } from "react";
import styled from "styled-components";
import { StartTrackingButton, StopTrackingButton } from "./AddButton";

export type Task = {
  id: string;
  name: string;
  description: string;
  created: string;
  updatedAt: string;
  trackings: Tracking[];
  labels: Label[];
};

export type Label = {
  id: string;
  name: string;
  created: string;
  updatedAt: string;
  tasks: Task[];
};

export type Tracking = {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  created: string;
  updatedAt: string;
  task: Task;
};

const LabelList = styled.ul`
  list-style: none;
  flex-grow: 1;
  font-size: 0.8rem;

  align-self: flex-end;
  display: flex;
  & > li {
    margin-right: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: ${(props) => props.theme.colors.primary};
    display: block;
    color: #333;
  }
`;

const TrackingList = styled.ul`
  list-style: none;
  flex-grow: 1;
  font-size: 0.8rem;s

  align-self: flex-end;
  display: flex;
  & > li {
    margin-right: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: ${(props) => props.theme.colors.primary};
    display: block;
    color: #333;
  }
`;

const TaskFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const TaskHighlight = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: none;
  width: 4px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const TaskItemStyle = styled.div`
  margin: 0;
  min-height: 3rem;
  position: relative;
  padding: 0.7rem 2rem;
  &:hover {
    ${TaskHighlight} {
      display: block;
    }
  }
`;

export const TaskItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const TrackingControlls = styled.ul`
  display: flex;
  flex-direction: row;
  margin:auto; 
  margin-right:1em;
`;

export const TaskList = styled.ul`
  list-style: none;
  box-shadow: 0 0.125em 0.25em 0 ${(props) => props.theme.colors.shadowColor};
  width: 100%;
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.listBackgroundColor};
  ${TaskItemStyle} {
    border-bottom: 1px ${(props) => props.theme.colors.shadowColor} solid;
    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

export const TaskTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;

export const TaskDescription = styled.p`
  font-size: 0.8rem;
  margin: 0;
`;

export const TaskDate = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.secondaryFontColor};
`;

export const TaskValue = styled.span`
  white-space: nowrap;
`;

export type TaskItemProps = {
  task: Task;
  onClick?: (task: Task) => void;
};

function output(): void {
  console.log("hi");
}

export const TaskItem: React.FC<TaskItemProps> = ({
  children,
  task,
  onClick = () => {},
}) => {
  const { name, description, created, labels, updatedAt, trackings } = task;
  return (
    <TaskItemWrapper>
      <TaskItemStyle
        onClick={() => {
          console.log("clicked transaction ID = ", task.id);
          onClick(task);
        }}
      >
        <TaskHighlight />
        <TaskFlex>
          <div>
            <TaskTitle>{name}</TaskTitle>
            <TaskDescription>{description}</TaskDescription>
            <TaskDate>{created && created.toLocaleString()}</TaskDate>
          </div>
          <LabelList>
            {labels &&
              labels.map((label: Label) => {
                return <li key={label.id}>{label.name}</li>;
              })}
          </LabelList>
          <TrackingList>
            {trackings &&
              trackings.map((tracking: Tracking) => {
                return <li key={tracking.id}>{tracking.name}</li>;
              })}
          </TrackingList>
        </TaskFlex>
      </TaskItemStyle>
      <TrackingControlls>
      {children}
      </TrackingControlls>
    </TaskItemWrapper>
  );
};

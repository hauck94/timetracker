import React from "react";
import styled from "styled-components";
//import {Task, Tracking} from "../components/TrackingList";

// Labellist ursprünglich
/*
export const TrackingList = styled.ul`
  list-style: none;
  flex-grow: 1;
  font-size: 0.8rem;

  align-self: flex-end;
  display: flex;
  & > li {
    margin-right: 0.5rem;
    padding: 0.125rem;
    border-radius: 0.25rem;
    background-color: ${(props : any) => props.theme.colors.primary};
    display: block;
    color: #333;
  }
`;
*/

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

const TrackingFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const TrackingHighlight = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: none;
  width: 4px;
  background-color: ${(props : any) => props.theme.colors.primary};
`;

export const TrackingItemStyle = styled.div`
  margin: 0;
  min-height: 3rem;
  position: relative;
  padding: 0.7rem 2rem;
  &:hover {
    ${TrackingHighlight} {
      display: block;
    }
  }
`;

//das wird evtl. TrackingList
export const TrackingList = styled.ul`
  list-style: none;
  box-shadow: 0 0.125em 0.25em 0 ${(props : any) => props.theme.colors.shadowColor};
  width: 100%;
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${(props : any) => props.theme.colors.listBackgroundColor};
  ${TrackingItemStyle} {
    border-bottom: 1px ${(props: any) => props.theme.colors.shadowColor} solid;
    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

export const TrackingTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;

export const TrackingDescription = styled.p`
  font-size: 0.8rem;
  margin: 0;
`;

export const TrackingDate = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${(props : any) => props.theme.colors.secondaryFontColor};
`;

export type TrackingItemProps = {
  tracking: Tracking;
  onClick?: (tracking: Tracking) => void;
};

export const TrackingItem: React.FC<TrackingItemProps> = ({
  tracking,
  children,
  onClick = () => {},
}) => {
  const { name, description, created, updatedAt } = tracking;
  return (
    <TrackingItemStyle
    onClick={() => {
      onClick(tracking);
    }}
  >
      <TrackingHighlight />
      <TrackingFlex>
        <div>
          <TrackingTitle>{name}</TrackingTitle>
          <TrackingDescription>{description}</TrackingDescription>
          <TrackingDate>
            {created && created.toLocaleString()}
          </TrackingDate>
        </div>
        <TrackingList>
              <li key= {tracking.id}>{tracking.name}</li>;
        </TrackingList>
        {children}
      </TrackingFlex>
    </TrackingItemStyle>
  );
};
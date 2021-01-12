import React from 'react';
import styled from 'styled-components';
import { Tracking } from '../../Dashboard/components/TaskList';

const TrackingFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TrackingHighlight = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: none;
  width: 4px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const TrackingItemStyle = styled.div`
  margin: 0;
  min-height: 3rem;
  position: relative;
  padding: 0.7rem 2rem;
  justify-content: space-between;
  &:hover {
    ${TrackingHighlight} {
      display: block;
    }
  }
`;

export const TrackingItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const TrackingControlls = styled.ul`
  display: flex;
  flex-direction: row;
  margin: auto;
  margin-right: 1em;
`;

export const TrackingList = styled.ul`
  list-style: none;
  box-shadow: 0 0.125em 0.25em 0 ${(props) => props.theme.colors.shadowColor};
  width: 100%;
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.listBackgroundColor};
  ${TrackingItemStyle} {
    border-bottom: 1px ${(props) => props.theme.colors.shadowColor} solid;
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
  color: ${(props) => props.theme.colors.secondaryFontColor};
`;

export const TrackingValue = styled.span`
  white-space: nowrap;
`;

export const TrackingPropertyWrapper = styled.div``;

export type TrackingItemProps = {
  tracking: Tracking;
  onClick?: (tracking: Tracking) => void;
};

export const TrackingItem: React.FC<TrackingItemProps> = ({ tracking, onClick = () => undefined }) => {
  const { created, description, endTime, name, startTime, updatedAt } = tracking;

  return (
    <TrackingItemStyle
      data-testid="tracking-item"
      onClick={() => {
        onClick(tracking);
      }}
    >
      <TrackingHighlight />
      <TrackingFlex>
        <TrackingPropertyWrapper>
          <TrackingTitle data-testid="tracking-item-name">{name}</TrackingTitle>
          <TrackingDescription>description: {description}</TrackingDescription>
        </TrackingPropertyWrapper>
        <TrackingPropertyWrapper>
          <TrackingDescription>created: {created}</TrackingDescription>
          <TrackingDescription>updated: {updatedAt}</TrackingDescription>
        </TrackingPropertyWrapper>
        <TrackingPropertyWrapper>
          <TrackingDescription data-testid="tracking-item-started">started: {startTime}</TrackingDescription>
          <TrackingDescription data-testid="tracking-item-ended">ended: {endTime}</TrackingDescription>
        </TrackingPropertyWrapper>
      </TrackingFlex>
    </TrackingItemStyle>
  );
};

import React, { useState } from 'react';
import styled from 'styled-components';
import { Task } from './TaskList';

const StyledPanel = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  margin-bottom: 2rem;
  align-items: center;
  border-radius: 10px;
  background-color: ${(styledProps) => styledProps.theme.colors.listBackgroundColor};
`;
/*
const filterLabel () => {

}

const filterName () => {
    
}

const filterDescription () => {
    
}
*/
export const FilterPanel: React.FC<{
  task: Task[];
}> = ({ task }) => {
  const [] = useState(task);
  return (
    <StyledPanel>
      <h3>Filter</h3>
    </StyledPanel>
  );
};

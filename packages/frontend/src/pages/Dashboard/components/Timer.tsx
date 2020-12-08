import styled from 'styled-components';

export const TimerContainer = styled.div`
  transition-duration: 0.4s;
  transition-property: box-shadow, border-color;
  border: 1px solid rgb(230, 230, 230);

  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: #c04545;
  color: #000;
  position: fixed;
  justify-content: center;

  bottom: 0;
  right: 0;
  width: 30%;
  height: 72px;
  margin-bottom: 16px;
`;

export const TimerTitle = styled.div`
  margin: auto;
  font-weight: bolder;
`;

export const TimerDescription = styled.div`
  margin: auto;
  font-weight: 600;
`;

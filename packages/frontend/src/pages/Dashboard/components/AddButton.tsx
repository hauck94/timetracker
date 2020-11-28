import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 48px;
  border: 0px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${(styledProps) => styledProps.theme.colors.primary};
`;

const StyledTrackingButton = styled.button`
  width: 48px;
  border: 0px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${(styledProps) => styledProps.theme.colors.info};
  margin: 3px;
`;
export const AddButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <StyledButton {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        focusable="false"
        style={{ fill: "#fff", height: "24px", width: "24px" }}
      >
        <path d="M14.5 2a1.5 1.5 0 0 1 3 0v28a1.5 1.5 0 0 1-3 0V2z" />
        <path d="M30 14.5a1.5 1.5 0 0 1 0 3H2a1.5 1.5 0 0 1 0-3h28z" />
      </svg>
    </StyledButton>
  );
};

export const StartTrackingButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <StyledTrackingButton {...props}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        className="bi bi-play"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fill: "#fff", height: "24px", width: "24px" }}
      >
        <path
          d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
        />
      </svg>
    </StyledTrackingButton>
  );
};

export const StopTrackingButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <StyledTrackingButton {...props}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        className="bi bi-stop"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fill: "#fff", height: "24px", width: "24px" }}
      >
        <path
          d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z"
        />
      </svg>
    </StyledTrackingButton>
  );
};

export const PauseTrackingButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <StyledTrackingButton {...props}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        className="bi bi-play"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fill: "#fff", height: "24px", width: "24px" }}
      >
        <path
          d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
        />
      </svg>
    </StyledTrackingButton>
  );
};

import React, { useState, useRef } from "react";
import styled from "styled-components";

const InputLabel = styled.label`
  position: absolute;
  left: 15px;
  top: 35px;
  color: rgb(116, 116, 116);
  transform: matrix(1, 0, 0, 1, 0, -12.5);
  transition-property: transform;
  line-height: 25px;
  font-size: 18px;
  transition-duration: 0.3s;
`;

const InputField = styled.input`
  background-color: transparent;
  padding: 37px 21px 13px;
  outline-width: 0px;
  border-width: 0;
  font-size: 16px;
  &:focus + ${InputLabel} {
    transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
  }
  &:not(:placeholder-shown) + ${InputLabel} {
    transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
  }
  height: 100%;
  flex: 1;
`;

const InputContainer = styled.div`
  transition-duration: 0.4s;
  transition-property: box-shadow, border-color;
  border: 1px solid rgb(230, 230, 230);

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  min-height: 72px;
  border-radius: 5px;
  background-color: #ffffff;
  color: #000;
`;

const DropdownHolder = styled.div`
  &:focus-within > ${InputContainer} {
    border: 1px solid ${(props) => props.theme.colors.primary};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1),
      inset 0 0 0 2px ${(props) => props.theme.colors.primary};
  }
`;

const Label = styled.div`
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.primary};
  position: relative;

  color: white;

  padding: 3px 6px;
  padding-right: 25px;
  margin: 35px 0px 13px 8px;
  overflow: visible;
  outline-width: 0px;
  border-image: initial;
  border-width: 0;
  outline-style: none;

  &:not(:empty) ~ ${InputLabel} {
    transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
  }
  &:not(:empty) ~ ${InputField} {
    padding-left: 8px;
  }

  &:first-child {
    margin-left: 20px;
  }
  & > button {
    all: unset;
    transition-duration: 0.25s;
    transition-property: background-color;
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    width: 20px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: teal;
    cursor: pointer;
    &:focus,
    &:hover {
      background-color: #d01c1f;
    }
  }
`;

interface Option {
  label: string;
  id: string;
}

export const SelectInput: React.FC<{ label: string }> = ({ label }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const id = useRef(
    `${label.replace(" ", "-")}-${Math.floor(Math.random() * 10000)}`
  );

  const createOption = (optionValue: string): Option => {
    return {
      label: optionValue,
      id: `${optionValue.replace(" ", "-")}-${Math.floor(
        Math.random() * 10000
      )}`,
    };
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSelectedOptions([...selectedOptions, createOption(inputValue)]);
      setInputValue("");
    }
    if (e.key === "Backspace" && inputValue.length === 0) {
        setSelectedOptions(selectedOptions.splice(0, selectedOptions.length - 1));
      }
    };
  
    const removeValue = (value: Option) => {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => value.id !== selectedOption.id)
      );
  };

  return (
    <DropdownHolder>
      <InputContainer>
        {selectedOptions.map((option) => (
            <Label key={option.id}>
            {option.label}
            <button
              onClick={() => {
                removeValue(option);
              }}
            >
              x
            </button>
          </Label>
        ))}
        <InputField
          id={id.current}
          value={inputValue}
          onChange={onChangeInput}
          onKeyDown={onKeyDown}
          placeholder=" "
        />
        <InputLabel htmlFor={id.current}>{label}</InputLabel>
      </InputContainer>
    </DropdownHolder>
  );
};

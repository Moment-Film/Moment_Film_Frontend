import React from "react";
import { styled } from "styled-components";
import * as I from "../common/styles/StyledInput";

const InputField = ({
  name,
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  checkBtn = false,
  infoText = null,
  error = null,
}) => {
  return (
    <ValueWrap>
      <ValueBox>
        {label}
        <span>*</span>
      </ValueBox>
      <InputBox>
        <I.StyledMiddleInput
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {error && <div className="errorMessage">{error}</div>}
      </InputBox>
    </ValueWrap>
  );
};

export default InputField;

const ValueWrap = styled.div`
width: 73%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ValueBox = styled.div`
  width: 77px;
  height: 52px;
  font-size: 16px;
  border: none;
  display: flex;
  align-items: center;
  align-content: center;
  text-align: center;

  span {
    color: var(--warningRed);
  }
`;

const InputBox = styled.div`
width: 80%;
  display: flex;
  flex-direction: column;

  .errorMessage {
    font-size: 12px;
    color: var(--warningRed);
    padding-left: 20px;
    margin-top: 5px;
  }
`;

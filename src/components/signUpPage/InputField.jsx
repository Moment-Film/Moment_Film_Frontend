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
        <span style={{ color: "red" }}>*</span>
      </ValueBox>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <I.StyledMiddleInput
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {infoText && (
          <div
            style={{
              fontSize: "14px",
              paddingLeft: "20px",
              marginTop: "5px",
              color:'var(--warningRed)',
              lineHeight:'17px'
            }}
          >
            {infoText}
          </div>
        )}
        {error && (
          <div
            style={{
              fontSize: "14px",
              color: "red",
              paddingLeft: "20px",
              marginTop: "5px",
            }}
          >
            {error}
          </div>
        )}
      </div>
{/*       <CheckBtn style={{ visibility: checkBtn ? "visible" : "hidden" }}>
        중복확인
      </CheckBtn> */}
    </ValueWrap>
  );
};

export default InputField;

const ValueWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
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
`;

const CheckBtn = styled.div`
  width: 145px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--green6);
  border: 2px solid var(--green5);
  background-color: var(--green1);
  cursor: pointer;
`;

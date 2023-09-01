import styled from 'styled-components';

export const StyledLongInput = styled.input`
  width:100%;
  border:none;
  outline:none;
  font-size:16px;
  background-color: var(--whiteGray);
`
export const StyledMiddleInput = styled.input`
  /* max-width: 460px; */
  width: 100%;
  height: 50px;
  font-size: 16px;

  border: none;
  border-bottom: 2px solid var(--green5);
  background-color: #FBFCF9;
  padding-left: 20px;
  outline: none;

  &::placeholder {
    color: var(--gray3);
  }
`
export const StyledShortInput = styled.input`
width:100%;
height:60px;
font-size: 20px;
background-color: rgb(251, 252, 249);
border:none;
border-bottom:2px solid var(--green5);
outline:none;
`
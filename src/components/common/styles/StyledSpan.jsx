import styled from "styled-components";

//font-weight : basic , BOLD 존재  props => color lineHeight
//----------------------------------------------------------
// font-weight : basic

export const Span28 = styled.span`
  font-size: 24px;
  color: var(--black);
  line-height: 30px;
  font-family: "Abril Fatface", cursive;
`;
export const StyledSpan26 = styled.span`
  font-size: 26px;
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
`;
export const StyledSpan24 = styled.span`
  font-size: 24px;
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
`;
export const StyledSpan20 = styled.span`
  font-size: 20px;
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
`;
export const StyledSpan18 = styled.span`
  font-size: 18px;
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
`;
export const StyledSpan16 = styled.span`
  font-size: 16px;
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
`;

export const StyledSpan15 = styled.span`
  font-size: 15px;
  opacity: ${(props)=> props.select ? 1 : 0.3};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  font-family: "Abril Fatface", cursive;
`;

export const StyledSpan14 = styled.span`
  font-size: 14px;
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  
`;

//----------------------------------------------------------
// font-weight : BOLD

export const StyledBoldSpan42 = styled.span`
  font-size: 42px;
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  font-weight: bold;
`;

export const StyledBoldSpan28 = styled.span`
  font-size: 28px;
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  font-weight: bold;
  font-family: "Abril Fatface", cursive;
`;

export const StyledBoldSpan26 = styled.span`
  font-size: 26px;
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  font-weight: bold;
`;
export const StyledBoldSpan24 = styled.span`
  font-size: 24px;
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  font-weight: bold;
`;
export const StyledBoldSpan20 = styled.span`
  font-size: 20px;
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  font-weight: bold;
  margin: ${(props) => props.$margin};
`;
export const StyledBoldSpan18 = styled.span`
  font-size: 18px;
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  font-weight: bold;
`;
export const StyledBoldSpan16 = styled.span`
  font-size: 16px;
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  font-weight: bold;
`;
export const StyledBoldSpan14 = styled.span`
  font-size: 14px;
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  font-weight: bold;
`;

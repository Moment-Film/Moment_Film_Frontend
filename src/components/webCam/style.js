import styled from "styled-components";

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  max-width: 770px;
  width: 90%;
  height: 622px;
  background-color: var(--gray5);
  box-sizing: border-box;
  margin-bottom: 35px;
  border-radius: 5px 5px 0;

  span {
    line-height: 17px;
    margin: 26px 0 15px;
  }
`
const InnerGrids = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
`
const GridBackground = styled.div`
  display: flex;
  width: ${props => props.width || '150px' };
  height: 447px;
  flex-direction: ${props => props.$bottomText ? 'column-reverse': 'column'};
  gap: ${props => props.$gap};
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 40px rgba(0,0,0,0.1);
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 15px;
  box-sizing: border-box;
  img {
    width: 148px;
  }
`

export {
  InnerGrids,
  GridContainer,
  GridBackground,
}
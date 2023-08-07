import React from 'react'
import { styled } from 'styled-components';

function CustomMakePage() {
  return (
    <div>
      <RainbowBar></RainbowBar>
    </div>
  )
}

export default CustomMakePage

const RainbowBar = styled.div`
  height: 50px;
  background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet);
`;
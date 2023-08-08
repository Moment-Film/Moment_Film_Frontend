import React from 'react'
import { styled } from 'styled-components';
import GridNav from './../components/frameSelectPage/GridNav';
import * as s from "../components/frameSelectPage/style";

function CustomMakePage() {
  return (
    <>
    <s.Wrap>
      <s.Slider>
        <s.OptionWrap>
          <GridNav data={"frameSetting"} />
          <BoxWrap>
            <LeftBox>

            </LeftBox>
            <RightBox>
            <div>Frame</div>
            <div>
              <div>
                <div>

                </div>
                <div>
                  
                </div>
                <div>
                  
                </div>
              </div>
            </div>
            </RightBox>
          </BoxWrap>
        </s.OptionWrap>
      </s.Slider>
    </s.Wrap>
    {/* <RainbowBar /> */}
    </> 
  )
}

export default CustomMakePage

const BoxWrap = styled.div`
  width: 970px;
  display: flex;
  flex-direction: row;
  margin: 88px;
  box-shadow: 0px 0px 40px -5px rgba( 0%, 0%, 0%, 0.1 );
`

const LeftBox = styled.div`
  width: 62%;
  height: 530px;
  background-color: var(--lightGray);
  border-top: 2px solid var(--black);
  border-bottom: 2px solid var(--black);
`

const RightBox = styled.div`
  width: 38%;
  height: 532px;
`
// const RainbowBar = styled.div`
//   height: px;
//   background: linear-gradient(90deg, #ff0000, orange, #ffff00, green, #0000ff, indigo, violet);
// `;
import React from 'react'
import styled from 'styled-components';
import useCustomAPI from '../../../api/withToken/useCustom';
import { SetImgFile } from '../../../redux/modules/FrameInfo';
import { useDispatch } from 'react-redux';
function MyFrameModal({ onClose, data, title, accessToken, refreshToken, onApply }) {
  const {
    applyFrame,
    applyFilter
  } = useCustomAPI();

  const dispatch = useDispatch();
  const closeModalHandler = () => {
    onClose();
  }
  
  const applyThisFrame = (h, s, l, img) => {
    if (img) {
      fetch(img)
        .then(response => response.blob())
        .then(blob => {
          dispatch(SetImgFile(blob));
          onApply(h, s, l, img);
        })
        .catch(error => {
          console.error("Error fetching or processing image:", error);
        });
    }
  }

  const applyThisFilter = (blur, brightness, saturate, contrast, sepia) => {
    onApply(blur, brightness, saturate, contrast, sepia);
  }
  const ApplyMyFrame = (frameId) => {
    applyFrame({ frameId, accessToken, refreshToken })
      .then(result => {
        //console.log(result);
        applyThisFrame(result.hue, result.saturation, result.lightness, result.image);
      })
  }
  const ApplyMyFilter = (filterId) => {
    applyFilter({ filterId, accessToken, refreshToken })
      .then(result => {
        applyThisFilter(result?.blur, result?.brightness, result?.saturate, result?.contrast, result?.sepia);
      })
  }
  return (
    <ModalSection>
      <ModalHeaderSection>
        <span>내 이전 {title} 보기</span>
        <button onClick={closeModalHandler}> X </button>
      </ModalHeaderSection>
      <InnerListSection>
        {
          data?.map((item) => {
            return <ListItem key={item.id}>
              <span>{item.id} {title === "프레임" ? item.frameName : item.filterName}</span>
              <button onClick={() => title === "프레임" ? ApplyMyFrame(item.id) : ApplyMyFilter(item.id)}>사용하기</button>
            </ListItem>
          })
        }
      </InnerListSection>
    </ModalSection>
  )
}

export default MyFrameModal

const ModalSection = styled.div`
  background-color: white;
  width: 300px;
  height: 320px;
  display: flex;
  flex-direction: column;

  border-radius: 5px;
  box-sizing: border-box;
  padding: 25px;
  z-index: 100;
  box-shadow: 0 0 40px rgba(0,0,0,0.15);
`
const ModalHeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: end;
  justify-content: space-between;
  border-bottom: 2px solid var(--green4);
  color: var(--green4);
  padding-bottom: 5px;
  button {
    padding: 0;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    font-size: 14px;
    line-height: 150%;
    margin-bottom: 10px;
    background-color: var(--green1);
    border: 2px solid var(--green4);
    color: var(--green4);
  }
`
const InnerListSection = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow-y: scroll;
`
const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 15px 15px 0;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 2px solid var(--whiteGray);
  button {
    height: 25px;
    border-radius: 5px;
    background-color: var(--green1);
    border: 1px solid var(--green5);
    color: var(--green5);
    padding: 0 10px;
  }
`
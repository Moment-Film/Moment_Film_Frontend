import React from "react";
import styled from 'styled-components'

import double_left from "../../assets/icons/double_left.svg";
import mono_left from "../../assets/icons/mono_left.svg";
import double_right from "../../assets/icons/double_right.svg";
import mono_right from "../../assets/icons/mono_right.svg";

function PageButtons({pageable, totalPage, handler, thisPage}) {

  const pageCnt = Math.ceil(pageable?.totalElements/6);
  const changePageHandler = (page) => {
    if(page <= pageCnt?pageCnt:totalPage && page > 0)
    handler(page);
  }
  console.log("pageCnt", pageCnt, "totalPage", totalPage)
  return (
      <PageBtnSection>
        <div className="leftWrap">
          <img src={double_left} alt=""  onClick={()=>changePageHandler(1)}/>
          <img
            src={mono_left}
            alt=""
            onClick={()=>changePageHandler(thisPage - 1)}
          />
        </div>
        {Array(pageCnt? pageCnt : totalPage).fill(null).map((_, index) =>{
          return <PageBtn key={index} isSelected={index+1 === thisPage} onClick={()=>changePageHandler(index+1)}> {index + 1} </PageBtn>
        })}
        <div className="rightWrap">
          <img src={mono_right} alt="" onClick={()=>changePageHandler(thisPage + 1)}/>
          <img
            src={double_right}
            alt=""
            onClick={()=>changePageHandler(pageCnt)}
          />
        </div>
      </PageBtnSection>
  );
}

export default PageButtons;

const PageBtnSection = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;

  .leftWrap {
    img {
      cursor: pointer;
    }
  }

  .rightWrap {
    img {
      cursor: pointer;
    }
  }
`;

const PageBtn = styled.div`
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: ${(props) => (props.isSelected ? "var(--green5)" : "none")};
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  color: ${(props) => (props.isSelected ? "var(--white)" : "var(--gray3)")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
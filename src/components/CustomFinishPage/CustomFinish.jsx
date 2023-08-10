import React from "react";
import * as s from "../frameSelectPage/style";

// import KakaoShareBtn from '../common/component/KakaoShareBtn'
import GridNav from "./../frameSelectPage/GridNav";

const CustomFinish = () => {
  return (
    <>
      <s.Wrap>
        <s.Slider>
          <s.OptionWrap>
            <GridNav data={"finish"} />
            <div>
              <div>
                <div>Finish!</div>
              <div>친구들에게 자랑해 보아요! 공유할 시 포인트가 지급됩니다.</div>
              </div>
              <div>
                <div>img</div>
                <div>이미지 다운로드</div>
                <div>
                  <div>게시글 등록</div>
                <div></div>
                </div>
              </div>
            </div>
          </s.OptionWrap>
        </s.Slider>
      </s.Wrap>

      {/* <KakaoShareBtn/> */}
    </>
  );
};

export default CustomFinish;

import React from 'react'
import * as s from './ResultStyle'
import nullImg from "../../assets/images/nullProfile.svg";
import nonResult from "../../assets/images/nonResult.svg";


const NonSearchResult = ({popularData, params, navigate}) => {
  return (
    <>
    <img src={nonResult} alt="" className="nonResult" />
    <div className="resultExist">
      <span>"{params.id}"</span>에 대한 검색 결과를 찾을 수 없습니다.
    </div>
    <s.RecommendSection>
      <div className="recommendMent">이런 크리에이터는 어떠세요?</div>
      <span className="resultLine" />
      <s.NonResultWrap>
        {Array.isArray(popularData) &&
          popularData.length > 0 && (
            <>
              {popularData.slice(0, 4).map((item, index) => {
                return (
                  <s.ProfileWrap
                    width={"270px"}
                    marginRight={"30px"}
                    border={"1px solid var(--gray2)"}
                    backgroundColor={"var(--gray1)"}
                    padding={"40px 0px"}
                  >
                    <div className="ImageSection">
                      <img
                        src={
                          item.profileImage
                            ? item.profileImage
                            : nullImg
                        }
                        alt=""
                        onClick={() => {
                          navigate(`/profile/${item.id}`);
                        }}
                      />
                    </div>
                    <div key={index} className="username">
                      {item.username}
                    </div>

                    <s.InfoBoxWrap>
                      <div className="infobox">
                        <div className="infowrap">
                          <span className="value">팔로워</span>
                          <span className="bar" />
                        </div>
                        <span className="measure">
                          {item.follower > 999
                            ? `${item.follower % 100}K명`
                            : `${item.follower}명`}
                        </span>
                      </div>

                      <div className="infobox">
                        <div className="infowrap">
                          <span className="value">게시글</span>
                          <span className="bar" />
                        </div>
                        <span className="measure">
                          {item.follower > 999
                            ? `${item.postCnt % 100}K개`
                            : `${item.postCnt}개`}
                        </span>
                      </div>
                    </s.InfoBoxWrap>
                  </s.ProfileWrap>
                );
              })}
            </>
          )}
      </s.NonResultWrap>
    </s.RecommendSection>
  </>  )
}

export default NonSearchResult
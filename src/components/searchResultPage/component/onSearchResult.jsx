import React from 'react'
import nullImg from "../../assets/images/nullProfile.svg";
import * as s from "./ResultStyle"
import PageButtons from '../../common/component/PageButtons'


const OnSearchResult = ({ searchData, username, navigate, handler, thisPage}) => {
  
  console.log(searchData)
  return (
    <>
    <div className="resultExist">
      <span>{`"${username}"`}</span>{`에 대한 검색 결과입니다! (${searchData?.totalElements}건)`}
    </div>
    <span className="resultLine" />
    <div>
      {searchData?.content.map((item, index) => {
        return (
          <s.ResultUser>
            <s.ProfileWrap marginRight={"62px"}>
              <div className="ImageSection">
                <img
                  src={item.profileImage ? item.profileImage : nullImg}
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
                      ? `${item.follower % 1000}K명`
                      : `${item.follower}명`}
                  </span>
                </div>

                <div className="infobox">
                  <div className="infowrap">
                    <span className="value">게시글</span>
                    <span className="bar" />
                  </div>
                  <span className="measure">
                    {item.postListCnt > 999
                      ? `${item.postCnt % 1000}K개`
                      : `${item.postCnt}개`}
                  </span>
                </div>
              </s.InfoBoxWrap>
            </s.ProfileWrap>

            {item.postList.length === 0 ? (
              <div className="nullComment">{`아직 작품이 충분하지 않아요 :)`}</div>
            ) : (
              <s.PostWrap>
                {item.postList.map((postItem, postIndex) => (
                  <s.ImgWrap key={postIndex}>
                    <img
                      src={postItem.image}
                      alt=""
                      onClick={() => {
                        navigate(`/post/${postItem.id}`);
                      }}
                    />
                  </s.ImgWrap>
                ))}
                {item.postList.length < 3 &&
                  Array(3 - item.postList.length)
                    .fill()
                    .map((_, index) => (
                      <div key={index} className="semiNull">
                        <div className="nullComment">{`아직 작품이 충분하지 않아요 :)`}</div>
                      </div>
                    ))}
              </s.PostWrap>
            )}
          </s.ResultUser>
        );
      })}
      <PageButtons pageable={searchData.pageableDto} handler={handler} thisPage={thisPage}/>
    </div>
  </>
  )
}

export default OnSearchResult;
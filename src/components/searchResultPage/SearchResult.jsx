import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { searchUser } from "../../api/nonToken/user";
import { styled } from "styled-components";
import character from "../assets/images/character.svg";
import PaginationComponent from "../common/component/PageNation";
import nullImg from "../assets/images/nullProfile.svg";
import { Span28 } from "./../common/styles/StyledSpan";

const SearchReseult = () => {
  const navigate = useNavigate();
  const params = useParams();
  const username = params.id;
  const queryClient = useQueryClient();

  const {
    data: searchUserData,
    isLoading,
    isError,
    error,
  } = useQuery(["searchUser", username], () => searchUser({ username }), {
    staleTime: 0,
  });

  return (
    <ResultWrap>
      <ResultSection>
        {Array.isArray(searchUserData) ? (
          <>
            <div className="resultExist">
              <span>"{params.id}"</span>에 대한 검색 결과입니다!
            </div>
            <span className="resultLine" />
            <div>
              {searchUserData.map((item, index) => {
                return (
                  <ResultUser>
                    <ProfileWrap>
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

                      <InfoBoxWrap>
                        <div className="infobox">
                          <div className="infowrap">
                            <span>팔로워</span>
                            <span className="bar" />
                          </div>
                          <span className="measure">{item.follower > 999 ? `${item.follower % 100}K명` : `${item.follower}명`}</span>
                        </div>

                        <div className="infobox">
                          <div className="infowrap">
                            <span>게시글</span>
                            <span className="bar" />
                          </div>
                          <span className="measure">{item.postListCnt > 999 ? `${item.postListCnt % 100}K개` : `${item.postListCnt}개`}</span>
                        </div>
                      </InfoBoxWrap>
                    </ProfileWrap>

                    <PostWrap>
                      {item.postList.map((item) => {
                        return (
                          <ImgWrap>
                            <img src={item.image} alt="" />
                          </ImgWrap>
                        );
                      })}
                    </PostWrap>
                  </ResultUser>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <img src={character} alt="" />
            <div className="resultExist">
              <span>"{params.id}"</span>에 대한 검색 결과를 찾을 수 없습니다.
            </div>
            <RecommendSection>
              <div className="recommendMent">이런 크리에이터는 어떠세요?</div>
              <span className="resultLine" />
            </RecommendSection>
          </>
        )}
      </ResultSection>
    </ResultWrap>
  );
};

export default SearchReseult;

const ResultWrap = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const ResultSection = styled.section`
  width: 1170px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .resultExist {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    line-height: 150%;
    margin-top: 70px;

    span {
      color: var(--green5);
      background-color: none;
      font-weight: bold;
    }
  }

  /* img {
    width: 150px;
    margin: 30px auto;
  } */

  .resultLine {
    width: 1170px;
    height: 1px;
    background-color: var(--lightGray);
    margin-top: 40px;
    margin-bottom: 60px;
  }
`;

const RecommendSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  .recommendMent {
    margin-top: 70px;
  }
`;

const ResultUser = styled.div`
  width: 970px;
  height: 332px;
  border: 1px solid var(--gray5_a);
  background-color: var(--gray1);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  padding: 40px 70px;
`;

const ProfileWrap = styled.div`
  width: 200px;
  height: 252px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-right: 62px;

  .ImageSection {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: none;
    border-radius: 50%;
    img {
      margin: 0;
      width: 100%;
    }
  }

  .bar {
    width: 1px;
    height: 10px;
    background-color: var(--gray3);
  }
`;

const InfoBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .measure {
    font-size: 20px;
    font-weight: 600;
    line-height: 150%;
    color: var(--green5);
  }

  .infobox {
    width: 200px;
    height: 40px;
    border: none;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 21px;

    .infowrap {
      display: flex;
      align-items: center;
      gap: 20px;
      .bar {
        width: 1px;
        height: 10px;
        background-color: var(--gray3);
        /* margin: 0 52px 0 20px; */
      }
    }
  }
`;

const PostWrap = styled.div`
  display: flex;
  gap: 30px;
`;

const ImgWrap = styled.div`
  width: 168px;
  border: 1px solid var(--gray3);
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  img {
    height: 100%;
    border: none;
    border-radius: 5px;
  }
`;

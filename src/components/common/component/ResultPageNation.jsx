import React, {useState} from 'react'
import { useQuery } from 'react-query'
import { searchUser } from '../../../api/nonToken/user';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import nullImg from '../../assets/images/nullProfile.svg'

function ResultPageNation({username}) {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  
  const {
    data: searchUserData,
    isLoading,
    isError,
    error,
  } = useQuery(["searchUser", username, currentPage], () => searchUser({ username, currentPage }), {
    staleTime: 0,
  });
  
  return (
    <div>
      {searchUserData.map((item, index) => {
        return (
          <ResultUser>
            <ProfileWrap  marginRight={"62px"}>
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
                    {item.postListCnt > 999
                      ? `${item.postListCnt % 100}K개`
                      : `${item.postListCnt}개`}
                  </span>
                </div>
              </InfoBoxWrap>
            </ProfileWrap>

            {item.postList.length === 0 ? (
              <div className="nullComment">{`아직 작품이 충분하지 않아요 :)`}</div>
            ) : (
              <PostWrap>
                {item.postList.map((postItem, postIndex) => (
                  <ImgWrap key={postIndex}>
                    <img
                      src={postItem.image}
                      alt=""
                      onClick={() => {
                        navigate(`/post/${postItem.id}`);
                      }}
                    />
                  </ImgWrap>
                ))}
                {item.postList.length < 3 &&
                  Array(3 - item.postList.length)
                    .fill()
                    .map((_, index) => (
                      <div key={index} className="semiNull">
                        <div className="nullComment">{`아직 작품이 충분하지 않아요 :)`}</div>
                      </div>
                    ))}
              </PostWrap>
            )}
            {}
          </ResultUser>
        );
      })}
    </div>
  )
}

export default ResultPageNation

const ResultWrap = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const ResultSection = styled.section`
  width: 1170px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .nonResult {
  }
  .resultExist {
    display: flex;
    /* flex-direction: column; */
    /* justify-content: center; */
    align-items: center;
    font-size: 28px;
    line-height: 150%;
    margin-top: 30px;

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
    width: 100%;
    height: 1px;
    background-color: var(--lightGray);
    margin-top: 20px;
    margin-bottom: 60px;
  }
`;

const ResultUser = styled.div`
  width: 970px;
  height: 332px;
  border: 1px solid var(--gray2);
  background-color: var(--gray1);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  padding: 40px 70px;

  .nullComment {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
  }
`;

const ProfileWrap = styled.div`
  /* width: 970px; */
  width: ${props => props.width};
  height: 252px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* margin-right: 62px; */
  /* margin-right: ${props => props.marginRight}; */
  border: ${props => props.border};
  background-color: ${props => props.backgroundColor};
  padding: ${props => props.padding};

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

  .username {
    font-size: 24px;
    font-weight: 600;
    line-height: 150%;
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
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 21px;

    .value {
      font-size: 13px;
      font-weight: 150%;
      color: var(--gray5_a);
    }

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
  width: 100%;
  display: flex;
  gap: 30px;

  .semiNull {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
  }
`;

const ImgWrap = styled.div`
  width: 168px;
  border: 1px solid var(--gray2);
  border-radius: 5px;
  background: var(--white);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100%;
    border: none;
    border-radius: 5px;
  }

  .nullComment {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
  }
`;

const RecommendSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 28px;
  font-weight: 400;
  line-height: 150%;

  .recommendMent {
    font-size: 20px;
    font-weight: 400;
    line-height: 150%;
    color: var(--gray5);
    margin-top: 70px;
  }
`;

const NonResultWrap = styled.div`
width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 70px;
  gap: 30px;
`;

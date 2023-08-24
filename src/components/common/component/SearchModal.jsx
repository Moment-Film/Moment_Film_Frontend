import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { popularUser } from "../../../api/nonToken/user";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useToken from "../../../hooks/useToken";
import del from "../../assets/icons/delete.png";

const SearchModal = ({ onClose, username }) => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [isRemove, setIsRemove] = useState(false);

  const navigate = useNavigate();

  const { getAccess } = useToken();
  const token = getAccess();

  const { data: popularUserData } = useQuery("popularUser", () =>
    popularUser()
  );

  useEffect(() => {
    const searches = localStorage.getItem(`${username}`);
    if (searches) {
      setRecentSearches(JSON.parse(searches));
    }
  }, []);

  const removeTermHandler = (e, term) => {
    console.log("Removing term:", term);
    e.stopPropagation();
    const newTerm = recentSearches.filter((item) => item !== term);
    setRecentSearches(newTerm);
    // setIsRemove(true);
  };

  useEffect(() => {
    localStorage.setItem(`${username}`, JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    console.log("Updated recent searches:", recentSearches);
  }, [recentSearches]);

  return (
    <ModalBg onClick={onClose}>
      <ModalWrap>
        <RecommendSection>
          <SectionTitle>
            <section>인기 크리에이터 보기</section>
            <div>실시간</div>
          </SectionTitle>

          {popularUserData &&
            popularUserData.slice(0, 5).map((item, index) => {
              return (
                <RecommendItem>
                  <div className="popularWrap">
                    {index < 3 ? (
                      <div className="grade">{index + 1}위</div>
                    ) : (
                      <div>{index + 1}위</div>
                    )}
                    <div
                      onClick={() => {
                        navigate(`/profile/${item.id}`);
                      }}
                      className="userName"
                    >
                      {/* {index < 2 || item.username === "zlzonKing" ? "👑" : ""} */}
                      {item.username}
                    </div>
                  </div>
                  <div className="followerWrap">
                    <div className="followerText">팔로워</div>
                    <div className="followerCount">{item.follower}명</div>
                  </div>
                </RecommendItem>
              );
            })}
        </RecommendSection>
        <RecentSection>
          <SectionTitle marginBottom="20px">최근 검색어</SectionTitle>
          {token ? (
            <>
              {recentSearches.slice(0, 5).map((term) => (
                <RecentTerm key={term}>
                  <TermBox
                    onClick={() => {
                      navigate(`/search/reseult/${term}`);
                    }}
                  >
                    {term.length > 9 ? `${term.slice(0, 8)}...` : term}
                  </TermBox>
                  <img
                    src={del}
                    alt=""
                    onClick={(e) => removeTermHandler(e, term)}
                  />
                </RecentTerm>
              ))}
            </>
          ) : (
            <div className="resultNull">로그인이 필요합니다.</div>
          )}
        </RecentSection>
      </ModalWrap>
    </ModalBg>
  );
};

export default SearchModal;

const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 50;
  top: 85px;
  left: 0px;
`;

const ModalWrap = styled.div`
  width: 100vw;
  height: 50vh;
  background-color: var(--white);
  /* border-bottom: 1px solid var(--gray3); */
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 130px;
  position: fixed;
  z-index: 50;
  top: 85px;
  left: 0px;
`;

const RecommendSection = styled.section`
  width: 570px;
  min-height: 322px;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.div`
  width: 100%;
  height: 42px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--green4);
  margin-bottom: ${(props) => props.marginBottom};

  section {
    width: 150px;
    font-size: 18px;
    line-height: 150%;
    font-weight: 500;
  }

  div {
    font-size: 12px;
    font-weight: 600;
    line-height: 150%;
    color: var(--gray4);
    border: 1px solid var(--gray3);
    border-radius: 20px;
    box-sizing: border-box;
    padding: 5px 10px;
  }
`;

const RecommendItem = styled.div`
  height: 54px;
  border-bottom: 1px solid var(--green4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 10px;

  .popularWrap {
    display: flex;
    gap: 20px;

    div {
      color: var(--green5);
      font-weight: 600;
    }

    .grade {
      color: var(--warningRed);
    }

    .userName {
      color: var(--gray5_a);
      font-weight: 500;
    }
  }

  .followerWrap {
    width: 120px;
    display: flex;
    justify-content: space-between;

    .followerText {
      color: var(--gray4);
      font-size: 14px;
      font-weight: 300;
    }

    .followerCount {
      line-height: 28px;
      color: var(--green5);
      font-size: 16px;
    }
  }
`;

const RecentSection = styled.section`
  width: 170px;
  min-height: 322px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .resultNull {
    margin-top: 18px;
    color: var(--gray3);
    font-size: 16px;
    font-weight: 400;
    line-height: 150%;
  }
`;

const RecentTerm = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--green5);
  border-radius: 30px;
  padding: 5px 10px;
  margin-bottom: 20px;

  img {
    width: 10px;
  }
`;

const TermBox = styled.div`
  max-width: 160px;
  color: var(--green5);
  font-size: 16px;
  font-weight: 400;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 5px;
  display: block;
`;

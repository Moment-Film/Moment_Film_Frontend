import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { popularUser } from "../../../api/nonToken/user";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useToken from "../../../hooks/useToken";

const SearchModal = ({ onClose }) => {
  const [recentSearches, setRecentSearches] = useState([]);

  const navigate = useNavigate();

  const {getAccess} = useToken();
  const token = getAccess();

  const { data: popularUserData } = useQuery("popularUser", () =>
    popularUser()
  );

  useEffect(() => {
    const searches = localStorage.getItem("recentSearches");
    if (searches) {
      setRecentSearches(JSON.parse(searches));
    }
  }, []);

  return (
    <ModalBg onClick={onClose}>
      <ModalWrap>
        <RecommendSection>
          {popularUserData &&
            popularUserData.map((item, index) => {
              return (
                <RecommendItem>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <span>{index + 1}위</span>
                    <div
                      onClick={() => {
                        navigate(`/profile/${item.id}`);
                      }}
                    >
                      {index < 2 || item.username === "zlzonKing" ? "👑" : ""}
                      {item.username}
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ lineHeight: "28px" }}>
                      팔로워 {item.follower}명
                    </div>
                    {/* <div>
                        <img src={upperArr} alt="" />
                      </div> */}
                  </div>
                </RecommendItem>
              );
            })}
        </RecommendSection>
        {token && <RecentSection>
          <h3>최근 검색어</h3>
          {recentSearches.map((term) => (
            <div key={term}>{term}</div>
          ))}
        </RecentSection>}
      </ModalWrap>
    </ModalBg>
  );
};

export default SearchModal;

const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 50;
  top: 80px;
  left: 0px;
`;

const ModalWrap = styled.div`
  width: 100vw;
  height: 50vh;
  background-color: var(--white);
  box-shadow: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 50;
  top: 80px;
  left: 0px;
`;
const RecommendSection = styled.section`
  border: 1px solid;
  width: 570px;
  display: flex;
  flex-direction: column;
`;

const RecommendItem = styled.div`
display: flex;
`;

const RecentSection = styled.section`
  border: 1px solid;
`;

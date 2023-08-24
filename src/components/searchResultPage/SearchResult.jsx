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
            <ResultMap>
              {searchUserData.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      navigate(`/profile/${item.id}`);
                    }}
                  >
                    {item.username}
                  </div>
                );
              })}
            </ResultMap>
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

const ResultMap = styled.section``;

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

  .resultExist {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    line-height: 150%;

    span {
      color: var(--green5);
      background-color: none;
      font-weight: bold;
    }
  }

  img {
    width: 150px;
    margin: 30px auto;
  }

  .resultLine {
    width: 1170px;
    height: 1px;
    background-color: var(--lightGray);
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

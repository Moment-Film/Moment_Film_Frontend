import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { searchUser } from "../../api/nonToken/user";
import { styled } from "styled-components";
import { axios } from "axios";

function SearchReseult() {
  const params = useParams();
  const username = params.id;
  const queryClient = useQueryClient();

  const {
    data: searchUserData,
    isLoading,
    isError,
    error,
  } = useQuery("searchUser", () => searchUser({ username }));

  const searchUserMutation = useMutation(searchUser, {
    onSuccess: (response) => {
      console.log(response);
      {
        queryClient.invalidateQueries(`searchUser`);
      }
    },
    onError: (error) => {
      alert("에러");
    },
  });

  useEffect(() => {
    searchUserMutation.mutate({ username });
  }, []);

  return (
    <ResultWrap>
      <ResultSection>
        {Array.isArray(searchUserData) ? (
          <>
            <ResultComment>
              <div>
                <span>"{params.id}"</span>에 대한 검색 결과입니다!
              </div>
            </ResultComment>
            <hr />
            <ResultMap>
              {searchUserData.map((item, index) => {
                return <div key={index}>{item.username}</div>;
              })}
            </ResultMap>
          </>
        ) : (
          <>"{params.id}"에 대한 검색 결과를 찾을 수 없습니다.</>
        )}
      </ResultSection>
    </ResultWrap>
  );
}

export default SearchReseult;

const ResultWrap = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
`;

const ResultSection = styled.section`
  width: 1170px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */

  hr {
    width: 100%;
  }
`;

const ResultComment = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 28px;
  line-height: 130%;
  div {
    span {
      color: var(--green5);
      font-weight: bold;
    }
  }
`;

const ResultMap = styled.section``;

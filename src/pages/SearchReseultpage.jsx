import React from "react";
import InfiniteScroll from "../components/common/component/InfinityScroll";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { searchUser } from "../api/searchUser";

function SearchReseultpage() {
  const params = useParams();
  const username = params.id;
  const {
    data: searchUserData,
    isLoading,
    isError,
    error,
  } = useQuery(["searchUser", username], () => searchUser({ username }));

  return (
    <>
      <div>
        {searchUserData === "해당하는 사용자가 없습니다." ? (
          <>"{params.id}"에 대한 검색 결과를 찾을 수 없습니다.</>
        ) : (
          <>
            "{params.id}"과 관련된 검색 결과입니다!
            <>
              {searchUserData.map((item, index) => {
                return <div key={index}>{item.username}</div>;
              })}
            </>
          </>
        )}
      </div>
      <InfiniteScroll />
    </>
  );
}

export default SearchReseultpage;

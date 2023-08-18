import React from "react";
import InfiniteScroll from "../components/common/component/InfinityScroll";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { searchUser } from "../api/searchUser";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";

function SearchReseultpage() {
  
  const params = useParams();
  const username = params.id;
  const queryClient=useQueryClient();

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


  useEffect(()=>{
    searchUserMutation.mutate({ username });
  },[])
    

  return (
    <>
      <div>
        {Array.isArray(searchUserData) ? (
          <>
            "{params.id}"과 관련된 검색 결과입니다!
            {searchUserData.map((item, index) => {
              return <div key={index}>{item.username}</div>;
            })}
          </>
        ) : (
          <>"{params.id}"에 대한 검색 결과를 찾을 수 없습니다.</>
        )}
      </div>
      <InfiniteScroll />
    </>
  );
}

export default SearchReseultpage;

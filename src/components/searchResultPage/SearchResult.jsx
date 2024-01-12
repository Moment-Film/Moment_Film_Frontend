import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import { popularUser, searchUser } from "../../api/nonToken/user";
import * as a from "./component/ResultStyle";
import NonSearchResult from "./component/NonSearchResult";
import OnSearchResult from "./component/onSearchResult";

const SearchReseult = () => {
  const [currentPage, setCurrentpage] = useState(1);
  const navigate = useNavigate();
  const params = useParams();
  const username = params.id;

  const { data: searchUserData ,isLoading, isError } = useQuery(
    ["searchUser", username, currentPage],
    () => searchUser({ username, currentPage }),
    {
      staleTime: 0,
    }
  );

  const { data: popularUserData } = useQuery("popularUser", () =>
    popularUser()
  );
  const changePageHandler = (page) => {
    setCurrentpage(page);
  };

  if(isLoading){
    return <div>로딩중 ... </div>
  }

  if(isError){
    return <div>에러! ... </div>
  }

  return (
    <a.ResultWrap>
      <a.ResultSection>
        {Array.isArray(searchUserData?.content) &&
        searchUserData?.content.length > 0 ? (
          <OnSearchResult
            searchData={searchUserData}
            username={username}
            navigate={navigate}
            handler={changePageHandler}
            thisPage={currentPage}
          />
        ) : (
          <NonSearchResult
            popularData={popularUserData}
            params={params}
            navigate={navigate}
          />
        )}
      </a.ResultSection>
    </a.ResultWrap>
  );
};

export default SearchReseult;

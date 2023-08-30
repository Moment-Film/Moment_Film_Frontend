import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { popularUser, searchUser } from "../../api/nonToken/user";
import PaginationComponent from "../common/component/PageNation";
//import PageButtons from "../common/component/PageButtons";
// import ResultPageNation from "../common/component/ResultPageNation";
import * as a from "./component/ResultStyle";
import NonSearchResult from "./component/NonSearchResult";
import OnSearchResult from './component/OnSearchResult';

const SearchReseult = () => {
  const [currentPage, setCurrentpage] = useState(1);
  const navigate = useNavigate();
  const params = useParams();
  const username = params.id;
  const queryClient = useQueryClient();

  const {
    data: searchUserData,
    isLoading,
    isError,
    error,
  } = useQuery(
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
  }

  return (
    <a.ResultWrap>
      <a.ResultSection>
        {Array.isArray(searchUserData?.content) && searchUserData?.content.length > 0 ? (
          <OnSearchResult searchData={searchUserData} username={username} navigate={navigate} handler={changePageHandler} thisPage={currentPage}/>
        ) : (
          <NonSearchResult popularData={popularUserData} params={params} navigate={navigate} />
        )}
      </a.ResultSection>
      {/* <PageButtons totalCnt={searchUserData?.totalElements || 15} curruntPage={currentPage}/> */}
      {/* <PaginationComponent data={searchUserData} category={"result"} ItemNums={6} /> */}
    </a.ResultWrap>
  );
};

export default SearchReseult;
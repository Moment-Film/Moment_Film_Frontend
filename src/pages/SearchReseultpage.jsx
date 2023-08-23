import React from "react";
import InfiniteScroll from "../components/common/component/InfinityScroll";
import SearchReseult from "../components/searchResultPage/SearchResult";

function SearchReseultpage() {
// 어떤 내용에 무한스크롤을 적용할지 props를 내려 줄 것
  return (
    <>
      <SearchReseult />
      <InfiniteScroll /> 
    </>
  );
}

export default SearchReseultpage;

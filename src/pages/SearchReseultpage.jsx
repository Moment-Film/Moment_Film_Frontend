import React from "react";
import { useLocation } from "react-router";
import InfiniteScroll from "../components/common/component/InfinityScroll";
import { useParams } from "react-router-dom";

function SearchReseultpage() {
  const params = useParams();
  const location = useLocation();
  const receivedData = location.state ? location.state.searchData : null;

  if (!receivedData) {
    return <div>불가능한 접근입니다.</div>;
  }
  console.log(params)

  return (
    <>
    <div>
      {`"${params.id}"과 관련된 검색 결과입니다!`}
    </div>
      <InfiniteScroll />
    </>
  );
}

export default SearchReseultpage;
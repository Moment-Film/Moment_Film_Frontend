import { React, useEffect, useState } from 'react'
import InfiniteScroll from '../common/component/InfinityScroll'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import mini_flower from '../assets/icons/mini_flower.svg'
import bannerImg from '../assets/images/banner.svg'
function Post() {
  const a=[1,2,3,4];
  const params = useParams();
  const navigate=useNavigate();
  console.log(params.id);
  const [sort,setSort]=useState('');


  useEffect(()=>{
    if(params.id==='view' || params.id==='likes' ||params.id==='recent') setSort(params.id);
    else alert("없는페이지로 보내자 ")
  },[params.id])



/*   const [pageNum, setPageNum] = useState(0);
  //정렬값에 맞는 포스트를 가져올 리엑트 쿼리 
  const { isLoading, isError, data, isSuccess } = useQuery(`post${params.id}${pageNum}`, () => getAllPosts({sort}));
  console.log(data); */

  useEffect(() => {
    // setGetPosts(getAllPosts());
  }, [])
  
  const Card = ({ item }) => {
    return (
      <ContentsItem>
        <StyledLink>
          <Img src={'https://pbs.twimg.com/media/Fi3MBQvaMAAMymZ.jpg'}></Img>
        </StyledLink>
        <ItemInfo>
          <OptionCount>
            <div>b {'123'}</div>
            <div>C {'123'}</div>
          </OptionCount>
          <div>● 유저이름</div>
        </ItemInfo>
      </ContentsItem>
    )
  }

  return (
    <>
      <PostPage>
        <PostHeaderSection>
            <img src={bannerImg} alt="" />
        </PostHeaderSection>
        <PostNav>
          <div className='postTitle'>Post Page <img src={mini_flower}/></div>
          <SortItem>
            <div>
              정렬방식
            </div>
            <div onClick={()=>navigate('/postlist/recent')}>
              최신순
            </div>
            <div onClick={()=>navigate("/postlist/likes")}>
              인기순
            </div>
            <div onClick={()=>navigate("/postlist/view")}>
              조회순
            </div>
          </SortItem>
        </PostNav>

        <PostWrapper>
          <InfiniteScroll sort={sort}/>
        </PostWrapper>

      </PostPage>
    </>
  )
}

export default Post

const PostPage = styled.div`
  display:flex;
  gap:50px;
  align-items:center;
  flex-direction:column;
`

const PostHeaderSection = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  background-color:var(--gray1);
  
  img{
    width:100%;
    height:100%;
    object-fit:cover;
  }
`

const StyledLink = styled(Link)`
text-decoration:none;
    
`

const ContentsItem = styled.div`
  width:100%;

  background-color:var(--white);

  border-top-right-radius:5px;
  border-top-left-radius:5px;
  box-shadow: 0px 0px 40px -5px rgba(0, 0, 0, 0.3);
`
const Img = styled.img`
    width:100%;
   height:210px;
   border-top-right-radius:5px;
  border-top-left-radius:5px;
`

const ItemInfo = styled.div`
    display:flex;
    flex-direction:column;
    padding:0 10px 0 10px;
    
`

const PostWrapper = styled.div`
    display:flex;
    justify-content:center;
    width:90%;
    max-width:1170px;

`

const PostNav = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    gap:30px;
    width:90%;
    max-width:1170px;
    border-bottom:1px solid var(--black);


    .postTitle{
      margin:auto;
      font-size:28px;
      font-weight:bold;
    }

    div{
      cursor:pointer;
    }
    

`

const SortItem = styled.div`
    display:flex;
    margin-left:auto;
    gap:22px;
    padding-bottom:10px;
    height:17px;

`

const OptionCount = styled.div`
    display:flex;
    gap:5px;
    font-size:12px;
    font-weight:normal;
    margin-left:auto;

`


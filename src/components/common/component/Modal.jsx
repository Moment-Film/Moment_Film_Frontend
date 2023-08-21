import searchIcon from '../../assets/icons/searchIcon.svg'
import { FollowAPI } from '../../../api/withToken/user';
import * as S from './modalStyle'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import useUserAPI from '../../../api/withToken/user';

export const Modal = ({onClose, onToggle, data, title, id, me}) => {
    const{
        FollowAPI
    }=useUserAPI();

    const navigate = useNavigate();
    const [isSearch, setIsSearch] = useState(false);
    const [thisData, setThisData] = useState(data);
    const [searchWord, setSearchWord] = useState("");
    
    const {
        getAccess,
        getRefresh
      }=useToken();
    
    const refreshToken = getRefresh();
    const accessToken = getAccess();
    const deleteFollower = (id) => {
        FollowAPI(id);
    }
    useEffect(()=>{
        setThisData(data);
    },[title, data])
    useEffect(()=>{
        if(searchWord.length>0) {
            setIsSearch(true);
            setThisData(thisData.filter((item)=>item.username.includes(searchWord)));
        }
        else{
            setIsSearch(false);
            setThisData(data);
        }
    },[searchWord])
    return (
        <div>
            <S.Modalsection >
                <S.Contents>
                    <S.ContentHeader data={title}>
                        <S.HeaderTitle onClick={onToggle} $type={title==="followerList"}>팔로우</S.HeaderTitle>
                        <S.HeaderTitle onClick={onToggle} $type={title==="followingList"}>팔로잉</S.HeaderTitle>
                    </S.ContentHeader>
                    <S.SearchSection>
                        <input type="text" placeholder="검색" 
                            value={searchWord} onChange={(e)=>setSearchWord(e.target.value)} />
                        {isSearch ? <button onClick={()=>{
                            setIsSearch(false);
                            setSearchWord("");
                        }}>X</button>
                        :<img src={searchIcon} alt=""/>}
                    </S.SearchSection>
                    <S.ListHeader>
                        <span>모든 {title==="followerList" ? "팔로우" : "팔로잉" }</span>
                        <span>{data.length} 명</span>

                    </S.ListHeader>
                    <S.ListSection>
                        {thisData.length > 0 && thisData.map((follow)=>{
                            return (
                            <S.FollowListItem key={follow.id}>
                                <div onClick={()=>{
                                    navigate(`/profile/${follow.id}`)
                                    onClose()}}>
                                    <img src={null} alt=""/>
                                    <span>{follow.username}</span>
                                </div>
                                <div>
                                    {title==="followingList" && me===id &&
                                    <button onClick={()=>deleteFollower(follow.id)}>
                                        언팔로우
                                    </button>
                                    }
                                </div>
                            </S.FollowListItem>
                        )})}
                        {thisData.length===0 &&
                        <div>{isSearch ? "검색 결과가" : title==="followerList" ? "팔로워가" : "팔로잉 중인 사람이"} 없습니다.</div>}</S.ListSection>
                </S.Contents>
            </S.Modalsection>
            <S.OutLayer onClick={onClose}/>
        </div>
    )
}
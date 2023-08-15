import searchIcon from '../../assets/icons/searchIcon.svg'
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { FolllowAPI } from "../../../api/snsUser";
import * as S from './modalStyle'

export const Modal = ({onClose, onToggle, data, title}) => {
    const access = useSelector((state)=>state.AccessToken.accessToken);
    const [cookie] = useCookies(['refresh']);
    const deleteFollower = (id) => {
        FolllowAPI(id,access,cookie);
    }
    return (
        <div>
            <S.Modalsection >
                <S.Contents>
                    <S.ContentHeader data={title}>
                        <S.HeaderTitle onClick={onToggle} $type={title==="followerList"}>팔로우</S.HeaderTitle>
                        <S.HeaderTitle onClick={onToggle} $type={title==="followingList"}>팔로잉</S.HeaderTitle>
                    </S.ContentHeader>
                    <S.SearchSection>
                        <input type="text" placeholder="검색" />
                        <img src={searchIcon} alt=""/>
                    </S.SearchSection>
                    <S.ListHeader>
                        <span>모든 {title==="followerList" ? "팔로우" : "팔로잉" }</span>
                        <span>{data.length} 명</span>

                    </S.ListHeader>
                    <S.ListSection>
                        {data.length > 0 && data.map((follow)=>{
                            return (
                            <S.FollowListItem key={follow.id}>
                                <div>
                                    <img src={null} alt=""/>
                                    <span>{follow.username}</span>
                                </div>
                                <div>
                                    {title==="followingList" &&
                                    <button onClick={()=>deleteFollower(follow.id)}>
                                        언팔로우
                                    </button>
                                    }
                                </div>
                            </S.FollowListItem>
                        )})}
                        {data.length===0 &&
                        <div>{title==="followerList" ? "팔로워가" : "팔로잉 중인 사람이" } 없습니다.</div>}</S.ListSection>
                </S.Contents>
            </S.Modalsection>
            <S.OutLayer onClick={onClose}/>
        </div>
    )
}
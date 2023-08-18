import styled from "styled-components"

export const Modalsection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position:fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    border-radius: 5px;
    box-sizing: border-box;

    padding: 23px;
    background-color: white;
    z-index: 51;
    width: 400px;
    height: 400px;

   // overflow:scroll;
`
export const Contents = styled.div`
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`
export const ContentHeader = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 43px;
    margin-bottom: 19px;
`
export const HeaderTitle = styled.div`
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    color: var(--green5);
    cursor: pointer;
    width: 50%;
    border-bottom: ${props => props.$type ? '2px solid var(--green5)' : 'none'} ;
`
export const SearchSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 48px;
    background-color: var(--green1);
    border-radius: 5px 5px 0 0;
    border-bottom: 2px solid var(--green4);
    padding: 15px;
    box-sizing: border-box;
    margin-bottom: 23px;

    input {
        font-family: 'Pretendard-Regular';
        background: none;
        border: none;
        outline: none;
        width: 80%;
        font-size: 16px;
        color: var(--green5);
        &::placeholder {
            font-family: 'Pretendard-Regular';
            color: var(--green5);
        }
    }
`
export const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 18px;
    line-height: 18px;
    font-size: 15px;
    color: var(--green5);
    padding-bottom: 5px;
    border-bottom: 2px solid var(--green4);
`
export const ListSection = styled.div`
    width: 100%;
    height: 185px;
    overflow-y: scroll;
    padding-top: 10px;
`
export const FollowListItem = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 61px;
    border-bottom: 1px solid var(--whiteGray);
    justify-content: space-between;

    div {
        display: flex;
        align-items: center;
        cursor: pointer;
        
        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: var(--lightGray);
            margin-right: 15px;
        }
        button{
            height: 25px;
            border-radius: 5px;
            background-color: var(--green1);
            border: 1px solid var(--green5);
            color: var(--green5);
            margin-right: 20px;
            padding: 0 10px;
        }
    }   
`
export const BtnContainer = styled.div`
    display:flex;
    justify-content:right;
`
export const OutLayer = styled.div`

    position:fixed;
    /* border: 1px solid red; */
    height: 100vh;
    width: 100vw;
    top:0;
    background-color: rgba(0,0,0,0.05);
    z-index: 50;
`
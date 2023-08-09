import styled from "styled-components";

export const Modal = ({state}) => {
    return (
        <div>
            <OutLayer state={state} ></OutLayer>
            <Modalsection state={state}>
                <Contents>
                    <span>
                        모달인데 
                    </span>
                    <BtnContainer>
                        <button   >닫기</button>
                        <button>확인</button>
                    </BtnContainer>
                </Contents>
            </Modalsection>
        </div>
    )
}

const Modalsection = styled.div`
    display:${props => props.state ? 'block' : 'none'};
    position:fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    border-radius: 12px;
    box-sizing: border-box;

    padding: 24px;
    background-color: rgb(200, 200, 200);

    width: 500px;
    height: 300px;
    z-index:${props => props.state ? 1 : -1};
`

const Contents = styled.div`
    display:flex;
    flex-direction:column;
    height: 100%;
    justify-content:space-between;
`
const BtnContainer = styled.div`
    display:flex;
    justify-content:right;
`
const OutLayer = styled.div`
display:none;
    position:fixed;
    /* border: 1px solid red; */
    height: 100vh;
    width: 100vw;
    z-index:${props => props.state ? 1 : -1};
    margin-top:-60px;
    background-color:gray;
`
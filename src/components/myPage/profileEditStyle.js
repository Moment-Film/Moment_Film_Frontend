import styled from "styled-components";

const ProfileSection = styled.div`
  margin: 20px auto;
  width: 50%;
  padding: 30px;
  display: flex;
  border: 1px solid;
  justify-content: space-between;
`
const ProfilePic = styled.div`
  display: flex;
  flex-direction: column;
  img{
    max-width: 50%;
    max-height: 100%;
    border: 1px solid;
  }
`
const Infos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
  border: 1px solid red;
  section{
    width: 100%;
    height: 25px;
    display: flex;
    align-items: center;
    div{
      display: flex;
      width: 20%;
      justify-content: space-between;
      margin-right: 10px;
    }
  }
`

export {
  ProfileSection,
  ProfilePic,
  Infos,
}
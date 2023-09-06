import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FooterLogo from "../components/assets/images/FooterLogo.svg";

function Footer() {
  const navigate = useNavigate();

  const URLs = {
    GITHUB: "https://github.com/Moment-Film",
    DISCORD: "https://discord.link.example", 
    EMAIL: "mailto:momentfilm7@naver.com", 
    INSTAGRAM: "https://instagram.link.example", 
  };

  const redirectTo = (url) => {
    window.location.href = url;
  };

  return (
    <FooterBox>
      <ContentsWrap>
        <section className="align">
          <div>CONTACT</div>
          <div>
            <span />
          </div>
          <div onClick={() => alert("준비 중인 기능입니다.")}>Discord</div>
          <div onClick={() => redirectTo(URLs.EMAIL)}>E-mail</div>
          <div onClick={() => alert("준비 중인 기능입니다.")}>Instagram</div>
        </section>

        <FooterTitle onClick={() => navigate(`/`)}>
          <img src={FooterLogo} alt="" />
        </FooterTitle>

        <section className="align">
          <div onClick={() => redirectTo(URLs.GITHUB)}>@GitHub</div>
          <div>Team. Broccoli 🥦</div>
        </section>
      </ContentsWrap>
    </FooterBox>
  );
}

export default Footer;
const FooterBox = styled.footer`
overflow:hidden;
  height: 65px;
  width: 100%;
  background-color: var(--gray1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--lightGray);
`;

const ContentsWrap = styled.div`
  width: 1170px;
  display: flex;
  justify-content: space-between;

  .align {
    width: 28%;
    display: flex;
    gap: 25px;

    div {
      font-size: 14px;
      font-weight: 400;
      line-height: 150%;
      color: var(--gray4);
      cursor: pointer;
      display: flex;
      align-items: center;

      span {
        display: block;
        width: 1px;
        height: 10px;
        background-color: var(--gray3);
      }
    }
  }
`;

const FooterTitle = styled.section`
  @media (max-width: 700px) {
    padding: 0;
  }
`;

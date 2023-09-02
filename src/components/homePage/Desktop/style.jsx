const PageSection = styled.div`
  min-width: 1024px;
  max-width:1920px;
  height: 1020px;
  display:flex;
  justify-content:center;

  background-image: ${(props) => `url(${props.background})`};

  background-repeat: no-repeat;
  background-position: bottom;

`;

const PageWrap = styled.div`
  max-width: 1024px;
  display:flex;
  justify-content:center;
`;

const ContentBox = styled.div`
  display: flex;

  width: 1024px;
  padding-top: 93px;
`;

const LeftBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  .title {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 35px;
  }

  .titleWrap {
    display: flex;
    flex-direction: column;
  }
  .middleSpan {
    font-size: 36px;
    line-height: 150%;
    font-family: "Abril Fatface", cursive;
  }

  .bigSpan {
    font-size: 52px;
    line-height: 150%;
    font-family: "Abril Fatface", cursive;
  }

  .smallSpan {
    font-size: 16px;
    line-height: 150%;
    margin: 0;
  }

  .subTitleSpan {
    font-size: 20px;
    line-height: 150%;
    font-weight: 600;
  }

  .starImg {
    left: 93%;
    position: absolute;
  }

  .smallstar {
    margin-left: -30px;
    width: 40px;
    height: 40px;
  }

  .bigstar {
    width: 56px;
    height: 56px;
  }

  .mainBox {
    width: 370px;
    height: 443px;
    border: 1px solid var(--black);
    border-radius: 5px;
    box-sizing: border-box;
    z-index:10;
    background-color:var(--white);
  }

  .boxTitleBox {
    display: flex;
    height: 66px;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid black;
  }

  .ment {
    font-size: 18px;
    font-weight: bold;
  }

  .boxContent {
    display: flex;
    flex-direction: column;

    gap: 20px;
    height: 236px;
    padding: 20px 30px 40px 30px;
  }

  .buttonWrap {
    display: flex;
    justify-content: center;
  }
  
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1vw);
  }
`;

const OtherImageWrap = styled.div`

  .obj {
    width: auto;
    position:absolute;
    left:0;
    z-index: -1;
  }

  .girl {
    margin-top:150px;
    width: auto;
    z-index: 4;
    cursor: pointer;

    &:hover {
      fill: var(--warningRed);
      animation: ${bounce} 0.6s;
    }
  }
`;

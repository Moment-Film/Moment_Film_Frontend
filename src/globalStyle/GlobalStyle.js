import { createGlobalStyle } from "styled-components";

const Globalstyles = createGlobalStyle`

* {
	font-family: "Pretendard Variable";
}
@font-face {
  font-family: "Pretendard Variable";
  src:url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable.css") format("opentype");
}

body{
    --black: #333333;
    --lightGray: #D9D9D9;
		--whiteGray: #f5f5f5;
		
    --warningRed: #FC5B70;
    --lightGreen: #C2F87E;
}



`;

export default Globalstyles


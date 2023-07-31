import axios from "axios";

export const socialLogin = async ({credential,social}) => {
    // 아직 주소 안정해짐 

    console.log(credential,social)
    const response = await axios.post(`/api/user/signup/${social}`,{
        headers:
        {
            Authorization: credential
        }
    });
  //성공이면 로그인 화면 or 홈화면을 보내버리자
/*     if(response.data.success){
      return await socialLogin({credential})
    }
    else
      return response; */
}



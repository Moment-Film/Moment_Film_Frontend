import ourAxios from "./ourAxios";

export const myPage = async ({userId}) => {
  try {
    const res = await ourAxios.get(`/api/user/${userId}/mypage`)
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("myPage api error", error);
    throw error;
  }
}
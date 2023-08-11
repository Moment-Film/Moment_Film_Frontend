import ourAxios from "./ourAxios";

export const myPage = async ({userId, actoken}) => {
  try {
    const res = await ourAxios.get(`/api/user/profile/${userId}`)
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("myPage api error", error);
    throw error;
  }
}
import ourAxios from "./ourAxios";

export const searchUser = async ({username}) => {
  try {
    const res = await ourAxios.get(`/api/user/search?userKeyword=${username}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log("searchUser api error", error.response.data.msg);
    return error.response.data.msg;
  }
};
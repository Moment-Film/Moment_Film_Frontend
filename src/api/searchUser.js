import ourAxios from "./ourAxios";

export const searchUser = async ({username}) => {
  try {
    const res = await ourAxios.get(`/api/user/search?userKeyword=${username}`);
    console.log(username);
    return res.data;
  } catch (error) {
    console.error("searchUser api error", error);
    throw error;
  }
};
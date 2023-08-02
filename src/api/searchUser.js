import ourAxios from "./ourAxios";

export const searchUser = async ({username}) => {
  try {
    const res = await ourAxios.get('/api/search-user', {
      username,
    })
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("searchUser api error", error);
        throw error;
  }
}
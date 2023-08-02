import ourAxios from "./ourAxios";

export const recommendUser = async () => {
  try {
    const res = await ourAxios.get('/api/recommend-user')
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("searchUser api error", error);
    throw error;
  }
}
import ourAxios from "./ourAxios";

export const popularUser = async () => {
  try {
    const res = await ourAxios.get('/api/user/popular')
    return res.data.data;
  } catch (error) {
    console.error("popularUser api error", error);
    throw error;
  }
}
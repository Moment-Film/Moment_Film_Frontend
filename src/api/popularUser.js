import ourAxios from "./ourAxios";

export const popularUser = async ({actoken}) => {
  try {
    const res = await ourAxios.get('/api/user/popular',{
      headers: {
        Authorization: `Bearer ${actoken}`,
      },
    })
    console.log(res.data.body);
    return res.data.body;
  } catch (error) {
    console.error("popularUser api error", error);
    throw error;
  }
}
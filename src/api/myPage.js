import axios from "axios";

export const getProfile = async ({userId}) => {
  console.log(userId)
  try {
    const res = await axios.get(`/api/user/profile/3`)
    console.log(res);

    return res;

  } catch (error) {
    console.error("myPage api error", error);
    throw error;
  }
}
import axios from "axios";

export const getProfile = async (userId) => {
  console.log(userId);

    const res = await axios.get(`/api/user/profile/${userId}`)

    console.log(res);

    return res.data.data;

}
import axios from "axios";
import ourAxios from "./ourAxios";

export const searchUser = async ({username}) => {
  try {

    const res = await axios.get(`/api/user/search?userKeyword=${username}`);
    console.log(res.data.data);

    return res.data.data;

  } catch (error) {
    console.log("searchUser api error", error.response.data.msg);
    return error.response.data.msg;
  }
};
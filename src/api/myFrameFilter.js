import axios from "axios";

export const getMyFrame = async({accessToken, refreshToken}) => {
  try {
    const response = await axios.get(`/api/frame`,{
      headers : {
        accessToken : accessToken,
        refreshToken : refreshToken
      }
    });
    return response;
  } catch (error) {
    return error;
  }
}
export const getMyFilter = async({accessToken, refreshToken}) => {
  try {
    const response = await axios.get(`/api/filter`,{
      headers : {
        accessToken : accessToken,
        refreshToken : refreshToken
      }
    });
    return response;
  } catch (error) {
    return error;
  }
}
export const applyFrame = async({frameId, accessToken, refreshToken}) => {
  try {
    const response = await axios.post(`/api/frame/${frameId}`,null,{
      headers : {
        accessToken : accessToken,
        refreshToken : refreshToken
      }
    })
    return response.data.data;
  } catch (error) {
    console.log("error", error.response.data);
  }
}
export const applyFilter = async({filterId, accessToken, refreshToken}) => {
  try {
    const response = await axios.post(`/api/filter/${filterId}`,null,{
      headers : {
        accessToken : accessToken,
        refreshToken : refreshToken
      }
    })
    return response.data.data;
  } catch (error) {
    console.log("error", error.response.data);
  }
}
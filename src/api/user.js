import axios from './ourAxios';

export const register = async (userName, passWord, email, phoneNum) => {
    try {
        const res = await axios.post("api/users/signup", {
            userName,
            email,
            passWord,
            phoneNum,
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.error("resitster api error", error);
        throw error;
    }
};
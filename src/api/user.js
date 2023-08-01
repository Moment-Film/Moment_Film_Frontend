import ourAxios from './ourAxios';
// import axios from "axios";

export const register = async ({username, password, email, phone}) => {
    try {
        const res = await ourAxios.post('/user', {
            username,
            email,
            password,
            phone,
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.error("resitster api error", error);
        throw error;
    }
};
import axios from 'axios';

export const register = async ({username, password, email, phone}) => {
    try {
        const res = await axios.post('/api/user/signup', {
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


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
export const getPrivateInfo = async ({access, refresh}) => {
    const res = await axios.get(`/api/user/info`,{
        headers: {
            accessToken: access,
            refreshToken: refresh,
        }
    });
    return res;
}
export const putEditInfo = async ({access,refresh,editName,editPhone}) => {
    await axios.put(`/api/user/info`,
        {
        username: editName,
        phone: editPhone,
        },
        {
            headers : {
            accessToken: access,
            refreshToken: refresh,
        }})
}
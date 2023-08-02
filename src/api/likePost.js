import ourAxios from './ourAxios';

export const likePost = async ({postId}) => {
    try {
        const res = await ourAxios.post(`/api/post/${postId}/like`);
        console.log(res);
        return res.data;
    } catch (error) {
        console.error("likePost api error", error);
        throw error;
    }
};
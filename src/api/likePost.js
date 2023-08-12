import axios from "axios";

export const likePost = async ( postId ,ACToken ,REToken ) => {
    try {
        const res = await axios.post(`/api/post/${postId}/likes`,null,
            {
                headers: {
                    accessToken: ACToken,
                    refreshToken: REToken
                },
            }
        );
        console.log(res);
        return res.data;

    } catch (error) {
        console.error("likePost api error", error);
        throw error;
    }
};
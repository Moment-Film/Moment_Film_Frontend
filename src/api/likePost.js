import axios from "axios";

export const likePost = async ( {postId ,accessToken ,refreshToken }) => {
    try {
        console.log(postId)
        console.log(accessToken)

        console.log(refreshToken)

        const res = await axios.post(`http://52.78.24.117:8080/api/post/${postId}/likes`,null,
            {
                headers: {
                    accessToken: accessToken,
                    refreshToken: refreshToken
                },
            }
        );
        console.log(res);
        return res.data.data;

    } catch (error) {
        console.error("likePost api error", error);
        throw error;
    }
};
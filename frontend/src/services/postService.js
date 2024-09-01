import { AxiosClient } from "../axios/axiosClient"
import { CSRF_URL } from "../urls";

export const postApi = {
    posts : async () => {
        return await AxiosClient.get("api/posts");
    } ,
    createPost : async (post) => {
        await AxiosClient.get(CSRF_URL);
        return await AxiosClient.post("api/posts" , post , { headers: { "Content-Type" : 'multipart/form-data' }});
    } ,
    likePost : async (postId) => {
        await AxiosClient.get(CSRF_URL);
        return await AxiosClient.post("api/like/" + postId );
    } ,
    deletePost : () => {} ,
}
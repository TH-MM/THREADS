import { Heart, MessageCircle, Share } from "lucide-react"
import { BASE_URL } from "../../urls"
import { usePostContext } from "../../Context/postContext"
import { useUserContext } from "../../Context/userContext"
import { postApi } from "../../services/postService"
import { Link } from "react-router-dom"
import { useState } from "react"
import CommentForm from "../comments/commentForm"

const Post = ({ user_, post }) => {
    const{setPosts} = usePostContext()
    const{setUser , user} = useUserContext()
    const [display, setDisplay] = useState(false)

    const ToggleForm = () => {
        setDisplay(!display)
    }

    const formatText = (text) => {
        return text.split("\n").map((line) => {
            return (
                <>
                    {line}
                    <br />
                </>
            )
        })
    }

    const LikeFunc = async () => {
        setPosts((prevPosts) => 
            prevPosts.map((prepost) => {
                if (prepost.id === post.id) {
                    const liked = prepost.likes.some(like => like.user_id === user.id);
                    return {
                        ...prepost,
                        likes_count: liked ? prepost.likes_count - 1 : prepost.likes_count + 1,
                        likes: liked 
                            ? prepost.likes.filter(like => like.user_id !== user.id)
                            : [...prepost.likes, { user_id: user.id, post_id: post.id }]
                    };
                } else {
                    return prepost;
                }
            })
        );
        
        setUser((prevUser) => ({
            ...prevUser,
            posts: prevUser.posts.map((prepost) => {
                if (prepost.id === post.id) {
                    const liked = prepost.likes.some((like) => like.user_id === user.id);
                    return {
                        ...prepost,
                        likes_count: liked ? prepost.likes_count - 1 : prepost.likes_count + 1,
                        likes: liked
                            ? prepost.likes.filter((like) => like.user_id !== user.id)
                            : [...prepost.likes, { user_id: user.id, post_id: post.id }],
                    };
                } else {
                    return prepost;
                }
            }),
        }));

        await postApi.likePost(post.id)
        
    };
    
    
    return (
        <>
            <div className="p-4 flex text-start">
                <Link to={`/user/${user_.id}`} className="w-12"><img src={`${BASE_URL}storage/${user_.profile_picture}`} alt=""  className="h-40px w-40px object-cover rounded-full" /></Link>
                <div className="w-full">
                    <div className="flex justify-between items-center pl-3">
                        <p className="text-sm font-bold">{user_.username}</p>
                        <p className="text-gray-400 text-xs font-light">10/12/2023</p>
                    </div>
                    <p className="mb-1 text-justify text-base text-gray-800 pl-3">{formatText(post.content)}</p>
                    <img src={`${BASE_URL}storage/${post.image}`} alt="" className="ml-3 rounded-xl w-500px " />
                    <div className="flex items-center">
                        <div onClick={LikeFunc} className="flex gap-1 items-center cursor-pointer p-2 px-3 rounded-full hover:bg-gray-50"><Heart size={20} className={`${post.likes.some(like => like.user_id === user.id) ? "fill-red-500 stroke-none" : "stroke-slate-400"} `} /><p className="text-slate-400">{post.likes_count}</p></div>
                        <div onClick={ToggleForm} className="flex gap-1 items-center cursor-pointer p-2 px-3 rounded-full hover:bg-gray-50"><MessageCircle size={20} className="stroke-slate-400" /><p className="text-slate-400">0</p></div>
                        <div onClick={LikeFunc} className="flex gap-1 items-center cursor-pointer p-2 px-3 rounded-full hover:bg-gray-50"><Share size={20} className="stroke-slate-400" /><p className="text-slate-400">0</p></div>
                    </div>
                </div>
            </div>

            {display && <CommentForm  hideForm={ToggleForm} user_={user_} post={post}/>}
        </>
    )
}

export default Post
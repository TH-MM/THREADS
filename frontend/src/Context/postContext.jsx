import { createContext, useContext, useState } from "react";

const PostContext_ = createContext();

const PostContext = ({ children }) => {
    const [posts, setPosts] = useState([]);

    return (
        <PostContext_.Provider value={
            {
                posts,
                setPosts,
            }
        }>
            {children}
        </PostContext_.Provider>
    )
}

export default PostContext;

export const usePostContext = () => useContext(PostContext_);
import Post from "../components/post/post";
import { usePostContext } from "../Context/postContext";

const Home = () => {
    const {posts} = usePostContext()

    return (
        
        <div className=" border mt-2  w-650px align-center m-auto rounded-xl" >
            {posts && posts.map((post) => <div key={post.id}> <Post user_={post.user} post={post} /> </div>)}
        </div>
    )
}
export default Home;
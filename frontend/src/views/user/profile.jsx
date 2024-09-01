import { useUserContext } from "../../Context/userContext"
import CreatePostForm from "../../components/post/createForm"
import Post from "../../components/post/post"
import ProfileInformation from "../../components/profilePageComponents/profileSection"
import UpdateUserForm from "../../components/update/updateUserForm"
import { useState } from "react"

const Profile = () => {
    const [display, setDisplay] = useState(false)
    const { user } = useUserContext()

    const ToggleForm = () => {
        setDisplay(!display)
    }

    return (
        <div className=" border mt-2  w-600px align-center m-auto rounded-xl" >
            {user && <>
                <ProfileInformation
                    showForm={ToggleForm}
                    name={user.name}
                    username={user.username}
                    bio={user.bio}
                    profilePicture={user.profile_picture}
                    website={user.website}
                />
                <div className="p-3 border-t w-full flex items-center border-b justify-center">
                    <p className="font-semibold">Threads</p>
                </div>
                {
                    user.posts && (
                        user.posts.length === 0 ?
                        (
                            <div className="w-full h-300px flex justify-center items-center">
                                <h1 className="font-bold">NO POST YET</h1>
                            </div>
                        )

                        :
                        user.posts.map((post) => <div key={post.id}><Post user_={user} post={post} /> </div>))
                }


                {display && <UpdateUserForm hideForm={ToggleForm} />}
            </>
            }




        </div>
    )
}

export default Profile
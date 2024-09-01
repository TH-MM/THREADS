import { Link } from "react-router-dom";
import Button from "../UI/button";
import { BASE_URL } from "../../urls";

const ProfileInformation = ({username , name , bio , website , profilePicture , showForm}) => {
    return(
        <div className="p-30px text-start" >
                <div className="flex justify-between items-center" >
                    <div>
                        <h1 className="font-bold text-2xl">{name}</h1>
                        <p className="text-gray-300 text-sm">@{username}</p>
                    </div>
                    <img src={`${BASE_URL}storage/${profilePicture}`} alt="" className="w-20 h-20 object-cover rounded-full" />
                </div>
                <p className=" mb-2 w-450px">{bio}</p>
                <Link to={'http://www.google.com'} className=" underline text-gray-300 hover:text-gray-800" >{website}</Link>
                <Button onClick={showForm} className={'mt-5 w-full bg-transparent text-gray-800 border'}>Edit Profile</Button>
            </div>
    )
}

export default ProfileInformation;
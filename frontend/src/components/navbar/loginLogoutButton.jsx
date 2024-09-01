import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/userContext"
import { userApi } from "../../services/userServices";
import { LOGIN_FORM_URL } from "../../urls";
import { usePageVisit } from "../../Context/visitedPagesContext";

const Button = () => {
    const {isAuth , setIsAuth_} = useUserContext();
    const Navigate = useNavigate();
    const { setVisitedPage } = usePageVisit()
    const onClick = () => {
        if(isAuth){
            userApi.logout().then(() => {
                setVisitedPage({});
            });
            setIsAuth_(false)
        }else{
            Navigate(LOGIN_FORM_URL)
        }
    }
    return(
        <button onClick={onClick} className="bg-gray-900 flex justify-center items-center w-90px h-10 rounded-md text-white text-sm font-semibold" >{!isAuth ? "Login" : "Logout"} </button>
    )
}

export default Button
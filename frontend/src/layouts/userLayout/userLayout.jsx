import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../../components/navbar/navbar";
import { useEffect } from "react";
import { userApi } from "../../services/userServices";
import { useUserContext } from "../../Context/userContext";
import { LOGIN_FORM_URL } from "../../urls";
import { usePageVisit } from "../../Context/visitedPagesContext";

const UserLayout = () => {
    const { setUser, setIsAuth_, isAuth, logout } = useUserContext();
    const navigate = useNavigate();
    const { visitedPage, setVisitedPage } = usePageVisit()

    useEffect(() => {
        if (!visitedPage["user"]) {
            userApi.user()
                .then((response) => {
                    setUser(response.data)
                    setIsAuth_(true)
                })
                .catch(() => {
                    setIsAuth_(false)
                    logout()
                    navigate(LOGIN_FORM_URL)
                })
            setVisitedPage((prev) => ({ ...prev, user: true }));
        }

        if (!isAuth) {
            navigate(LOGIN_FORM_URL)
        }

    }, [isAuth])


    // if (loading) {
    //     return (
    //         <div className="w-full h-screen flex justify-center items-center" >
    //             <Logo size={45} className="fill-slate-800 stroke-none animate-bounce" />
    //         </div>

    //     )
    // }


    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default UserLayout;
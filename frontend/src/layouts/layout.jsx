import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/navbar";
import { useEffect } from "react";
import { postApi } from "../services/postService";
import { usePostContext } from "../Context/postContext";
import { useUserContext } from "../Context/userContext";
import { userApi } from "../services/userServices";
import { usePageVisit } from "../Context/visitedPagesContext";

const Layout = () => {
    const { setUser, setIsAuth_ , setUsers } = useUserContext();
    const { setPosts } = usePostContext()
    const { visitedPage, setVisitedPage } = usePageVisit()

    useEffect(() => {
        if (!visitedPage["home"]) {
            userApi.user()
                .then((response) => {
                    setUser(response.data)
                })
                .catch(() => {
                    setIsAuth_(false)
                    navigate(LOGIN_FORM_URL)
                })

            userApi.users()
            .then((response) => {
                setUsers(response.data)
            }) 

            postApi.posts()
                .then((response) => {
                    setPosts(response.data[0].posts);
                })
            setVisitedPage((prev) => ({ ...prev, home: true }));
        }
    }, [])

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout;
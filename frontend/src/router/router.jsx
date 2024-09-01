import { createBrowserRouter } from "react-router-dom";
import Login from "../views/auth/login";
import Layout from "../layouts/layout";
import AuthLayout from "../layouts/auth_Layout/authLayout";
import Register from "../views/auth/register";
import Home from "../views/home";
import UserLayout from "../layouts/userLayout/userLayout";
import Profile from "../views/user/profile";
import UsersProfile from "../views/user/usersProfile";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/user/:id",
                    element: <UsersProfile />
                },
            ]
        },
        {
            path: "/auth",
            element: <AuthLayout />,
            children: [
                {
                    path: "/auth/login",
                    element: <Login />
                },
                {
                    path: "/auth/register",
                    element: <Register />
                }
            ]
        },
        {
            path: "/user",
            element: <UserLayout />,
            children: [
                {
                    path: "/user/profile",
                    element: <Profile />
                }
            ]
        },
    ]
)

export default router;
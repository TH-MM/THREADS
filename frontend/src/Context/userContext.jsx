import { createContext, useContext, useState } from "react";
import { boolean } from "yup";

const UserContext_ = createContext({
    user : [],
    setUser : () => {},
    setIsAuth_: () => {},
    isAuth : boolean,
    refresh : boolean,
    setRefresh : () => {},
    users:[], 
    setUsers: () => {}
});

const UserContext = ({ children }) => {
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [isAuth, setIsAuth] = useState(JSON.parse(window.localStorage.getItem('ACCESS_TOKEN')) || false);
    const [refresh, setRefresh] = useState(false);

    const setIsAuth_ = (value) => {
        setIsAuth(value)
        window.localStorage.setItem('ACCESS_TOKEN', value);
    }

    const logout = () => {
        setIsAuth(false)
        setUser(null)
        window.localStorage.setItem('ACCESS_TOKEN', false);
    }

    return (
        <UserContext_.Provider value={
            {
                user,
                setUser,
                setIsAuth_,
                isAuth,
                refresh,
                setRefresh,
                logout,
                users, setUsers
            }
        }>
            {children}
        </UserContext_.Provider>
    )
}

export default UserContext;

export const useUserContext = () => useContext(UserContext_);
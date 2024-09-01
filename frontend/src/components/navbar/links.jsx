import { Link, useLocation } from "react-router-dom"
import { HomeIcon, ProfileIcon, SearchIcon } from "../../svg/icons"
import {Home, PlusSquare } from "lucide-react"

const Links = ({showForm}) => {
    const location = useLocation()
    const className = "h-20 w-20 rounded-md flex items-center justify-center hover:bg-gray-50"
    return(
        <div className="flex gap-5 items-center">
            <Link to={"/"} className={className} ><Home size={25} className={`${location.pathname == "/" ? "stroke-black" : "fill-none stroke-slate-300 "}`} /></Link>
            <Link to={"/user/profile"} className={className} ><ProfileIcon size={25} className={`${location.pathname == "/user/profile" ? "stroke-black fill-none" : "fill-none stroke-slate-300 "}`} /></Link>
            <Link to={"/"} className={className} ><SearchIcon size={25} className={`fill-none stroke-slate-300 `} /></Link>
            <div onClick={showForm} className={`cursor-pointer ${className}`} ><PlusSquare size={25} className={`fill-none stroke-slate-300 `} /></div>
        </div>
    )
}

export default Links
import { useState } from "react"
import CreatePostForm from "../post/createForm"
import Links from "./links"
import Button from "./loginLogoutButton"
import Logo_ from "./logo"

const Navbar = () => {
    const [display, setDisplay] = useState(false)

    const ToggleForm = () => {
        setDisplay(!display)
    }

    return(
        <>
        <div className="flex items-center justify-around h-10vh">
            <Logo_ />
            <Links showForm={ToggleForm} />
            <Button />
        </div>
        {display && <CreatePostForm hideForm={ToggleForm}/> }
        </>
    )
}

export default Navbar
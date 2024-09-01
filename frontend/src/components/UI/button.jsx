const Button = ({children , type , className , disabled , onClick}) => {
    return(
        <button type={type} disabled={disabled} onClick={onClick} className={`focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 mb-2 bg-gray-800 ${className}`}>{children}</button>
    )
}

export default Button;
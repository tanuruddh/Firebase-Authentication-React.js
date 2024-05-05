function Button({ children, onclick, classname }) {
    return (
        <button className={classname} onClick={onclick}>
            {children}
        </button>
    )
}

export default Button

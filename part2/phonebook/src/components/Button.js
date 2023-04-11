const Button = ({ text, type , onClick, id}) => {
    return (
        <>
           <button id={id} onClick={onClick} type={type}>{text}</button>
        </>
    )
}

export default Button
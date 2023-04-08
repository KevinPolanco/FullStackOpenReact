const Button = ({ text, onClick, className }) => {
  console.log(text);
  return (
    <>
      <button className={className} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default Button;

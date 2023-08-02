const Notification = ({ message, isError }) => {
  const messageStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    borderColor: "green",
    padding: 10,
    marginBottom: 10,
  };

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    borderColor: "red",
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  } else if (isError) {
    return (
      <div style={errorStyle}>
        {message}
      </div>
    );
  } else {
    return <div style={messageStyle}>{message}</div>;
  }
};

export default Notification;

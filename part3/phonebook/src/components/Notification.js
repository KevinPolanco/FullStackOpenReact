const Notification = ({ message }) => {
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
  }

  if (message.error === "Not Found") {
    return (
      <div style={errorStyle}>
        Information of {message.person.name} has already been removed from
        server
      </div>
    );
  }

  if (message.error) {
    return (
      <div style={errorStyle}>
       {message.error}
      </div>
    );
  }
  console.log(message)
  return <div style={messageStyle}>{message}</div>;
};

export default Notification;

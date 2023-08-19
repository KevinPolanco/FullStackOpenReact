import { useDispatch, useSelector } from 'react-redux'
import { notificationChange } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (notification) {
    setTimeout(() => {
      dispatch(notificationChange(""))
    }, 5000)

    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

export default Notification
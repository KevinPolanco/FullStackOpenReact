import { useNotificationValue, useNotificationDispatch } from '../NotificationContext'
import { useEffect } from 'react'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch() 

  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: 'ADD', payload: '' });
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [notification, dispatch]);

  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

export default Notification

import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationChange(state, action) {
      const newNotification = action.payload
      return newNotification
    }
  }
})

export const { notificationChange } = notificationSlice.actions

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(notificationChange(content))

    setTimeout(() => {
      dispatch(notificationChange(""))
    }, time * 1000);
  }
}

export default notificationSlice.reducer
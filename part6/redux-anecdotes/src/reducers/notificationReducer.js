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
export default notificationSlice.reducer
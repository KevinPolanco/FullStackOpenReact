import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange(state, action) {
      const newFilter = action.payload.toLocaleLowerCase()
      return newFilter
    }
  }
})

export const { filterChange }  = filterSlice.actions
export default filterSlice.reducer
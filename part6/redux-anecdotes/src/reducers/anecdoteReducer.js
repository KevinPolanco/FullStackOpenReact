import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    newVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changeAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changeAnecdote
      )
    },
    setAnecdote(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, newVote, setAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer
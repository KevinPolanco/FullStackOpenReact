import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const anecdote = action.payload
      const newAnecdote = asObject(anecdote)
      state.push(newAnecdote)
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
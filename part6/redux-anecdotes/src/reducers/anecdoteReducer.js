import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendNewVote(state, action) {
      const newAnecdote = action.payload
      return state.map(anecdote => 
        anecdote.id !== newAnecdote.id ? anecdote : newAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  },
})

export const { appendAnecdote, setAnecdote, appendNewVote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const newVote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdoteToChange = anecdotes.find(a => a.id === id)
    const changeAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    const newAnecdote = await anecdoteService.update(id, changeAnecdote)
    dispatch(appendNewVote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
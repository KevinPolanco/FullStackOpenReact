import { useDispatch } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from "../reducers/notificationReducer";
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdotesService.createNew(anecdote)
    dispatch(createAnecdote(newAnecdote))
    dispatch(notificationChange('Anecdote created'))
  }

  return (
    <>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
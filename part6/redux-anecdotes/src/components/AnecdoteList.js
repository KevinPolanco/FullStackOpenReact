import { newVote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    } else {
      return state.anecdotes
      .filter(anecdote => anecdote.content
        .toLocaleLowerCase()
        .includes(state.filter))
    }
  })

  const dispatch = useDispatch()
  const vote = (id) => {
    dispatch(newVote(id))
    const anecdote = anecdotes.find(anecdote =>  anecdote.id === id)
    dispatch(notificationChange(`you vote '${anecdote.content}'`))
  }

  const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);
 
  return (
    sortedAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes} votes
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList
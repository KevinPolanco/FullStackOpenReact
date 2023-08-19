import { newVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.filter === ''
      ? state.anecdotes
      : state.anecdotes.filter(anecdote =>
          anecdote.content.toLowerCase().includes(state.filter)
        )
  )

  const dispatch = useDispatch()
  const vote = (id) => {
    dispatch(newVote(id))
    const anecdote = anecdotes.find(anecdote =>  anecdote.id === id)
    dispatch(setNotification(`you vote '${anecdote.content}'`, 5))
  }

  const sortedAnecdotes = anecdotes
    .slice()
    .sort((a, b) => b.votes - a.votes);
 
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
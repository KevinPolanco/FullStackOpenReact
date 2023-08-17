import { newVote } from "../reducers/anecdoteReducer";
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
  }
  
  anecdotes.sort((a, b) => { return b.votes - a.votes})
  
  return (
    anecdotes.map(anecdote =>
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
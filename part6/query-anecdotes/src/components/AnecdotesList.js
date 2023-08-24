import { updateAnecdotes} from "../requests"
import { useMutation, useQueryClient  } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdotesList = ({anecdotes}) => {
  const queryClient =  useQueryClient() 
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(updateAnecdotes, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    const votes = anecdote.votes + 1
    const updateAnecdote = {...anecdote, votes}
    newAnecdoteMutation.mutate(updateAnecdote)
    dispatch({type: 'ADD', payload: `anecdote ${anecdote.content} voted`})
  }
  
  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}
  


export default AnecdotesList
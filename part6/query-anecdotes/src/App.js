import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient  } from 'react-query'
import { getAnecdotes } from './requests'
import { updateAnecdotes } from './requests'

const App = () => {
  const queryClient =  useQueryClient() 

  const newAnecdoteMutation = useMutation(updateAnecdotes, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    const votes = anecdote.votes + 1
    const updateAnecdote = {...anecdote, votes}
    newAnecdoteMutation.mutate(updateAnecdote)
  }
  
  const result  = useQuery(
    'anecdotes', getAnecdotes, {retry: false}
  )

  if (result.isError) {
    return <div>anecdotes service not available due to server problems</div>;
  }

  const anecdotes = result.data

  if (anecdotes) {
    return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
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
      </div>
    )
  }
}

export default App

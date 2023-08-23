import { useMutation, useQueryClient  } from 'react-query'
import { createAnecdotes } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation(createAnecdotes, {
    onError: (error) => {
      console.log(error.message)
    },
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content})
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

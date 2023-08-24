import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdotesList from './components/AnecdotesList'
import { useQuery } from 'react-query'
import { getAnecdotes } from './requests'
import { NotificationContextProvider } from './NotificationContext'

const App = () => {
  const result  = useQuery(
    'anecdotes', getAnecdotes, {retry: false}
  )

  if (result.isError) {
    return <div>anecdotes service not available due to server problems</div>;
  }

  const anecdotes = result.data

  if (anecdotes) {
    return (
      <NotificationContextProvider>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        <AnecdotesList anecdotes={anecdotes}/>
      </NotificationContextProvider>
    )
  }
}

export default App

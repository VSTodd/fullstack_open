import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [votes, setVotes] = useState(anecdotes.map(_ => 0))

  const [index, setIndex] = useState(0)

  const [selected, setSelected] = useState(0)

  const [mostVotes, setMostVotes] = useState(0)
  const [mostSelected, setMostSelected] = useState(0)

  const randomIndex = (max) => {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
  }

  const handleRandomClick = () => {
    let nextIndex = randomIndex(anecdotes.length - 1)
    setIndex(nextIndex)
    console.log(index)
    setSelected(nextIndex)
    console.log(selected)
  }

  const handleVoteClick = () => {
    let newVotes = votes.slice()
    let currentVotes = newVotes[index] + 1
    newVotes[index] = currentVotes
    setVotes(newVotes)
    console.log(newVotes)

    if (currentVotes > mostVotes) {
      setMostSelected(selected)
      setMostVotes(currentVotes)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[index]} votes</p>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleRandomClick}>next anecdote</button>
      <h1>Andecdote with most votes</h1>
      <p>{anecdotes[mostSelected]}</p>
      <p>has {mostVotes} votes</p>
    </div>
  )
}

export default App
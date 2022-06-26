import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Anecdote = (props) => (
  <div>
    <h3>{props.name} Anecdote:</h3>
    <p>{props.anecdote}</p>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votesArray, setVotesArray] = useState(new Array(anecdotes.length).fill(0))
  const [leader, setLeader] = useState(0)

  const vote = () => {
    const newArray = [...votesArray]
    newArray[selected] ++
    const newLeader = newArray.indexOf(Math.max(...newArray))
    setLeader(newLeader)
    setVotesArray(newArray)
  }

  
  return (
    <div>
      
      <Anecdote name="Today's" anecdote={anecdotes[selected]} />
      <Button text="Vote" handleClick={vote}/>
      <Button text="Show Next Anecdote" 
        handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}
      />
      <p>votes: {votesArray[selected]}</p>
      <Anecdote name="Most Popular" anecdote={anecdotes[leader]} />
      <p>votes: {votesArray[leader]}</p>
    </div>
  )
}

export default App
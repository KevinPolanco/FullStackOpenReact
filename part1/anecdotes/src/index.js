import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const lengthAnecdotes = props.anecdotes.length;
  const [vote, setVote] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const copyVote = { ...vote };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  return (
    <div>
      {props.anecdotes[selected]}
      <p>has {vote[selected]} votes</p>
      <button onClick={() => setSelected(getRandomInt(lengthAnecdotes))}>
        next anecdote
      </button>
      <button
        onClick={() => {
          const numVote = selected;
          copyVote[numVote] += 1;
          setVote({ ...copyVote });
        }}
      >
        vote
      </button>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));

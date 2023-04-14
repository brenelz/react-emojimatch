import { useState } from 'react';
import './App.css'
import EmojiMatchGame from './components/EmojiMatchGame';
import { createShuffled2dArray, getRandomEmoji, range } from './utils';

function App() {
  const [gameNum, setGameNum] = useState(0);

  const emojis = range(8).map(_ => getRandomEmoji());
  const completedBoard = createShuffled2dArray([...emojis, ...emojis]);

  const startNewGame = () => {
    setGameNum(gameNum + 1);
  }

  return (
    <div className="App">
      <h1>Emoji Match Game</h1>
      <EmojiMatchGame key={gameNum} startNewGame={startNewGame} completedBoard={completedBoard} />
    </div>
  )
}

export default App

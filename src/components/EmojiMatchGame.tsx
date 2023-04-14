import { useState } from "react";

type EmojiMatchGameProps = {
    startNewGame: () => void,
    completedBoard: string[][]
};

type CurrentGuess = {
    x: number;
    y: number;
}

function EmojiMatchGame({ startNewGame, completedBoard }: EmojiMatchGameProps) {
    const [currentGuess, setCurrentGuess] = useState<CurrentGuess | null>(null);
    const [currentBoard, setCurrentBoard] = useState(completedBoard.map(row => row.map(_ => '')));
    const [numCorrect, setNumCorrect] = useState(0);
    const [numGuesses, setNumGuesses] = useState(0);

    const handleGuess = ({ x, y }: CurrentGuess) => {
        if (currentBoard[x][y]) {
            return;
        }

        const nextBoard = [...currentBoard];
        nextBoard[x][y] = completedBoard[x][y];

        if (!currentGuess) {
            setCurrentGuess({ x, y });
        } else {
            if (completedBoard[currentGuess.x][currentGuess.y] !== completedBoard[x][y]) {
                nextBoard[x][y] = '';
                nextBoard[currentGuess.x][currentGuess.y] = '';
            } else {
                setNumCorrect(numCorrect + 1);
            }
            setCurrentGuess(null);
            setNumGuesses(numGuesses + 1);
        }

        setCurrentBoard(nextBoard)
    }

    return (
        <div>
            {numCorrect === 8 && <p>Congrats! You have completed the game in <strong>{numGuesses}</strong> guesses! <button style={{ marginLeft: '10px' }} onClick={startNewGame}>New Game</button></p>}
            {currentBoard.map((row, x) => (
                <div key={x}>
                    {row.map((emoji, y) => (
                        <button
                            key={y}
                            className="cell"
                            onClick={() => handleGuess({ x, y })}
                        >
                            {emoji ? emoji : <div>&nbsp;</div>}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default EmojiMatchGame;

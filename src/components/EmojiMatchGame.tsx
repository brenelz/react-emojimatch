import { useEffect, useState } from "react";

type EmojiMatchGameProps = {
    startNewGame: () => void,
    completedBoard: string[][]
};

type Guess = {
    x: number;
    y: number;
}

function EmojiMatchGame({ startNewGame, completedBoard }: EmojiMatchGameProps) {
    const [currentBoard, setCurrentBoard] = useState(completedBoard.map(row => row.map(_ => '')));

    const [firstGuess, setFirstGuess] = useState<Guess | null>(null);
    const [secondGuess, setSecondGuess] = useState<Guess | null>(null);

    const [numCorrect, setNumCorrect] = useState(0);
    const [numGuesses, setNumGuesses] = useState(0);
    const [inProgress, setInProgress] = useState(false);

    useEffect(() => {
        if (firstGuess && secondGuess) {
            if (completedBoard[firstGuess.x][firstGuess.y] !== completedBoard[secondGuess.x][secondGuess.y]) {
                setInProgress(true);
                setTimeout(() => {
                    const nextBoard = JSON.parse(JSON.stringify(currentBoard));
                    nextBoard[firstGuess.x][firstGuess.y] = '';
                    nextBoard[secondGuess.x][secondGuess.y] = '';
                    setCurrentBoard(nextBoard);
                    setInProgress(false);
                }, 750);
            } else {
                setNumCorrect(numCorrect + 1);
            }

            setFirstGuess(null);
            setSecondGuess(null);
            setNumGuesses(numGuesses + 1);

        }

        const nextBoard = JSON.parse(JSON.stringify(currentBoard));
        if (firstGuess) {
            nextBoard[firstGuess.x][firstGuess.y] = completedBoard[firstGuess.x][firstGuess.y];
        }
        if (secondGuess) {
            nextBoard[secondGuess.x][secondGuess.y] = completedBoard[secondGuess.x][secondGuess.y];
        }

        setCurrentBoard(nextBoard);

    }, [firstGuess, secondGuess]);

    const revealEmoji = ({ x, y }: Guess) => {
        if (currentBoard[x][y] || inProgress) {
            return;
        }

        if (!firstGuess) {
            setFirstGuess({ x, y })
        } else if (!secondGuess) {
            setSecondGuess({ x, y })
        }
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
                            onClick={() => revealEmoji({ x, y })}
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

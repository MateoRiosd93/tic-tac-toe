import { useState } from "react";
import confetti from "canvas-confetti";

import { Squere } from "./components/Square";
import { TURNS } from "./constants";
import { checkEndGame, checkWinner } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { resetGameStorage, saveGameToStorage } from "./logic/storage";

function App() {
  const [board, setBoard] = useState(() => {
    // Si colocamos el localStorage por fuera se renderizaria inmecesariamente.
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null)
  });
  const [turn, setTurn] = useState(() => window.localStorage.getItem('turn') || TURNS.X);
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    // Copiar superficial - en caso de necesitar realizar una copia profunda usar structureClone()
    const newBoard = [...board];
    // Importante: siempre devolver un nuevo estado (Trabajar las props y los stados como inmutables)
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Seteamos nuestra informacion en el localStorage
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    // revisamos si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner); // OJO el estado es ASINCRONO
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage()
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((_, index) => (
          <Squere key={index} index={index} updateBoard={updateBoard}>
            {board[index]}
          </Squere>
        ))}
      </section>
      <section className="turn">
        <Squere isSelected={turn === TURNS.X}>{TURNS.X}</Squere>
        <Squere isSelected={turn === TURNS.O}>{TURNS.O}</Squere>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  );
}

export default App;

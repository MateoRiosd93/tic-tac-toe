import { WINNER_PATHS } from "../constants";

export const checkWinner = (boardToCheck) => {
  // revisamos todas las condiciones ganadoras
  // para ver si x u o gano
  for (const combo of WINNER_PATHS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  // si no hay ganador
  return null;
};

export const checkEndGame = (newBoard) => {
  // Revisamos si hay un empate (si no hay espacios vacios: null en el tablero)
  return newBoard.every((square) => square !== null);
};

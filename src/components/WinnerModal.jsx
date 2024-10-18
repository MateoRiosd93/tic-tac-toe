import { Squere } from "./Square";

export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null;
  
  return (
    <section className="winner">
      <div className="text">
        <h2>{winner === false ? "Empate" : "Gano:"}</h2>
        <header className="win">{winner && <Squere>{winner}</Squere>}</header>
        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
};

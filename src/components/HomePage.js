import React from "react";

export default function HomePage(props) {
  return (
    <main>
      <h2 className="game--title">Quizzical</h2>
      <p>A fun trivia game</p>
      <button className="button--start" onClick={props.startGame}>
        START
      </button>
    </main>
  );
}

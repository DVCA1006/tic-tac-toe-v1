import { useEffect, useState } from "react";
import Board from "./Board";

type Scores = {
  [key: string]: number;
};
//initial game state and score
const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];
const INITIAL_GAME_SCORE: Scores = { X: 0, O: 0 };

//index win combinations in game state
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const d = new Date();
let thisYear = d.getFullYear();

function App() {
  //states of game, score and player
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [gameScore, setGameScore] = useState(INITIAL_GAME_SCORE);
  const [gameDrawScore, setGameDrawScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  //alternates currentplayer
  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  //show active player by color
  const activePlayerX = currentPlayer === "X" ? "text-blue-500" : "";
  const activePlayerO = currentPlayer === "O" ? "text-red-500" : "";

  //resets the board
  const resetBoard = () => setGameState(INITIAL_GAME_STATE);

  //renders checkForWinner() everytime the gamestate changes
  useEffect(() => {
    if (gameState === INITIAL_GAME_STATE) {
      return;
    }
    checkForWinner();
  }, [gameState]);

  //checks for winner
  const checkForWinner = () => {
    let roundWon = false;

    //identifying the index of WINNING_COMBOS
    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const winCombo = WINNING_COMBOS[i];

      let a = gameState[winCombo[0]];
      let b = gameState[winCombo[1]];
      let c = gameState[winCombo[2]];

      //if there are empty squares, continue the game
      if ([a, b, c].includes("")) {
        continue;
      }

      //when a, b, and c have the same value; round wins
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
    //if roundWon is true
    if (roundWon) {
      setTimeout(() => {
        handleWin();
      }, 300);
    }
    //if gamestate does not include any blank square
    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 300);
      return;
    }
    changePlayer();
  };

  const handleWin = () => {
    const newPlayerScore = gameScore[currentPlayer] + 1; //increase score of winner by 1
    const newScore = { ...gameScore }; //newScore is equal to the gameScore
    newScore[currentPlayer] = newPlayerScore; //get the name of the winner and change its score
    setGameScore(newScore); //updates the gameScore

    resetBoard();
  };

  const handleDraw = () => {
    setGameDrawScore(gameDrawScore + 1); //add number of draws by 1
    resetBoard();
  };

  //handles the onClick functon to each cell-index
  const handleClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute("data-cell-index")); //targets the data-cell-index and turns it into a number type
    const currentValue = gameState[cellIndex]; //let the selected cell equal to the index of the game state

    if (currentValue) {
      //if there is a value in the selected cell, return as is.
      return;
    }

    const newValues = [...gameState]; //newValue is equal to the gameState
    newValues[cellIndex] = currentPlayer; //let newValues change the value of the selected index to the currentPlayer's symbol
    setGameState(newValues); //update newValues of the gamestate
  };

  return (
    <div className="h-full p-0 pt-20 bg-gradient-to-b from-slate-900 to-black text-slate-100">
      <h1 className="text-7xl text-center mb-12 ">
        TIC TAC TOE <br />
      </h1>
      <div>
        <div className=" grid grid-cols-3 mx-auto w-96">
          {gameState.map((player, index) => (
            <Board key={index} onClick={handleClick} {...{ player, index }} />
          ))}
        </div>
        <div className="text-center font-thin text-xl">
          <p className="my-8 text-3xl">SCORE</p>
          <div className="inline-block pr-10">
            <p className={`pb-5 ${activePlayerX}`}>PLAYER (X)</p>
            <p>{gameScore.X}</p>
          </div>
          <div className="inline-block pr-10">
            <p className="pb-5">DRAW</p>
            <p>{gameDrawScore}</p>
          </div>
          <div className="inline-block">
            <p className={`pb-5 ${activePlayerO}`}>PLAYER (O)</p>
            <p>{gameScore.O}</p>
          </div>
        </div>
        <div className="relative text-center top-10 text-slate-500">
          <h3>{`DVCA © ${thisYear}`}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;

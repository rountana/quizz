import React, { useEffect } from "react";
// import "./App.css";
import "./style.css";
import HomePage from "./components/HomePage";
import Quiz from "./components/Quiz";

function App() {
  const [answers, SetAnswers] = React.useState();
  const [gameStarted, SetGameStarted] = React.useState(false);
  const [quiz, SetQuiz] = React.useState();

  //sort function
  // let array = [1, 2, 3, 4];
  // array.sort(function (a, b, c, d) {
  //   return 0.5 - Math.random();
  // });

  // console.log("Loaded quiz data successfully " + JSON.stringify(quiz));

  async function StartGame() {
    console.log("Quiz Initialized");

    // load the quiz & pass it to child to format quiz data
    const url =
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
    const response = await fetch(url);
    const { results } = await response.json();
    // console.log(results.map((question) => console.log(question)));
    // SetQuiz(results);
    SetQuiz((quiz) => {
      const quizObj = results.map((result) => {
        const tempObj = {
          question: `${result.question}`,
          incorrect_answers: `${result.incorrect_answers}`,
          correct_answer: `${result.correct_answer}`,
        };
        return tempObj;
      });
      return quizObj;
      // SetQuiz((quiz) => ({ ...quiz, quiz: quizObj || [] }));
    });
  }

  // React.useEffect(() => {
  //   StartGame();
  // }, []);

  function NewGame() {
    console.log("newgame logged");
    SetGameStarted(true);
    SetQuiz();
    StartGame();
  }
  // SetQuestions((prevQuestion) =>
  //   results.map((result, index) => {
  //     return { id: index, question: result.question };
  //   })
  // );

  // const qArray = results.map((result) => result.question);
  return gameStarted && quiz ? (
    // <Quiz {...quiz}></Quiz>
    <Quiz quiz={quiz} newgame={NewGame}></Quiz>
  ) : (
    // <h1> Game Started </h1>
    //sending array objects example
    // <Quiz
    //   array={[
    //     { name: shyam, phone: 123 },
    //     { name: reviera, phone: 456 },
    //   ]}
    // ></Quiz>
    <HomePage startGame={() => NewGame()}></HomePage>
  );
}

export default App;

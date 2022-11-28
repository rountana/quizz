import React, { useEffect } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import Score from "../components/Score";

export default function Quiz(props) {
  const [score, SetScore] = React.useState(0);
  const [questionElements, SetQuestionElements] = React.useState();
  const [checkedQuiz, SetCheckedQuiz] = React.useState(false);
  const [allAnswered, SetAllAnswered] = React.useState(false);
  const [gameOver, SetGameOver] = React.useState(false);

  // console.log("Displaying Quiz from child" + JSON.stringify(props.quiz));
  // console.log("Question element" + JSON.stringify(questionElements));

  function MassageData() {
    var quizData = [];
    // console.log("props object" + JSON.stringify(props));

    quizData = props.quiz;

    // console.log("props object" + JSON.stringify(props.quiz));
    let data = [];
    let ans = [];
    // const ansObj = {};
    // {prompt : " first question",
    //  answers:  {"ansObj:
    //            [answer:]},
    //            {[{answer: b1, isSelected: false, isCorrect: false, id: nanoid()},
    //            {answer: b2, isSelected: false, isCorrect: false, id: nanoid()},
    //            {answer: b3, isSelected: false, isCorrect: false, id: nanoid()},
    //            {answer: b4, isSelected: false, isCorrect: false, id: nanoid()}]},
    //
    //  id : index + 1}
    //
    quizData.forEach((element, i) => {
      //creates an array of correct and incorrect answers and shuffle the answers
      ans = element.incorrect_answers.split(",");
      ans.push(element.correct_answer);
      ans.sort((ans) => 0.5 - Math.random());
      ans.map((correctAns) => {
        return decode(correctAns);
      });
      const correct_answer = decode(element.correct_answer);

      // console.log("Array premod" + JSON.stringify(answer));
      // build answer object array - map through array and build answer object
      const answers = ans.map((ans) => {
        return {
          answer: `${ans}`,
          isSelected: false,
          isCorrect: false,
          id: nanoid(),
        };
      });
      // console.log("Array postmod" + JSON.stringify(answer));

      //build question db with question, answer w/ status and question id for reference
      data.push({
        prompt: element.question,
        correct_answer: correct_answer,
        answers,
        id: i + 1,
        isHeld: false,
      });
    });

    // console.log("Question element" + JSON.stringify(data));
    SetQuestionElements(data);
  }

  React.useEffect(() => {
    MassageData();
  }, []);

  function SelectAnswer(questionId, answerId) {
    //loop through all questions..
    //oldQuizData = sum of all questions + answers
    SetQuestionElements((oldQuizData) => {
      //question = prompt + answer + qid
      return oldQuizData.map((question) => {
        // find the matching question first
        let answerObj = [];
        if (question.id === questionId) {
          //then loop through the answers for the question
          //answerObj at the end has all 4 answers "rebuilt"
          answerObj = question.answers.map((eachAnswer) => {
            // console.log("eachAnswer.id" + eachAnswer.id);
            return eachAnswer.id === answerId
              ? { ...eachAnswer, isSelected: true }
              : { ...eachAnswer, isSelected: false };
          });
          // console.log(
          //   "answer object modified ..... " + JSON.stringify(answerObj)
          // );
          //take question replace answer.. qnaObj has this return value
          return { ...question, answers: answerObj };
        } else {
          return { ...question };
        }
      });
    });
  }

  function CheckAnswer() {
    //loop through all answers and mark the one's that are correct & set a flag
    // keep track of the scores while we are at it.
    // then let question to be rendered to show correct &
    // incorrect answers in different shades
    //introduce display score field
    //allow option to reset or play again
    // console.log("QUIZ" + JSON.stringify(questionElements));
    let answered_count = 0;
    let tempScore = 0;
    questionElements.map((quizObj) => {
      return quizObj.answers.map((ansObj) => {
        // console.log("ansObj.isSelected" + ansObj.isSelected);
        if (ansObj.isSelected) {
          answered_count++;

          if (ansObj.answer === quizObj.correct_answer) {
            ansObj = { ...ansObj, isCorrect: true };
            tempScore++;
            // console.log("selected + answered correct matched" + dummy);
          }
        }
        //if we have n answers for n questions, set flag to indicate quiz complete
        if (answered_count === questionElements.length) {
          SetAllAnswered(true);
          // console.log("answered_count" + answered_count);
          SetGameOver(true);
        }
        return ansObj;
      });
    });
    SetScore(tempScore);
    SetCheckedQuiz(true);
  }

  function GameOver() {
    SetGameOver(true);
  }

  return (
    <main>
      <h1>Quiz time !!</h1>
      {!gameOver && <button onClick={() => CheckAnswer()}>Check Answer</button>}
      {/* game over show score and set gameover flag */}
      {gameOver && <Score gameover={() => GameOver()} score={score}></Score>}
      {gameOver && <button onClick={props.newgame}> Play Again</button>}
      {/* {checkedQuiz && allAnswered && (
        <button onClick={() => props.startgame}>Play Again</button>
      )} */}

      {/* {checkedQuiz && allAnswered && <Score gameover={GameOver}></Score>} */}
      {checkedQuiz && !allAnswered ? (
        <div> Select all answers </div>
      ) : (
        <div></div>
      )}

      {questionElements &&
        questionElements.map((question) => {
          return (
            <Question
              //reminder this sends all properties to chile
              // such as question={question.prompt}, answers={question.answers}.. etc.
              // {...questionElements}
              question={question.prompt}
              answers={question.answers}
              id={question.id}
              isHeld={question.held}
              clicked={SelectAnswer}
              newgame={props.newgame}
            ></Question>
          );
        })}
    </main>
  );
}

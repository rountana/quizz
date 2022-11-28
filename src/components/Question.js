import React, { useEffect } from "react";
import { decode } from "html-entities";

export default function Question(props) {
  const [results, SetResults] = React.useState();

  // console.log(
  //   "question sent to questions component: " + JSON.stringify(props.question)
  // );
  // console.log(
  //   "answers sent to questions component: " + JSON.stringify(props.answers)
  // );
  // console.log("id sent to questions component: " + JSON.stringify(props.id));

  let displayAnswers;

  //note .forEach does not work here in place of .map
  displayAnswers = props.answers.map((element) => {
    let styleProps = {};
    if (element.isSelected) {
      styleProps = { backgroundColor: "#61dafb" };
    } else {
      styleProps = { backgroundColor: "#ffffff" };
    }
    // console.log("answer id from component" + element.id);
    let onclickProps;
    if (!props.isHeld) {
      onclickProps = () => props.clicked(props.id, element.id);
    }
    return (
      <button
        onClick={onclickProps}
        className="button--answer"
        style={styleProps}
      >
        {element.answer}
      </button>
    );
    // console.log("looping.. " + JSON.stringify(element.answer));
  });
  // console.log("displayElements" + JSON.stringify(displayElements));

  return (
    <div>
      <div className="question">{decode(props.question)}</div>
      {displayAnswers}
    </div>
  );
}

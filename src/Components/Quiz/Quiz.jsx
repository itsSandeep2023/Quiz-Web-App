import React, { useRef, useState } from "react";
import "./Quiz.css";
import jsonData from "../../assets/data.json";
import OptionArea from "./OptionArea";
import QuestionArea from "./QuestionArea";
import NextButtonArea from "./NextButtonArea";
import IndexArea from "./IndexArea";
import QuizTitle from "./QuizTitle";

const Quiz = () => {
  const data = JSON.parse(JSON.stringify(jsonData));

  const keys = Object.keys(data);
  const [field, setField] = useState(data.aptitude);

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(field[index]);

  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [questionCount, setQuestionCount] = useState(30);
  let [show, setShow] = useState(false);

  let correctAns = useRef(null);
  let selectedAns = useRef(null);

  const checkAns = (e, ans) => {
    if (!lock) {
      if (ans === question.correctAnswer) setScore((prev) => prev + 1);
      else {
        selectedAns.current = e.target;
        selectedAns.current.classList.add("wrong");
      }

      correctAns.current.classList.add("correct");
      setLock(true);
    }
  };

  const next = () => {
    if (lock == true) {
      setShow(false);
      if (index == field.length - 1 || index === questionCount - 1) {
        setResult(true);
        return;
      }
      setIndex(++index);
      setQuestion(field[index]);
      setLock(false);

      if (selectedAns.current) {
        selectedAns.current.classList.remove("wrong");
        selectedAns.current.classList.remove("correct");
      }

      if (correctAns.current) {
        correctAns.current.classList.remove("wrong");
        correctAns.current.classList.remove("correct");
      }
    }
  };

  const reset = (key) => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="main-window">
      <div className="float-div">
        <ul className="side-bar">
          {keys.map((key, index) => (
            <button
              onClick={() => {
                next();
                setField(data[key]);
                setQuestion(data[key][0]);
                reset();
              }}
              key={index}
              className="side-button"
            >
              {key}
            </button>
          ))}
        </ul>
      </div>

      <div className="container">
        <QuizTitle />

        <hr />

        {result ? (
          <>
            <h2>
              You Scored {score} out of {questionCount}
            </h2>
            <button onClick={reset}>Reset</button>
          </>
        ) : (
          <>
            <QuestionArea index={index} question={question.question} />
            <OptionArea
              options={question.options}
              checkAns={checkAns}
              correctAnswer={question.correctAnswer}
              correctAns={correctAns}
            />
            <NextButtonArea next={next} />
            <IndexArea index={index} length={questionCount} />

            <hr />
            {lock || show ? (
              <>
                <h2>Answer : {question.correctAnswer}</h2>
                <h2>Explanation :</h2>
                <h3>{question.desc}</h3>
              </>
            ) : (
              <div>
                <h2>
                  Answer :{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    ?
                  </span>
                </h2>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;

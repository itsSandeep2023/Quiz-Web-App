import React from "react";
import Option from "./Option";

export default function OptionArea({
  options,
  checkAns,
  correctAnswer,
  correctAns,
}) {
  const handleSetCorrectAnsRef = (el, optId) => {
    if (el && optId === correctAnswer) {
      correctAns.current = el;
    }
  };
  return (
    <ul>
      {options.map((option, index) => (
        <Option
          key={index}
          option={option}
          checkAns={checkAns}
          setCorrectAnsRef={handleSetCorrectAnsRef}
        />
      ))}
    </ul>
  );
}

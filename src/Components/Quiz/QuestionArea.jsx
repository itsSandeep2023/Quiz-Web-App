import React from "react";

export default function QuestionArea({ index, question }) {
  return (
    <h2 className="question">
      (<b>{index + 1}</b>). {question}
    </h2>
  );
}

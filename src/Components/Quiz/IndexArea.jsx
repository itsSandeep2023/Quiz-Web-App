import React from "react";

export default function IndexArea({ index, length }) {
  return (
    <div className="index">
      {index + 1} of {length} questions
    </div>
  );
}

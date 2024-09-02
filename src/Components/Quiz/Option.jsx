import React from "react";

export default function Option({ option, checkAns, setCorrectAnsRef }) {
  return (
    <li
      ref={(el) => {
        setCorrectAnsRef(el, option.optId);
      }}
      onClick={(e) => {
        checkAns(e, option.optId);
      }}
    >
      <b>({option.optId}) </b> &nbsp; {option.optName}
    </li>
  );
}

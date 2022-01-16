import React, { useState } from "react";
import "./Modal.css";
export default function Modal(props) {
  const { show, closeModal } = props;
  const [input, setInput] = useState("");
  function changeHandler(event) {
    setInput(event.target.value);
  }
  return (
    <>
      <div className={show ? "overlay" : "hide"} onClick={closeModal} />
      <div className={show ? "modal" : "hide"}>
        <button onClick={closeModal}>X</button>
        <h1>Modal heading</h1>
        <label>
          {" "}
          <input type="checkbox" /> TestPlaylist
          <input type="text" onChange={changeHandler} />
        </label>
        <p>This is modal content</p>
      </div>
    </>
  );
}

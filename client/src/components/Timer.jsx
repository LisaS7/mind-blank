import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStatus } from "../state/quizSlice";
import "./Timer.css";

const Timer = ({ duration, timerStarted }) => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerStarted]);

  let percentageLeft = (timeLeft / duration) * 100;

  if (percentageLeft === 0) {
    setTimeout(() => {
      dispatch(setStatus("end"));
    }, 1010);
  }

  return (
    <>
      <div className="timer-bar-container">
        <div className="timer-bar" style={{ width: `${percentageLeft}%` }} />
      </div>
    </>
  );
};

export default Timer;

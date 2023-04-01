import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStatus } from "../../state/quizSlice";
import "./Timer.css";

const Timer = () => {
  const dispatch = useDispatch();
  const { timer } = useSelector((state) => state.quiz);
  const [timeLeft, setTimeLeft] = useState(timer.duration);

  useEffect(() => {
    setTimeLeft(timer.duration);
    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer]);

  let percentageLeft = (timeLeft / timer.duration) * 100;

  if (percentageLeft === 0) {
    setTimeout(() => {
      dispatch(setStatus("end"));
    }, 1010);
  }

  return (
    <div className="timer-bar-container">
      <div className="timer-bar" style={{ width: `${percentageLeft}%` }} />
    </div>
  );
};

export default Timer;

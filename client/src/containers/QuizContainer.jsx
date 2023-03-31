import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setScore,
  setQuestions,
  restartGame,
  toggleTimerStarted,
} from "../state/quizSlice";
import Answer from "../components/Answer";
import Question from "../components/Question";
import {
  answerDelay,
  scoreValue,
  correctAlien,
  incorrectAlien,
} from "../constants";
import Timer from "../components/Timer";
import Loading from "../components/Loading";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import "./QuizContainer.css";

export default function QuizContainer({ data, getData }) {
  const dispatch = useDispatch();
  const { questions, score, highscore } = useSelector((state) => state.quiz);

  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [previousScore, setPreviousScore] = useState(0);

  function questionAnswered() {
    setDisplayAnswer(true);
    setTimeout(function () {
      const questionsCopy = [...questions];
      dispatch(setQuestions(questionsCopy.slice(1)));
    }, answerDelay);
  }

  function correctAnswer() {
    const questionDifficulty = questions[0].difficulty;
    const points = scoreValue[questionDifficulty];
    setIsCorrect(true);
    setPreviousScore(score);
    dispatch(setScore(score + points));
  }

  function handleReturn() {
    getData();
    dispatch(restartGame());
  }

  function handleReset() {
    dispatch(setScore(0));
    dispatch(setQuestions(data));
    getData();
    dispatch(toggleTimerStarted());
  }

  useEffect(() => {
    dispatch(setQuestions(data));
  }, [data]);

  useEffect(() => {
    setDisplayAnswer(false);
    setIsCorrect(false);
  }, [questions]);

  if (!questions.length) return <Loading />;

  const incorrectAnswers = questions[0].incorrectAnswers;
  incorrectAnswers.push(questions[0].correctAnswer);
  const allAnswers = [...new Set(incorrectAnswers)].sort();

  const numberVariants = {
    initial: { y: 0 },
    correct: {
      y: [0, -96],
      transition: { duration: 0.5, delay: 0.5 },
    },
    incorrect: {
      y: 0,
    },
  };

  return (
    <>
      <div>
        <button onClick={handleReturn}>Return To Menu</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="scores-container">
        <p className="score">Highscore ${highscore}</p>
        <div>
          Score{" $"}
          <div className="score-numbers">
            <motion.p
              className="score"
              initial="initial"
              animate={isCorrect ? "correct" : "incorrect"}
              variants={numberVariants}
            >
              {isCorrect ? previousScore : score}
            </motion.p>
            <motion.p
              className="score"
              initial="initial"
              animate={isCorrect ? "correct" : "incorrect"}
              variants={numberVariants}
            >
              {isCorrect ? score : ""}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container-for-all">
        {displayAnswer ? (
          <div>
            <Player
              autoplay
              speed="1"
              src={isCorrect ? correctAlien : incorrectAlien}
              style={{ height: "200px", width: "200px" }}
            >
              <Controls
                visible={false}
                buttons={["play", "repeat", "frame", "debug"]}
              />
            </Player>
          </div>
        ) : (
          <Question question={questions[0].question} />
        )}

        <div>
          <Timer />
        </div>

        <Answer
          correct={questions[0].correctAnswer}
          allAnswers={allAnswers}
          questionAnswered={questionAnswered}
          correctAnswer={correctAnswer}
          isCorrect={isCorrect}
        />
      </div>
    </>
  );
}

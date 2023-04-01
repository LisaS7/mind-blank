import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setScore,
  setQuestions,
  nextQuestion,
  setCurrentQuestion,
  restartGame,
  toggleTimerStarted,
} from "../state/quizSlice";
import Answer from "../components/Answer";
import Question from "../components/Question";
import { correctAlien, incorrectAlien } from "../constants";
import Timer from "../components/Timer";
import Loading from "../components/Loading";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import "./QuizContainer.css";

export default function QuizContainer({ data, getData }) {
  const dispatch = useDispatch();
  const { questions, score, isCorrect, showAnswer, previousScore, highscore } =
    useSelector((state) => state.quiz);

  function handleReturn() {
    getData();
    dispatch(restartGame());
  }

  function handleReset() {
    dispatch(setScore(0));
    getData();
    dispatch(setQuestions(data));
    dispatch(toggleTimerStarted());
  }

  useEffect(() => {
    dispatch(setQuestions(data));
  }, [data]);

  useEffect(() => {
    dispatch(nextQuestion());
    if (questions.length) {
      const Q = questions[0];
      dispatch(
        setCurrentQuestion({
          question: Q.question,
          difficulty: Q.difficulty,
          correct: Q.correctAnswer,
          incorrect: Q.incorrectAnswers,
        })
      );
    }
  }, [questions]);

  if (!questions.length) return <Loading />;

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
        {showAnswer ? (
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
          <Question />
        )}

        <div>
          <Timer />
        </div>

        <Answer />
      </div>
    </>
  );
}

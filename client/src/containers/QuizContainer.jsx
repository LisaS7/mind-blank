import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuestions,
  nextCurrentQuestion,
  resetRound,
  restartGame,
} from "../state/quizSlice";
import Header from "../components/Quiz/Header";
import Answer from "../components/Quiz/Answer";
import Question from "../components/Quiz/Question";
import { correctAlien, incorrectAlien } from "../constants";
import Timer from "../components/Quiz/Timer";
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
    dispatch(resetRound());
    getData();
    dispatch(setQuestions(data));
  }

  useEffect(() => {
    dispatch(setQuestions(data));
  }, [data]);

  useEffect(() => {
    dispatch(nextCurrentQuestion());
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
      <Header getData={getData} data={data} />
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

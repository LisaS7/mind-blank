import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { correctAlien, incorrectAlien } from "../../constants";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import "./Question.css";

const questionVariant = {
  initial: { scale: 0 },
  animate: { scale: 1, transition: { duration: 1 } },
};

export default function Question() {
  const { question, isCorrect, showAnswer } = useSelector(
    (state) => state.quiz.current
  );

  if (showAnswer) {
    return (
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
    );
  }

  return (
    <motion.div
      className="question-container"
      variants={questionVariant}
      initial="initial"
      animate="animate"
    >
      <h3>{question}</h3>
    </motion.div>
  );
}

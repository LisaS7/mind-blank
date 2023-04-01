import "./Answer.css";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { correctAnswer } from "../state/quizSlice";
import { correctAnswerAudio, incorrectAnswerAudio } from "../constants";

const answersVariant = {
  initial: { y: "110vh" },
  animate: { y: 0, transition: { duration: 1.5 } },
};

export default function Answer({ questionAnswered }) {
  const dispatch = useDispatch();
  const { current, isCorrect } = useSelector((state) => state.quiz);

  const correctAudio = new Audio(correctAnswerAudio);
  const wrongAudio = new Audio(incorrectAnswerAudio);

  const handleAnswer = function (e) {
    if (e.target.textContent === current.correct) {
      dispatch(correctAnswer());
      correctAudio.play();
    } else {
      wrongAudio.play();
    }
    questionAnswered();
  };

  const allAnswers = [...current.incorrect, current.correct].sort();
  const answerElements = allAnswers.map((answer, index) => (
    <button
      className={
        isCorrect && answer === current.correct
          ? "correct-answer"
          : "answer-btn"
      }
      onClick={(e) => handleAnswer(e)}
      key={index}
    >
      {answer}
    </button>
  ));

  return (
    <motion.div
      className="answers-container"
      variants={answersVariant}
      initial="initial"
      animate="animate"
    >
      {answerElements}
    </motion.div>
  );
}

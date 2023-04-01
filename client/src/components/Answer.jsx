import "./Answer.css";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  correctAnswer,
  setShowAnswer,
  setQuestions,
  setCurrentQuestion,
} from "../state/quizSlice";
import {
  answerDelay,
  correctAnswerAudio,
  incorrectAnswerAudio,
} from "../constants";

const answersVariant = {
  initial: { y: "110vh" },
  animate: { y: 0, transition: { duration: 1.5 } },
};

export default function Answer() {
  const dispatch = useDispatch();
  const { questions, current, isCorrect } = useSelector((state) => state.quiz);

  const correctAudio = new Audio(correctAnswerAudio);
  const wrongAudio = new Audio(incorrectAnswerAudio);

  const handleAnswer = function (e) {
    if (e.target.textContent === current.correct) {
      dispatch(correctAnswer());
      correctAudio.play();
    } else {
      wrongAudio.play();
    }
    dispatch(setShowAnswer());
    setTimeout(function () {
      const questionsCopy = [...questions.slice(1)];
      dispatch(setQuestions(questionsCopy));

      const Q = questions[0];
      dispatch(
        setCurrentQuestion({
          question: Q.question,
          difficulty: Q.difficulty,
          correct: Q.correctAnswer,
          incorrect: Q.incorrectAnswers,
        })
      );
    }, answerDelay);
  };

  const allAnswers = [...current.incorrect, current.correct].sort();
  const answerElements = allAnswers.map((answer) => (
    <button
      className={
        isCorrect && answer === current.correct
          ? "correct-answer"
          : "answer-btn"
      }
      onClick={(e) => handleAnswer(e)}
      key={answer}
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

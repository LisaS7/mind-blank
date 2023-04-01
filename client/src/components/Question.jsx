import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import "./Question.css";

const questionVariant = {
  initial: { scale: 0 },
  animate: { scale: 1, transition: { duration: 1 } },
};

export default function Question() {
  const { question } = useSelector((state) => state.quiz.current);

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

import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { restartGame, resetRound, setQuestions } from "../../state/quizSlice";

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

export default function Header({ getData, data }) {
  const dispatch = useDispatch();
  const { score, isCorrect, previousScore, highscore } = useSelector(
    (state) => state.quiz
  );

  function handleReturn() {
    getData();
    dispatch(restartGame());
  }

  function handleReset() {
    dispatch(resetRound());
    getData();
    dispatch(setQuestions(data));
  }

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
    </>
  );
}

import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { restartGame, resetRound, setQuestions } from "../../state/quizSlice";

export default function Header({ getData, data }) {
  const dispatch = useDispatch();

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
    <div>
      <button onClick={handleReturn}>Return To Menu</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

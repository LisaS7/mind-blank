import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setStatus } from "../../state/quizSlice";
import fullCurtain from "./curtain-full.png";
import startShow from "./start-show-button.png";

const startButtonVariants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    y: [0, 25, 0],
    transition: {
      delay: 1.25,
      scale: { duration: 1 },
      y: { repeat: Infinity, duration: 1.5 },
    },
  },
};

const curtainVariants = {
  initial: { y: "-100vh" },
  animate: { y: 0, transition: { duration: 2 } },
};

export default function Start() {
  const dispatch = useDispatch();

  return (
    <div className="app-container">
      <motion.img
        className="full-curtain"
        initial="initial"
        animate="animate"
        variants={curtainVariants}
        src={fullCurtain}
      />
      <motion.img
        initial="initial"
        animate="animate"
        variants={startButtonVariants}
        className="start-app-button"
        src={startShow}
        alt="start show button"
        onClick={() => {
          dispatch(setStatus("intro"));
        }}
      />
    </div>
  );
}

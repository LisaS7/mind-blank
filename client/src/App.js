import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setStatus } from "./state/quizSlice";
import "./App.css";
import Intro from "./components/Intro/Intro";
import GameContainer from "./containers/GameContainer";
import MusicPlayer from "./components/Music/MusicPlayer";
import fullCurtain from "./components/Intro/curtain-full.png";
import startShow from "./components/Intro/start-show-button.png";

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

function App() {
  const { status } = useSelector((state) => state.quiz);
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleClick = () => {
    togglePlay();
    setTimeout(() => {
      dispatch(setStatus("play"));
    }, "100");
  };

  switch (status) {
    case "start":
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
    case "intro":
      return (
        <div className="app-container">
          <Intro handleClick={handleClick} isPlaying={isPlaying} />
        </div>
      );

    case "play":
      return (
        <div className="App">
          <MusicPlayer />
          <GameContainer />
        </div>
      );
  }
}

export default App;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStatus } from "./state/quizSlice";
import "./App.css";
import Intro from "./components/Intro/Intro";
import GameContainer from "./containers/GameContainer";
import MusicPlayer from "./components/Music/MusicPlayer";
import Start from "./components/Intro/start";

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
      dispatch(setStatus("menu"));
    }, "100");
  };

  switch (status) {
    case "start":
      return <Start />;

    case "intro":
      return (
        <div className="app-container">
          <Intro handleClick={handleClick} isPlaying={isPlaying} />
        </div>
      );

    case "play":
    default:
      return (
        <div className="App">
          <MusicPlayer />
          <GameContainer />
        </div>
      );
  }
}

export default App;

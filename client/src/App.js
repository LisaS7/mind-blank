import { useSelector } from "react-redux";
import "./App.css";
import Intro from "./components/Intro/Intro";
import GameContainer from "./containers/GameContainer";
import MusicPlayer from "./components/Music/MusicPlayer";
import Start from "./components/Intro/start";

function App() {
  const { status } = useSelector((state) => state.quiz);

  switch (status) {
    case "start":
      return <Start />;

    case "intro":
      return (
        <div className="app-container">
          <Intro />
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

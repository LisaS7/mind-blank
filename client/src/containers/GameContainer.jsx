import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHighScore, newHighScore } from "../state/quizSlice";
import GameEnd from "../components/GameEnd/GameEnd";
import { GameMenu } from "../components/GameMenu";
import Loading from "../components/Loading";
import QuizContainer from "./QuizContainer";
import { getHighscores, postHighscores } from "../HighscoreService";

export default function GameContainer() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [score, setScore] = useState(0);

  const { status, categories, difficulty, highscore } = useSelector(
    (state) => state.quiz
  );

  async function getData() {
    const url = `https://the-trivia-api.com/api/questions?${
      categories.list.length && `categories=${categories.urlString}`
    }&limit=50&${difficulty && `difficulty=${difficulty.toLowerCase()}`}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    setData(jsonData);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getHighscores().then((highscoreData) => {
      dispatch(setHighScore(highscoreData));
    });
  }, []);

  if (gameEnded && score > highscore) {
    dispatch(newHighScore(score));
    postHighscores({ highscore: score });
  }

  if (!data.length) return <Loading />;

  if (status === "menu") {
    return (
      <div>
        <div className="logo">
          <b>
            M<span>in</span>d<span></span> <span>B</span>lan<span>k</span>
          </b>
        </div>
        <GameMenu />
      </div>
    );
  }

  if (gameEnded) {
    return (
      <div>
        <GameEnd
          score={score}
          setGameEnded={setGameEnded} // remove
          setScore={setScore}
          getData={getData}
        />
      </div>
    );
  }

  return (
    <div>
      <QuizContainer
        data={data}
        gameEnded={gameEnded}
        setGameEnded={setGameEnded}
        getData={getData}
        score={score}
        setScore={setScore}
      />
    </div>
  );
}

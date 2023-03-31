import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameEnd from "../components/GameEnd/GameEnd";
import { GameMenu } from "../components/GameMenu";
import Loading from "../components/Loading";
import QuizContainer from "./QuizContainer";
import { getHighscores, postHighscores } from "../HighscoreService";

export default function GameContainer() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  // const [difficulty, setDifficulty] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [highscores, setHighscores] = useState([]);

  const { list, urlString } = useSelector((state) => state.quiz.categories);
  const categories = [...list];
  const urlCategory = urlString;
  const { difficulty } = useSelector((state) => state.quiz);

  async function getData() {
    const url = `https://the-trivia-api.com/api/questions?${
      categories.length && `categories=${urlCategory}`
    }&limit=50&${difficulty && `difficulty=${difficulty.toLowerCase()}`}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    setData(jsonData);
  }

  useEffect(() => {
    getData();
  }, [difficulty]);

  //  BACKEND SCORE DATA SECTION
  useEffect(() => {
    getHighscores().then((allHighscores) => {
      setHighscores(allHighscores);
    });
  }, []);

  const eachHighScore = highscores.map((highscore) => {
    return highscore.highscore;
  });
  // this gets back an array of scores

  let highestScore;
  if (highscores.length) {
    highestScore = Math.max.apply(Math, eachHighScore);
  } else {
    highestScore = 0;
  }

  if (gameEnded && score > highestScore) {
    setHighscores([...highscores, score]);
    postHighscores({ highscore: score });
  }

  if (!data.length) return <Loading />;

  if (!startGame) {
    return (
      <div>
        <div className="logo">
          <b>
            M<span>in</span>d<span></span> <span>B</span>lan<span>k</span>
          </b>
        </div>
        <GameMenu setStartGame={setStartGame} />
      </div>
    );
  }

  if (gameEnded) {
    return (
      <div>
        <GameEnd
          score={score}
          setStartGame={setStartGame}
          setGameEnded={setGameEnded}
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
        setStartGame={setStartGame}
        getData={getData}
        highestScore={highestScore}
        score={score}
        setScore={setScore}
      />
    </div>
  );
}

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHighScore } from "../state/quizSlice";
import { getHighscores } from "../HighscoreService";
import GameEnd from "../components/GameEnd/GameEnd";
import { GameMenu } from "../components/GameMenu";
import Loading from "../components/Loading";
import QuizContainer from "./QuizContainer";

export default function GameContainer() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const { status, categories, difficulty } = useSelector((state) => state.quiz);

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

  if (status === "end") {
    return (
      <div>
        <GameEnd getData={getData} />
      </div>
    );
  }

  return (
    <div>
      <QuizContainer data={data} getData={getData} />
    </div>
  );
}

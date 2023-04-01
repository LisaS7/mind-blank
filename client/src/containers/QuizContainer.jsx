import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions, nextCurrentQuestion } from "../state/quizSlice";
import Header from "../components/Quiz/Header";
import Answer from "../components/Quiz/Answer";
import Question from "../components/Quiz/Question";
import Timer from "../components/Quiz/Timer";
import Loading from "../components/Loading";
import "./QuizContainer.css";

export default function QuizContainer({ data, getData }) {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(setQuestions(data));
  }, [data]);

  useEffect(() => {
    dispatch(nextCurrentQuestion());
  }, [questions]);

  if (!questions.length) return <Loading />;

  return (
    <>
      <Header getData={getData} data={data} />
      <div className="container-for-all">
        <Question />

        <Timer />

        <Answer />
      </div>
    </>
  );
}

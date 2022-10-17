import "../../App.css";
import Spinner from "react-bootstrap/Spinner";
import NavBar from "../../Component/NavBar";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dataAnswer, answerAPI } from "../../features/Users";

const axios = require("axios");
function GameManagement() {
  const [isLoading, setIsLoading] = useState(false);

  const [image, SetImage] = useState(null);
  const [isLastPlayer, setIsLastPlayer] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  const users = useSelector((state) => state.users.users);
  const limitMatch = useSelector((state) => state.users.limitMatch);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const YES = "yes";
  const NO = "no";
  const [answer, setAnswer] = useState(null);
  const [match, setMatch] = useState(1);
  const [isCorrect, setIsCorrect] = useState(null);
  const [indexPlayer, setIndexPlayer] = useState(1);
  const [playerOne, setPlayerOne] = useState();
  const [playerTwo, setPlayerTwo] = useState();
  const [namePlayers, setNamePlayers] = useState();

  const [answerPlayerOne, setAnswerPlayerOne] = useState();
  const [answerPlayerTwo, setAnswerPlayerTwo] = useState();

  useEffect(() => {
    setNamePlayers({
      index: 0,
      name: users[0].name,
    });
    setPlayerOne(users[0].name);
    setPlayerTwo(users[1].name);
  }, []);

  const handleYes = (value) => {
    setAnswer(value);
  };
  const handleNo = (value) => {
    setAnswer(value);
  };
  const handleAnswer = async () => {
    setIndexPlayer(indexPlayer + 1);
    setAnswer(null);
    if (indexPlayer === 1) {
      setAnswerPlayerOne(answer);
    } else if (indexPlayer === 2) {
      setAnswerPlayerTwo(answer);
    } else {
      return;
    }
    if (indexPlayer === 2) {
      setIndexPlayer(null);
      setIsLastPlayer(true);
    }
  };
  const handleNext = async () => {
    await axios({
      method: "get",
      url: "https://yesno.wtf/api",
    }).then(function (res, req) {
      dispatch(
        dataAnswer({
          match,
          playerOne,
          playerTwo,
          answerPlayerOne,
          answerPlayerTwo,
          answerApi: res.data.answer,
        })
      );
    });
    setIndexPlayer(1);
    setMatch(match + 1);
    setIsLastPlayer(false);
    // setIsLoading(false);
    if (match === limitMatch && users[users.length - 1]) {
      await axios({
        method: "get",
        url: "https://yesno.wtf/api",
      }).then(function (res, req) {
        dispatch(
          dataAnswer({
            match,
            playerOne,
            playerTwo,
            answerPlayerOne,
            answerPlayerTwo,
            answerApi: res.data.answer,
          })
        );
        navigate("/GamePlay");
      });
    }
  };
  console.log("playerOne", playerOne, playerTwo);
  return (
    <div className='screenGameManagement'>
      <NavBar />
      <div className='containerScreenGameManagement'>
        <div className='match'>Match {match}</div>
        {indexPlayer === null ? (
          <div></div>
        ) : (
          <div className='player'>
            Player : {indexPlayer === 1 ? playerOne : playerTwo}
          </div>
        )}
        <div></div>
        <div className='yesOrno'>
          <Button
            className={answer === "yes" && "backgroup-yes"}
            variant='outline-info'
            onClick={() => {
              handleYes(YES);
            }}
          >
            Yes
          </Button>
          <div className='defaultDiv'>
            {isCorrect != null &&
              (typeof isCorrect === "boolean" ? (
                <img className='gifImage' src={image} />
              ) : (
                <div
                  className={`result ${
                    isCorrect === "Correct"
                      ? "backgroup-correct"
                      : "backgroup-incorrect"
                  }`}
                >
                  <h3>{isCorrect}</h3>
                </div>
              ))}
          </div>
          <Button
            className={answer === "no" && "backgroup-no"}
            variant='outline-warning'
            onClick={() => {
              handleNo(NO);
            }}
          >
            No
          </Button>
        </div>
        {isLastPlayer ? (
          // <div className='imageAnswer'>
          //   <Button
          //     variant='primary'
          //     onClick={() => {
          //       navigate("/GamePlay");
          //     }}
          //   >
          //     View
          //   </Button>
          // </div>
          // ) : isLastPlayer ? (
          <div className='imageAnswer'>
            <Button
              variant='secondary'
              onClick={() => {
                handleNext();
              }}
            >
              Next
            </Button>
          </div>
        ) : (
          <div className='imageAnswer'>
            {!isLoading ? (
              <Button
                variant='primary'
                onClick={() => {
                  handleAnswer();
                }}
              >
                Submit
              </Button>
            ) : (
              <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GameManagement;

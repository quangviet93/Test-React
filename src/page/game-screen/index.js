import "../../App.css";
import Spinner from "react-bootstrap/Spinner";
import NavBar from "../../Component/NavBar";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dataAnswer } from "../../features/Users";

const axios = require("axios");
function GameManagement() {
  const [isLoading, setIsLoading] = useState(false);

  const [isLastPlayer, setIsLastPlayer] = useState(false);

  const users = useSelector((state) => state.users.users);
  const limitMatch = useSelector((state) => state.users.limitMatch);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const YES = "yes";
  const NO = "no";
  const [answer, setAnswer] = useState(null);
  const [match, setMatch] = useState(1);
  const [indexPlayer, setIndexPlayer] = useState(1);
  const [playerOne, setPlayerOne] = useState();
  const [playerTwo, setPlayerTwo] = useState();

  const [answerPlayerOne, setAnswerPlayerOne] = useState();
  const [answerPlayerTwo, setAnswerPlayerTwo] = useState();

  useEffect(() => {
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
    if (answer) {
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
    } else {
      alert("Please choose the answer !");
    }
  };
  const handleNext = async () => {
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
    } else {
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
    }
  };
  return (
    <div className='screenGameManagement'>
      <NavBar />
      <div className='containerScreenGameManagement'>
        <div className='match'>Match {match}</div>
        {indexPlayer === null ? (
          <div className='player'>Continue</div>
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

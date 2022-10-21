import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "react-bootstrap/Spinner";
import NavBar from "../../Component/NavBar";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dataAnswer } from "../../features/Users";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import image from "../../image1.jpg";

const axios = require("axios");
function GameManagement() {
  const users = useSelector((state) => state.users.users);
  const limitMatch = useSelector((state) => state.users.limitMatch);
  const answerStore = useSelector((state) => state.users.answer);

  const [answerPlayerFirst, setAnswerPlayerFirst] = useState([]);
  const [answerPlayerLast, setAnswerPlayerLast] = useState([]);
  const [answerApi, setAnswerApi] = useState([]);

  const [winner, setWinner] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const covertArray = Array.from(Array(limitMatch).keys());

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setAnswerPlayerFirst(
      covertArray.map(() => {
        return "yes";
      })
    );
    setAnswerPlayerLast(
      covertArray.map(() => {
        return "no";
      })
    );
    handleWinner();
    const answerApiStore = Object.values(answerStore)[0]?.answersApi;
    setAnswerApi(answerApiStore);
  }, [isLoading, answerStore]);
  const userFirst = Object.values(answerStore);
  const handleWinner = () => {
    let newData = {};
    userFirst.forEach((user, i) => {
      user.win.forEach((win, index) => {
        if (win === true) newData[i + "-" + index] = user.name;
      });
      setWinner(newData);
    });
  };

  const handleAnswer = async () => {
    let answersApi = [];
    setIsLoading(null);
    covertArray.forEach(async () => {
      await axios({
        method: "get",
        url: "https://yesno.wtf/api",
      })
        .then(function (res, req) {
          let api = res.data.answer;
          answersApi = [...answersApi, api];
          let result = {};
          users.forEach((user) => {
            let data = {
              score: 0,
              win: [],
              date: new Date().toLocaleString(),
              isValid: false,
            };
            if (user.id === 1) {
              data.name = user.name;
              data.answers = answerPlayerFirst;
              data.answersApi = answersApi;
              answerPlayerFirst.forEach((item, index) => {
                if (item === answersApi[index]) {
                  data.score += 1;
                  data.win.push(true);
                } else {
                  data.win.push(false);
                }
              });
            } else {
              data.name = user.name;
              data.answers = answerPlayerLast;
              data.answersApi = answersApi;
              answerPlayerLast.forEach((item, index) => {
                if (item === answersApi[index]) {
                  data.score += 1;
                  data.win.push(true);
                } else {
                  data.win.push(false);
                }
              });
            }
            result[user.name] = data;
          });
          dispatch(dataAnswer(result));
          setIsLoading(true);
        })
        .catch((error) => console.log(error));
    });
    setAnswerApi(answersApi);
  };
  return (
    <div className='screenGameManagement'>
      <NavBar />
      <div className='containerScreenGameManagement'>
        <div className='fz name-player'>
          <p>
            <Badge variant='secondary'>Player :</Badge>
          </p>
          <p className='playerA'>{users[0].name}</p>
          <p>,</p>
          <p className='playerB'>{users[1].name}</p>
        </div>
        {isLoading === false && (
          <div className='round'>
            {covertArray.map((e) => (
              <div className='round-item'>
                <div className='fz'>Round {e + 1}:</div>
                <div className='yesNo'>
                  <div className='yes'>
                    <FontAwesomeIcon icon={faCheck} />
                    YES
                  </div>
                  <div className='no'>
                    <FontAwesomeIcon icon={faXmark} />
                    NO
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isLoading === null && (
          <div className='skeletons'>
            {covertArray.map((e) => (
              <div className=''>
                <Skeleton height={100} width='100%' />
              </div>
            ))}
          </div>
        )}
        {isLoading === true && (
          <>
            <div>
              <div className='sum-result'>
                {answerApi.map((e, index) => (
                  <div className='item-result'>
                    {Object.values(winner).map((y, indexAfter) => (
                      <>
                        {indexAfter === index && (
                          <div className='fz'>Round : {indexAfter + 1}</div>
                        )}
                        <div className='result'>
                          <div className='result-content'>
                            {indexAfter === index && (
                              <>
                                <div className='result-left'>
                                  <div>{"Result : " + e}</div>
                                  <div className='result-win'>
                                    {"Win : " + y}
                                  </div>
                                </div>
                                <div className='image-win'>
                                  <img src={image} />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                ))}
              </div>
              <div></div>
            </div>
          </>
        )}
        <div className='btn-sub-answer'>
          {isLoading === null && <Spinner animation='border' />}
          {isLoading === false && (
            <Button variant='danger' onClick={handleAnswer}>
              Submit Answer
            </Button>
          )}
          {isLoading === true && (
            <Button variant='success' onClick={() => navigate("/History")}>
              Summary
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameManagement;

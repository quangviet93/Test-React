import React from "react";
import "./index.scss";
import NavBar from "../../Component/NavBar";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";

export default function GamePlay() {
  const [loading, setLoading] = useState(null);
  const [test, setTest] = useState(false);

  const navigate = useNavigate();

  const data = useSelector((state) => state.users.answer);
  const namePlayer = useSelector((state) => state.users.users);

  const handleAnswer = () => {
    setLoading(true);
    setTimeout(() => {
      setTest(true);
      setLoading(false);
    }, 1000);
  };
  return (
    <div className='game-play'>
      <div>
        <NavBar />
      </div>
      <div className='name-players'>
        <div>
          <h1>Player :</h1>
        </div>
        <div className='name-player'>
          {Object.values(namePlayer).map((e) => (
            <h2>{e.name}</h2>
          ))}
        </div>
      </div>
      <div className='item-round'>
        {Object.values(data).map((e, i) => {
          const C = Object.keys(e);
          const namePlayerOne = C[0];
          const namePlayerTwo = C[1];
          const nameApi = C[2];
          return (
            <div className='item'>
              {loading === true ? (
                <Skeleton height={300} />
              ) : (
                <>
                  <div>
                    <h2>
                      <Badge bg='secondary'>Round : {i + 1}</Badge>
                    </h2>
                  </div>
                  <div className='item-player'>
                    {test === false && (
                      <>
                        <div>
                          <p> {namePlayerOne}</p>{" "}
                          <button
                            className={
                              e[namePlayerOne] === "yes"
                                ? "color-yes"
                                : "color-no"
                            }
                          >
                            {e[namePlayerOne]}
                          </button>
                        </div>
                        <div>
                          <p>{namePlayerTwo}</p>{" "}
                          <button
                            className={
                              e[namePlayerTwo] === "yes"
                                ? "color-yes"
                                : "color-no"
                            }
                          >
                            {e[namePlayerTwo]}
                          </button>
                        </div>
                      </>
                    )}
                    {test === true && (
                      <div>
                        <div className='result'>
                          <p>Result :</p> <button>{e[nameApi]}</button>
                        </div>
                        <div>
                          <p className='player-win'>
                            <Badge bg='secondary'>Win : {e.win}</Badge>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className='button-submit'>
        {!test ? (
          <Button variant='danger' onClick={handleAnswer}>
            Submit answer
          </Button>
        ) : (
          <Button variant='success' onClick={() => navigate("/History")}>
            Summary
          </Button>
        )}
      </div>
    </div>
  );
}

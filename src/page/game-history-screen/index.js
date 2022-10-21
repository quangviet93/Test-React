import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import NavBar from "../../Component/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import BootstrapTable from "react-bootstrap-table-next";
import { searchPlayerName } from "../../features/Users";

function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const answersHistory = useSelector((state) => state.users.answer);
  const [searchNamePlayer, setSearchNamePlayer] = useState();

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "time",
      text: "Date",
    },
    {
      dataField: "answer",
      text: "Answer",
    },
    {
      dataField: "answerApi",
      text: "Result",
    },
  ];

  const point = Object.keys(answersHistory).map((e) => {
    return answersHistory[e].score;
  });

  const biggestPoint = point.sort(function (a, b) {
    return a - b;
  });

  const arrayTest = [];
  const winner = Object.keys(answersHistory).filter((e) => {
    arrayTest.push(answersHistory[e].score);
    arrayTest.sort();
    if (answersHistory[e].score === biggestPoint[biggestPoint.length - 1]) {
      return answersHistory[e].name;
    }
  });
  const handleSearch = () => {
    dispatch(searchPlayerName(searchNamePlayer));
  };
  useEffect(() => {
    handleSearch();
  }, [searchNamePlayer]);
  const CovertObjInArray = Object.values(answersHistory);
  const products = CovertObjInArray.map((e) => {
    return {
      ...e,
      time: e.date,
      answerApi: e.answersApi.join(" | "),
      answer: e.answers.join(" | "),
    };
  });
  return (
    <div className='screenGameManagement'>
      <NavBar />
      <div className='inputSearch'>
        <InputGroup size='lg'>
          <Form.Control
            onChange={(e) => {
              setSearchNamePlayer(e.target.value);
              handleSearch();
            }}
            placeholder='Search by player name'
            aria-label='Large'
            aria-describedby='inputGroup-sizing-sm'
          />
        </InputGroup>
      </div>
      <BootstrapTable keyField='id' data={products} columns={columns} />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Summary</th>
            <th>Correct percent</th>
            <th>Total score</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(answersHistory).map(
            (e, index) =>
              answersHistory[e].isValid && (
                <tr key={index}>
                  <td>{answersHistory[e].name}</td>
                  <td>
                    {(
                      (100 / answersHistory[e].answers.length) *
                      answersHistory[e].score
                    ).toFixed(1)}
                    %
                  </td>
                  <td>{answersHistory[e].score}</td>
                </tr>
              )
          )}
        </tbody>
      </Table>
      <h2 className='titleWinner'>
        The Winner is :{" "}
        {arrayTest[0] === arrayTest[arrayTest.length - 1] ? "Draw" : winner[0]}
      </h2>
      <div className='buttonEndGame'>
        <Button
          variant='secondary'
          onClick={() => {
            navigate("/");
          }}
        >
          End Game
        </Button>
      </div>
    </div>
  );
}

export default History;

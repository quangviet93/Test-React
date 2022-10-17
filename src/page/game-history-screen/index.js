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

function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const answers = useSelector((state) => state.users.answer);

  const [searchNamePlayer, setSearchNamePlayer] = useState();

  const CovertObjInArray = Object.values(answers);

  const result = CovertObjInArray.reduce((pre, cur) => {
    const listNames = Object.keys(cur).slice(0, -2);
    const answerApi = cur.answerApi;
    const win = cur.win;

    listNames.forEach((name) => {
      if (pre[name]) {
        pre[name].answer.push(cur[name]);
        pre[name].answerApi.push(answerApi);
        if (win.includes(pre[name].name)) pre[name].score += 1;
      } else {
        pre[name] = {
          name: name,
          answer: [cur[name]],
          answerApi: [answerApi],
          score: 0,
          isValid: true,
        };
      }
    });
    return pre;
  }, {});

  const data = Object.values(result);
  const products = data.map((e) => {
    return {
      ...e,
      answerApi: e.answerApi.join(" | "),
      answer: e.answer.join(" | "),
    };
  });
  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
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
  const handleSearch = () => {
    Object.keys(result).forEach((e) => {
      if (
        e === searchNamePlayer ||
        searchNamePlayer === "" ||
        searchNamePlayer === undefined
      ) {
        result[e].isValid = true;
      } else {
        result[e].isValid = false;
      }
    });
  };
  useEffect(() => {
    handleSearch();
  }, [searchNamePlayer]);
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
          {Object.keys(result).map(
            (e, index) =>
              result[e].isValid && (
                <tr key={index}>
                  <td>{e}</td>
                  <td>
                    {(
                      (100 / result[e].answer.length) *
                      result[e].score
                    ).toFixed(1)}
                    %
                  </td>
                  <td>{result[e].score}</td>
                </tr>
              )
          )}
        </tbody>
      </Table>
      <h2 className='titleWinner'>The Winner is :</h2>
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

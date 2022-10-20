import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, addMatch } from "../features/Users";

function ModalCustom(props) {
  const userList = useSelector((state) => state.users.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [namePlayer, setNamePlayer] = useState(null);
  const [limitMatch, setLimitMatch] = useState(null);

  const handleSubmit = () => {
    if (namePlayer) {
      if (props.name === "Add" || props.name === "Add Player") {
        dispatch(
          addUser({
            id:
              userList.length === 0 ? 1 : userList[userList.length - 1].id + 1,
            name: namePlayer,
          })
        );
        if (props.name === "Add Player") {
          navigate("/ListPlayer");
        }
        props.handleCloseReply();
      }
      return;
    }
    if (limitMatch) {
      if (props.name === "Match") {
        dispatch(
          addMatch({
            limitMatch: limitMatch,
          })
        );
        props.handleCloseReply();
        navigate("/GameManagement");
      }
      return;
    }
  };
  return (
    <>
      <Modal show={props.props} onHide={props.handleCloseReply}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.name === "Add" && "Add New Player"}
            {props.name === "Add Player" && "Add New Player"}
            {props.name === "Match" && "Limit Match"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size='lg'>
            <InputGroup.Text id='inputGroup-sizing-lg'>
              {props.name}
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => {
                props.name === "Add" && setNamePlayer(e.target.value);
                props.name === "Add Player" && setNamePlayer(e.target.value);
                props.name === "Match" && setLimitMatch(e.target.value);
              }}
              aria-label='Large'
              aria-describedby='inputGroup-sizing-sm'
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={props.handleCloseReply}>
            Cancel
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              handleSubmit();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCustom;

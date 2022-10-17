import "../../App.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TitleGame from "../../Component/TitleGame";
import ModalCustom from "../../Component/ModalCustom";

function ListPlayer() {
  const [showReply, setShowReply] = useState(false);

  const handleCloseReply = () => setShowReply(false);
  const handleShowReply = () => setShowReply(true);

  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const userList = useSelector((state) => state.users.users);
  return (
    <div>
      <div className='displayUsers'>
        <TitleGame />
        <div className='tableUserList'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Stt</th>
                <th>First Name</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className='buttonListPlayer'>
            {userList.length < 2 && (
              <Button variant='warning' onClick={handleShowReply}>
                Add More Player
              </Button>
            )}
            {showReply && (
              <ModalCustom
                name={"Add"}
                props={showReply}
                handleCloseReply={() => {
                  handleCloseReply();
                }}
              />
            )}
            {userList.length === 2 && (
              <Button variant='primary' onClick={handleShowDelete}>
                Start The Game
              </Button>
            )}
            {showDelete && (
              <ModalCustom
                name={"Match"}
                props={showDelete}
                handleCloseReply={() => {
                  handleCloseDelete();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPlayer;

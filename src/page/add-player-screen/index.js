import "../../App.css";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import ModalCustom from "../../Component/ModalCustom";
import TitleGame from "../../Component/TitleGame";

function AddPlayer() {
  const [showReply, setShowReply] = useState(false);

  const handleCloseReply = () => setShowReply(false);
  const handleShowReply = () => setShowReply(true);

  return (
    <div className='screenAddPlayer'>
      <div>
        <TitleGame />
      </div>
      <div>
        <Button
          className='buttonAddPlayer'
          variant='primary'
          onClick={handleShowReply}
        >
          AddPlayer
        </Button>
        {showReply && (
          <ModalCustom
            name={"Add Player"}
            props={showReply}
            handleCloseReply={() => {
              handleCloseReply();
            }}
          />
        )}
      </div>
    </div>
  );
}
export default AddPlayer;

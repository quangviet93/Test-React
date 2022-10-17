import "../../App.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import TitleGame from "../../Component/TitleGame";
import { reset } from "../../features/Users";

const StartGame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='screenStartGame'>
      <div>
        <TitleGame />
      </div>
      <div>
        <Button
          className='buttonAddPlayer'
          variant='primary'
          onClick={() => {
            navigate("/AddPlayer");
            dispatch(reset());
          }}
        >
          Start Game
        </Button>{" "}
      </div>
    </div>
  );
};
export default StartGame;

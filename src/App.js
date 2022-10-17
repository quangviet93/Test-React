import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartGame from "./page/game-start-screen/index";
import AddPlayer from "./page/add-player-screen/index";
import ListPlayer from "./page/list-player-screen/index.";
import GameManagement from "./page/game-screen/index";
import History from "./page/game-history-screen/index";
import GamePlay from "./page/game-play/index";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StartGame />}></Route>
        <Route path='/StartGame' element={<StartGame />}></Route>
        <Route path='/AddPlayer' element={<AddPlayer />}></Route>
        <Route path='/ListPlayer' element={<ListPlayer />}></Route>
        <Route path='/GamePlay' element={<GamePlay />}></Route>
        <Route path='/GameManagement' element={<GameManagement />}></Route>
        <Route path='/History' element={<History />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import "./NavBar.css";
import Button from "react-bootstrap/Button";

function NavBar() {
  return (
    <div className='navbar'>
      <h1 className='title-game'>Yes No WTF GAME</h1>
      <div>
        <Button variant='secondary'>Player History</Button>
      </div>
    </div>
  );
}

export default NavBar;

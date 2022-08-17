import React, { useState, useEffect } from "react";
//import "./dice.css";
import Slot from "./Slot.js";
import styled from "@emotion/styled";


const config = {
  inverted: false, // true: reels spin from top to bottom; false: reels spin from bottom to top
};


const SlotComponent = ({ isRolling, rotate, diceValue}) => {

  //const slot = new Slot(document.getElementById("slot"), config);
  useEffect(() => {
    const slot = new Slot(document.getElementById("slot"), config);
  }, [document])


	return (
    <>
    <p style={{color: 'black'}}>{diceValue}</p>
		<div id="slot">
      <div id="reels">
        <div className="reel"></div>
        <div className="reel"></div>
        <div className="reel"></div>
        <div className="reel"></div>
        <div className="reel"></div>
      </div>
      <div id="controls" style={{ display: 'none' }}>
        <button type="button" id="won">SPIN</button>
        <button type="button" id="lost">SPIN</button>
      </div>
    </div>
    </>
	);
};

export default SlotComponent;

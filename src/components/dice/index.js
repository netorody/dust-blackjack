import React, { useState } from "react";
//import "./dice.css";
import constants from '../../utils/constants';

const { colors } = constants;
const { secondaryBackground } = colors;

const Dice = ({ isRolling, rotate, diceValue }) => {


	return (
		<>
			{/* <p style={{ color: secondaryBackground }}>{diceValue}</p> */}
			<div className="scene dim mt2 mb4 " >
				<div className="cube" style={{ transform: rotate, transition: `transform ${isRolling ? '10000s' : '0s'}` }}>
					<div className="bg-white cube__face cube__face--front front">
						<span className="dot dot1" />
					</div>
					<div className="bg-white cube__face cube__face--back back">
						<span className="dot dot1" />
						<span className="dot dot2" />
					</div>
					<div className=" bg-white cube__face cube__face--right right">
						<span className="dot dot1" />
						<span className="dot dot2" />
						<span className="dot dot3" />
					</div>
					<div className=" bg-white cube__face cube__face--left left">
						<span className="dot dot1" />
						<span className="dot dot2" />
						<span className="dot dot3" />
						<span className="dot dot4" />
					</div>
					<div className="bg-white cube__face cube__face--top top">
						<span className="dot dot1" />
						<span className="dot dot2" />
						<span className="dot dot3" />
						<span className="dot dot4" />
						<span className="dot dot5" />
					</div>
					<div className=" bg-white cube__face cube__face--bottom bottom">
						<span className="dot dot1" />
						<span className="dot dot2" />
						<span className="dot dot3" />
						<span className="dot dot4" />
						<span className="dot dot5" />
						<span className="dot dot6" />
					</div>
				</div>
			</div>
		</>
	);
};
export default Dice;

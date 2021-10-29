import React from 'react';

// import Appointment from "components/Appointment";

import './styles.scss';
export default function Appointment(props) {
	console.log(props);
  return (
		<article className="appointment">
			{!props.time && <p>No Appointment </p>}
			{props.time && <p> Appointment @ {props.time} </p>}
		</article>
	);
}

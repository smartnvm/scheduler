import React from 'react';

//const
import { icons } from '../../data/AppointmentVars';

export default function Confirm(props) {
	const { message } = props;

	return (
		<main className="appointment__card appointment__card--status">
			<img
				className="appointment__status-image"
				src={icons.status}
				alt="Loading"
			/>
			<h1 className="text--semi-bold">{message}</h1>
		</main>
	);
}

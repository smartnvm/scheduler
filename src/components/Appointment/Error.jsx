import React from 'react';

//const
import { icons } from '../../data/AppointmentVars';

export default function Error(props) {
	const { message } = props;

	return (
		<main className="appointment__card appointment__card--error">
			<section className="appointment__error-message">
				<h1 className="text--semi-bold">Error</h1>
				<h3 className="text--light">{message}</h3>
			</section>
			<img
				className="appointment__error-close"
				src={icons.close}
				alt="Close"
			/>
		</main>
	);
}

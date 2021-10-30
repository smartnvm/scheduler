import React, { Fragment } from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

// import Appointment from "components/Appointment";

import './styles.scss';
export default function Appointment(props) {
	const { time, interview } = props;

	const fnAdd = (param) => {
		console.log(param);
	};

	const fnEdit = (param) => {
		console.log(param);
	};

	const fnDelete = (param) => {
		console.log(param);
	};

	let showProps = {};
	if (interview) {
		showProps.key = props.id;
		showProps.interviewer = interview.interviewer;
		showProps.student = interview.student;
		showProps.onEdit = fnEdit;
		showProps.onDelete = fnDelete;
	}

	console.log('------[showProps]-----', showProps);
	const timeSlots = ['12pm', '1pm', '2pm', '3pm', '4pm'];
	return (
		<>
			<Header time={time} />
			<article className="appointment">
        {interview && <Show {...showProps} />}
        {timeSlots.includes(time) && <Empty onAdd={fnAdd} time={time} />}
			</article>
		</>
	);
}

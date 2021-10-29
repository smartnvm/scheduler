import React, { useState } from 'react';

import 'components/Application.scss';

import days from '../data/days';

import SideNav from './SideNav';

export default function Application(props) {
	//iniitalize day to Monday
	const [day, setDay] = useState('Monday');

	//SideNav child component properties required
	//<DayList days={days} day={day} setDay={setDay} />
	const sideNavProps = {
		days,
		day,
		setDay,
	};

	return (
		<main className="layout">
			<section className="sidebar">
				{/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
				<SideNav {...sideNavProps} />
			</section>

			<section className="schedule">
				{/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
			</section>
		</main>
	);
}

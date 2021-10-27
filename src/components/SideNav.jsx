import React, { Fragment } from 'react';

function SideNav(props) {
	
  return (
		<Fragment>
			<img
				className="sidebar--centered"
				src="images/logo.png"
				alt="Interview Scheduler"
			/>
			<hr className="sidebar__separator sidebar--centered" />
			<nav className="sidebar__menu"></nav>
			<img
				className="sidebar__lhl sidebar--centered"
				src="images/lhl.png"
				alt="Lighthouse Labs"
			/>
		</Fragment>
	);
}

export default SideNav;

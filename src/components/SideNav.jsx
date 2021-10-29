import React, { Fragment } from 'react';
import DayList from './DayList';


function SideNav(props) {
	
  //since the App needs to know the day in interviwer module
  //we manage the state in parent component
  console.log('----[sideNav Props]----\n',props);

  
	return (
		<Fragment>
			<img
				className="sidebar--centered"
				src="images/logo.png"
				alt="Interview Scheduler"
			/>
			<hr className="sidebar__separator sidebar--centered" />
			<nav className="sidebar__menu">
      <DayList {...props} />
        
			</nav>

			<img
				className="sidebar__lhl sidebar--centered"
				src="images/lhl.png"
				alt="Lighthouse Labs"
			/>
		</Fragment>
	);
}

export default SideNav;

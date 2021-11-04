import React, { Fragment } from 'react';
import DayList from './DayList';
import {icons} from '../data/AppointmentVars'

function SideNav(props) {
	
  // since the App needs to know the day in interviwer module
  // we manage the state in parent component
  //console.log('----[sideNav Props]----\n',props);
  
  // props are passed from parent to child component DayList
	return (
		<Fragment>
			<img
				className="sidebar--centered"
				src={icons.logo.src}
				alt={icons.logo.alt}
			/>
			<hr className="sidebar__separator sidebar--centered" />
			<nav className="sidebar__menu">
      <DayList {...props} />
			</nav>
			<img
				className="sidebar__lhl sidebar--centered"
				src={icons.footer.src}
				alt={icons.footer.alt}
			/>
		</Fragment>
	);
}

export default SideNav;

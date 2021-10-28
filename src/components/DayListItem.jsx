import React from 'react';
import 'components/DayListItem.scss';

import classNames from 'classnames';

export default function DayListItem(props) {
	console.log(props);
	const { name, spots, setDay, selected } = props;
	let dayList = 'day-list__item';

	dayList = classNames(
		dayList,
		{ 'day-list__item--full': !spots },
		{ 'day-list__item--selected': selected }
	);

	function handleDay() {
		setDay(name);
	}

	console.log(dayList);
	return (
		<li className={dayList} onClick={handleDay}>
			<h2 className="text--regular">{name}</h2>
			{spots > 1 && <h3 className="text--light">{spots} spots remaining</h3>}
			{spots === 1 && <h3 className="text--light">{spots} spot remaining</h3>}
			{!spots && <h3 className="text--light">no spots remaining</h3>}
		</li>
	);
}

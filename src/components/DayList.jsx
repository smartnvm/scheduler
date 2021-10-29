import DayListItem from './DayListItem';
import React from 'react';

export default function DayList(props) {
	// console.log(props);
	// console.log('---------------------');

  // Verbose way passing individual key = value
	// const parsedDayList = props.days.map((day) => (
	// 	<DayListItem
	// 		key={day.id}
	// 		name={day.name}
	// 		spots={day.spots}
	// 		selected={day.name === props.day}
	// 		onChange={props.onChange}
	// 		//This one has to be props because we are passing it down from Application's nav
	// 	>
	// 		{day}
	// 	</DayListItem>
	// ));

  // here we assemble the props object first, i.e. var = {}
  // require to spread the object props prior to passing {...vars} 
	const {days, day, onChange} = props
  const parsedDayList = days.map((elem) => {
		const vars = {
			// Warning: Each child in a list should have a unique "key" prop.
			key: elem.id,

      //for DayListItem(props) 
      //const { name, spots, onChange, selected } = props;
			name: elem.name,
			spots: elem.spots,
			onChange: onChange,
			selected: elem.name === day,
		};

    return (
      <DayListItem {...vars}>
        {day}
      </DayListItem>
    )
    
	});

  return (
    <ul>
      {parsedDayList}
    </ul>
  )
}

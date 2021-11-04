import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
	  // here we assemble the props object first, i.e. var = {}
  // require to spread the object props prior to passing {...vars} 
  const { dayList, day, onChange, loading } = props
	
  const parsedDayList = dayList.map((elem) => {
    
		const vars = {
			// Warning: Each child in a list should have a unique "key" prop.
			key: elem.id,

      //for DayListItem(props) 
      //const { name, spots, onChange, selected } = props;
			name: elem.name,
			spots: elem.spots,
      //pass onChange reference to DayListItem child
      //state is managed two levels up in main Application 
      onChange: onChange,
      selected: elem.name === day,
      loading,
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

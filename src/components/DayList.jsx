import DayListItem from "./DayListItem"
import React from "react"

export default function DayList(props) {
   console.log(props);
  console.log('---------------------');
  // const parsedDayList = props.days.map(day =>
    
  //   <DayListItem
  
  //   key={day.id}
  //   name={day.name}
  //   spots={day.spots}
  //   selected={day.name === props.day}
  //   setDay={props.setDay}  
  //   //This one has to be props because we are passing it down from Application's nav
  
  //   >
      
  //   {day}

  //     </DayListItem>)

	const parsedDayList = props.days.map((day) => {
		const vars = {
      // Warning: Each child in a list should have a unique "key" prop.
      key: day.id,
			
      //for DayListItem(props)
      name: day.name,
			spots: day.spots,
			setDay: props.setDay,
			selected: day.name === props.day
		};

    return <DayListItem {...vars}>
      {day}
    </DayListItem>;
	});

  
  return(
    <ul>
     {parsedDayList}
    </ul>
  )
}
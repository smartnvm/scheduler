import React from 'react';

//constants
import {icons} from '../../data/AppointmentVars'

export default function Header(props) {

  const { onAdd, time} = props;

  const fnAdd = () => {
    onAdd(time)
  }

	return (
		<main className="appointment__add" >
      <img className="appointment__add-button"
        onClick={fnAdd}
        src= {icons.add}
        alt="Add" />
		</main>
	);
}

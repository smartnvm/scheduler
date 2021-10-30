import React from 'react';

//constants
import {icons} from '../../data/AppointmentVars'

export default function Header(props) {

  const { onAdd, time} = props;

  const fnAdd = () => {
    onAdd(time)
  }

	return (
		<main className="appointment__add" onClick={fnAdd}>
      <img className="appointment__add-button"
        src= {icons.add}
        alt="Add" />
		</main>
	);
}

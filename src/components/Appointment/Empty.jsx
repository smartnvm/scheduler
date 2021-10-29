import React from 'react';

//constants
import {icons} from '../../data/AppointmentVars'

export default function Header(props) {

  const { onAdd } = props;
	return (
		<main className="appointment__add" onClick={onAdd}>
      <img className="appointment__add-button"
        src= {icons.add}
        alt="Add" />
		</main>
	);
}

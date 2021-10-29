import React from 'react';

//constants
import {images} from './AppointmentVars'

export default function Header(props) {

  const { onAdd } = props;
	return (
		<main className="appointment__add" onClick={onAdd}>
      <img className="appointment__add-button"
        src= {images.addIcon}
        alt="Add" />
		</main>
	);
}

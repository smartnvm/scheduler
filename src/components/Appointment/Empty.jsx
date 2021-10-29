import React from 'react';
import {addIcon} from './AppointmentVars'

export default function Header(props) {

  const { onAdd } = props;
	return (
		<main className="appointment__add" onClick={onAdd}>
      <img className="appointment__add-button"
        src={addIcon}
        alt="Add" />
		</main>
	);
}

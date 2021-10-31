import React from 'react';
//constants 
import { icons } from '../../data/AppointmentVars';


export default function Show(props) {
	const { student, interviewer, onEdit, onDelete } = props;
  // console.log(icons);

  const handleEdit = ()=> {
    onEdit(interviewer)
  }

  const handleDelete = () => {
    onDelete(interviewer)
  }

	return (
		<main className="appointment__card appointment__card--show">
			<section className="appointment__card-left">
				<h2 className="text--regular">{student}</h2>
				<section className="interviewer">
					<h4 className="text--light">Interviewer</h4>
					<h3 className="text--regular">{interviewer.name}</h3>
				</section>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<img
						className="appointment__actions-button"
						onClick={handleEdit}
						src={icons.edit}
						alt="Edit"
					/>
					<img
						className="appointment__actions-button"
						onClick = {handleDelete}
            src={icons.delete}
						alt="Delete"
					/>
				</section>
			</section>
		</main>
	);
}

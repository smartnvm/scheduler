import React from 'react';
//constants 
import { images } from '../../data/AppointmentVars';


export default function Show(props) {
	const { student, interviewer, onEdit, onDelete } = props;
  console.log(images);

  const handleEdit = ()=> {
    onEdit()
  }

  const handleDelete = () => {
    onDelete()
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
						src={images.editIcon}
						alt="Edit"
					/>
					<img
						className="appointment__actions-button"
						onClick = {handleDelete}
            src={images.deleteIcon}
						alt="Delete"
					/>
				</section>
			</section>
		</main>
	);
}

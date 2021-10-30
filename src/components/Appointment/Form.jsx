import React, { useState } from 'react';

//dependencies
import InterviewerList from '../InterviewerList';
import Button from '../Button';

export default function Form(props) {
	const { interviewers, onSave, onCancel } = props;

	const [student, setStudent] = useState(props.student || '');
	const [interviewer, setInterviewer] = useState(props.interviewer || null);

	const fnSave = () => {
    onSave(student, interviewer);
  };
  
	const fnCancel = () => {
		setInterviewer(prev => null);
		setStudent(prev => '');
		onCancel();
	};


  const fnInput = (event) => {
     setStudent(event.target.value)
  }

  const fnsetInterviewer = (name) => {
    setInterviewer(prev => name)
 }
	// InterviewerList(props)
	// const { interviewers, value, onChange }
	const vars = {
		interviewers: interviewers,
		value: interviewer,
		onChange: fnsetInterviewer,
	};

  console.log('---[Form Vars]....',vars);
	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off" onSubmit={event => event.preventDefault()}>
					<input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={fnInput}
					/>
				</form>
				<InterviewerList {...vars} />
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={fnCancel}>
						Cancel
					</Button>
					<Button confirm onClick={fnSave}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}

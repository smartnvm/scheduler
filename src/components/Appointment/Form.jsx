import React, { useState } from 'react';

//dependencies
import InterviewerList from '../InterviewerList';
import Button from '../Button';

export default function Form(props) {
	const { interviewers, onSave, onCancel } = props;

	const [student, setStudent] = useState(props.student || '');
	const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const [error, setError ]= useState({student: false, interviewer: false})
  
  const fnSave = () => {

      if (!student) {
        setError((prev) => ({ ...prev, student: true }));
        return;
      }
      if (!interviewer) {
        setError((prev) => ({ ...prev, interviewer: true }));
        return;
      }
    
      setError(prev => ({...prev, student: false, interviewer: false}))
      props.onSave(student, interviewer);
    
  };
  
	const fnCancel = () => {
		setInterviewer(prev => null);
		setStudent(prev => '');
		onCancel();
	};


  const fnCaptureInput = (event) => {
     setStudent(event.target.value)
  }

  const fnSetInterviewer = (name) => {
    setInterviewer(prev => name)
 }
	// InterviewerList(props)
	// const { interviewers, value, onChange }
	const vars = {
		interviewers: interviewers,
		value: interviewer,
		onChange: fnSetInterviewer,
	};

  console.log('---[Form Vars]....',vars);
	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off" onSubmit={event => event.preventDefault()}>
					<>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={fnCaptureInput}
          />
            {error.student && <div className="appointment__validation"> &#10060; Error: student name cannot be empty!</div>}
            {error.interviewer && <div className ="appointment__validation"> &#10060; Error: Oopps you forgot to select an interviewer!</div>}
          </>
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

import React, { useState } from 'react';

//dependencies
import InterviewerList from '../InterviewerList';
import Button from '../Button';

export default function Form(props) {
	const { interviewers, onSave, onCancel } = props;

	const [student, setStudent] = useState(props.student || '');
	const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const [errName, setErrName ]= useState(false)
  const [errSelect, setErrSelect ]= useState(false)
  const fnSave = () => {

    if (!student) {
      // setError((prev) => ({ ...prev, student: true }));
      setErrName(prev => true)
      // console.log('name:', student, errName)
      return;
      }
      if (!interviewer) {
        setErrSelect(pre=>true)
        // setError((prev) => ({ ...prev, interviewer: true }));
        return;
      }
    
      // setError(prev => ({...prev, student: false, interviewer: false}))
      setErrSelect(pre=>false)
      setErrName(prev => false)

      onSave(student, interviewer);
    
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

  // console.log('---[Form Vars]....',vars);
	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
        <form autoComplete="off"  onSubmit={event => event.preventDefault()}>
					<>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={fnCaptureInput}
            data-testid="student-name-input"
          />
            {errName && <div className="appointment__validation">
              <span role="img" aria-label="Error">❌</span>
            Error: student name cannot be blank!</div>}
            {errSelect && <div className="appointment__validation">
              <span role="img" aria-label="Error">❌</span>
              Error: Oopps you forgot to select an interviewer!</div>}
          </>
				</form>
				<InterviewerList {...vars} />
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={fnCancel}>Cancel</Button>
					<Button confirm onClick={fnSave}>Save</Button>
				</section>
			</section>
		</main>
	);
}

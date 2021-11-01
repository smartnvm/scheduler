import React, { Fragment } from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

// import Appointment from "components/Appointment";

import './styles.scss';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREAT";
// const EDIT = 'EDIT'

export default function Appointment(props) {


  const { time, interview, interviewers, bookInterview, id } = props;

  // console.log('form interview', interview)

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  console.log('zzzzzzzzzzzzzzzzzzzzz', props)


  const fnAdd = (param) => {
    // console.log(param);
    transition(CREATE);
  };

  const fnEdit = (param) => {
    console.log(param);
  };

  const fnDelete = (param) => {
    console.log(param);
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    //updating old state variable wiht new appointment info
    bookInterview(id, interview)  
    transition(SHOW);
    
  }

  let showProps = {};
    if (mode===SHOW) {
     showProps = {
      key: id,
      interviewer: interview.interviewer,
      student: interview.student,
      onEdit: fnEdit,
      onDelete: fnDelete
    
    };
  }

  const formProps = {
    interviewers: interviewers,
    onSave: save,
    onCancel: () => back()
  };


  // console.log('------[showProps]-----', showProps);
  const timeSlots = ['12pm', '1pm', '2pm', '3pm', '4pm'];
  return (
    <>
      <Header time={time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={fnAdd} time={time} />}
        {(mode === SHOW) && <Show {...showProps} />}
        {(mode === CREATE) && <Form {...formProps} />}
        
        {/* {mode === SHOW && <Show
          interviewer={interview.interviewer}
          student={interview.student}
          onEdit={fnEdit}
          onDelete={fnDelete}
         />} */}
      </article>
    </>
  );
}



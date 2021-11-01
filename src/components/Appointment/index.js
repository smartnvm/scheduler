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


  const { time, interview, interviewers } = props;

  // console.log('form interview', interview)
  
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);


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

  const fnSave = (param) => {
    console.log(param);
  };


  let showProps = {}
  if (interview) {
    showProps.key = props.id;
    showProps.interviewer = interview.interviewer;
    showProps.student = interview.student;
    showProps.onEdit = fnEdit;
    showProps.onDelete = fnDelete;
  }

  // console.log('------[showProps]-----', showProps);
  const timeSlots = ['12pm', '1pm', '2pm', '3pm', '4pm'];
  return (
    <>
      <Header time={time} />
      <article className="appointment">
        {mode === EMPTY  && <Empty onAdd={fnAdd} time={time} />}
        {(mode === SHOW && interview )&& <Show {...showProps} />}
        {(mode === CREATE  )&& <Form
          interviewers={interviewers} onSave={fnSave}  onCancel={() => back()} />}
      </article>
    </>
  );
}

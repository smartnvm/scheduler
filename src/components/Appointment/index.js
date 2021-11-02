import React, { Fragment } from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Status from './Status';
// import Appointment from "components/Appointment";

import './styles.scss';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREAT";
const EDIT = "EDIT";
const SAVE = 'SAVE';
const DELETE = 'DELETE';
const CONFIRM = 'CONFIRM';

export default function Appointment(props) {


  const { time, interview, interviewers, bookInterview, id, deleteInterview } = props;

  // console.log('form interview', interview)

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // console.log('zzzzzzzzzzzzzzzzzzzzz', props);


  const fnAdd = (param) => {
    // console.log(param);
    transition(CREATE);
  };

  const fnEdit = (student, interviewer) => {
    transition(EDIT);
  };

  const fnDelete = (param) => {
    console.log('--------------------', param);
    transition(CONFIRM);

  };
  const fnConfirmDelete = () => {
    transition(DELETE);
    deleteInterview(id, interview)
      .then((res) => {
        console.log('--------------[DELETE]-------', res);
        transition(EMPTY);
      });
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    //updating old state variable wiht new appointment info
    transition(SAVE);
    bookInterview(id, interview)
      .then((res) => {
        console.log('--------------[PUT]-------', res);
        transition(SHOW);
      });
  }

  const showProps = {
    key: id,
    id: id,
    student: mode === SHOW ? interview.student : 'null',
    interviewer: mode === SHOW ? interview.interviewer : 'null',
    onEdit: fnEdit,
    onDelete: fnDelete
  };

  const formProps = {
    student: mode === EDIT ? interview.student : '',
    interviewer: mode === EDIT ? interview.interviewer.id : '',
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
        {(mode === EMPTY && timeSlots.includes(time)) && <Empty onAdd={fnAdd} time={time} />}
        {(mode === SHOW) && <Show {...showProps} />}
        {(mode === EDIT) && <Form {...formProps} />}
        {(mode === CREATE) && <Form {...formProps} />}
        {(mode === SAVE) && <Status message='Saving please wait...' />}
        {(mode === CONFIRM) && <Confirm
          message='Are you sure you want to delete appointment?'
          onConfirm={fnConfirmDelete}
          onCancel={() => back()} />}
        {(mode === DELETE) && <Status message='Deleting interview please wait...' />}

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



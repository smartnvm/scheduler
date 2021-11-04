import React from 'react';

import SideNav from './SideNav';
import Appointment from 'components/Appointment';
import Button from 'components/Button';
import Status from 'components/Appointment/Status';

import 'components/Application.scss';

//helper functions
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from 'helpers/selectors';

import useApplicationData from './useApplicationData';

export default function Application(props) {

  //custom hook separate state logic from app rendering
  const { state, loading, fnSetDay, bookInterview, deleteInterview,
    resetdB, fetchDays, fetchAppts } = useApplicationData();


  //SideNav child component properties required
  const sideNavProps = {
    dayList: state.days,
    day: state.day,
    onChange: fnSetDay,
    loading
  };

  //helper function retrieves appointments for selected day in the sideNavBar
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  //helper function retrieves interviewer list for the selected day
  const interviewers = getInterviewersForDay(state, state.day);

  //iterate over appointments array for selected day 
  const parsedAppointments = dailyAppointments.map((e) => {

    //assemble Appointment props
    const appointment = {
      key: e.id,
      id: e.id,
      time: e.time,
      interview: getInterview(state, e.interview),
      interviewers,
      bookInterview: bookInterview,
      deleteInterview: deleteInterview,
      state,
      loading
    };
    return <Appointment {...appointment} />;
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <SideNav {...sideNavProps} />
      </section>

      <section className="schedule">
        {!loading ?
          <>
            {parsedAppointments}

            <Appointment key="last" time="5pm" />
          </>
          : <Status message='Database reset ...' />
        }
      </section>

      <span>
        {/* api call buttons for testing*/}
        <Button danger onClick={resetdB}>dB Reset</Button>

        {/* <Button confirm onClick={fetchDays}>fetch Days</Button>
        <Button warning onClick={fetchAppts}>fetch Appts</Button> */}
      </span>
    </main>
  );
}

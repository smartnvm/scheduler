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

  const { state, loading, fnSetDay, bookInterview, deleteInterview,
    resetdB, fetchDays, fetchAppts } = useApplicationData();


  //SideNav child component properties required
  //<DayList daysList={daysList} day={day} setDay={setDay} />
  //update
  const sideNavProps = {
    dayList: state.days,
    day: state.day,
    onChange: fnSetDay,
    loading
  };

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const parsedAppointments = dailyAppointments.map((e) => {
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

  // console.log('0000000000000',dailyAppointments)
  // dailyAppointments.push(<Appointment key="last" time="5pm" />);
  //              //  .push(<Appointment key="last" time="5pm" />)
  // console.log('1111111111111',dailyAppointments)
  return (
    <main className="layout">
      <section className="sidebar">
        <SideNav {...sideNavProps} />
      </section>

      <section className="schedule">
        {!loading ?
          <>
            {/* <Appointment key="lasta" time="9am" />
          <Appointment key="lastb" time="10am" />
          <Appointment key="lastc" time="11am" /> */}

            {parsedAppointments}

            {/* to show last interview - does not work with push ? */}

            <Appointment key="last" time="5pm" />
            {/* <Appointment key="laste" time="6pm" /> */}
          </>
          : <Status message='Database reset ...' />
        }
      </section>

      <span>
        <Button danger onClick={resetdB}>dB Reset</Button>
        <Button confirm onClick={fetchDays}>fetch Days</Button>
        <Button warning onClick={fetchAppts}>fetch Appts</Button>
      </span>
    </main>
  );
}

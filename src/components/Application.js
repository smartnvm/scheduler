import React, { useState } from 'react';

import 'components/Application.scss';
import 'components/Appointment';

import days from '../data/days';
import appointments from '../data/appointments';

import SideNav from './SideNav';
import Appointment from 'components/Appointment';

export default function Application(props) {
  //iniitalize day to Monday
  const [day, setDay] = useState('Monday');

  //SideNav child component properties required
  //<DayList days={days} day={day} setDay={setDay} />
  const sideNavProps = {
    days,
    day,
    setDay,
  };
  ;

  const parsedAppointments = appointments.map((e) => {
    const appointment = {
      key: e.id,
      time: e.time,
      interview:e.interview
    };
    return <Appointment {...appointment} />;
  });



  return (
    <main className="layout">
      <section className="sidebar">
        <SideNav {...sideNavProps} />
      </section>

      <section className="schedule">
        {parsedAppointments}
      </section>
    </main>
  );
}

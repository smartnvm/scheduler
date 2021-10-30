import React, { useState } from 'react';

//dummy data source
import dayList from '../data/days';
import appointmentLists from '../data/appointments';

import SideNav from './SideNav';
import Appointment from 'components/Appointment';
import 'components/Application.scss';

export default function Application(props) {
  //iniitalize day to Monday
  const [day, setDay] = useState('Monday');

  const fnSetDay = (param) => {
    setDay(prev => param);
  };

  //SideNav child component properties required
  //<DayList daysList={daysList} day={day} setDay={setDay} />
  const sideNavProps = {
    dayList,
    day,
    onChange: fnSetDay
  };

  const parsedAppointments = appointmentLists.map((e) => {
    const appointment = {
      key: e.id,
      time: e.time,
      interview: e.interview
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

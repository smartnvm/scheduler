import React, { useEffect, useState } from 'react';
import axios from 'axios';

//dummy data source
// import dayList from '../data/days';
import appointmentLists from '../data/appointments';

import SideNav from './SideNav';
import Appointment from 'components/Appointment';
import Button from 'components/Button';

import 'components/Application.scss';

export default function Application(props) {

  //iniitalize day to Monday
  // const [day, setDay] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const fnSetDay = (param) => {
    setState(prev => (
      { ...prev, day: param }
    ));
  };

  //fetch must be state variable for dependcy array and re-rendering to work
  //i.e. can't simply declare fetch = 0 and toggle its value in resetdB
  const [fetch, setFetch] = useState('0');
  const resetdB = () => {
    axios.get('http://localhost:8001/api/debug/reset')
      .then((res) => {
        console.log('[dB Reset]', res.data);
        //reset day 
        setState(prev => ({ ...prev, day: "Monday" }));
        //toggle fetch for useEffect dependency array
        //this allows re-render page with new data
        setFetch(prev => prev ^= 1);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, [fetch]);


  //SideNav child component properties required
  //<DayList daysList={daysList} day={day} setDay={setDay} />
  const sideNavProps = {
    dayList: state.days,
    day: state.day,
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
      <span>
        <Button danger onClick={resetdB}> dB Reset </Button>
      </span>

    </main>

  );
}

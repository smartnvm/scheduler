import React, { useEffect, useState } from 'react';
import axios from 'axios';

//dummy data source
// import dayList from '../data/days';
// import dailyAppointments from '../data/appointments';

import SideNav from './SideNav';
import Appointment from 'components/Appointment';
import Button from 'components/Button';

import 'components/Application.scss';
import { cleanup } from '@testing-library/react/dist';

//helper functions
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from 'helpers/selectors';
import { fetchData } from 'helpers/api';

export default function Application(props) {
  //iniitalize app Vars and set day to Monday
  const [vars, setVars] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const fnSetDay = (param) => {
    setVars(prev => (
      { ...prev, day: param }
    ));
  };

  const resetdB = () => {
    apiCall('reset');
  };
  const fetchDays = () => {
    apiCall('days');
  };
  const fetchAppts = () => {
    apiCall('appts');
  };

  const [fetch, setFetch] = useState(0);

  const apiCall = (param) => {
    const apiURL = {
      days: 'http://localhost:8001/api/days/',
      appts: 'http://localhost:8001/api/appointments/',
      reset: 'http://localhost:8001/api/debug/reset'
    };
    console.log(param, '\n', apiURL[param]);

    axios.get(apiURL[param])
      .then((res) => {
        // console.log('------ [old] --------', vars.day );
        return res;
      })
      .then(res => {
        // console.log(res.data);
        // fetchData()
        //   .then(all => {
        //     setVars((prev) => ({
        //       ...prev,
        //       day: 'Monday',
        //       days: all[0].data,
        //       appointments: all[1].data,
        //       interviewers: all[2].data,
        //     }));
        //   });
        setFetch(prev => prev ^= 1);
        // console.log('------ [fetch] --------', vars.day);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  // const [fetch, setFetch] = useState('0');
  // setFetch(prev => prev ^= 1)
  useEffect(() => {
    //fetch data with API call 
    fetchData()
      .then(all =>
        setVars((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        })))
      .catch((error) => console.log(`ERROR ${error}`));
    return cleanup();
    //fetch vars change causes re-rendering
  }, [fetch]);


  //SideNav child component properties required
  //<DayList daysList={daysList} day={day} setDay={setDay} />
  //update 
  const sideNavProps = {
    dayList: vars.days,
    day: vars.day,
    onChange: fnSetDay
  };

  const dailyAppointments = getAppointmentsForDay(vars, vars.day);
  const interviewers = getInterviewersForDay(vars, vars.day);

  const parsedAppointments = dailyAppointments.map((e) => {
    const appointment = {
      key: e.id,
      time: e.time,
      interview: getInterview(vars, e.interview),
      interviewers
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
        <>
          {/* <Appointment key="lasta" time="9am" />
          <Appointment key="lastb" time="10am" />
          <Appointment key="lastc" time="11am" /> */}
          {parsedAppointments}

          {/* to show last interview - does not work with push ? */}

          <Appointment key="last" time="5pm" />
          {/* <Appointment key="laste" time="6pm" /> */}
        </>
      </section>

      <span>
        <Button danger onClick={resetdB}> dB Reset </Button>
        <Button confirm onClick={fetchDays}> fetch Days </Button>
        <Button warning onClick={fetchAppts}> fetch Appts </Button>
      </span>

    </main>

  );
}

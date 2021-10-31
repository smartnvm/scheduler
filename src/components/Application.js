import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { getDayAppointments } from 'helpers/selectors';

export default function Application(props) {

  //iniitalize day to Monday
  // const [day, setDay] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  let dailyAppointments = [];

  const fnSetDay = (param) => {
    setState(prev => (
      { ...prev, day: param }
    ));
  };

  //fetch must be state variable for dependcy array and re-rendering to work
  //i.e. can't simply declare fetch = 0 and toggle its value in apiCall
  const [fetch, setFetch] = useState('0');
  const resetdB = () => {
    apiCall('reset');
  };

  const apiCall = (param) => {
    let apiURL = '';
    switch (param) {
      case 'days':
        apiURL = 'http://localhost:8001/api/days';
        break;
      case 'appts':
        apiURL = 'http://localhost:8001/api/appointments/1';
        break;
      case 'reset':
        apiURL = 'http://localhost:8001/api/debug/reset';
        break;
      default:
        break;
    }
    // console.log(param, '\n', apiURL);

    axios.get(apiURL)
      .then((res) => {
        console.log(`[${param}]`, res.data);
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

  // useRender()

  // function useRender() {
  // const [fetch, setFetch] = useState('0');
  // setFetch(prev => prev ^= 1)
  useEffect(() => {
    //fetch data with API call 
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      //update props with new data
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
    
    return cleanup();
    //fetch state change causes re-rendering
  }, [fetch]);
  // }


  //SideNav child component properties required
  //<DayList daysList={daysList} day={day} setDay={setDay} />
  //update 
  const sideNavProps = {
    dayList: state.days,
    day: state.day,
    onChange: fnSetDay
  };

  dailyAppointments = getDayAppointments(state, state.day);


  const parsedAppointments = dailyAppointments.map((e) => {
    const appointment = {
      key: e.id,
      time: e.time,
      interview: e.interview
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

          <Appointment key="lastd" time="5pm" />
          {/* <Appointment key="laste" time="6pm" /> */}
        </>
      </section>

      <span>
        <Button danger onClick={resetdB}> dB Reset </Button>
      </span>

    </main>

  );
}

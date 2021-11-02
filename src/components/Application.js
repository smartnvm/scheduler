import React, { useEffect, useState } from 'react';
import axios from 'axios';

//dummy data source
// import dayList from '../data/days';
// import dailyAppointments from '../data/appointments';

import SideNav from './SideNav';
import Appointment from 'components/Appointment';
import Button from 'components/Button';
import Status from 'components/Appointment/Status';

import 'components/Application.scss';
import { cleanup } from '@testing-library/react/dist';

//helper functions
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from 'helpers/selectors';
import { fetchData } from 'helpers/api';

import {DELAY} from '../data/AppointmentVars'

export default function Application(props) {
  //iniitalize app state and set day to Monday
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {}
  });

  

  
  //Q) how can I move this code to a separate file
  /*************************************************** */
  const [loading, setLoading] = useState(false);
  const resetdB = () => { apiCall('reset'); };
  const fetchDays = () => { apiCall('days'); };
  const fetchAppts = () => { apiCall('appts'); };

  const apiCall = (param) => {
    const apiURL = {
      //Q) works without absolute http://localhost:8001 path
      days: '/api/days/',
      appts: '/api/appointments/',
      reset: '/api/debug/reset'
    };
    console.log(param, '\n', apiURL[param]);

    axios.get(apiURL[param])
      .then((res) => {
        setLoading(prev => param === 'reset' ? true : false);
        console.log('wezzzzzzzzzzzzzzzzzzzzzzzzzzzz', loading);

        // console.log('------ [old] --------', state.day );
        console.log(res.data);
        fetchData()
          .then(all => {
            setState((prev) => ({
              ...prev,
              day: '',
              days: all[0].data,
              appointments: all[1].data,
              interviewers: all[2].data,
            }));
          })
          .then(() => {
            setTimeout(() => {
              setState((prev) => ({
                ...prev,
                day: "Monday",
              }));
            }, param === 'reset' ? DELAY : 0);
          });
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
    setLoading(prev => false);
    console.log('wezzzzzzzzzzzzzzzzzzzzzzzzzzzz', loading);
  };
  //************************************************************ */

  useEffect(() => {
    //fetch data with API call 
    fetchData()
      .then(all =>
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        })))
      .catch((error) => console.log(`ERROR ${error}`));
    return cleanup();
    //fetch state change causes re-rendering
  }, []);



  const fnSetDay = (param) => {
    setState(prev => (
      { ...prev, day: param }
    ));
  };
  //SideNav child component properties required
  //<DayList daysList={daysList} day={day} setDay={setDay} />
  //update 
  const sideNavProps = {
    dayList: state.days,
    day: state.day,
    onChange: fnSetDay
  };

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: {}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        setState({ ...state, appointments });
        return res;
      })
      .catch(error => console.log(`ERROR ${error}`));


  }

  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({ ...state, appointments });
        return res;
      })
      .catch(error => console.log(`ERROR ${error}`));

  }

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
      deleteInterview: deleteInterview
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
        {loading && <Status message='Database reset ...' />}
      </section>



      <span>
        <Button danger onClick={resetdB}> dB Reset </Button>
        <Button confirm onClick={fetchDays}> fetch Days </Button>
        <Button warning onClick={fetchAppts}> fetch Appts </Button>
      </span>

    </main>

  );
}

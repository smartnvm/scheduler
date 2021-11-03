import React, { useEffect, useState } from 'react';
import axios from 'axios';

//dummy data source
// import dayList from '../data/days';
// import dailyAppointments from '../data/appointments';

import 'components/Application.scss';
import { cleanup } from '@testing-library/react/dist';
import { fetchData, apiCall } from 'helpers/api';
import updateSpots from '../helpers/updateSpots';


export default function useApplicationData(props) {
  //iniitalize app state and set day to Monday
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {
      1: {
        id: 1,
        time: '12pm',
        interview: null,
      },
    },
    interviewers: {},
  });

  /*************************************************** */
  /*dominic_t 
  In React, the single source of truth is the state.
  When React loads, it's triggering the Axios requests in the useEffect hook and populate 
  the state with the data from the db. All the props value are coming from the state data.
  React will re-render whenever the state data changes (when you call setState somewhere)
  When running npm run db:reset you're resetting the data of the db. 
  However, for React to have the updated data in the state, 
  you need to reload the app at least once so it triggers the axios requests.
  If the data is not being updated after that app reload, then it's something else.*/
  const [status, setStatus] = useState({ loading: false });

  function resetdB() {
    apiCall('reset', setStatus, setState);
  }
  function fetchDays() {
    apiCall('days',setStatus, setState);
  }
  function fetchAppts() {
    apiCall('appts', setStatus, setState);
  }
  
  useEffect(() => {
    //fetch data with API call
    fetchData()
      .then((all) =>
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }))
      )
      .catch((error) => console.log(`ERROR ${error}`));
    return cleanup();
  }, []);

  const fnSetDay = (param) => {
    setState((prev) => ({ ...prev, day: param }));
  };

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState((prev) => ({ ...prev, appointments }));
      const days = updateSpots(state, appointments, id);
      setState((prev) => ({ ...prev, days }));
    })
    // .catch(error => error);
  }

  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        // const x = 'shanna'
        setState((prev) => ({ ...prev, appointments }));
        const days = updateSpots(state, appointments, id);
        setState((prev) => ({ ...prev, days }));
        return res;
      })
    // .catch(error => error);
  }

  return {
    state,
    status,
    fnSetDay,
    bookInterview,
    deleteInterview,
    apiCall,
    resetdB,
    fetchDays,
    fetchAppts
  };

}

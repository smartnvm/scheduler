import  { useEffect, useState } from 'react';
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

  const [loading, setLoading] = useState(false);

  function resetdB() {
    apiCall('reset', setLoading, setState);
  }
  function fetchDays() {
    apiCall('days',setLoading, setState);
  }
  function fetchAppts() {
    apiCall('appts', setLoading, setState);
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
   //construct appointment copy for the specified [id] and set interview to null 
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    //consturct new appointment object and over-ride with appointment of empty interview
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //presist the changes and make DELETE api request 
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState((prev) => ({ ...prev, appointments }));
      const days = updateSpots(state, appointments, id);
      setState((prev) => ({ ...prev, days }));
    })
  }

  //create new interview 
  function bookInterview(id, interview) {
    //construct a new appointment object with new interview data
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    //construct appointments object copy and only replace appointment with specified id
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    
    // make a PUT request with interview data to make presistent changes
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
       //manage local state
        setState((prev) => ({ ...prev, appointments }));
        
        //
        const days = updateSpots(state, appointments, id);
        setState((prev) => ({ ...prev, days }));
        return res;
      })
  }

  return {
    state,
    loading,
    fnSetDay,
    bookInterview,
    deleteInterview,
    apiCall,
    resetdB,
    fetchDays,
    fetchAppts
  };

}

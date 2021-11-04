
import axios from "axios";
import { DELAY } from '../data/AppointmentVars';

//api call to fetch data and returns a promise
export const fetchData = () => {
  return Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers"),
  ])
    .then(all => {
      // console.log('--------[promise]---------',all);
      return all;
    })
    .catch(error => `Error: ${error}`);
};

//helper function to make different api calls for testing
export function apiCall(param, setLoading, setState) {
  const apiURL = {
    days: '/api/days/',
    appts: '/api/appointments/',
    reset: '/api/debug/reset',
  };
  console.log(param, ':', apiURL[param]);
  
  //controls if loading spinner displays
  setLoading((prev) =>
    param === 'reset'
      ? true
      : false)

  //make api call for the specified parameter
  axios
    .get(apiURL[param])
    .then((res) => {
      console.log(res.data);
      //fetch all data at once
      fetchData()
        .then((all) => {
          setState((prev) => ({
            ...prev,
            day: '',
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data,
          }));
        })
        //because state has more parameters, it's important to have a .then  
        //this ensures proper rendering
        .then(() => {
          setTimeout(() => {
            setState((prev) => ({ ...prev, day: 'Monday' }));
            setLoading((prev) => false) 
          },
            param === 'reset' ? DELAY : 0
          );
        });
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
};

import axios from "axios";
import { DELAY } from '../data/AppointmentVars';

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

export function apiCall(param, setStatus, setState) {
  const apiURL = {
    days: '/api/days/',
    appts: '/api/appointments/',
    reset: '/api/debug/reset',
  };
  console.log(param, ':', apiURL[param]);
  
  // param === 'reset' ?
  //   setStatus((prev) => ({ ...prev, loading: true })) :
  //   setStatus((prev) => ({ ...prev, loading: false }));

  setStatus((prev) =>
    param === 'reset'
      ? { ...prev, loading: true }
      : { ...prev, loading: false });

  axios
    .get(apiURL[param])
    .then((res) => {
      console.log(res.data);
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
        .then(() => {
          setTimeout(() => {
            setState((prev) => ({ ...prev, day: 'Monday' }));
            setStatus((prev) => ({ ...prev, loading: false }));
          },
            param === 'reset' ? DELAY : 0
          );
        });
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
};
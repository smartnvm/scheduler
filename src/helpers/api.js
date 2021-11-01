import axios from "axios";

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
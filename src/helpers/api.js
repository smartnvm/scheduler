import { useEffect, useState } from 'react';
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


export const useApiCall = () => {
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

  const param = ''
  const resetdB = () => { param = 'reset'; };
  const fetchDays = () => { param = 'days'; };
  const fetchAppts = () => { param = 'appts'; };

  // const apiCall = (param) => {
  const apiURL = {
    //Q) works without absolute http://localhost:8001 path
    days: '/api/days/',
    appts: '/api/appointments/',
    reset: '/api/debug/reset'
  };
  console.log(param, '\n', apiURL[param]);

  axios.get(apiURL[param])
    .then((res) => {
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
          setState((prev) => ({
            ...prev,
            day: "Monday",
          }));
        });
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });

  return (fetchAppts, fetchDays, resetdB);
};




































// export const useTodoData = () => {
//   const [todos, setTodos] = useState({
//     data: [],
//     loading: true,
//     error: false
//   });

//   // const singleTodo = todos[2];

//   useEffect(() => {
//     axios.get('/api/todos')
//       .then(res => {
//         const appData = {
//           data: res.data,
//           loading: false,
//           error: false
//         };
//         setTodos(appData);
//       });
//   }, []);

//   const updateTodo = (id) => {
//     return axios.patch(`/api/todos/${id}`)
//       .then(res => {
//         console.log(res);
//         const index = todos.data.findIndex(todo => todo.id === id);
//         const selectedTodo = todos.data.find(todo => todo.id === id);
//         const updatedTodo = { ...selectedTodo, done: !selectedTodo.done };
//         const updatedTodos = [...todos.data.slice(0, index), updatedTodo, ...todos.data.slice(index + 1)];
//         setTodos(prev => ({
//           ...prev,
//           data: updatedTodos
//         }));
//       });
//   };


//   const deleteTodo = (id) => {
//     return axios.delete(`/api/todos/${id}`)
//       .then(res => {
//         console.log(res);
//         const index = todos.data.findIndex(todo => todo.id === id);
//         const updatedTodos = [...todos.data.slice(0, index), ...todos.data.slice(index + 1)];
//         setTodos(prev => ({
//           ...prev,
//           data: updatedTodos
//         }));
//       });
//   };

//   const addTodo = (todoValue) => {
//     return axios.post('/api/todos', { task: todoValue })
//       .then(res => {
//         console.log(res);
//         setTodos(prev => (
//           {
//             ...prev,
//             data: [...prev.data, res.data]
//           }
//         ));
//       });
//   };

//   return { todos, updateTodo, deleteTodo, addTodo };
// };


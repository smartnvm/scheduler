
const days = [
  {
    id: 1,
    name: 'Monday',
    appointments: [1, 2, 3, 4, 5],
    interviewers: [2, 4, 5, 8, 9],
    spots: 1,
  },
  {
    id: 2,
    name: 'Tuesday',
    appointments: [6, 7, 8, 9, 10],
    interviewers: [2, 3, 4, 6, 10],
    spots: 2,
  },
  {
    id: 3,
    name: 'Wednesday',
    appointments: [11, 12, 13, 14, 15],
    interviewers: [3, 5, 7, 9, 10],
    spots: 3,
  },
  {
    id: 4,
    name: 'Thursday',
    appointments: [16, 17, 18, 19, 20],
    interviewers: [5, 6, 7, 8, 10],
    spots: 5,
  },
  {
    id: 5,
    name: 'Friday',
    appointments: [21, 22, 23, 24, 25],
    interviewers: [1, 5, 6, 8, 9],
    spots: 4,
  },
];

const appointments = {
  1: {
    id: 1,
    time: '12pm',
    interview: {
      student: 'Archie Cohen',
      interviewer: 9,
    },
  },
  2: {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Chad Takahashi',
      interviewer: 9,
    },
  },
  3: {
    id: 3,
    time: '2pm',
    interview: null,
  },
  4: {
    id: 4,
    time: '3pm',
    interview: {
      student: 'Jamal Jordan',
      interviewer: 4,
    },
  },
  5: {
    id: 5,
    time: '4pm',
    interview: {
      student: 'Leopold Silvers',
      interviewer: 4,
    },
  },
  6: {
    id: 6,
    time: '12pm',
    interview: {
      student: 'Liam Martinez',
      interviewer: 10,
    },
  },
  7: {
    id: 7,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: 10,
    },
  },
  8: {
    id: 8,
    time: '2pm',
    interview: null,
  },
  9: {
    id: 9,
    time: '3pm',
    interview: null,
  },
  10: {
    id: 10,
    time: '4pm',
    interview: {
      student: 'Maria Boucher',
      interviewer: 4,
    },
  },
  11: {
    id: 11,
    time: '12pm',
    interview: null,
  },
  12: {
    id: 12,
    time: '1pm',
    interview: null,
  },
  13: {
    id: 13,
    time: '2pm',
    interview: {
      student: 'Michael Chan-Montoya',
      interviewer: 10,
    },
  },
  14: {
    id: 14,
    time: '3pm',
    interview: {
      student: 'Richard Wong',
      interviewer: 3,
    },
  },
  15: {
    id: 15,
    time: '4pm',
    interview: null,
  },
  16: {
    id: 16,
    time: '12pm',
    interview: null,
  },
  17: {
    id: 17,
    time: '1pm',
    interview: null,
  },
  18: {
    id: 18,
    time: '2pm',
    interview: null,
  },
  19: {
    id: 19,
    time: '3pm',
    interview: null,
  },
  20: {
    id: 20,
    time: '4pm',
    interview: null,
  },
  21: {
    id: 21,
    time: '12pm',
    interview: null,
  },
  22: {
    id: 22,
    time: '1pm',
    interview: null,
  },
  23: {
    id: 23,
    time: '2pm',
    interview: null,
  },
  24: {
    id: 24,
    time: '3pm',
    interview: {
      student: 'Yuko Smith',
      interviewer: 1,
    },
  },
  25: {
    id: 25,
    time: '4pm',
    interview: null,
  },
};

const interviewers = {
  1: {
    id: 1,
    name: 'Sylvia Palmer',
    avatar: 'https://i.imgur.com/LpaY82x.png',
  },
  2: {
    id: 2,
    name: 'Tori Malcolm',
    avatar: 'https://i.imgur.com/Nmx0Qxo.png',
  },
  3: {
    id: 3,
    name: 'Mildred Nazir',
    avatar: 'https://i.imgur.com/T2WwVfS.png',
  },
  4: {
    id: 4,
    name: 'Cohana Roy',
    avatar: 'https://i.imgur.com/FK8V841.jpg',
  },
  5: {
    id: 5,
    name: 'Sven Jones',
    avatar: 'https://i.imgur.com/twYrpay.jpg',
  },
  6: {
    id: 6,
    name: 'Susan Reynolds',
    avatar: 'https://i.imgur.com/TdOAdde.jpg',
  },
  7: {
    id: 7,
    name: 'Alec Quon',
    avatar: 'https://i.imgur.com/3tVgsra.jpg',
  },
  8: {
    id: 8,
    name: 'Viktor Jain',
    avatar: 'https://i.imgur.com/iHq8K8Z.jpg',
  },
  9: {
    id: 9,
    name: 'Lindsay Chu',
    avatar: 'https://i.imgur.com/nPywAp1.jpg',
  },
  10: {
    id: 10,
    name: 'Samantha Stanic',
    avatar: 'https://i.imgur.com/okB9WKC.jpg',
  },
};


const statex = {
  days: days,
  appointments: appointments,
  interviewers: interviewers,
};


getAppointmentsForDay(statex, 'Monday');

export function getAppointmentsForDay(state, day) {
  const stateDay = state.days.filter((e) => e.name === day);
  if (stateDay.length === 0) return stateDay;

  // console.log(state)
  // console.log(`------------[${day}]--------\n`, stateDay);

  const { id, appointments, interviewers, name, spots } = { ...stateDay[0] };
  let props = {};
  let k = 0;
  for (const i of appointments) {
    props[i] = {
      id: state.appointments[i].id,
      time: state.appointments[i].time,
      interview: null,
    };
    if (state.appointments[i].interview !== null) {
      props[i].interview = {
        student: state.appointments[i].interview.student,
        interviewer: state.appointments[i].interview.interviewer,
      };
    }
    k = k + 1;
  }
  // console.log(`------------{props}--------\n`, Object.values(props));
  return Object.values(props);
}


export function getDayAppointments(state, day) {

  // function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  const stateDay = state.days.filter((e) => e.name === day);
  if (stateDay.length === 0) return stateDay;

  // console.log(state)
  // console.log(`------------[${day}]--------\n`, stateDay);

  const { id, appointments, interviewers, name, spots } = { ...stateDay[0] };

  let props = {};
  let j = 0,
    k = 0;
  for (const i of appointments) {
    j = interviewers[k];
    // console.log(i, '|', j);
    props[i] = {
      id: state.appointments[i].id,
      time: state.appointments[i].time,
      interview: null,
    };
    if (state.appointments[i].interview) {
      props[i].interview = {
        student: state.appointments[i].interview.student,
        interviewer: {
          id: state.interviewers[j].id,
          name: state.interviewers[j].name,
          avatar: state.interviewers[j].avatar,
        },
      };
    }
    // console.log('interview:\n', props[i].interview);
    k++;
  }

  console.log(`------------{props}--------\n`, Object.values(props));

  return Object.values(props);
}

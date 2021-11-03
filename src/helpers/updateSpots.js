export default function updateSpots(state, appointments, id) {

  const newDays = [...state.days];

  const day = newDays.find(e => e.name === state.day);
  const index = newDays.findIndex(e => e.name === state.day);

  let spots = 0;
  day.appointments.forEach(e => {
    const interview = appointments[e].interview;
    if (!interview) spots++;
  });

  const newDay = { ...day, spots };
  newDays[index] = newDay;

  return newDays;
};

export function getAppointmentsForDay(state, day) {
	const stateDay = state.days.filter((e) => e.name === day);
	if (stateDay.length === 0) return stateDay;

	// console.log(state)
	// console.log(`------------[${day}]--------\n`, stateDay);

	const { appointments } = { ...stateDay[0] };
	let props = {};
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
	}
	// console.log(`------------{props}--------\n`, Object.values(props));
	return Object.values(props);
}

export function getInterview(state, interview) {
	// console.log(`----------------[getInterview]--------------`);
	// console.log(interview);
	if (!interview) return null;
	const id = interview.interviewer;
	const interviewer = state.interviewers[id];
	interview = {
		student: interview.student,
		interviewer,
	};
	// console.log(interview);
	return interview;
}

export function getInterviewersForDay(state, day) {
	//... returns an array of interviewers for that day

	const stateDay = state.days.filter((e) => e.name === day);
	if (stateDay.length === 0) return stateDay;

	const interviewers = stateDay[0].interviewers;

	const props = {};
	// console.log(`interviwers:,`, interviewers);

	for (const i of interviewers) {
		props[i] = {
			id: state.interviewers[i].id,
			name: state.interviewers[i].name,
			avatar: state.interviewers[i].avatar,
		};
	}
	// console.log(`------------{interviewers}--------\n`, Object.values(props));
	return Object.values(props);
}

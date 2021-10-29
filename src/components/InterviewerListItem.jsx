import React from 'react';
import 'components/InterviewerListItem.scss';

import classNames from 'classnames';

export default function InterviewerListItem(props) {
	const { name, avatar, selected, setInterviewer } = props;

  console.log('----[InterviewerListItem Props]----\n',props);

  let interviewersList = 'interviewers__item'
   interviewersList = classNames(
    interviewersList,
    {'interviewers__item--selected': selected});

  	console.log(interviewersList);

  
	const handleInterviewer = () => {
		setInterviewer(name);
	};

	// console.log(dayList);
	return (
		<li className={interviewersList}>
      <img
        onClick={handleInterviewer}
				className="interviewers__item-image"
				src={avatar}
				alt={name}
			/>
			{selected && name}
		</li>
	);
}
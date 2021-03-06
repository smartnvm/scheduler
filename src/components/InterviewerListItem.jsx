import React from 'react';
import 'components/InterviewerListItem.scss';

import classNames from 'classnames';

export default function InterviewerListItem(props) {
	const { name, avatar, selected, onChange, id } = props;

  // console.log('----[InterviewerListItem Props]----\n',props);

  let interviewersList = 'interviewers__item'
   interviewersList = classNames(
    interviewersList,
    {'interviewers__item--selected': selected});

  	// console.log(interviewersList);
  
	const handleInterviewer = () => {
		onChange(id);
    //console.log(onChange())
	};

	return (
		<li className={interviewersList} onClick={handleInterviewer}>
      <img
				className="interviewers__item-image"
				src={avatar}
        alt={name}
        data-testid={'icon_'+id}  // add data-testid to facilitate jest testing
			/>
			{selected && name}
		</li>
	);
}

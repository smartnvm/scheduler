import React from 'react';
import 'components/InterviewerListItem.scss';

import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
	const { interviewers, value, onChange } = props;

	const parsedInterviewersList = interviewers.map((elem) => {
		const vars = {
			// Warning: Each child in a list should have a unique "key" prop.
			key: elem.id,

			// InterviewerListItem(props)
      // const { name, avatar, selected, onChange } 
      name: elem.name,
      id: elem.id,
      avatar: elem.avatar,
      selected: value === elem.id,
      onChange: onChange,

		};
    console.log('----[InterviewerList vars]-------',vars);
    return <InterviewerListItem {...vars}></InterviewerListItem>;
  });
  
	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewersList}
      </ul>
		</section>
	);
}

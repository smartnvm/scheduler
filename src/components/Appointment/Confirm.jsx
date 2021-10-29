import React from 'react';

//dependencies
import Button from '../Button';

export default function Confirm(props) {
	const { message,  onCancel, onConfirm } = props;

	const handleCancel = () => {
		onCancel();
	};

	const handleConfirm = () => {
		onConfirm();
	};

	return (
		<main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
			<section className="appointment__actions">
				<Button danger onClick={handleCancel}>Cancel</Button>
				<Button danger onClick={handleConfirm}>Confirm</Button>
			</section>
		</main>
	);
}

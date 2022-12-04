import React, { useEffect, useRef, useState } from 'react';
import IconButton from '../IconButton';
import Icon from '../Icon';
import styles from './Select.module.css';
import Option from './option';

export default function Select({ name, id, value, onChange, options }) {
	const [show, setShow] = useState(false);
	const [position, setPosition] = useState(null);

	const selectRef = useRef(null);

	const handleShowOptions = () => {
		setShow(!show);
	};

	const clearValue = () => {
		onChange(name, '0');
	};

	useEffect(() => {
		setPosition(selectRef.current.getBoundingClientRect());
	}, [show]);

	document.addEventListener('click', (e) => {
		console.log(e.target.id);
		if (id !== e.target.id) {
			setShow(false);
		}
	});

	return (
		<div className={styles.wrapper}>
			<div
				ref={selectRef}
				className={styles.container}
				id={id}
				onClick={handleShowOptions}
			>
				{value || 0}
				{show && (
					<div
						id={`${id}_options`}
						className={styles.options_container}
						style={{ left: position.x, top: position.y }}
					>
						{options.map((option) => (
							<Option
								name={name}
								value={option}
								onSelect={onChange}
							>
								{option}
							</Option>
						))}
					</div>
				)}

				<Icon name="chevron_down" className="pointer_events_none" />
			</div>
			<IconButton onClick={clearValue} iconName="reset" />
		</div>
	);
}

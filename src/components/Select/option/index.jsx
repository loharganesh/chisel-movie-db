import React from 'react';
import styles from './Option.module.css';
function Option({ children, name, value, onSelect }) {
	const handleSelectOption = () => {
		onSelect(name, value);
	};
	return (
		<p class={styles.option} onClick={handleSelectOption}>
			{children}
		</p>
	);
}

export default Option;

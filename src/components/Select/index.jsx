import React, { useEffect, useState } from 'react';
import styles from './Select.module.css';
export default function Select({ name, id, value, onChange }) {
	const [val, setVal] = useState(value);
	const handleValChange = (e) => {
		onChange(name, e.target.value);
		setVal(e.target.value);
	};

	return (
		<select
			className={styles.container}
			value={val}
			onChange={handleValChange}
		>
			<option value={0}>0</option>
			<option value={1}>1</option>
			<option value={2}>2</option>
			<option value={3}>3</option>
			<option value={4}>4</option>
			<option value={5}>5</option>
			<option value={6}>6</option>
			<option value={7}>7</option>
			<option value={8}>8</option>
			<option value={9}>9</option>
			<option value={10}>10</option>
		</select>
	);
}

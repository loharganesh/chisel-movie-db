import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	deleteColumnStart,
	updateColumnStart,
} from '../../redux/reducers/columns/actions';
import IconButton from '../IconButton';
import styles from './ColumnHead.module.css';

export default function ColumnHead({ id, name, style, className, index }) {
	const dispatch = useDispatch();
	const inputRef = useRef(null);
	const [columnName, setColumnName] = useState(name);
	const handleColumnNameChange = (e) => {
		setColumnName(e.target.value);
	};
	const handleOnKeyDown = (e) => {
		if (e.key === 'Enter') {
			dispatch(
				updateColumnStart({
					id: id,
					updates: { name: columnName },
				})
			);
			inputRef.current.blur();
		}
	};

	const handleDeleteColumn = () => {
		console.log({ id });
		dispatch(deleteColumnStart(id));
	};

	return (
		<div
			className={`${className} ${styles.container} ${
				index === 0 ? 'name_cell' : 'cell'
			}`}
		>
			<input
				ref={inputRef}
				className={`inline_editable_input ${styles.column_name}`}
				value={columnName}
				onChange={handleColumnNameChange}
				onKeyDown={handleOnKeyDown}
			/>

			<IconButton
				className={`${styles.delete_icon}`}
				iconName="cross"
				onClick={handleDeleteColumn}
			/>
		</div>
	);
}

// useEffect(() => {
// 	const ratings = {};
// 	props.columns.forEach((col) => {
// 		let totalRating = 0;
// 		seasonsAverageRatings.forEach((e) => {
// 			totalRating += parseInt(e[col.name.toLowerCase()]);
// 		});
// 		ratings[col.name.toLowerCase()] = (
// 			totalRating / seasons.length
// 		).toFixed(1);
// 	});

// 	setAverageRatings(ratings);
// 	return () => {};
// }, [seasonsAverageRatings]);

// useEffect(() => {
// 	console.log(averageRatings);
// 	return () => {};
// }, [averageRatings]);

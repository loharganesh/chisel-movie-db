import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectColumns } from '../redux/reducers/columns/selectors';
import {
	deleteEpisodesStart,
	updateEpisodeStart,
} from '../redux/reducers/episode/actions';
import NameCell from './NameCell';
import Select from './Select';

function Episode(props) {
	// Selector
	const columns = useSelector(selectColumns);
	const dispatch = useDispatch();

	const handleDeleteEpisode = () => {
		dispatch(deleteEpisodesStart(props.id));
	};

	const [episodeName, setEpisodeName] = useState(props.name);

	const inputRef = useRef(null);
	const handleEpisodeNameChange = (e) => {
		setEpisodeName(e.target.value);
	};
	const handleOnKeyDown = (e) => {
		if (e.key === 'Enter') {
			if (!episodeName) return;
			dispatch(
				updateEpisodeStart({
					id: props.id,
					updates: { name: episodeName },
				})
			);
			inputRef.current.blur();
		}
	};

	const handleSelectValChange = (colName, val) => {
		const existingRatings = props.ratings_factors;
		const changedRatings = {
			...existingRatings,
			[colName.toLowerCase()]: val,
		};
		dispatch(
			updateEpisodeStart({
				id: props.id,
				updates: { ratings_factors: changedRatings },
			})
		);
	};

	return (
		<div className="row_item">
			{columns.map((col, index) => {
				if (index === 0)
					return (
						<NameCell
							key={index}
							inputRef={inputRef}
							onKeyDown={handleOnKeyDown}
							onChange={handleEpisodeNameChange}
							className="padding_left_lg"
							name={episodeName}
							isExpanded={null}
							onDeleteClick={handleDeleteEpisode}
						/>
					);

				return (
					<div className="cell" key={col.id}>
						<Select
							onChange={handleSelectValChange}
							id={col.id}
							name={col.name}
							value={
								props.ratings_factors[col.name.toLowerCase()]
							}
							options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default React.memo(Episode);

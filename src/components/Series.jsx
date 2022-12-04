import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UIContext } from '../context/UIContext';
import { selectColumns } from '../redux/reducers/columns/selectors';

import {
	deleteSeriesStart,
	updateSeriesStart,
} from '../redux/reducers/series/actions';
import { seriesSeasonsSelector } from '../redux/reducers/series/selectors';
import NameCell from './NameCell';
import Season from './Season';

function Series(props) {
	// Selectors
	const columns = useSelector(selectColumns);
	const dispatch = useDispatch();
	const [expand, setExpand] = useState(false);
	const [seasonsAverageRatings, setSeasonsAverageRatings] = useState({});
	const [averageRatings, setAverageRatings] = useState([]);
	const { setAddDialog } = useContext(UIContext);

	const inputRef = useRef(null);

	const seasons = useSelector((state) =>
		seriesSeasonsSelector(state, props.id)
	);

	const handleToggleExpand = () => {
		setExpand(!expand);
	};

	const handleDeleteSeries = (e) => {
		e.stopPropagation();
		dispatch(deleteSeriesStart(props.id));
	};

	const handleOnAddClick = (e) => {
		e.stopPropagation();
		setAddDialog({
			visible: true,
			addType: 'season',
			extraData: { series: props.id },
		});
	};

	const [seriesName, setSeriesName] = useState(props.name);
	const handleSeriesNameChange = (e) => {
		setSeriesName(e.target.value);
	};
	const handleOnKeyDown = (e) => {
		if (e.key === 'Enter') {
			if (!seriesName) return;
			dispatch(
				updateSeriesStart({
					id: props.id,
					updates: { name: seriesName },
				})
			);
			inputRef.current.blur();
		}
	};

	const handleSetSeasonsAverageRatings = ({ id, ratings }) => {
		let mRatings = {};
		if (Object.keys(ratings).length === 0) {
			columns.forEach((column) => {
				mRatings[column.name.toLocaleLowerCase()] = 0;
			});
		} else {
			mRatings = ratings;
		}
		setSeasonsAverageRatings((prevState) => {
			return { ...prevState, [id]: { ...prevState[id], ...mRatings } };
		});
	};

	useEffect(() => {
		if (!seasons) return;
		var ratings = Object.keys(seasonsAverageRatings).map((key) => {
			return seasonsAverageRatings[key];
		});

		const average = ratings.reduce((a, ratings) => {
			const update = a;
			Object.keys(ratings).forEach((key) => {
				const x = parseFloat(a[key]) || 0;
				const y = parseFloat(ratings[key]) || 0;
				return (update[key] = x + y);
			});
			return update;
		}, {});

		const averageRatings = {};
		Object.keys(average).forEach((key) => {
			averageRatings[key] = (
				parseFloat(average[key]) / seasons.length
			).toFixed(1);
		});
		setAverageRatings(averageRatings);
	}, [seasonsAverageRatings]);

	return (
		<div className="container">
			<div className="row_item">
				{columns.map((col, index) => {
					if (index === 0)
						return (
							<NameCell
								key={index}
								inputRef={inputRef}
								onKeyDown={handleOnKeyDown}
								name={seriesName}
								onChange={handleSeriesNameChange}
								isExpanded={expand}
								onClick={handleToggleExpand}
								onAddClick={handleOnAddClick}
								onDeleteClick={handleDeleteSeries}
							/>
						);

					return (
						<div className="cell" key={index}>
							<span>
								{averageRatings &&
								averageRatings[col.name.toLowerCase()]
									? averageRatings[col.name.toLowerCase()]
									: '0.0'}
							</span>
						</div>
					);
				})}
			</div>
			<div style={{ maxHeight: expand ? 999 : 0, overflow: 'hidden' }}>
				{seasons.map((season) => (
					<Season
						key={season.id}
						{...season}
						columns={columns}
						setSeasonsAverageRatings={
							handleSetSeasonsAverageRatings
						}
						expandSeries={setExpand}
					/>
				))}
			</div>
		</div>
	);
}

export default React.memo(Series);

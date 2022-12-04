import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UIContext } from '../context/UIContext';
import { selectColumns } from '../redux/reducers/columns/selectors';
import { seasonEpisodesSelector } from '../redux/reducers/episode/selectors';

import {
	deleteSeasonStart,
	updateSeasonStart,
} from '../redux/reducers/seasons/actions';
import Episode from './Episode';
import NameCell from './NameCell';

function Season(props) {
	// Selectors
	const columns = useSelector(selectColumns);
	const { searchTerm } = useContext(UIContext);

	const dispatch = useDispatch();
	const [expand, setExpand] = useState(false);
	const [filteredEpisodes, setFilteredEpisodes] = useState(null);
	const [averageRatings, setAverageRatings] = useState(null);
	const { setAddDialog } = useContext(UIContext);

	const inputRef = useRef(null);

	const episodes = useSelector((state) =>
		seasonEpisodesSelector(state, props.id)
	);

	const handleDeleteSeason = (e) => {
		e.stopPropagation();
		dispatch(deleteSeasonStart(props.id));
	};

	const handleToggleExpand = () => {
		setExpand(!expand);
	};

	const handleOnAddClick = (e) => {
		e.stopPropagation();
		setAddDialog({
			visible: true,
			addType: 'episode',
			extraData: { season: props.id, series: props.series },
		});
	};

	const [seasonName, setSeasonName] = useState(props.name);

	const handleSeasonNameChange = (e) => {
		setSeasonName(e.target.value);
	};

	const handleOnKeyDown = (e) => {
		if (e.key === 'Enter') {
			if (!seasonName) return;
			dispatch(
				updateSeasonStart({
					id: props.id,
					updates: { name: seasonName },
				})
			);
			inputRef.current.blur();
		}
	};

	useEffect(() => {
		if (!episodes) return;
		setFilteredEpisodes(episodes);
		const average = episodes
			.map((episode) => episode.ratings_factors)
			.reduce((a, ratings) => {
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
				parseFloat(average[key]) / episodes.length
			).toFixed(1);
		});

		setAverageRatings(averageRatings);
		props.setSeasonsAverageRatings({
			id: props.id,
			ratings: averageRatings,
		});
	}, [episodes]);

	useEffect(() => {
		if (searchTerm === '') {
			props.expandSeries(false);
			setExpand(false);
			return setFilteredEpisodes(episodes);
		}
		const fEpisodes = episodes.filter((e) => e.name.includes(searchTerm));
		if (fEpisodes.length !== 0) {
			props.expandSeries(true);
			setExpand(true);
		}
		setFilteredEpisodes(fEpisodes);
	}, [searchTerm]);

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
								onChange={handleSeasonNameChange}
								className="padding_left_sm"
								name={seasonName}
								isExpanded={expand}
								onClick={handleToggleExpand}
								onAddClick={handleOnAddClick}
								onDeleteClick={handleDeleteSeason}
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
				{filteredEpisodes?.map((episode) => (
					<Episode key={episode.id} {...episode} />
				))}
			</div>
		</div>
	);
}

export default React.memo(Season);

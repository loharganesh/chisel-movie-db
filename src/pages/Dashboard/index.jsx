import React, { useContext, useEffect, useState } from 'react';
import ColumnHead from '../../components/ColumnHead';
import Series from '../../components/Series';
import styles from './Dashboard.module.css';
import '../../styles/main.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	seriesSelector,
	seriesWithEpisodes,
	seriesWithSeasons,
} from '../../redux/reducers/series/selectors';
import {
	fetchSeriesStart,
	postSeriesStart,
} from '../../redux/reducers/series/actions';
import { fetchSeasonStart } from '../../redux/reducers/seasons/actions';
import { UIContext } from '../../context/UIContext';
import AddDialog from '../../components/AddDialog';
import { fetchEpisodesStart } from '../../redux/reducers/episode/actions';
import {
	fetchColumnsStart,
	postColumnStart,
} from '../../redux/reducers/columns/actions';
import { selectColumns } from '../../redux/reducers/columns/selectors';

export default function Dashboard() {
	const { addDialog, searchTerm, setSearchTerm } = useContext(UIContext);
	const [inputs, setInputs] = useState({
		seriesName: '',
		columnName: '',
	});

	const dispatch = useDispatch();
	const series = useSelector(seriesSelector);
	const columns = useSelector(selectColumns);
	const mSeriesWithEpisodes = useSelector(seriesWithEpisodes);

	const [filteredSeries, setFilteredSeries] = useState(null);

	const onMount = async () => {
		dispatch(fetchColumnsStart());
		dispatch(fetchSeriesStart());
		dispatch(fetchSeasonStart());
		dispatch(fetchEpisodesStart());
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	const handleAddSeries = (e) => {
		if (e.key === 'Enter') {
			if (!inputs.seriesName) return;
			dispatch(postSeriesStart({ name: inputs.seriesName }));
			setInputs({ ...inputs, seriesName: '' });
		}
	};

	const handleAddColumn = (e) => {
		if (e.key === 'Enter') {
			if (!inputs.columnName) return;
			dispatch(postColumnStart({ name: inputs.columnName }));
			setInputs({ ...inputs, columnName: '' });
		}
	};

	const handleSearchTermChange = (e) => {
		setSearchTerm(e.target.value);
	};

	useEffect(() => {
		onMount();
		return () => {};
	}, []);

	//
	return (
		<>
			<div className={styles.search_container}>
				<input
					value={searchTerm}
					onChange={handleSearchTermChange}
					className="input"
					placeholder="Search Episode Here"
					style={{ width: 335, marginLeft: 18 }}
				/>
			</div>
			<div className={`${styles.container}`}>
				{addDialog.visible && <AddDialog />}
				<div className="row_item">
					{columns.map((col, index) => (
						<ColumnHead key={col.id} {...col} index={index} />
					))}
					<input
						name="columnName"
						value={inputs.columnName}
						onChange={handleInputChange}
						onKeyDown={handleAddColumn}
						className="input"
						placeholder="Add Rating Column"
						style={{ marginLeft: 18 }}
					/>
				</div>

				<div className="container">
					{series.map((series) => (
						<Series key={series._fields.id} {...series._fields} />
					))}
					<div className={styles.input_container}>
						<input
							name="seriesName"
							onChange={handleInputChange}
							value={inputs.seriesName}
							onKeyDown={handleAddSeries}
							className={`input ${styles.series_input}`}
							placeholder="Add New Series"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

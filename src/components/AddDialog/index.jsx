import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UIContext } from '../../context/UIContext';
import { postEpisodesStart } from '../../redux/reducers/episode/actions';
import { postSeasonStart } from '../../redux/reducers/seasons/actions';
import IconButton from '../IconButton';
import styles from './AddDialog.module.css';

export default function AddDialog() {
	const dispatch = useDispatch();

	const { addDialog, setAddDialog } = useContext(UIContext);
	const title =
		addDialog.addType === 'season' ? 'Create Season' : 'Create Episode';
	const placeholder =
		addDialog.addType === 'season'
			? 'Enter Season Name'
			: 'Enter Episode Name';

	const [input, setInput] = useState('');
	const handleIputChange = (e) => {
		setInput(e.target.value);
	};
	const handleOnKeyDown = (e) => {
		if (e.key === 'Enter') {
			if (addDialog.addType === 'season') {
				dispatch(
					postSeasonStart({ ...addDialog.extraData, name: input })
				);
			} else {
				dispatch(
					postEpisodesStart({ ...addDialog.extraData, name: input })
				);
			}

			setInput('');
			setAddDialog({ visible: false, addType: '', extraData: null });
		}
	};
	const handleCloseClick = () => {
		setAddDialog({ visible: false, addType: '', extraData: null });
	};

	return (
		<div className={[styles.overlay]}>
			<div className={[styles.content]}>
				<div className={styles.dialog_header}>
					<h5 className="title semibold">{title}</h5>
					<IconButton iconName="cross" onClick={handleCloseClick} />
				</div>
				<div className={styles.wrapper}>
					<input
						value={input}
						onChange={handleIputChange}
						onKeyDown={handleOnKeyDown}
						className={`input ${styles.input}`}
						placeholder={placeholder}
					/>
				</div>
			</div>
		</div>
	);
}

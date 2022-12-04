import React from 'react';
import IconButton from '../IconButton';
import styles from './NameCell.module.css';

export default function NameCell({
	className,
	name,
	isExpanded,
	onClick,
	onAddClick,
	onDeleteClick,
	onChange,
	onKeyDown,
	inputRef,
}) {
	return (
		<div className={`${className} name_cell ${styles.container}`}>
			{isExpanded !== null && (
				<IconButton
					className={`${
						isExpanded ? 'chevron_expanded' : 'chevron_collapsed'
					}`}
					iconName="chevron"
					size={20}
					onClick={onClick}
				/>
			)}
			<input
				ref={inputRef}
				onKeyDown={onKeyDown}
				onChange={onChange}
				style={{ flex: 1 }}
				value={name}
				className="inline_editable_input"
			/>
			<div className={styles.buttons_container}>
				{isExpanded !== null && (
					<IconButton iconName="plus" onClick={onAddClick} />
				)}
				<IconButton iconName="cross" onClick={onDeleteClick} />
			</div>
		</div>
	);
}

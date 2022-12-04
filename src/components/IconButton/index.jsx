import React from 'react';
import Icon from '../Icon';
import styles from './IconButton.module.css';

export default function IconButton({ className, iconName, onClick }) {
	return (
		<div onClick={onClick} className={`${className} ${styles.wrapper}`}>
			<Icon name={iconName} />
		</div>
	);
}

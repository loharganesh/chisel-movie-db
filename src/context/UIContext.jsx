import React, { createContext, useState } from 'react';

export const UIContext = createContext();

export default function UIProvider({ children }) {
	const [addDialog, setAddDialog] = useState({
		visible: false,
		addType: 'season',
		extraData: null,
	});

	const [searchTerm, setSearchTerm] = useState('');

	return (
		<UIContext.Provider
			value={{
				addDialog,
				setAddDialog,

				searchTerm,
				setSearchTerm,
			}}
		>
			{children}
		</UIContext.Provider>
	);
}

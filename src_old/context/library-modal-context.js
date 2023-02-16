/**
 * WordPress dependencies
 */
import { createContext, useState } from '@wordpress/element';

const LibraryModalContext = createContext({
	searchValue: '',
	setSearchValue: () => {},
});

const LibraryModalContextProvider = (props) => {
	const [selectedTab, setSelectedTab] = useState('patterns');
	const [selectedTaxonomy, setSelectedTaxonomy] = useState('featured');
	const [searchValue, setSearchValue] = useState('');

	return (
		<LibraryModalContext.Provider
			value={{
				selectedTab,
				setSelectedTab,
				selectedTaxonomy,
				setSelectedTaxonomy,
				searchValue,
				setSearchValue,
			}}
		>
			{props.children}
		</LibraryModalContext.Provider>
	);
};

export default LibraryModalContextProvider;
export { LibraryModalContext };

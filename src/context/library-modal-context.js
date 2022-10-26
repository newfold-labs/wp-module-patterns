/**
 * WordPress dependencies
 */
import { createContext, useState, useRef } from '@wordpress/element';

const LibraryModalContext = createContext({
	searchValue: '',
	setSearchValue: () => {},
	searchRef: null,
});

const LibraryModalContextProvider = (props) => {
	const [searchValue, setSearchValue] = useState('');
	const searchRef = useRef(null);

	return (
		<LibraryModalContext.Provider
			value={{ searchValue, setSearchValue, searchRef }}
		>
			{props.children}
		</LibraryModalContext.Provider>
	);
};

export default LibraryModalContextProvider;
export { LibraryModalContext };

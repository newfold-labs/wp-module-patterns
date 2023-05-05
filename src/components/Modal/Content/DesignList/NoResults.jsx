/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ReactComponent as NoResultsSVG } from '../../../../svg/NoResults.svg';
import { ReactComponent as NoFavoritesSVG } from '../../../../svg/NoFavorites.svg';

const NoResults = ({ isFavorites }) => {
	const title = isFavorites
		? __(
				"You haven't added any patterns or page templates to your favorites yet.",
				'nfd-wonder-blocks'
		  )
		: __(
				"Sorry, we couldn't find any results for that. Please try a different search term.",
				'nfd-wonder-blocks'
		  );

	const svg = isFavorites ? <NoFavoritesSVG /> : <NoResultsSVG />;

	return (
		<div className="nfd-wba-flex nfd-wba-grow nfd-wba-items-center nfd-wba-justify-center">
			<div className="nfd-wba-state-message nfd-wba-flex nfd-wba-w-full nfd-wba-max-w-[640px] nfd-wba-flex-col nfd-wba-items-center nfd-wba-justify-center nfd-wba-gap-8 nfd-wba-pb-[10%]">
				{svg}
				<p className="nfd-wba-m-0 nfd-wba-max-w-[420px] nfd-wba-text-center nfd-wba-text-2xl nfd-wba-font-light nfd-wba-text-dark">
					{title}
				</p>
			</div>
		</div>
	);
};
export default NoResults;

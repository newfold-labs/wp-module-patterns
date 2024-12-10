/**
 * WordPress dependencies
 */
import { useDispatch } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { Icon } from "@wordpress/icons";
import { HeartIcon } from "lucide-react";
/**
 * Internal dependencies
 */
import iconMapping from "../../../../helpers/iconMapping";
import { store as nfdPatternsStore } from "../../../../store";
import { ReactComponent as NoFavoritesSVG } from "../../../../svg/NoFavorites.svg";
import { ReactComponent as NoResultsSVG } from "../../../../svg/NoResults.svg";
import CategoryButton from "../CategoryButton";

const NoResults = ({ isFavorites }) => {
	let title;

	// Store actions and states.
	const { setActivePatternsCategory, setShouldResetKeywords } = useDispatch(nfdPatternsStore);

	if (isFavorites) {
		const favoritesTitle = __(
			"Click the %s on your favorite and frequently-used Patterns & Templates for quick access.",
			"nfd-wonder-blocks"
		).split("%s");
		title = (
			<span>
				{favoritesTitle[0]}
				<HeartIcon className="nfd-wba-fill-red-600 nfd-wba-stroke-red-600 -nfd-wba-mt-2 nfd-wba-align-middle" />
				{favoritesTitle[1]}
			</span>
		);
	} else {
		title = __(
			"Sorry, we couldn't find any results for that. Please try a different search term.",
			"nfd-wonder-blocks"
		);
	}

	const svg = isFavorites ? <NoFavoritesSVG /> : <NoResultsSVG />;

	return (
		<div className="nfd-wba-flex nfd-wba-grow nfd-wba-items-center nfd-wba-justify-center">
			<div className="nfd-wba-state-message nfd-wba-flex nfd-wba-w-full nfd-wba-max-w-[640px] nfd-wba-flex-col nfd-wba-items-center nfd-wba-justify-center nfd-wba-gap-8 nfd-wba-pb-[10%]">
				{svg}
				<p className="nfd-wba-m-0 nfd-wba-max-w-[420px] nfd-wba-text-center nfd-wba-text-2xl nfd-wba-font-light nfd-wba-text-dark">
					{title}
				</p>

				{isFavorites && (
					<div className="nfd-wba-flex nfd-wba-gap-6 nfd-wba-mt-8">
						<CategoryButton
							category="Features"
							icon={
								<Icon
									icon={iconMapping["patterns-categories-features"]}
									size={24}
								/>
							}
							onClick={() => {
								setActivePatternsCategory("features");
								setShouldResetKeywords(true);
							}}
						/>
						<CategoryButton
							category="Text"
							icon={
								<Icon
									icon={iconMapping["patterns-categories-text"]}
									size={24}
								/>
							}
							onClick={() => {
								setActivePatternsCategory("text");
								setShouldResetKeywords(true);
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
export default NoResults;

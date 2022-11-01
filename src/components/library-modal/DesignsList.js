/**
 * Internal dependencies
 */
import DesignItem from './DesignItem';
import useFetchPatterns from '../../hooks/useFetchPatterns';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { memo, useState, useEffect } from '@wordpress/element';

const DesignsList = memo(({ onInsert }) => {
	const { data, isLoading } = useFetchPatterns();
	const [animatedIn, setAnimatedIn] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setAnimatedIn(true);
		}, 100);
	});

	if (isLoading || !animatedIn) {
		return null;
	}

	return (
		<div
			className="nfd-mx-6 nfd-mb-8 nfd-grid nfd-snap-y nfd-scroll-pt-[60px] nfd-grid-cols-1 nfd-gap-6 lg:nfd-grid-cols-2 xl:nfd-grid-cols-3"
			aria-label={__('Block patterns', 'nfd-patterns')}
		>
			{data?.patterns?.map((design, index) => {
				return (
					<DesignItem
						key={design.id}
						item={design}
						onInsert={onInsert}
						index={index}
					/>
				);
			})}
		</div>
	);
});

export default DesignsList;

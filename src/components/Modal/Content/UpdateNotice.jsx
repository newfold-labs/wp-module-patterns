/**
 * External dependencies
 */
import { compare } from 'compare-versions';

/**
 * WordPress dependencies
 */
import { Notice } from '@wordpress/components';
import { addQueryArgs } from '@wordpress/url';
import { createInterpolateElement } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	BRAND_NAME,
	MIN_REQUIRED_WP_VERSION,
	WP_VERSION,
} from '../../../constants';

const UpdateNotice = () => {
	if (compare(WP_VERSION, MIN_REQUIRED_WP_VERSION, '>=')) {
		return null;
	}

	const updateURL = addQueryArgs('update-core.php');

	const message = createInterpolateElement(
		sprintf(
			// translators: %s: brand name - 'Wonder Blocks'.
			__(
				'%s needs the latest version of WordPress, please <a>update your site</a>.',
				'nfd-wonder-blocks'
			),
			BRAND_NAME
		),
		{
			// eslint-disable-next-line jsx-a11y/anchor-has-content
			a: <a href={updateURL} />,
		}
	);

	return (
		<Notice
			className="nfd-wba-m-0 nfd-wba-mb-8"
			isDismissible={false}
			status="warning"
		>
			{message}
		</Notice>
	);
};

export default UpdateNotice;

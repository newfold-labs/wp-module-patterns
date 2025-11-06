import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { Fragment, useRef, useState, useEffect } from '@wordpress/element';
import {
	BlockControls,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	Popover,
} from '@wordpress/components';
import { link } from '@wordpress/icons';
import classnames from 'classnames';

const TARGET = [ 'core/group', 'core/cover' ];

const withAttrs = ( settings, name ) => {
	if ( ! TARGET.includes( name ) ) return settings;
	return {
		...settings,
		attributes: {
			...settings.attributes,
			linkUrl: {
				type: 'string',
				default: '',
			},
			linkOpensInNewTab: {
				type: 'boolean',
				default: false,
			},
		},
	};
};

const withToolbar = ( BlockEdit ) => ( props ) => {
	if ( ! TARGET.includes( props.name ) ) return <BlockEdit { ...props } />;

	const { attributes, setAttributes, isSelected } = props;
	const { linkUrl, linkOpensInNewTab } = attributes;

	const [ open, setOpen ] = useState( false );
	const buttonRef = useRef( null );
	const linkWrapRef = useRef( null );

	const value = { url: linkUrl || '', opensInNewTab: !!linkOpensInNewTab };

	useEffect( () => {
		if ( open && linkWrapRef.current ) {
			const id = setTimeout( () => {
				const input =
					linkWrapRef.current.querySelector(
						'input[type="text"], input[type="search"]'
					);
				input?.focus();
			}, 0 );
			return () => clearTimeout( id );
		}
	}, [ open ] );

	return (
		<Fragment>
			<BlockEdit { ...props } />
			{ isSelected && (
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							ref={ buttonRef }
							icon={ link }
							label={ __( 'Link', 'nfd-wonder-blocks' ) }
							onClick={ () => setOpen( ( isOpen ) => ! isOpen ) }
							isPressed={ open }
						/>
					</ToolbarGroup>
				</BlockControls>
			) }

			{ open && (
				<Popover
					anchor={ buttonRef.current }
					placement="bottom-start"
					onClose={ () => setOpen( false ) }
					focusOnMount={ false }
				>
					<div ref={ linkWrapRef } style={ { width: 360 } }>
						<LinkControl
							key={ open ? 'lc-open' : 'lc-closed' }
							value={ value }
							onChange={ ( next ) =>
								setAttributes( {
									linkUrl: next?.url || '',
									linkOpensInNewTab: !!next?.opensInNewTab,
								} )
							}
							settings={ [
								{
									id: 'opensInNewTab',
									title: __( 'Open in new tab', 'nfd-wonder-blocks' ),
								},
							] }
							onRemove={ () => {
								setAttributes( {
									linkUrl: '',
									linkOpensInNewTab: false,
								} );
								setOpen( false );
							} }
							suggestionsQuery={ {
								type: 'post',
								subtype: 'page',
								perPage: 20,
							} }
							initialSuggestionsSearchOptions={ {
								type: 'post',
								subtype: 'page',
								perPage: 20,
							} }
						/>
					</div>
				</Popover>
			) }
		</Fragment>
	);
};

const addSaveProps = ( extraProps, blockType, attributes ) => {

	if ( ! TARGET.includes( blockType.name ) ) {
		return extraProps;
	}

	const { linkUrl, linkOpensInNewTab } = attributes || {};
	if ( ! linkUrl ) {
		return extraProps;
	}

	return {
		...extraProps,
		className: classnames( extraProps.className, 'nfd-is-linked-group' ),
		'data-link-url': linkUrl,
		'data-link-blank': linkOpensInNewTab ? '1' : '',
	};
};

const addEditorClass = ( BlockListBlock ) => ( props ) => {
	if ( ! TARGET.includes( props.name ) ) return <BlockListBlock { ...props } />;

	const { linkUrl, linkOpensInNewTab } = props.attributes || {};
	const hasLink = !!linkUrl;

	const className = classnames(
		props.className,
		hasLink && 'nfd-is-linked-group'
	);

	const wrapperProps = {
		...props.wrapperProps,
		...( hasLink && {
			'data-link-url': linkUrl,
			'data-link-blank': linkOpensInNewTab ? '1' : '',
		} ),
	};

	return (
		<BlockListBlock
			{ ...props }
			className={ className }
			wrapperProps={ wrapperProps }
		/>
	);
};

addFilter(
	'blocks.registerBlockType',
	'nfd-wonder-blocks/utilities/group-link/attrs',
	withAttrs
);
addFilter(
	'editor.BlockEdit',
	'nfd-wonder-blocks/utilities/group-link/toolbar',
	withToolbar
);
addFilter(
	'editor.BlockListBlock',
	'nfd-wonder-blocks/utilities/group-link/editor-class',
	addEditorClass
);
addFilter(
	'blocks.getSaveContent.extraProps',
	'nfd-wonder-blocks/utilities/group-link/save-props',
	addSaveProps
);

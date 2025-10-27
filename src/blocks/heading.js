import { addFilter } from '@wordpress/hooks';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import {
	create as createRT,
	toHTMLString,
	applyFormat,
	registerFormatType
} from '@wordpress/rich-text';
import {createHigherOrderComponent} from "@wordpress/compose";
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { BorderControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const STYLE_CLASS = 'is-style-nfd-heading-highlight';
const FORMAT_TYPE = 'nfd/heading-highlight';
const FORMAT_CLASS = 'nfd-heading-highlight__text';
import TitleWithLogo from "../components/TitleWithLogo";

const resolveHeadingColor = (slug, custom) =>
	slug ? `var(--wp--preset--color--${slug})` : (custom || undefined);

const withHeadingHighlightSync = ( BlockEdit ) => ( props ) => {
	if ( props.name !== 'core/heading' ) return <BlockEdit { ...props } />;

	const { attributes } = props;
	const { updateBlockAttributes } = useDispatch('core/block-editor');

	const { className, content } = useSelect( ( select ) => {
		const attrs = select('core/block-editor').getBlockAttributes( props.clientId ) || {};
		return { className: attrs.className || '', content: attrs.content || '' };
	}, [ props.clientId ] );

	const styled = className.includes( STYLE_CLASS );

	useEffect( () => {
		const html = content || '';
		const parser = new DOMParser();
		const doc = parser.parseFromString( html, 'text/html' );
		let changed = false;

		doc.querySelectorAll('span.nfd-heading-highlight__text').forEach( (node) => {
			const parent = node.parentNode;
			while ( node.firstChild ) parent.insertBefore( node.firstChild, node );
			parent.removeChild( node );
			changed = true;
		} );

		let normalizedHTML = doc.body.innerHTML || '';

		let value = createRT( { html: normalizedHTML } );

		const styled = (className || '').includes( STYLE_CLASS );
		if ( styled && value.text.length > 0 ) {
			value = applyFormat( value, { type: FORMAT_TYPE, attributes: { class: FORMAT_CLASS } }, 0, value.text.length );
		}

		const nextHTML = toHTMLString( { value } );

		if ( nextHTML !== content ) {
			updateBlockAttributes( props.clientId, { content: nextHTML } );
		}
	}, [ className, content ]);

	return <BlockEdit { ...props } />;
};

addFilter( 'editor.BlockEdit', 'nfd/heading-highlight/sync', withHeadingHighlightSync );


registerFormatType( FORMAT_TYPE, {
	title: 'Heading Highlight',
	tagName: 'span',
	className: FORMAT_CLASS,
	edit: () => null
} );


const listHeadingBlock = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		if (props.name !== 'core/heading') return <BlockListBlock {...props} />;
		const attr = props.attributes;
		const styleVars = {
			...(props.wrapperProps?.style || {}),
			'--nfd-heading-border': resolveHeadingColor(attr.nfdHeadingBorderColor, attr.nfdHeadingBorderColor),
		};

		return (
			<BlockListBlock
				{...props}
				wrapperProps={{...(props.wrapperProps || {}), style: styleVars}}
			/>
		);
	};
}, 'nfd-list-block');

addFilter('editor.BlockListBlock', 'nfd-wonder-blocks/utilities/listBlock', listHeadingBlock);


export const applyHeadingStylesInPlace = (props, blockType, atts) => {
	if ( !blockType || blockType.name !== 'core/heading' ) return;

	const color = atts?.nfdHeadingBorderColor || '';
	const width = atts?.nfdHeadingBorderWidth || '';
	const style = atts?.nfdHeadingBorderStyle || '';

	const resolveColor = ( value ) => {
		if ( typeof value !== 'string' || !value ) return undefined;
		const isLiteral =
			value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl');
		return isLiteral ? value : `var(--wp--preset--color--${ value })`;
	};

	const resolveWidth = ( value ) => {
		if ( typeof value !== 'string' || !value ) return undefined;
		if ( /(px|em|rem|vh|vw|%)$/i.test(value.trim()) ) return value.trim();
		if ( /^-?\d+(\.\d+)?$/.test(value.trim()) ) return `${value.trim()}px`;
		return undefined;
	};

	const resolveStyle = ( value ) => {
		const allowed = new Set([ 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden' ]);
		if ( typeof value !== 'string' || !value ) return undefined;
		const v = value.trim().toLowerCase();
		return allowed.has(v) ? v : undefined;
	};

	const borderColor = resolveColor(color);
	const borderWidth = resolveWidth(width);
	const borderStyle = resolveStyle(style) || 'solid';

	const nextStyle = { ...(props.style || {}) };

	if ( borderColor ) {
		nextStyle['--nfd-heading-border'] = borderColor;
	}
	if ( borderWidth ) {
		nextStyle['--nfd-heading-border-size'] = borderWidth;
	}
	if ( borderStyle ) {
		nextStyle['--nfd-heading-border-style'] = borderStyle;
	}

	if (
		!nextStyle['--nfd-heading-border'] &&
		!nextStyle['--nfd-heading-border-size'] &&
		!nextStyle['--nfd-heading-border-style']
	) return;

	props.style = nextStyle;
}


const HeadingExtras = ( props ) => {
	const { attributes, setAttributes } = props;
	return (
		<InspectorControls group="styles">
			<PanelBody
				title={<TitleWithLogo title={ __("Heading styles", "nfd-wonder-blocks") } />}
				initialOpen={ true }
			>
				<BorderControl
					label={ __( 'Border', 'nfd-wonder-blocks' ) }
					value={{
						width: attributes.nfdHeadingBorderWidth || '1px',
						color: attributes.nfdHeadingBorderColor || undefined,
						style: attributes.nfdHeadingBorderStyle || 'solid',
					}}
					onChange={ (border) => {
						setAttributes({
							nfdHeadingBorderWidth: border?.width || '1px',
							nfdHeadingBorderColor: border?.color || '',
							nfdHeadingBorderStyle: border?.style || 'solid',
						});
					} }
					enableStyle={ true }
					enableAlpha={ true }
					withSlider={ true }
					isCompact={ true }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default HeadingExtras;

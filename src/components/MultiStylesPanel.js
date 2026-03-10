import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { store as blocksStore } from '@wordpress/blocks';
import { Button } from '@wordpress/components';

const STYLE_PREFIX = 'is-style-';

function getActiveStyleNames( className ) {
	if ( ! className ) {
		return new Set();
	}
	const active = new Set();
	for ( const token of className.split( /\s+/ ) ) {
		if ( token.startsWith( STYLE_PREFIX ) ) {
			active.add( token.substring( STYLE_PREFIX.length ) );
		}
	}
	return active;
}

function toggleStyleClass( className, styleName ) {
	const token = STYLE_PREFIX + styleName;
	const classes = ( className || '' ).split( /\s+/ ).filter( Boolean );
	const idx = classes.indexOf( token );

	if ( idx !== -1 ) {
		classes.splice( idx, 1 );
	} else {
		classes.push( token );
	}

	return classes.join( ' ' );
}

function clearStyleClasses( className ) {
	if ( ! className ) {
		return '';
	}
	return className
		.split( /\s+/ )
		.filter( ( c ) => ! c.startsWith( STYLE_PREFIX ) )
		.join( ' ' );
}

export default function MultiStylesPanel( { clientId, blockName } ) {
	const { styles, className } = useSelect(
		( select ) => {
			const allStyles =
				select( blocksStore ).getBlockStyles( blockName ) || [];
			const attrs =
				select( blockEditorStore ).getBlockAttributes( clientId ) || {};
			return {
				styles: allStyles,
				className: attrs.className || '',
			};
		},
		[ clientId, blockName ]
	);

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	if ( ! styles.length ) {
		return null;
	}

	const activeNames = getActiveStyleNames( className );

	const onToggle = ( style ) => {
		if ( style.isDefault ) {
			const updated = clearStyleClasses( className );
			updateBlockAttributes( clientId, { className: updated } );
			return;
		}
		const updated = toggleStyleClass( className, style.name );
		updateBlockAttributes( clientId, { className: updated } );
	};

	return (
		<div className="block-editor-block-styles" data-multi-styles>
			<div className="block-editor-block-styles__variants">
				{ styles.map( ( style ) => {
					const isActive = style.isDefault
						? activeNames.size === 0
						: activeNames.has( style.name );

					return (
						<Button
							key={ style.name }
							variant="secondary"
							__next40pxDefaultSize
							className={
							`block-editor-block-styles__item${
								isActive ? ' is-active' : ''
							}`
						}
							aria-current={ isActive }
							aria-label={ style.label }
							onClick={ () => onToggle( style ) }
						>
							<span className="components-truncate block-editor-block-styles__item-text">
								{ style.label }
							</span>
						</Button>
					);
				} ) }
			</div>
		</div>
	);
}

import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { store as blocksStore } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useEffect, useState, createPortal } from '@wordpress/element';

import MultiStylesPanel from './components/MultiStylesPanel';
import './editor.css';

/**
 * Injects the multi-select styles panel into the existing "Styles" PanelBody
 * rendered by core, keeping it in the exact same position.
 *
 * @param {Object} props           Component props.
 * @param {string} props.clientId  The block client ID.
 * @param {string} props.blockName The block type name.
 */
function MultiStylesPortal( { clientId, blockName } ) {
	const [ container, setContainer ] = useState( null );

	useEffect( () => {
		let currentRoot = null;

		const ensurePortal = () => {
			const inspector = document.querySelector(
				'.block-editor-block-inspector'
			);
			if ( ! inspector ) {
				if ( currentRoot ) {
					currentRoot = null;
					setContainer( null );
				}
				return;
			}

			const blockStyles = inspector.querySelector(
				'.block-editor-block-styles'
			);
			if ( ! blockStyles?.parentNode ) {
				if ( currentRoot ) {
					currentRoot = null;
					setContainer( null );
				}
				return;
			}

			// Already set up and still in the DOM.
			if (
				currentRoot &&
				blockStyles.parentNode.contains( currentRoot )
			) {
				return;
			}

			currentRoot = document.createElement( 'div' );
			currentRoot.className = 'multi-block-styles-root';
			blockStyles.parentNode.insertBefore(
				currentRoot,
				blockStyles.nextSibling
			);
			setContainer( currentRoot );
		};

		ensurePortal();

		const observer = new MutationObserver( ensurePortal );
		observer.observe( document.body, {
			childList: true,
			subtree: true,
		} );

		return () => {
			observer.disconnect();
			currentRoot?.remove();
			setContainer( null );
		};
	}, [ clientId ] );

	if ( ! container ) {
		return null;
	}

	return createPortal(
		<MultiStylesPanel clientId={ clientId } blockName={ blockName } />,
		container
	);
}

const withMultiBlockStyles = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { name, clientId } = props;

		const { hasStyles, isSelected } = useSelect(
			( select ) => {
				const styles =
					select( blocksStore ).getBlockStyles( name ) || [];
				const selectedId =
					select( 'core/block-editor' ).getSelectedBlockClientId();
				return {
					hasStyles: styles.length > 0,
					isSelected: selectedId === clientId,
				};
			},
			[ name, clientId ]
		);

		return (
			<>
				<BlockEdit { ...props } />
				{ hasStyles && isSelected && (
					<MultiStylesPortal
						clientId={ clientId }
						blockName={ name }
					/>
				) }
			</>
		);
	};
}, 'withMultiBlockStyles' );

addFilter(
	'editor.BlockEdit',
	'multi-block-styles/with-multi-block-styles',
	withMultiBlockStyles
);

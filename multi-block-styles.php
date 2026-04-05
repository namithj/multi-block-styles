<?php
/**
 * Plugin Name: Multi Block Styles
 * Description: Allows selecting multiple block styles simultaneously instead of just one.
 * Version: 1.0.0
 * Requires at least: 6.5
 * Requires PHP: 8.2
 * Author: namithjawahar
 * Author URI: http://www.smartlogix.co.in/
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Security: namithj@smartlogix.co.in
 *
 * @package Multi_Block_Styles
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'enqueue_block_editor_assets',
	function () {
		$asset_file = __DIR__ . '/build/index.asset.php';

		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = require $asset_file;

		wp_enqueue_script(
			'multi-block-styles-editor',
			plugins_url( 'build/index.js', __FILE__ ),
			$asset['dependencies'],
			$asset['version'],
			true
		);

		if ( file_exists( __DIR__ . '/build/index.css' ) ) {
			wp_enqueue_style(
				'multi-block-styles-editor',
				plugins_url( 'build/index.css', __FILE__ ),
				array(),
				$asset['version']
			);
		}
	}
);

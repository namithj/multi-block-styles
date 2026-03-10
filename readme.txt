=== Multi Block Styles ===
Contributors: aardvark
Tags: block styles, gutenberg, editor, blocks, styles
Requires at least: 6.5
Tested up to: 6.9
Stable tag: 1.0.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Select multiple block styles at once instead of being limited to just one.

== Description ==

By default, WordPress only allows selecting a single block style variation at a time. Multi Block Styles removes this limitation, letting you toggle multiple styles on any block that supports them.

The plugin replaces the default single-select styles panel in the block inspector with a multi-select version. The panel looks and works exactly like the original — same position, same appearance — but each style button now acts as a toggle instead of a radio button.

**How it works:**

* Each style button toggles its corresponding `is-style-*` class on or off
* Multiple styles can be active simultaneously
* The "Default" button clears all active styles
* Works with any block that has registered style variations (Button, Image, Separator, Quote, Table, and any custom blocks)

**Use cases:**

* Combine visual treatments — apply both a shadow style and a rounded style to the same block
* Layer theme-defined styles for more design flexibility without writing custom CSS
* Build composable style systems where each style controls one visual property

== Installation ==

1. Upload the `multi-block-styles` folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Open the block editor and select any block with style variations — the styles panel now supports multi-select.

== Frequently Asked Questions ==

= Which blocks does this work with? =

Any block that has registered style variations. Core blocks include Button, Image, Separator, Quote, and Table. It also works with any custom or third-party blocks that register styles.

= Can I still use just one style at a time? =

Yes. The toggle behavior is fully backward-compatible. Selecting a single style works the same as before — the only difference is that you can now select additional styles without deselecting the first.

= What happens if two active styles conflict visually? =

The last declared style in CSS takes precedence. For best results, design styles to control different properties (e.g., one for borders, another for shadows) so they compose cleanly.

= Does this change saved content? =

No. Block styles are stored as CSS classes in the block's `className` attribute, which is a standard string. Multiple `is-style-*` classes have always been valid HTML — WordPress just didn't provide a UI to select more than one.

== Changelog ==

= 1.0.0 =
* Initial release.
* Multi-select toggle for block style variations.
* Matches the native styles panel markup and position.
* Works with all blocks that support style variations.

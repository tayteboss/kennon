import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import pxToRem from "../utils/pxToRem";

export const GlobalStyles = createGlobalStyle`
	:root {
		--colour-1: #F0E1CE;
		--colour-2: #E3D999;
		--colour-3: #E3E4E2;
		--colour-4: #E3C19D;
		--colour-5: #EAE2D7;
		--colour-6: #CCDEDE;
		/* --colour-1: #1E2662;
		--colour-2: #171D27;
		--colour-3: #0E172B;
		--colour-4: #302221;
		--colour-5: #364258; */
		--colour-white: ${theme.colours.white};
		--colour-black: ${theme.colours.black};
		--colour-dark-grey: ${theme.colours.darkGrey};
		--colour-mid-grey: ${theme.colours.midGrey};
		--colour-light-grey: ${theme.colours.lightGrey};
		--colour-cream: ${theme.colours.cream};
		--colour-light-cream: ${theme.colours.lightCream};
		--font-arizona-flare-light: ${theme.fonts.arizonaFlareLight};
		--font-helvetica-neue-medium: ${theme.fonts.helveticaNeueMedium};
		--font-helvetica-neue-roman: ${theme.fonts.helveticaNeueRoman};
		--transition-speed-default: ${theme.transitionSpeed.default};
		--transition-speed-fast: ${theme.transitionSpeed.fast};
		--transition-speed-extra-fast: ${theme.transitionSpeed.extraFast};
		--transition-speed-slow: ${theme.transitionSpeed.slow};
		--transition-speed-extra-slow: ${theme.transitionSpeed.extraSlow};
		--transition-ease: cubic-bezier(0.65, 0, 0.35, 1);
	}

	* {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: none;
		list-style: none;
		background: none;
		outline: none;
		border-radius: 0;
		box-shadow: none;
	}

	-webkit-text-size-adjust: 100%;

	::selection {
		background-color: black;
		color: white;
	}

	html {
		background: var(--colour-white);
		font-size: 16px;

		&.no-scroll {
			overflow-y: hidden;
			
			body {
				overflow-y: hidden;
			}
		}
	}

	body {
		position: relative;
	}

	input,
	textarea,
	select,
	button,
	label,
	body {
		font-family: var(--font-helvetica-neue-medium);
		color: var(--colour-black);
		line-height: normal;
	}

	strong,
	b {
		font-weight: 900;
	}

	em {
		font-style: italic;
	}

	a {
		text-decoration: none;
		color: var(--colour-black);
	}

	button {
		cursor: pointer;
	}

	h1,
	.type-h1 {
		font-size: ${pxToRem(32)};
		line-height: ${pxToRem(35)};
		letter-spacing: -0.03em;
		font-weight: 200;

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(25)};
			line-height: ${pxToRem(29)};
		}
	}

	h2,
	.type-h2,
	h3,
	.type-h3,
	h4,
	.type-h4,
	h5,
	.type-h5,
	h6,
	.type-h6 {
		font-weight: 200;
		font-size: ${pxToRem(14)};
		line-height: ${pxToRem(18)};
	}

	p,
	.type-p,
	a,
	button,
	div {
		font-size: ${pxToRem(14)};
		line-height: ${pxToRem(18)};

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(14)};
			line-height: ${pxToRem(18)};
		}
	}

	.type-p-small {
		font-size: ${pxToRem(14)};
	}

	.type-small {
		font-size: ${pxToRem(12)};
		line-height: ${pxToRem(16)};
	}

	.type-heading-small {
		font-size: ${pxToRem(14)};
		line-height: ${pxToRem(18)};
		text-transform: uppercase;
	}

	.type-heading-xsmall {
		font-size: ${pxToRem(11)};
		text-transform: uppercase;
	}

	.work-landscape-card {
		display: block;
		height: 100lvh;
		width: 100%;
		position: relative;
	}

	.work-portrait-card {
		grid-column: span 4;

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			grid-column: span 3;
		}
	}

	.studio-section {
		margin-bottom: ${pxToRem(120)};
	}

	.work-section {
		margin-bottom: ${pxToRem(80)};

		&--full {
			.media-wrapper {
				height: 100vh;
				width: 100%;
			}
		}

		&--square {
			.media-wrapper {
				padding-top: 100%;
			}

			.work-section__full-inner {
				padding: 0 ${pxToRem(24)};

				@media ${theme.mediaBreakpoints.tabletPortrait} {
					padding: 0 ${pxToRem(16)};
				}
			}

			.work-section__isolated-inner {
				grid-column: 4 / -4;

				@media ${theme.mediaBreakpoints.tabletPortrait} {
					grid-column: 1 / -1;
				}
			}
		}

		&--portrait {
			.media-wrapper {
				padding-top: 133.33%;
			}

			.work-section__isolated-inner {
				grid-column: 4 / -4;

				@media ${theme.mediaBreakpoints.tabletPortrait} {
					grid-column: 1 / -1;
				}
			}
		}

		&--landscape {
			.media-wrapper {
				padding-top: 75%;
			}

			.work-section__isolated-inner {
				grid-column: 3 / -3;

				@media ${theme.mediaBreakpoints.tabletPortrait} {
					grid-column: 1 / -1;
				}
			}
		}

		&__multi-cols-2 {
			grid-column: span 6;

			@media ${theme.mediaBreakpoints.tabletPortrait} {
				grid-column: 1 / -1;
			}
		}

		&__multi-cols-3 {
			grid-column: span 4;

			@media ${theme.mediaBreakpoints.tabletPortrait} {
				grid-column: 1 / -1;
			}
		}
	}

	mux-player {
		--media-object-fit: contain;
		--media-object-position: center;
		--controls: none;
		--media-object-fit: cover;
		--media-object-position: center;
	}

	.view-element-fade-in
	{
		opacity: 0;

		transition: opacity var(--transition-speed-slow) ease;

		&--in-view
		{
			opacity: 1;
		}
	}

	.view-element-bottom-top
	{
		opacity: 0;
		transform: translateY(15px);

		transition: opacity var(--transition-speed-default) cubic-bezier(0.65, 0, 0.35, 1), transform var(--transition-speed-default) cubic-bezier(0.65, 0, 0.35, 1);

		&--in-view
		{
			opacity: 1;
			transform: translateY(0);
		}
	}

	.view-element-scale-up
	{
		transform: scale(0.95);
		opacity: 0;

		transition: opacity var(--transition-speed-default) ease, transform var(--transition-speed-default) ease;

		&--in-view
		{
			opacity: 1;
			transform: scale(1);
		}
	}

	.view-element-image-blur-in
	{
		transform: scale(1.02);
		filter: blur(2px);

		transition: transform 2000ms ease, filter 500ms ease;

		&--in-view
		{
			transform: scale(1);
			filter: none;
		}
	}

	img {
		pointer-events: none !important;
	}

	.embla {
		overflow: hidden;
	}

	.embla__container {
		display: flex;
	}

	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
	}

	.performance {
		-webkit-transform: translateZ(0);
		backface-visibility: hidden;
		perspective: 1000;
		transform: translate3d(0,0,0);
		transform: translateZ(0);
	}

	::placeholder {
		color: currentcolor;
		opacity: 1;
	}

	input[type="search"]::-webkit-search-decoration,
	input[type="search"]::-webkit-search-cancel-button,
	input[type="search"]::-webkit-search-results-button,
	input[type="search"]::-webkit-search-results-decoration {
		-webkit-appearance: none;
	}

	input[type="hidden"] {
		display: none;
	}

	input,
	textarea,
	select {
		padding: 0.125rem 0;
		font-size: ${pxToRem(16)};
		width: 100%;
		appearance: none;
	}

	input::placeholder,
	textarea::placeholder {
		transition: all var(--transition-speed-default) var(--transition-ease);
	}

	textarea {
		min-height: 5rem;
	}

	label {
		display: inline-block;
	}

	.overflow-hidden {
		overflow: hidden;
	}

	img,
	video {
		max-width: 100%;
		display: block;
		height: auto;
	}

	iframe {
		max-width: 100%;
		display: block;
	}


	html.lenis {
		height: auto;
	}

	.lenis.lenis-smooth {
		scroll-behavior: auto !important;
	}

	.lenis.lenis-smooth [data-lenis-prevent] {
		overscroll-behavior: contain;
	}

	.lenis.lenis-stopped {
		overflow: hidden;
	}

	.lenis.lenis-scrolling iframe {
		pointer-events: none;
	}
`;

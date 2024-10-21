import prevBtnHtml from './slider-nav-prev-btn.html?raw';
import nextBtnHtml from './slider-nav-next-btn.html?raw';

export function generateNextButton() {
	return `<button class="custom-slider-nav-btn slider-bnt-next">
	<svg xmlns="http://www.w3.org/2000/svg" width="6" height="9" viewBox="0 0 6 9" fill="none">
		<path d="M1.25 1.16504L4.58333 4.49837L1.25 7.83171" stroke="#535353" stroke-linejoin="round"/>
	</svg>
</button>`
}

export function generatePrevButton() {
	return `<button class="custom-slider-nav-btn slider-bnt-prev">
	<svg xmlns="http://www.w3.org/2000/svg" width="5" height="9" viewBox="0 0 5 9" fill="none">
		<path d="M4.58325 1.16504L1.24992 4.49837L4.58325 7.83171" stroke="#535353" stroke-linejoin="round"/>
	</svg>
</button>`
}
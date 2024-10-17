export function insertOnseHtml(position, markup, element) {
	element.insertAdjacentHTML(position, markup);
}

export function sliderParams(selector) {
	return {
		slidesPerView: 1,
		autoHeight: true,
		loop: true,
		navigation: {
			prevEl: `${selector} .slider-bnt-prev`,
			nextEl: `${selector} .slider-bnt-next`
		},
		pagination: true
	}
}
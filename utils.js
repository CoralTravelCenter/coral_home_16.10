export function insertOnseHtml(position, markup, element) {
	if (!element.dataset.inserted) {
		element.insertAdjacentHTML(position, markup);
		element.dataset.inserted = true;
	}
}

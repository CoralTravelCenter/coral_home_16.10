function goUpSearch() {
	const action = document.querySelector('[data-go-up-search]');
	const body = document.body;
	action.addEventListener('click', () => {
		window.scrollTo(0, 0)
		document.body.classList.add('js-backdrop');
	})
	document.body.addEventListener('click', (e) => {
		if (e.target === body) {
			document.body.classList.remove('js-backdrop');
		}
	})
}

if (!window.location.origin.includes('backoffice')) goUpSearch()
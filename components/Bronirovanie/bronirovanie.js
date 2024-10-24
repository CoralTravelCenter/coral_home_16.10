function goUpSearch() {
	const action = document.querySelector('[data-go-up-search]');
	const body = document.body;
	const hotelTab = document.querySelectorAll('[data-testid="quickSearchBarBlock"] .ant-tabs-nav-list .ant-tabs-tab')[1]
	action.addEventListener('click', () => {
		window.scrollTo(0, 0)
		body.classList.add('js-backdrop');
		hotelTab.click();
	})
	body.addEventListener('click', (e) => {
		if (e.target === body) {
			body.classList.remove('js-backdrop');
		}
	})
}

if (!window.location.origin.includes('backoffice')) goUpSearch()
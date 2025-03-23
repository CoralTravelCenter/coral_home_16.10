import './bronirovanie.scss'

function goUpSearch() {
  const action = document.querySelector('[data-go-up-search]');
  const body = document.body;
  const hotelTab = document.querySelector('[data-testid="quickSearchBarBlock"] [data-node-key="2"]')
  action.addEventListener('click', () => {
    window.scrollTo(0, 0)
    body.classList.add('js-backdrop');
    if (hotelTab !== undefined && hotelTab) {
      hotelTab.click();
    }
  })
  body.addEventListener('click', (e) => {
    if (e.target === body) {
      body.classList.remove('js-backdrop');
    }
  })
}

if (!window.location.origin.includes('backoffice')) goUpSearch()

function insertOnseHtml(position, markup, element) {
	if (!element.dataset.inserted) {
		element.insertAdjacentHTML(position, markup);
		element.setAttribute('inserted', true);
	}
}

function insertOnse(parent, element) {
	if (!element.dataset.inserted) {
		parent.append(element)
		parent.setAttribute('inserted', true);
	}
}


function sliderParams(selector) {
	return {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		navigation: {
			prevEl: `${selector} .slider-bnt-prev`,
			nextEl: `${selector} .slider-bnt-next`
		},
		pagination: true
	}
}

async function preloadScript(url, cb) {
	return new Promise(resolve => {
		const script_el = document.createElement('script');
		script_el.addEventListener('load', () => {
			script_el.remove();
			typeof cb === 'function' && cb();
			resolve();
		});
		script_el.src = url;
		document.head.append(script_el);
	});
}

async function vimeoAutoPlay(observer_options = {}) {
	const vboxes = document.querySelectorAll('.vimeo-video-box [data-vimeo-vid]');
	if (vboxes.length) {
		await preloadScript('https://player.vimeo.com/api/player.js');
		const io = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				const target = entry.target;
				if (entry.isIntersecting) {
					if (!target['vimeo-player']) {
						target['vimeo-player'] = new Vimeo.Player(target, {
							id: target.dataset.vimeoVid,
							background: 1,
							playsinline: 1,
							autopause: 0,
							title: 0,
							byline: 0,
							portrait: 0,
							autoplay: 1,
							muted: 1,
						});
						target['vimeo-player'].on('play', function () {
							this.element.parentElement.classList.add('playback');
						});
					}
					target['vimeo-player'].play();
				} else {
					target['vimeo-player']?.pause();
				}
			});
		}, Object.assign({}, {threshold: .33}, observer_options));
		vboxes.forEach(box => io.observe(box));
	}
}

function mediaMatcher(size, callback) {
	const mobileWidthMediaQuery = window.matchMedia(`(max-width: ${size}px)`);
	callback(mobileWidthMediaQuery.matches);
	mobileWidthMediaQuery.addEventListener("change", (e) =>
		callback(e.matches),
	);
}

function copyToClipboard(element) {
	try {
		navigator.clipboard.writeText(element.textContent);
		console.log('Содержимое скопировано в буфер обмена!');
	} catch (err) {
		console.error('Ошибка при копировании: ', err);
	}
}

class Tooltip {
	constructor(container, settings) {
		this.container = container;
		this.settings = settings;
		this.tooltip = document.createElement('div');
		this.tooltip.setAttribute('custom-tooltip-component', true);
		this.rendered = false
		this.render();
	}

	generateTooltipMarkup() {
		const vendor = (this.settings.vendor === 'coral') ? 'ООО «ТО КОРАЛ ТРЕВЕЛ ЦЕНТР»' : 'ООО «Оператор выгодных туров САНМАР»';
		const markup = `<div class="tooltip-content"><span class="erid">${vendor}.&nbsp;erid:&nbsp;<span>${this.settings.erid}</span></span>
				<button data-copy-code>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 1H4.625C4.55625 1 4.5 1.05625 4.5 1.125V2C4.5 2.06875 4.55625 2.125 4.625 2.125H12.375V12.875C12.375 12.9438 12.4312 13 12.5 13H13.375C13.4438 13 13.5 12.9438 13.5 12.875V1.5C13.5 1.22344 13.2766 1 13 1ZM11 3H3C2.72344 3 2.5 3.22344 2.5 3.5V11.7922C2.5 11.925 2.55312 12.0516 2.64687 12.1453L5.35469 14.8531C5.38906 14.8875 5.42813 14.9156 5.47031 14.9391V14.9688H5.53594C5.59062 14.9891 5.64844 15 5.70781 15H11C11.2766 15 11.5 14.7766 11.5 14.5V3.5C11.5 3.22344 11.2766 3 11 3ZM5.46875 13.3781L4.12344 12.0312H5.46875V13.3781ZM10.375 13.875H6.46875V11.6562C6.46875 11.3109 6.18906 11.0312 5.84375 11.0312H3.625V4.125H10.375V13.875Z" fill="#535353"></path></svg>
				</button></div>`
		insertOnseHtml('afterbegin', markup, this.tooltip)
	}

	render() {
		if (!this.rendered) {
			this.generateTooltipMarkup()
			insertOnse(this.container.parentElement, this.tooltip)
			this.events()
			this.rendered = true
		}
	}

	events() {
		this.container.addEventListener('mouseover', () => {
			this.tooltip.classList.add('js-active')
		});

		this.tooltip.addEventListener('mouseover', () => {
			this.tooltip.classList.add('js-active')
		});

		this.container.addEventListener('mouseleave', () => {
			this.tooltip.classList.remove('js-active')
		});

		this.tooltip.addEventListener('mouseleave', () => {
			this.tooltip.classList.remove('js-active')
		});

		this.tooltip.querySelector('[data-copy-code]').addEventListener('click', () => {
			copyToClipboard(this.tooltip.querySelector('.erid'))
		})
	}
}

function generateNextButton() {
	return `<button class="custom-slider-nav-btn slider-bnt-next">
	<svg xmlns="http://www.w3.org/2000/svg" width="6" height="9" viewBox="0 0 6 9" fill="none">
		<path d="M1.25 1.16504L4.58333 4.49837L1.25 7.83171" stroke="#535353" stroke-linejoin="round"/>
	</svg>
</button>`
}

function generatePrevButton() {
	return `<button class="custom-slider-nav-btn slider-bnt-prev">
	<svg xmlns="http://www.w3.org/2000/svg" width="5" height="9" viewBox="0 0 5 9" fill="none">
		<path d="M4.58325 1.16504L1.24992 4.49837L4.58325 7.83171" stroke="#535353" stroke-linejoin="round"/>
	</svg>
</button>`
}
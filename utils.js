export function insertOnseHtml(position, markup, element) {
	if (!element.dataset.inserted) {
		element.insertAdjacentHTML(position, markup);
		element.setAttribute('inserted', true);
	}
}

export function sliderParams(selector) {
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

export async function vimeoAutoPlay(observer_options = {}) {
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

export function mediaMatcher(size, callback) {
	const mobileWidthMediaQuery = window.matchMedia(`(max-width: ${size}px)`);
	callback(mobileWidthMediaQuery.matches);
	mobileWidthMediaQuery.addEventListener("change", (e) =>
		callback(e.matches),
	);
}
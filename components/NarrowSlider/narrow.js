import {insertOnseHtml, sliderParams, Tooltip} from "../../utils";
import {generateNextButton, generatePrevButton} from "../SliderNavBtn/slider-nav-btn.js";

function narrowInit() {
	const SETTINGS = window.narrow_slider;
	const narrow_slider = document.querySelector("[data-narrow-slider]");

	const markup = SETTINGS
		.map((el) => {
			return `
				<swiper-slide>
					<div class="content">
						<div class="text-content">
							<h3>${el.title}</h3>
							${(el.paragraph) ? `<p>${el.paragraph}</p>` : ''}
							<a class='coral-main-btn' href=${el.button_link} target="_blank">${el.button_text}</a>
						</div>
						<div class="visual">
							<img src=${el.img} alt="${el.SEO.alt}">
							${(el.erid === ''
					? '<button style="display: none;" class="tooltip-toggler" id="narrow-tooltip-toggler">Реклама</button>'
					: '<button style="display: flex;" class="tooltip-toggler" id="narrow-tooltip-toggler">Реклама</button>'
			)}
						</div>
					</div>
				</swiper-slide>
			`;
		})
		.join("");

	insertOnseHtml("afterbegin", markup, narrow_slider);
	insertOnseHtml("afterend", generateNextButton(), narrow_slider);
	insertOnseHtml("beforebegin", generatePrevButton(), narrow_slider);

	const slider_settings = sliderParams('section.narrow-slider');
	slider_settings.breakpoints = {
		allowTouchMove: true,
		769: {
			allowTouchMove: false
		}
	}

	Object.assign(narrow_slider, slider_settings);
	narrow_slider.initialize();

	[...document.querySelectorAll('section.narrow-slider #narrow-tooltip-toggler')]
		.forEach((el, idx) => new Tooltip(el, {
			erid: SETTINGS[idx].erid,
			vendor: 'coral'
		}));
}

if (!window.location.origin.includes('backoffice')) narrowInit()

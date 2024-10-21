import {insertOnseHtml, sliderParams} from "../../utils";
import {generateNextButton, generatePrevButton} from "../SliderNavBtn/slider-nav-btn.js";

function narrowInit() {
	const SETTINGS = window.narrow_slider;
	const target_el = document.querySelector("[data-narrow-slider]");

	function renderTooltipMarkup(el, idx) {
		tippy(el, { // Замените '.your-element' на селектор вашего элемента
			content: () => {
				return `<div class="custom-tooltip">
        <span>ООО «ТО КОРАЛ ТРЕВЕЛ ЦЕНТР». erid: <span class="erid">${SETTINGS[idx].erid}</span></span>
        <button data-copy-code>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 1H4.625C4.55625 1 4.5 1.05625 4.5 1.125V2C4.5 2.06875 4.55625 2.125 4.625 2.125H12.375V12.875C12.375 12.9438 12.4312 13 12.5 13H13.375C13.4438 13 13.5 12.9438 13.5 12.875V1.5C13.5 1.22344 13.2766 1 13 1ZM11 3H3C2.72344 3 2.5 3.22344 2.5 3.5V11.7922C2.5 11.925 2.55312 12.0516 2.64687 12.1453L5.35469 14.8531C5.38906 14.8875 5.42813 14.9156 5.47031 14.9391V14.9688H5.53594C5.59062 14.9891 5.64844 15 5.70781 15H11C11.2766 15 11.5 14.7766 11.5 14.5V3.5C11.5 3.22344 11.2766 3 11 3ZM5.46875 13.3781L4.12344 12.0312H5.46875V13.3781ZM10.375 13.875H6.46875V11.6562C6.46875 11.3109 6.18906 11.0312 5.84375 11.0312H3.625V4.125H10.375V13.875Z" fill="#535353"></path></svg>
				</button>
      	</div>
			`;
			},
			allowHTML: true,
			placement: 'left',
			interactive: true,
			trigger: 'mouseenter',
		});
	}

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
							<img src=${el.img} alt="${el.alt}">
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

	insertOnseHtml("afterbegin", markup, target_el);
	insertOnseHtml("afterend", generateNextButton(), target_el);
	insertOnseHtml("beforebegin", generatePrevButton(), target_el);

	const slider_settings = sliderParams('section.narrow-slider');
	slider_settings.breakpoints = {
		allowTouchMove: true,
		769: {
			allowTouchMove: false
		}
	}

	Object.assign(target_el, slider_settings);
	target_el.initialize();

	document.querySelectorAll('#narrow-tooltip-toggler').forEach((el, idx) => renderTooltipMarkup(el, idx));
}

if (!window.location.origin.includes('backoffice')) narrowInit()

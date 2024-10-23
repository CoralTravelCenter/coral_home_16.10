import {insertOnseHtml, mediaMatcher, sliderParams} from "../../utils";
import {generateNextButton, generatePrevButton} from "../SliderNavBtn/slider-nav-btn.js";

function brandsSliderInit() {
	const brand_slider = document.querySelector("[data-brand-slider]");
	const target_el_bg = document.querySelector('[data-brand-bg-slider]');

	const main_slider_markup = window.our_brand_slider
		.map((el, idx) => {
			return `
				<swiper-slide>
						<div class="content">
							${(idx === 3) ? `<img class="hotel-logo coral-group" src=${el.brand_logo} alt="">` : `<img class="hotel-logo" src=${el.brand_logo} alt="">`}
							<h3 style="${(el.CSS) ? `color: ${el.CSS.text_color}` : ''}">${el.brand_name}</h3>
							${(el.brand_text !== '') ? `<p style="${(el.CSS) ? `color: ${el.CSS.text_color}` : ''}">${el.brand_text}</p>` : ''}
							<a href="${el.go_to_url}" class="coral-main-btn">Узнать больше</a>
							<span class="advister" style="${(el.CSS) ? `color: ${el.CSS.text_color}` : ''}">Реклама. ООО «ТО КОРАЛ ТРЕВЕЛ ЦЕНТР»</span>
						</div>
				</swiper-slide>
			`;
		})
		.join("");

	const background_slider_markup = window.our_brand_slider
		.map(el => {
			return `<swiper-slide>
					<div role="img" aria-label="${el.SEO.alt}" style="background-image: url(${el.brand_background_desktop});"></div>
				</swiper-slide>`;
		}).join("");

	insertOnseHtml("afterbegin", main_slider_markup, brand_slider);
	insertOnseHtml("afterbegin", background_slider_markup, target_el_bg);
	insertOnseHtml("afterend", generateNextButton(), brand_slider);
	insertOnseHtml("beforebegin", generatePrevButton(), brand_slider);

	const bg_slider_settings = sliderParams('section.brand-slider');
	const slider_settings = sliderParams('section.brand-slider')
	slider_settings.control = brand_slider;
	bg_slider_settings.pagination = false;
	slider_settings.breakpoints = {
		allowTouchMove: true,
		769: {
			allowTouchMove: false
		}
	}

	Object.assign(brand_slider, slider_settings);
	brand_slider.initialize();
	Object.assign(target_el_bg, bg_slider_settings);
	target_el_bg.initialize();
}

if (!window.location.origin.includes('backoffice')) brandsSliderInit()

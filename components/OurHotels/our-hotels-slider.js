import {insertOnseHtml, mediaMatcher, sliderParams} from "../../utils";
import {generateNextButton, generatePrevButton} from "../SliderNavBtn/slider-nav-btn.js";

(function () {
	const target_el = document.querySelector("[data-brand-slider]");
	const target_el_bg = document.querySelector('[data-brand-bg-slider]');

	const main_slider_markup = window.our_brand_slider
		.map((el) => {
			return `
				<swiper-slide>
					<a href="${el.go_to_url}">
						<div class="content" style="background-image: url(${el.brand_background_logo});">
						</div>
					</a>
				</swiper-slide>
			`;
		})
		.join("");

	const background_slider_markup = window.our_brand_slider
		.map(el => {
			return `<swiper-slide style="background-image: url(${el.brand_background_desktop});"></swiper-slide>`;
		}).join("");

	insertOnseHtml("afterbegin", main_slider_markup, target_el);
	insertOnseHtml("afterbegin", background_slider_markup, target_el_bg);
	insertOnseHtml("afterend", generateNextButton(), target_el);
	insertOnseHtml("beforebegin", generatePrevButton(), target_el);

	const bg_slider_settings = sliderParams('section.brand-slider');
	const slider_settings = sliderParams('section.brand-slider')
	slider_settings.control = target_el;
	bg_slider_settings.pagination = false;
	slider_settings.breakpoints = {
		allowTouchMove: true,
		769: {
			allowTouchMove: false
		}
	}

	Object.assign(target_el, slider_settings);
	target_el.initialize();
	Object.assign(target_el_bg, bg_slider_settings);
	target_el_bg.initialize();
})();

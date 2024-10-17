import {insertOnseHtml, sliderParams} from "../../utils";
import {generateNextButton, generatePrevButton} from "../SliderNavBtn/slider-nav-btn.js";

(function () {
	const target_el = document.querySelector("[data-brand-slider]");

	const markup = window.our_brand_slider
		.map((el) => {
			return `
				<swiper-slide>
					<a href="${el.go_to_url}">
						<div class="content" style="background-image: url(${el.brand_background_desktop});">
							<div class="content-wrapper">
							</div>
						</div>
					</a>
				</swiper-slide>
			`;
		})
		.join("");

	insertOnseHtml("afterbegin", markup, target_el);
	insertOnseHtml("afterend", generateNextButton(), target_el);
	insertOnseHtml("beforebegin", generatePrevButton(), target_el);

	Object.assign(target_el, sliderParams('section.brand-slider'));
	target_el.initialize();
})();

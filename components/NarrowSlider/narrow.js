import {insertOnseHtml, sliderParams} from "../../utils";
import {generateNextButton, generatePrevButton} from "../SliderNavBtn/slider-nav-btn.js";

(function () {
	const target_el = document.querySelector("[data-narrow-slider]");

	const markup = window.narrow_slider
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
							<img src=${el.img} alt="">
						</div>
					</div>
				</swiper-slide>
			`;
		})
		.join("");

	insertOnseHtml("afterbegin", markup, target_el);
	insertOnseHtml("afterend", generateNextButton(), target_el);
	insertOnseHtml("beforebegin", generatePrevButton(), target_el);

	Object.assign(target_el, sliderParams('section.narrow-slider'));
	target_el.initialize();
})();

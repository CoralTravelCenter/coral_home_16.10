import {insertOnseHtml, sliderParams} from "../../utils";
import {generateNextButton, generatePrevButton} from "../SliderNavBtn/slider-nav-btn.js";

(function () {
	const target_el = document.querySelector("[data-pay-attention-slider]");

	const markup = window.pay_attention_slider
		.map((el) => {
			return `
				<swiper-slide>
					<div class="content-wrapper">
						<h3>${el.headline}</h3>
						<p>${el.text}</p>
					</div>
				</swiper-slide>
			`;
		})
		.join("");

	insertOnseHtml("afterbegin", markup, target_el);
	insertOnseHtml("afterend", generateNextButton(), target_el);
	insertOnseHtml("beforebegin", generatePrevButton(), target_el);

	Object.assign(target_el, sliderParams('section.pay-attention').slidesPerView = 4);
	target_el.initialize();
})();

import {insertOnseHtml, mediaMatcher, sliderParams} from "../../utils";
import {generateNextButton, generatePrevButton} from "../SliderNavBtn/slider-nav-btn.js";

function payAttentionInit() {
	const target_el = document.querySelector("[data-pay-attention-slider]");

	const markup = window.pay_attention_slider
		.map((el) => {
			return `
				<swiper-slide style="background-image: url(${el.bacground_img});">
					<div class="content-wrapper">
						<h3>${el.headline}</h3>
						<p>${el.text}</p>
						<a class="coral-main-btn white" href=${el.action.go_to}>${el.action.title}</a>
					</div>
				</swiper-slide>
			`;
		})
		.join("");

	insertOnseHtml("afterbegin", markup, target_el);
	insertOnseHtml("afterend", generateNextButton(), target_el);
	insertOnseHtml("beforebegin", generatePrevButton(), target_el);

	const slider_settings = sliderParams('section.pay-attention');
	slider_settings.slidesPerView = 4
	slider_settings.spaceBetween = 24


	if (!target_el.querySelectorAll('swiper-slide').length > 4) {
		target_el.nextElementSibling.setAttribute('data-hidden', true)
		target_el.previousElementSibling.setAttribute('data-hidden', true)
	}
	Object.assign(target_el, slider_settings);
	target_el.initialize();
}

if (!window.location.origin.includes('backoffice')) payAttentionInit()

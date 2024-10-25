import {insertOnseHtml, mediaMatcher, sliderParams} from "../../utils";
import {generateNextButton, generatePrevButton} from "../SliderNavBtn/slider-nav-btn.js";

function payAttentionInit() {
	const pay_attention_slider = document.querySelector("[data-pay-attention-slider]");

	const markup = window.pay_attention_slider
		.map((el) => {
			return `
				<swiper-slide style="background-image: url(${el.bacground_img});">
					<div class="content-wrapper">
						<h3 style="${(el.CSS) ? `color: ${el.CSS.color}` : ''}">${el.headline}</h3>
						<p style="${(el.CSS) ? `color: ${el.CSS.color}` : ''}">${el.text}</p>
						<a class="coral-main-btn white" href="${el.action.go_to}">${el.action.title}</a>
					</div>
				</swiper-slide>
			`;
		})
		.join("");

	insertOnseHtml("afterbegin", markup, pay_attention_slider);
	insertOnseHtml("afterend", generateNextButton(), pay_attention_slider);
	insertOnseHtml("beforebegin", generatePrevButton(), pay_attention_slider);

	const slider_settings = sliderParams('section.pay-attention');
	slider_settings.slidesPerView = 2
	slider_settings.spaceBetween = 24
	slider_settings.breakpoints = {
		1024: {
			slidesPerView: 3
		},
		1240: {
			slidesPerView: 4
		}
	}


	if (pay_attention_slider.childElementCount <= 4) {
		pay_attention_slider.nextElementSibling.setAttribute('data-hidden', true)
		pay_attention_slider.previousElementSibling.setAttribute('data-hidden', true)
	}
	Object.assign(pay_attention_slider, slider_settings);
	pay_attention_slider.initialize();
}

if (!window.location.origin.includes('backoffice')) payAttentionInit()

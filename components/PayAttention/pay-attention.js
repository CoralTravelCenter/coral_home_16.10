import {insertOnseHtml} from "../../utils";
import './pay-attention.scss'

function payAttentionInit() {
  const pay_attention_slider = document.querySelector("[data-pay-attention-slider] .glide__slides");

  const markup = window.pay_attention_slider
    .map((el) => {
      return `
				<li class="glide__slide">
					<div class="content-wrapper">
						<h3 style="${(el.CSS) ? `color: ${el.CSS.color}` : ''}">${el.headline}</h3>
						<p style="${(el.CSS) ? `color: ${el.CSS.color}` : ''}">${el.text}</p>
						<a class="coral-main-btn white" href="${el.action.go_to}">${el.action.title}</a>
					</div>
					<div class="visual">
						<img src="${el.bacground_img}" loading="lazy">
					</div>
				</li>
			`;
    })
    .join("");

  insertOnseHtml("afterbegin", markup, pay_attention_slider);

  new Glide(document.querySelector("[data-pay-attention-slider]"), {
    type: 'carousel',
    perView: 4,
  }).mount()
}

if (!window.location.origin.includes('backoffice')) payAttentionInit()

import{i as n}from"./utils.js";function a(){const t=document.querySelector("[data-pay-attention-slider] .glide__slides"),o=window.pay_attention_slider.map(i=>`
				<li class="glide__slide">
					<div class="content-wrapper">
						<h3 style="${i.CSS?`color: ${i.CSS.color}`:""}">${i.headline}</h3>
						<p style="${i.CSS?`color: ${i.CSS.color}`:""}">${i.text}</p>
						<a class="coral-main-btn white" href="${i.action.go_to}">${i.action.title}</a>
					</div>
					<div class="visual">
						<img src="${i.bacground_img}" loading="lazy">
					</div>
				</li>
			`).join("");n("afterbegin",o,t),new Glide(document.querySelector("[data-pay-attention-slider]"),{type:"carousel",perView:4}).mount()}window.location.origin.includes("backoffice")||a();

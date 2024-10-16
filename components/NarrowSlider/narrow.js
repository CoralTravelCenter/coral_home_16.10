import { insertOnseHtml } from "../../utils";

(function () {
	const target_el = document.querySelector("[data-narrow-slider]");

	const markup = window.narrow_slider
		.map((el) => {
			return `
				<swiper-slide>
					<div class="content">
						<div class="text-content">
							<h3>${el.title}</h3>
							<p>${el.paragraph}</p>
							<a class='coral-main-btn' href=${el.button_link} target="_blank">${el.button_text}</a>
						</div>
						<div class="visual">
							<img src=${el.img}>
						</div>
					</div>
				</swiper-slide>
			`;
		})
		.join("");

	insertOnseHtml("afterbegin", markup, target_el);
})();

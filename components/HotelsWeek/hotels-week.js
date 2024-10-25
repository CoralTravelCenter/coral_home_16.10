import {insertOnseHtml, renderTooltipMarkup, sliderParams} from "../../utils";
import {generateNextButton, generatePrevButton} from "../SliderNavBtn/slider-nav-btn.js";

function hotelsWeekInit() {
	const SETTINGS = window.hotels_of_week;
	const target_el = document.querySelector("[data-hotels-week-slider]");

	function generateRating(stars) {
		const ratinng_star = `<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7364 7.39558L12.7774 6.67487L10.5606 2.18073C10.5001 2.05769 10.4005 1.95808 10.2774 1.89753C9.96882 1.74519 9.59382 1.87214 9.43952 2.18073L7.22272 6.67487L2.26374 7.39558C2.12702 7.41511 2.00202 7.47956 1.90632 7.57722C1.79062 7.69614 1.72686 7.85612 1.72906 8.02203C1.73126 8.18793 1.79923 8.34617 1.91804 8.46198L5.50593 11.96L4.65827 16.8995C4.63839 17.0144 4.65111 17.1326 4.69497 17.2406C4.73884 17.3486 4.8121 17.4422 4.90645 17.5108C5.0008 17.5793 5.11246 17.62 5.22878 17.6283C5.34509 17.6366 5.4614 17.6121 5.56452 17.5577L10.0001 15.2257L14.4356 17.5577C14.5567 17.6221 14.6973 17.6436 14.8321 17.6202C15.1719 17.5616 15.4005 17.2393 15.3419 16.8995L14.4942 11.96L18.0821 8.46198C18.1798 8.36628 18.2442 8.24128 18.2637 8.10456C18.3165 7.76276 18.0782 7.44636 17.7364 7.39558Z" fill="#FADB14"/>
</svg>
`;
		return ratinng_star.repeat(stars)
	}

	const markup = SETTINGS
		.map((el) => {
			return `
				<swiper-slide>
					<div class="visual" role="img" aria-label="${el.SEO.alt}" style="background-image: url('${el.img}');"></div>
					<div class="content">
					<div>
						<div class="location">
							<span>
										<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12.3333 5.66665C12.3333 9.72655 7.99999 14.6666 7.99999 14.6666C7.99999 14.6666 3.66666 9.72655 3.66666 5.66665C3.66666 3.27341 5.60676 1.33331 7.99999 1.33331C10.3932 1.33331 12.3333 3.27341 12.3333 5.66665Z" stroke="#535353" stroke-width="0.7" stroke-linejoin="round"/>
		<ellipse cx="8" cy="5.66663" rx="2" ry="2" stroke="#535353" stroke-width="0.7" stroke-linejoin="round"/>
		</svg>
								${el.location}
							</span>
							<div class="logo">
								<img src="${el.logo}">
							</div>
						</div>
						<div class="text-and-action">
						<div class="rating">
							${generateRating(el.stars)}
						</div>
							<h3>
							${el.title}
						</h3>
						<p>${el.paragraph}</p>
						</div>
						<a href="#" class="coral-main-btn"
							data-onlyhotel-lookup-destination="${el.location.split(' ')[0]}"
							data-onlyhotel-lookup-regions="${el.title}"
							data-onlyhotel-lookup-depth-days="${el.depth_days}"
							>Выбрать тур</a>
						</div>
						
							${(el.erid === ''
					? '<button style="display: none;" class="tooltip-toggler" id="narrow-tooltip-toggler">Реклама</button>'
					: '<button style="display: flex;" class="tooltip-toggler" id="narrow-tooltip-toggler">Реклама</button>'
			)}
			</div>
				</swiper-slide>
			`;
		})
		.join("");

	insertOnseHtml("afterbegin", markup, target_el);
	insertOnseHtml("afterend", generateNextButton(), target_el);
	insertOnseHtml("beforebegin", generatePrevButton(), target_el);

	const slider_settings = sliderParams('section.hotels-week');
	slider_settings.breakpoints = {
		allowTouchMove: true,
		769: {
			allowTouchMove: false
		}
	}

	Object.assign(target_el, slider_settings);
	target_el.initialize();

	[...document.querySelectorAll('section.hotels-week #narrow-tooltip-toggler')]
		.forEach((el, idx) => new Tooltip(el, {
			erid: SETTINGS[idx].erid,
			vendor: 'coral'
		}));
}

if (!window.location.origin.includes('backoffice')) hotelsWeekInit()

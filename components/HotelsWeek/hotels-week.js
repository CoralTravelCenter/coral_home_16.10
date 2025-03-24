import {cleanText, generateRating, sliderParams} from "../../utils";
import './hotels-week.scss'


function hotelsWeekInit() {
  const SETTINGS = window._hotels_of_week;
  const target_el = document.querySelector("[data-hotels-week-slider]");
  const fragment = document.createDocumentFragment();

  function generateMarkup(el) {
    const slide = document.createElement('swiper-slide')

    const contentWrapper = document.createElement('div')
    contentWrapper.classList.add('content-wrapper')

    const visual = document.createElement('div')
    visual.classList.add('visual')
    const visualImg = document.createElement('img')
    visualImg.setAttribute('data-src', el.img)
    visualImg.classList.add('lazy-image');
    visualImg.alt = cleanText(el.title);
    visualImg.width = '1370'
    visualImg.height = '440'
    visual.append(visualImg)


    const content = document.createElement('div')
    content.classList.add('content')

    const location = document.createElement('div')
    location.classList.add('location')

    const locationSpan = document.createElement('span')
    locationSpan.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12.3333 5.66665C12.3333 9.72655 7.99999 14.6666 7.99999 14.6666C7.99999 14.6666 3.66666 9.72655 3.66666 5.66665C3.66666 3.27341 5.60676 1.33331 7.99999 1.33331C10.3932 1.33331 12.3333 3.27341 12.3333 5.66665Z" stroke="#535353" stroke-width="0.7" stroke-linejoin="round"/>
		<ellipse cx="8" cy="5.66663" rx="2" ry="2" stroke="#535353" stroke-width="0.7" stroke-linejoin="round"/>
		</svg>
		${el.location}
    `

    const logo = document.createElement('div')
    const logoImg = document.createElement('img')
    logoImg.alt = 'Логотип отеля'
    logoImg.src = el.logo
    logoImg.loading = 'lazy'
    logoImg.width = '100'
    logoImg.height = '50'
    logo.classList.add('logo')
    logo.append(logoImg)

    location.append(locationSpan, logo)

    const textAndAction = document.createElement('div')
    textAndAction.classList.add('text-and-action')

    const rating = document.createElement('div')
    rating.classList.add('rating')
    rating.innerHTML = generateRating(el.stars)

    const title = document.createElement('h3')
    title.innerHTML = el.title

    const text = document.createElement('p')
    text.innerHTML = el.paragraph

    textAndAction.append(rating, title, text)

    const link = document.createElement('a')
    link.classList.add('coral-main-btn')
    link.href = el.button_link
    link.innerHTML = el.button_text
    link.target = '_blank'

    const ligal = document.createElement('span')
    ligal.classList.add('ligal')
    ligal.innerHTML = el.legal_entity.text
    ligal.style.color = el.legal_entity.color

    content.append(location, textAndAction, link)
    contentWrapper.append(content, visual, ligal)

    slide.append(contentWrapper)
    fragment.append(slide)
  }

  SETTINGS.forEach((el) => generateMarkup(el));
  target_el.append(fragment)

  const slider_settings = sliderParams('section.hotels-week', 1, {autoHeight: true});

  Object.assign(target_el, slider_settings);
  target_el.initialize();
}

if (!window.location.origin.includes('backoffice')) hotelsWeekInit()

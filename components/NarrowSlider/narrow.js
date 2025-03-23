import {cleanText, sliderParams} from "../../utils";
import './narrow.scss';

function narrowInit() {
  const SETTINGS = window._narrow_slider;
  const narrow_slider = document.querySelector("[data-narrow-slider]");
  const fragment = document.createDocumentFragment();

  function generateMarkup(el) {
    const swiperSlide = document.createElement('swiper-slide');

    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';

    const textContentDiv = document.createElement('div');
    textContentDiv.className = 'text-content';

    const title = document.createElement('h3');
    title.innerHTML = el.title;
    textContentDiv.append(title);

    if (el.paragraph) {
      const paragraph = document.createElement('p');
      paragraph.innerHTML = el.paragraph;
      textContentDiv.append(paragraph);
    }

    const button = document.createElement('a');
    button.className = 'coral-main-btn';
    button.href = el.button_link;
    button.target = '_blank';
    button.textContent = el.button_text;
    textContentDiv.append(button);

    const visualDiv = document.createElement('div');
    visualDiv.className = 'visual';

    const image = document.createElement('img');
    image.setAttribute('data-src', el.img)
    image.classList.add('lazy-image');
    image.alt = cleanText(el.title);
    image.width = '675'
    image.height = '315'


    const loader = document.createElement('div');
    loader.classList.add('swiper-lazy-preloader');

    visualDiv.append(image, loader);


    if (el.legal_entity !== '') {
      const ligal = document.createElement('span');
      ligal.classList.add('coral-erid-ligal');
      ligal.style.color = el.legal_entity.color;
      ligal.innerHTML = el.legal_entity.text;
      visualDiv.append(ligal);
    }

    contentDiv.append(textContentDiv);
    contentDiv.append(visualDiv);
    swiperSlide.append(contentDiv);
    fragment.append(swiperSlide);
  }

  SETTINGS.forEach(el => generateMarkup(el));
  narrow_slider.append(fragment);

  const params = sliderParams('section.narrow-slider', {
    autoHeight: true,
  });

  Object.assign(narrow_slider, params);
  narrow_slider.initialize();
}

if (!window.location.origin.includes('backoffice')) narrowInit()

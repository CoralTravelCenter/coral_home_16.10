import {cleanText, sliderParams} from "../../utils";

function narrowInit() {
  const SETTINGS = window.narrow_slider;
  const narrow_slider = document.querySelector("[data-narrow-slider]");
  const fragment = document.createDocumentFragment();

  function generateMarkup(el) {
    const swiperSlide = document.createElement('swiper-slide');
    swiperSlide.setAttribute('lazy', true);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';

    const textContentDiv = document.createElement('div');
    textContentDiv.className = 'text-content';

    const title = document.createElement('h3');
    title.innerHTML = el.title;
    textContentDiv.appendChild(title);

    if (el.paragraph) {
      const paragraph = document.createElement('p');
      paragraph.innerHTML = el.paragraph;
      textContentDiv.appendChild(paragraph);
    }

    const button = document.createElement('a');
    button.className = 'coral-main-btn';
    button.href = el.button_link;
    button.target = '_blank';
    button.textContent = el.button_text;
    textContentDiv.appendChild(button);

    const visualDiv = document.createElement('div');
    visualDiv.className = 'visual';

    const image = document.createElement('img');
    image.src = el.img;
    image.alt = cleanText(el.title);
    image.loading = 'lazy'
    visualDiv.appendChild(image);


    if (el.legal_entity !== '') {
      const ligal = document.createElement('span');
      ligal.classList.add('coral-erid-ligal');
      ligal.style.color = el.legal_entity.color;
      ligal.innerHTML = el.legal_entity.text;
      visualDiv.appendChild(ligal);
    }

    contentDiv.appendChild(textContentDiv);
    contentDiv.appendChild(visualDiv);
    swiperSlide.appendChild(contentDiv);
    fragment.appendChild(swiperSlide);
  }

  SETTINGS.forEach(el => generateMarkup(el));
  narrow_slider.appendChild(fragment);

  const params = sliderParams('section.narrow-slider')
  params.breakpoints = {
    769: {
      allowTouchMove: false
    }
  };
  Object.assign(narrow_slider, params);
  narrow_slider.initialize()
}

if (!window.location.origin.includes('backoffice')) narrowInit();

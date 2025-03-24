import {sliderParams} from "../../utils";
import './our-hotels.scss'

function brandsSliderInit() {
  const SETTINGS = window._coral_group
  const brandSlider = document.querySelector("[data-brand-slider]");
  const backgroundSlider = document.querySelector("[data-brand-background]");
  const fragmentMain = document.createDocumentFragment();
  const backgroundFragment = document.createDocumentFragment();

  function generateMainMarkup(el) {
    const swiperSlide = document.createElement('swiper-slide');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    const img = document.createElement('img');
    img.classList.add('hotel-logo')
    img.width = '112';
    img.height = '75';
    img.src = el.brand_logo;
    img.alt = el.brand_name.text;

    const title = document.createElement('h3');
    title.innerHTML = el.brand_name.text;
    title.style.color = el.brand_name.color;

    contentDiv.append(img, title);

    if (el.brand_text !== '') {
      const paragraph = document.createElement('p');
      paragraph.innerHTML = el.brand_text;
      contentDiv.append(paragraph);
    }

    const button = document.createElement('a');
    button.href = el.go_to_url;
    button.target = '_blank';
    button.className = 'coral-main-btn';
    button.textContent = 'Узнать больше';
    contentDiv.append(button);

    const advister = document.createElement('span');
    advister.className = 'advister';
    advister.textContent = el.legal_entity.text;
    advister.style.color = el.legal_entity.color
    contentDiv.append(advister);

    swiperSlide.append(contentDiv);
    fragmentMain.append(swiperSlide);
  }

  function generateBackgroundMarkup(el) {
    const swiperSlide = document.createElement('swiper-slide');
    const backgroundImage = document.createElement('img');
    backgroundImage.classList.add('background-slide');
    backgroundImage.src = el.background;
    backgroundImage.alt = el.brand_name.text;
    backgroundImage.width = '1440';
    backgroundImage.height = '430';
    backgroundImage.loading = 'lazy'
    swiperSlide.append(backgroundImage);
    backgroundFragment.append(swiperSlide)
  }


  SETTINGS.forEach((el) => {
    generateMainMarkup(el)
    generateBackgroundMarkup(el)
  });

  brandSlider.append(fragmentMain);
  backgroundSlider.append(backgroundFragment);

  const params = sliderParams('section.brand-slider', 1, {
    controller: {
      control: backgroundSlider
    },
  })

  Object.assign(brandSlider, params);
  brandSlider.initialize();
  Object.assign(backgroundSlider, {});
  backgroundSlider.initialize();
}

if (!window.location.origin.includes('backoffice')) brandsSliderInit();

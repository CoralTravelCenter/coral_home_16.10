import {sliderParams} from "../../utils";
import './our-hotels.scss'

function brandsSliderInit() {
  const SETTINGS = window._coral_group
  const brandSlider = document.querySelector("[data-brand-slider]");
  const sliderContainer = brandSlider.querySelector('.swiper-wrapper')
  const backgroundSlider = document.querySelector(".brand-slider .background-slider-wrapper");
  const fragmentMain = document.createDocumentFragment();
  const backgroundFragment = document.createDocumentFragment();
  const prevBtn = document.querySelector(".brand-slider .slider-bnt-prev");
  const nextBtn = document.querySelector(".brand-slider .slider-bnt-next");

  function generateMainMarkup(el) {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    const img = document.createElement('img');
    img.classList.add('hotel-logo')
    img.loading = 'lazy'
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
    const backgroundImage = document.createElement('img');
    backgroundImage.classList.add('background-slide');
    backgroundImage.src = el.background;
    backgroundImage.alt = el.brand_name.text;
    backgroundImage.width = '1440';
    backgroundImage.height = '430';
    backgroundImage.loading = 'lazy'

    backgroundFragment.append(backgroundImage)
  }

  function disableNavigationButtons(swiper) {
    swiper.activeIndex === 0 ? prevBtn.classList.add('disabled') : prevBtn.classList.remove('disabled');
    swiper.activeIndex === swiper.slides.length - 1 ? nextBtn.classList.add('disabled') : nextBtn.classList.remove('disabled');
  }

  SETTINGS.forEach((el) => {
    generateMainMarkup(el)
    generateBackgroundMarkup(el)
  });

  sliderContainer.append(fragmentMain);
  backgroundSlider.append(backgroundFragment);

  const sliderSettings = sliderParams('section.brand-slider');
  sliderSettings.loop = false
  sliderSettings.breakpoints = {
    allowTouchMove: true,
    769: {
      allowTouchMove: false
    }
  }
  sliderSettings.on = {
    init: swiper => disableNavigationButtons(swiper),
    slideChange: swiper => {
      backgroundSlider.style.transform = `translateX(-${swiper.activeIndex}00%)`;
      disableNavigationButtons(swiper);
    }
  }

  new Swiper(brandSlider, sliderSettings);
}

if (!window.location.origin.includes('backoffice')) brandsSliderInit();

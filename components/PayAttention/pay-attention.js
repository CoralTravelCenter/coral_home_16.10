import './pay-attention.scss'
import {cleanText, sliderParams} from "../../utils.js";

function payAttentionInit() {
  const SETTINGS = window._pay_attention_slider
  const pay_attention_slider = document.querySelector("[data-pay-attention-slider]");
  const fragment = document.createDocumentFragment();

  function generateMarkup(el) {
    const slide = document.createElement("swiper-slide");
    const container = document.createElement("div");
    container.classList.add("content-wrapper");

    const visual = document.createElement("div");
    const image = document.createElement('img');
    image.setAttribute('data-src', el.visual)
    image.classList.add('lazy-image');
    image.alt = cleanText(el.content.headline);
    image.width = '262'
    image.height = '186'
    visual.classList.add("visual");
    visual.append(image);

    const content = document.createElement("div");
    content.classList.add('content');
    const h3 = document.createElement("h3");
    h3.innerHTML = el.content.headline
    h3.style.color = el.content.color
    content.append(h3);

    let text = null
    if (el.content.text !== '') {
      text = document.createElement('p')
      text.innerHTML = el.content.text
      text.style.color = el.content.color
      content.append(text);
    }

    const link = document.createElement("a");
    link.classList.add('coral-main-btn', 'white');
    link.href = el.action.url
    link.innerHTML = el.action.title
    link.target = '_blank'

    content.append(link);
    container.append(content, visual);

    slide.append(container);
    fragment.append(slide);
  }

  SETTINGS.forEach(el => generateMarkup(el));
  pay_attention_slider.append(fragment)

  const params = sliderParams('section.pay-attention', 4, {
    slidesPerView: 4,
    spaceBetween: 16,
  })
  Object.assign(pay_attention_slider, params)
  pay_attention_slider.initialize()
}

if (!window.location.origin.includes('backoffice')) payAttentionInit()

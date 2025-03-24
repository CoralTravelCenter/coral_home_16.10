export function cleanText(text) {
  return text
    .replace(/&nbsp;/g, '')
    .replace(/&mdash;/g, '')
    .replace(/<br\s*\/?>/g, '')
    .trim()
}

function lazyAction(swiper, slidesPerView = 1) {
  const activeIndex = swiper.activeIndex;
  const slidesArr = swiper.slides;

  // Получаем индексы слайдов, которые нужно загрузить
  const indicesToLoad = Array.from(
    {length: slidesPerView},
    (_, i) => activeIndex + i
  );

  indicesToLoad.forEach(index => {
    if (index >= 0 && index < slidesArr.length) {
      const slide = slidesArr[index];

      // Находим все изображения внутри текущего слайда
      const images = slide.querySelectorAll('img[data-src]');

      images.forEach(image => {
        if (image && image.hasAttribute('data-src')) {
          image.src = image.getAttribute('data-src');  // Загружаем картинку
          image.style.visibility = 'visible';
          image.classList.remove('lazy-image');
          image.removeAttribute('data-src');  // Убираем data-src после загрузки
        }
      });
    }
  });
}


export function generateRating(stars) {
  const ratinng_star = `<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7364 7.39558L12.7774 6.67487L10.5606 2.18073C10.5001 2.05769 10.4005 1.95808 10.2774 1.89753C9.96882 1.74519 9.59382 1.87214 9.43952 2.18073L7.22272 6.67487L2.26374 7.39558C2.12702 7.41511 2.00202 7.47956 1.90632 7.57722C1.79062 7.69614 1.72686 7.85612 1.72906 8.02203C1.73126 8.18793 1.79923 8.34617 1.91804 8.46198L5.50593 11.96L4.65827 16.8995C4.63839 17.0144 4.65111 17.1326 4.69497 17.2406C4.73884 17.3486 4.8121 17.4422 4.90645 17.5108C5.0008 17.5793 5.11246 17.62 5.22878 17.6283C5.34509 17.6366 5.4614 17.6121 5.56452 17.5577L10.0001 15.2257L14.4356 17.5577C14.5567 17.6221 14.6973 17.6436 14.8321 17.6202C15.1719 17.5616 15.4005 17.2393 15.3419 16.8995L14.4942 11.96L18.0821 8.46198C18.1798 8.36628 18.2442 8.24128 18.2637 8.10456C18.3165 7.76276 18.0782 7.44636 17.7364 7.39558Z" fill="#FADB14"/>
</svg>
`;
  return ratinng_star.repeat(stars)
}

export function sliderParams(selector, slidesPerView = 1, additionalParams = {}) {
  // Базовая конфигурация
  const config = {
    slidesPerView: slidesPerView,
    spaceBetween: 0,
    loop: true,
    navigation: {
      prevEl: `${selector} .slider-bnt-prev`,
      nextEl: `${selector} .slider-bnt-next`,
    },
    pagination: {
      clickable: true,
    },
    on: {
      init: swiper => lazyAction(swiper, slidesPerView),
      slideChange: swiper => lazyAction(swiper, slidesPerView),
    }
  };

  // Если есть дополнительные параметры, добавляем их в конфиг
  return {...config, ...additionalParams};
}


async function preloadScript(url) {
  return new Promise((resolve, reject) => {
    const script_el = document.createElement('script');
    script_el.addEventListener('load', () => {
      script_el.remove();
      resolve();
    });
    script_el.addEventListener('error', () => {
      script_el.remove();
      reject(new Error('Failed to load script: ' + url));
    });
    script_el.src = url;
    document.body.append(script_el);
  });
}

export async function vimeoAutoPlay(observer_options = {}) {
  const vboxes = document.querySelectorAll('.vimeo-video-box [data-vimeo-vid]');
  if (!vboxes.length) return;

  let vimeoScriptLoaded = false;

  const io = new IntersectionObserver(async (entries, observer) => {
    for (const entry of entries) {
      const target = entry.target;

      if (entry.isIntersecting) {
        if (!vimeoScriptLoaded) {
          try {
            await preloadScript('https://player.vimeo.com/api/player.js');
            vimeoScriptLoaded = true;
          } catch (error) {
            console.error(error);
            observer.disconnect();
            return;
          }
        }

        if (!target['vimeo-player']) {
          const player = new Vimeo.Player(target, {
            id: target.dataset.vimeoVid,
            background: 1,
            playsinline: 1,
            autopause: 0,
            title: 0,
            byline: 0,
            portrait: 0,
            autoplay: 1,
            muted: 1,
          });

          target['vimeo-player'] = player;

          player.on('play', function () {
            this.element.parentElement.classList.add('playback');
          });

          player.on('ended', function () {
            this.element.parentElement.classList.remove('playback');
          });
        }
        target['vimeo-player'].play();
      } else {
        target['vimeo-player']?.pause();
      }
    }
  }, Object.assign({}, {threshold: 0.33}, observer_options));

  vboxes.forEach(box => io.observe(box));
}

// export function mediaMatcher(size, callback) {
//   const mobileWidthMediaQuery = window.matchMedia(`(max-width: ${size}px)`)
//   callback(mobileWidthMediaQuery.matches)
//   mobileWidthMediaQuery.addEventListener('change', e => callback(e.matches))
// }

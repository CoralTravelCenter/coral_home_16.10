export function cleanText(text) {
  return text
    .replace(/&nbsp;/g, '')
    .replace(/&mdash;/g, '')
    .replace(/<br\s*\/?>/g, '')
    .trim()
}

function lazyAction(swiper) {
  const activeIndex = swiper.activeIndex;
  const slidesArr = swiper.slides;

  // Подгружаем текущий, предыдущий и следующий слайды (если существуют)
  const indicesToLoad = [activeIndex, activeIndex - 1, activeIndex + 1];

  indicesToLoad.forEach(index => {
    if (index >= 0 && index < slidesArr.length) {
      const slide = slidesArr[index];
      const slideVisual = slide.firstChild.children[1];
      if (!slideVisual) return;

      const visualImage = slideVisual.querySelector('img');
      if (visualImage && visualImage.hasAttribute('data-src')) {
        visualImage.src = visualImage.getAttribute('data-src');
        visualImage.style.visibility = 'visible';
        visualImage.classList.remove('lazy-image');
        visualImage.removeAttribute('data-src'); // Убираем data-src для оптимизации
      }
    }
  });
}


export function sliderParams(selector, additionalParams = {}) {
  // Базовая конфигурация
  const config = {
    slidesPerView: 1,
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
      init: swiper => lazyAction(swiper),
      slideChange: swiper => lazyAction(swiper),
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

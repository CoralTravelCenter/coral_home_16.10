import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        narrow: './components/NarrowSlider/narrow.js',
        brand: './components/OurHotels/our-hotels-slider.js',
        video: './components/VideoBanner-Elite/VideoBanner.js',
        bronirovanie: './components/Bronirovanie/bronirovanie.js',
        hotels_of_week: './components/HotelsWeek/hotels-week.js',
        // attention: './components/PayAttention/pay-attention.js'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (/\.(scss)$/.test(assetInfo.name)) {
            return 'styles/[name][extname]';
          }
          return 'assets/[name][extname]';
        }
      },
      cssCodeSplit: true // Включаем разбиение CSS на отдельные файлы
    }
  }
});

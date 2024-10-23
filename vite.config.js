// vite.config.js
import {defineConfig} from 'vite';
import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';

export default defineConfig({
	build: {
		minify: true, // Включаем минификацию
		rollupOptions: {
			plugins: [
				babel({
					babelHelpers: 'bundled', // Включаем Babel Helpers в выходной файл
					presets: [
						[
							'@babel/preset-env',
							{
								targets: 'defaults', // Целевая среда - современные браузеры
								useBuiltIns: 'usage', // Включаем полифилы только для используемых функций
								corejs: 3, // Используем CoreJS версии 3
							},
						],
					],
				}),
				terser(), // Включаем Terser для минификации
			],
		},
	},
});
import { defineConfig } from 'vite';
import path from 'path';
import banner from 'vite-plugin-banner';
import pkg from './package.json';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development' || mode === 'debug';

  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.js'),
        name: 'astrology',
        fileName: (format) => mode === 'debug' ? 'astrochart2.js' : 'astrochart2.min.js',
        formats: ['umd'],
      },
      sourcemap: true,
      emptyOutDir: false,
      minify: mode === 'debug' ? false : 'terser',
      terserOptions: {
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          globals: {},
        },
      },
    },
    plugins: [
      banner(`
      ${pkg.name}
      ${pkg.description}
      Version: ${pkg.version}
      Author: ${pkg.author.name} (${pkg.author.email})
      Licence: GNUv3 (https://www.gnu.org/licenses/gpl-3.0.en.html)
    `),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});

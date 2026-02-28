import { defineConfig } from 'vite';
import path from 'path';
import banner from 'vite-plugin-banner';
import pkg from './package.json';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.js'),
        name: 'astrology',
        // En mode dev, on génère astrochart2.js, en prod astrochart2.min.js
        fileName: (format) => format === 'umd' 
          ? (isDev ? 'astrochart2.js' : 'astrochart2.min.js') 
          : `astrochart2.${format}.js`,
        formats: ['umd'],
      },
      sourcemap: true,
      emptyOutDir: false,
      // Désactive la minification en mode dev pour faciliter le débogage dans l'autre projet
      minify: isDev ? false : 'terser',
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

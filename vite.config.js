import { defineConfig } from 'vite';
import path from 'path';
import banner from 'vite-plugin-banner';
import pkg from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'astrology',
      fileName: (format) => format === 'umd' ? 'astrochart2.min.js' : `astrochart2.${format}.js`,
      formats: ['umd'],
    },
    sourcemap: true,
    minify: 'terser', // Use terser for minification
    terserOptions: {
      format: {
        comments: false, // Ensure banner isn't stripped but other comments are
      },
    },
    rollupOptions: {
      output: {
        globals: {
          // Add external dependencies here if any
        },
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
});

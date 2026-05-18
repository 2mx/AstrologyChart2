# Migration from Webpack to Vite

## Overview

The project has been migrated from Webpack 5 to **Vite 7**. This change was primarily driven by the need to resolve high-severity security vulnerabilities in Webpack-related dependencies (specifically `serialize-javascript`) and to improve developer experience.

## Changes

### 1. Build System Replacement
- Removed `webpack`, `webpack-cli`, `webpack-dev-server`, and associated plugins (`html-webpack-plugin`, `terser-webpack-plugin`, `babel-loader`).
- Installed `vite` as the primary build tool and dev server.
- Installed `vite-plugin-banner` to maintain the legal and versioning header in the production builds.

### 2. Configuration
- Created/Updated `vite.config.js` to handle:
    - **Library Mode (ESM)**: Configured to output modern ECMAScript Modules (`es` format). The library now uses `export` and `import` syntax natively.
    - **Minification**: Uses Terser for high-quality minification.
    - **Banner**: Automatically injects project information (name, version, license) at the top of the bundle.
    - **Source Maps**: Enabled for easier debugging.

### 3. Transition to ESM (ES Modules)
The migration to Vite also included a complete transition to ESM:
- **`package.json`**: Added `"type": "module"` and defined `exports`.
- **UMD Removal**: Replaced the previous UMD bundle with a standard ESM bundle (`astrochart2.js`).
- **Examples**: Updated all HTML files in `examples/` to use `<script type="module">`.
- **Tests**: Configured Jest to support ESM via `NODE_OPTIONS=--experimental-vm-modules`.

### 4. Package Scripts
The following scripts in `package.json` have been updated:
- `npm run dev`: Starts the Vite development server.
- `npm run watch`: Builds the library in debug mode with watch enabled.
- `npm run build`: Executes the production and debug builds via Vite.
- `npm run test`: Runs Jest tests with ESM support enabled.
- Removed Webpack-specific configuration files: `webpack.dev.js` and `webpack.prod.js`.

### 5. Dependency Cleanup
- Fixed a testing issue in `tests/point.test.js` where a namespace import was incorrectly used for `DefaultSettings.js`, ensuring compatibility with Vite's ESM handling and Jest.
- Resolved **10 high-severity vulnerabilities** by removing outdated build dependencies.

## Benefits
- **Zero Vulnerabilities**: The project now has a clean security audit.
- **Performance**: Faster startup and build times.
- **Modern Standards**: Better alignment with modern JavaScript (ESM) standards.
- **Simplicity**: Reduced configuration overhead.

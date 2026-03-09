# Migration from Webpack to Vite

This document describes the architectural changes and improvements made to the build system of `astrochart2`.

## Overview

The project has been migrated from Webpack 5 to **Vite 7**. This change was primarily driven by the need to resolve high-severity security vulnerabilities in Webpack-related dependencies (specifically `serialize-javascript`) and to improve developer experience.

## Changes

### 1. Build System Replacement
- Removed `webpack`, `webpack-cli`, `webpack-dev-server`, and associated plugins (`html-webpack-plugin`, `terser-webpack-plugin`, `babel-loader`).
- Installed `vite` as the primary build tool and dev server.
- Installed `vite-plugin-banner` to maintain the legal and versioning header in the production builds.

### 2. Configuration
- Created/Updated `vite.config.js` to handle:
    - **Library Mode**: Configured to output a UMD bundle (`astrochart2.min.js`) for broad compatibility.
    - **Minification**: Uses Terser for high-quality minification.
    - **Banner**: Automatically injects project information (name, version, license) at the top of the bundle.
    - **Source Maps**: Enabled for easier debugging.

### 3. Package Scripts
The following scripts in `package.json` have been updated:
- `npm run dev`: Starts the Vite development server (replaces `watch`).
- `npm run build`: Executes the production build via Vite.
- Removed Webpack-specific configuration files: `webpack.dev.js` and `webpack.prod.js`.

### 4. Dependency Cleanup
- Fixed a testing issue in `tests/point.test.js` where a namespace import was incorrectly used for `DefaultSettings.js`, ensuring compatibility with Vite's ESM handling and Jest.
- Resolved **10 high-severity vulnerabilities** by removing outdated build dependencies.

## Benefits
- **Zero Vulnerabilities**: The project now has a clean security audit.
- **Performance**: Faster startup and build times.
- **Modern Standards**: Better alignment with modern JavaScript (ESM) standards.
- **Simplicity**: Reduced configuration overhead.

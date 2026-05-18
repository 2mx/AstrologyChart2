# Migrate to ESM

## Description
Convert the library from UMD to ESM (ES Modules) to improve compatibility with modern build tools like Vite and simplify the package structure.

## Changes
- Updated `package.json` with `"type": "module"`.
- Updated `vite.config.js` to output only `es` format.
- Removed UMD-specific configurations.

## Important Notes
- **`window.astrology` is no longer set automatically.** The library must be imported explicitly in JavaScript.
- All files in `examples/` must be updated to use `<script type="module">` and `import` statements.

## TODO
- [ ] Update all HTML files in `examples/` to use ESM imports.
- [ ] Verify that the build process generates valid ESM files.
- [ ] Ensure tests are compatible with ESM.

# Pull Request: Refactor Retrograde Symbol

## Description
This Pull Request updates `SVGUtils.js` to use the global constant `POINT_RETROGRADE_SYMBOL` defined in `src/settings/constants/Point.js`. This replaces the hardcoded value (`"M"`) and centralizes the definition of the retrograde symbol code.

Crucially, this change will allow the user to specify which retrograde symbol they want to use.

### Changes Made
* **Added** the import of the `POINT_RETROGRADE_SYMBOL` constant from `Point.js` at the top of `src/utils/SVGUtils.js`.
* **Modified** the initialization of the static property `SVGUtils.SYMBOL_RETROGRADE_CODE` to directly use this constant instead of the letter `"M"`.

## Benefits
* **User Customization**: Gives users the ability to choose their preferred retrograde symbol.
* **Consistency**: Future changes to the retrograde symbol will only need to be made in one place.
* **Maintainability**: Cleaner code by removing a magic string.

## Files Modified
* `src/utils/SVGUtils.js`

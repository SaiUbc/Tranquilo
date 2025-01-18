"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/dom-helpers";
exports.ids = ["vendor-chunks/dom-helpers"];
exports.modules = {

/***/ "(ssr)/./node_modules/dom-helpers/esm/canUseDOM.js":
/*!***************************************************!*\
  !*** ./node_modules/dom-helpers/esm/canUseDOM.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (!!(typeof window !== 'undefined' && window.document && window.document.createElement));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvZXNtL2NhblVzZURPTS5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsaUVBQWUscUZBQXFGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaHVtZS1ldmktbmV4dC1qcy1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL2VzbS9jYW5Vc2VET00uanM/ZDEzNyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/dom-helpers/esm/canUseDOM.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/dom-helpers/esm/scrollbarSize.js":
/*!*******************************************************!*\
  !*** ./node_modules/dom-helpers/esm/scrollbarSize.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ scrollbarSize)\n/* harmony export */ });\n/* harmony import */ var _canUseDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canUseDOM */ \"(ssr)/./node_modules/dom-helpers/esm/canUseDOM.js\");\n\nvar size;\nfunction scrollbarSize(recalc) {\n  if (!size && size !== 0 || recalc) {\n    if (_canUseDOM__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n      var scrollDiv = document.createElement('div');\n      scrollDiv.style.position = 'absolute';\n      scrollDiv.style.top = '-9999px';\n      scrollDiv.style.width = '50px';\n      scrollDiv.style.height = '50px';\n      scrollDiv.style.overflow = 'scroll';\n      document.body.appendChild(scrollDiv);\n      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;\n      document.body.removeChild(scrollDiv);\n    }\n  }\n\n  return size;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvZXNtL3Njcm9sbGJhclNpemUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBb0M7QUFDcEM7QUFDZTtBQUNmO0FBQ0EsUUFBUSxrREFBUztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9odW1lLWV2aS1uZXh0LWpzLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvZXNtL3Njcm9sbGJhclNpemUuanM/MzBmMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2FuVXNlRE9NIGZyb20gJy4vY2FuVXNlRE9NJztcbnZhciBzaXplO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2Nyb2xsYmFyU2l6ZShyZWNhbGMpIHtcbiAgaWYgKCFzaXplICYmIHNpemUgIT09IDAgfHwgcmVjYWxjKSB7XG4gICAgaWYgKGNhblVzZURPTSkge1xuICAgICAgdmFyIHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgc2Nyb2xsRGl2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIHNjcm9sbERpdi5zdHlsZS50b3AgPSAnLTk5OTlweCc7XG4gICAgICBzY3JvbGxEaXYuc3R5bGUud2lkdGggPSAnNTBweCc7XG4gICAgICBzY3JvbGxEaXYuc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xuICAgICAgc2Nyb2xsRGl2LnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCc7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbERpdik7XG4gICAgICBzaXplID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzaXplO1xufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/dom-helpers/esm/scrollbarSize.js\n");

/***/ })

};
;
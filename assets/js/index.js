/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/resize-detector/esm/index.js":
/*!***************************************************!*\
  !*** ./node_modules/resize-detector/esm/index.js ***!
  \***************************************************/
/*! exports provided: addListener, removeListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addListener", function() { return addListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeListener", function() { return removeListener; });
let raf = null;
function requestAnimationFrame (callback) {
  if (!raf) {
    raf = (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        return setTimeout(callback, 16)
      }
    ).bind(window);
  }
  return raf(callback)
}

let caf = null;
function cancelAnimationFrame (id) {
  if (!caf) {
    caf = (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      function (id) {
        clearTimeout(id);
      }
    ).bind(window);
  }

  caf(id);
}

function createStyles (styleText) {
  var style = document.createElement('style');
  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = styleText;
  } else {
    style.appendChild(document.createTextNode(styleText));
  }
  (document.querySelector('head') || document.body).appendChild(style);
  return style
}

function createElement (tagName, props = {}) {
  let elem = document.createElement(tagName);
  Object.keys(props).forEach(key => {
    elem[key] = props[key];
  });
  return elem
}

function getComputedStyle (elem, prop, pseudo) {
  // for older versions of Firefox, `getComputedStyle` required
  // the second argument and may return `null` for some elements
  // when `display: none`
  let computedStyle = window.getComputedStyle(elem, pseudo || null) || {
    display: 'none'
  };

  return computedStyle[prop]
}

function getRenderInfo (elem) {
  if (!document.documentElement.contains(elem)) {
    return {
      detached: true,
      rendered: false
    }
  }

  let current = elem;
  while (current !== document) {
    if (getComputedStyle(current, 'display') === 'none') {
      return {
        detached: false,
        rendered: false
      }
    }
    current = current.parentNode;
  }

  return {
    detached: false,
    rendered: true
  }
}

var css = ".resize-triggers{visibility:hidden;opacity:0}.resize-contract-trigger,.resize-contract-trigger:before,.resize-expand-trigger,.resize-triggers{content:\"\";position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden}.resize-contract-trigger,.resize-expand-trigger{background:#eee;overflow:auto}.resize-contract-trigger:before{width:200%;height:200%}";

let total = 0;
let style = null;

function addListener (elem, callback) {
  if (!elem.__resize_mutation_handler__) {
    elem.__resize_mutation_handler__ = handleMutation.bind(elem);
  }

  let listeners = elem.__resize_listeners__;

  if (!listeners) {
    elem.__resize_listeners__ = [];
    if (window.ResizeObserver) {
      let { offsetWidth, offsetHeight } = elem;
      let ro = new ResizeObserver(() => {
        if (!elem.__resize_observer_triggered__) {
          elem.__resize_observer_triggered__ = true;
          if (elem.offsetWidth === offsetWidth && elem.offsetHeight === offsetHeight) {
            return
          }
        }
        runCallbacks(elem);
      });

      // initially display none won't trigger ResizeObserver callback
      let { detached, rendered } = getRenderInfo(elem);
      elem.__resize_observer_triggered__ = detached === false && rendered === false;
      elem.__resize_observer__ = ro;
      ro.observe(elem);
    } else if (elem.attachEvent && elem.addEventListener) {
      // targeting IE9/10
      elem.__resize_legacy_resize_handler__ = function handleLegacyResize () {
        runCallbacks(elem);
      };
      elem.attachEvent('onresize', elem.__resize_legacy_resize_handler__);
      document.addEventListener('DOMSubtreeModified', elem.__resize_mutation_handler__);
    } else {
      if (!total) {
        style = createStyles(css);
      }
      initTriggers(elem);

      elem.__resize_rendered__ = getRenderInfo(elem).rendered;
      if (window.MutationObserver) {
        let mo = new MutationObserver(elem.__resize_mutation_handler__);
        mo.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
        elem.__resize_mutation_observer__ = mo;
      }
    }
  }

  elem.__resize_listeners__.push(callback);
  total++;
}

function removeListener (elem, callback) {
  let listeners = elem.__resize_listeners__;
  if (!listeners) {
    return
  }

  if (callback) {
    listeners.splice(listeners.indexOf(callback), 1);
  }

  // no listeners exist, or removing all listeners
  if (!listeners.length || !callback) {
    // targeting IE9/10
    if (elem.detachEvent && elem.removeEventListener) {
      elem.detachEvent('onresize', elem.__resize_legacy_resize_handler__);
      document.removeEventListener('DOMSubtreeModified', elem.__resize_mutation_handler__);
      return
    }

    if (elem.__resize_observer__) {
      elem.__resize_observer__.unobserve(elem);
      elem.__resize_observer__.disconnect();
      elem.__resize_observer__ = null;
    } else {
      if (elem.__resize_mutation_observer__) {
        elem.__resize_mutation_observer__.disconnect();
        elem.__resize_mutation_observer__ = null;
      }
      elem.removeEventListener('scroll', handleScroll);
      elem.removeChild(elem.__resize_triggers__.triggers);
      elem.__resize_triggers__ = null;
    }
    elem.__resize_listeners__ = null;
  }

  if (!--total && style) {
    style.parentNode.removeChild(style);
  }
}

function getUpdatedSize (elem) {
  let { width, height } = elem.__resize_last__;
  let { offsetWidth, offsetHeight } = elem;
  if (offsetWidth !== width || offsetHeight !== height) {
    return {
      width: offsetWidth,
      height: offsetHeight
    }
  }
  return null
}

function handleMutation () {
  // `this` denotes the scrolling element
  let { rendered, detached } = getRenderInfo(this);
  if (rendered !== this.__resize_rendered__) {
    if (!detached && this.__resize_triggers__) {
      resetTriggers(this);
      this.addEventListener('scroll', handleScroll, true);
    }
    this.__resize_rendered__ = rendered;
    runCallbacks(this);
  }
}

function handleScroll () {
  // `this` denotes the scrolling element
  resetTriggers(this);
  if (this.__resize_raf__) {
    cancelAnimationFrame(this.__resize_raf__);
  }
  this.__resize_raf__ = requestAnimationFrame(() => {
    let updated = getUpdatedSize(this);
    if (updated) {
      this.__resize_last__ = updated;
      runCallbacks(this);
    }
  });
}

function runCallbacks (elem) {
  if (!elem || !elem.__resize_listeners__) {
    return
  }
  elem.__resize_listeners__.forEach(callback => {
    callback.call(elem);
  });
}

function initTriggers (elem) {
  let position = getComputedStyle(elem, 'position');
  if (!position || position === 'static') {
    elem.style.position = 'relative';
  }

  elem.__resize_old_position__ = position;
  elem.__resize_last__ = {};

  let triggers = createElement('div', {
    className: 'resize-triggers'
  });
  let expand = createElement('div', {
    className: 'resize-expand-trigger'
  });
  let expandChild = createElement('div');
  let contract = createElement('div', {
    className: 'resize-contract-trigger'
  });
  expand.appendChild(expandChild);
  triggers.appendChild(expand);
  triggers.appendChild(contract);
  elem.appendChild(triggers);

  elem.__resize_triggers__ = {
    triggers,
    expand,
    expandChild,
    contract
  };

  resetTriggers(elem);
  elem.addEventListener('scroll', handleScroll, true);

  elem.__resize_last__ = {
    width: elem.offsetWidth,
    height: elem.offsetHeight
  };
}

function resetTriggers (elem) {
  let { expand, expandChild, contract } = elem.__resize_triggers__;

  // batch read
  let { scrollWidth: csw, scrollHeight: csh } = contract;
  let { offsetWidth: eow, offsetHeight: eoh, scrollWidth: esw, scrollHeight: esh } = expand;

  // batch write
  contract.scrollLeft = csw;
  contract.scrollTop = csh;
  expandChild.style.width = eow + 1 + 'px';
  expandChild.style.height = eoh + 1 + 'px';
  expand.scrollLeft = esw;
  expand.scrollTop = esh;
}




/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/js/components/darkMode.js":
/*!***************************************!*\
  !*** ./src/js/components/darkMode.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  window.__onThemeChange = function () {};

  function setTheme(newTheme) {
    window.__theme = newTheme;
    preferredTheme = newTheme;
    newTheme == 'dark' ? document.body.setAttribute('data-dark', true) : document.body.removeAttribute('data-dark');

    window.__onThemeChange(newTheme);
  }

  var preferredTheme;

  try {
    preferredTheme = localStorage.getItem('theme');
  } catch (err) {}

  window.__setPreferredTheme = function (newTheme) {
    setTheme(newTheme);

    try {
      localStorage.setItem('theme', newTheme);
    } catch (err) {}
  };

  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkQuery.addListener(function (e) {
    window.__setPreferredTheme(e.matches ? 'dark' : 'light');
  });
  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
})();

document.getElementById('themeToggle').onclick = function () {
  window.__setPreferredTheme(window.__theme == 'light' ? 'dark' : 'light');
};

/***/ }),

/***/ "./src/js/components/feature-image.js":
/*!********************************************!*\
  !*** ./src/js/components/feature-image.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_svgBlob__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../lib/svgBlob */ "./src/js/lib/svgBlob.js");


(function () {
  new SvgBlob('#blobbed', {
    speedFactor: .5,
    animateOnHover: false,
    animateWhenVisible: true
  });
})();

/***/ }),

/***/ "./src/js/components/koeing-gallery.js":
/*!*********************************************!*\
  !*** ./src/js/components/koeing-gallery.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var images = document.querySelectorAll('.kg-gallery-image img');
images.forEach(function (image) {
  var container = image.closest('.kg-gallery-image');
  var width = image.attributes.width.value;
  var height = image.attributes.height.value;
  var ratio = width / height;
  container.style.flex = ratio + ' 1 0%';
});

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_darkMode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/darkMode */ "./src/js/components/darkMode.js");
/* harmony import */ var _components_darkMode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_darkMode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_feature_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/feature-image */ "./src/js/components/feature-image.js");
/* harmony import */ var _components_koeing_gallery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/koeing-gallery */ "./src/js/components/koeing-gallery.js");
/* harmony import */ var _components_koeing_gallery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_koeing_gallery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_prism__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/prism */ "./src/js/lib/prism.js");
/* harmony import */ var _lib_prism__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_prism__WEBPACK_IMPORTED_MODULE_3__);




Array.from(document.getElementsByTagName('a')).forEach(function (link) {
  link.addEventListener('transitionrun', function () {
    if (isHovered(link)) {
      link.style.transition = 'none';
    }
  });
  link.addEventListener('mouseout', function () {
    setTimeout(function () {
      link.style.transition = null;
    }, 1000);
  });
});

function isHovered(el) {
  return el.parentElement.querySelector(':hover') === el;
}

/***/ }),

/***/ "./src/js/lib/noise.js":
/*!*****************************!*\
  !*** ./src/js/lib/noise.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 *
 */
var module = {};

var Grad =
/*#__PURE__*/
function () {
  function Grad(x, y, z) {
    _classCallCheck(this, Grad);

    this.x = x;
    this.y = y;
    this.z = z;
  }

  _createClass(Grad, [{
    key: "dot2",
    value: function dot2(x, y) {
      return this.x * x + this.y * y;
    }
  }, {
    key: "dot3",
    value: function dot3(x, y, z) {
      return this.x * x + this.y * y + this.z * z;
    }
  }]);

  return Grad;
}();

var grad3 = [new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0), new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1), new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)];
var p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180]; // To remove the need for index wrapping, double the permutation table length

var perm = new Array(512);
var gradP = new Array(512); // This isn't a very good seeding function, but it works ok. It supports 2^16
// different seed values. Write something better if you need more seeds.

module.seed = function (seed) {
  if (seed > 0 && seed < 1) {
    // Scale the seed out
    seed *= 65536;
  }

  seed = Math.floor(seed);

  if (seed < 256) {
    seed |= seed << 8;
  }

  for (var i = 0; i < 256; i++) {
    var v;

    if (i & 1) {
      v = p[i] ^ seed & 255;
    } else {
      v = p[i] ^ seed >> 8 & 255;
    }

    perm[i] = perm[i + 256] = v;
    gradP[i] = gradP[i + 256] = grad3[v % 12];
  }
};

module.seed(0);
/*
for(var i=0; i<256; i++) {
  perm[i] = perm[i + 256] = p[i];
  gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
}*/
// Skewing and unskewing factors for 2, 3, and 4 dimensions

var F2 = 0.5 * (Math.sqrt(3) - 1);
var G2 = (3 - Math.sqrt(3)) / 6;
var F3 = 1 / 3;
var G3 = 1 / 6; // 2D simplex noise

module.simplex2 = function (xin, yin) {
  var n0, n1, n2; // Noise contributions from the three corners
  // Skew the input space to determine which simplex cell we're in

  var s = (xin + yin) * F2; // Hairy factor for 2D

  var i = Math.floor(xin + s);
  var j = Math.floor(yin + s);
  var t = (i + j) * G2;
  var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.

  var y0 = yin - j + t; // For the 2D case, the simplex shape is an equilateral triangle.
  // Determine which simplex we are in.

  var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords

  if (x0 > y0) {
    // lower triangle, XY order: (0,0)->(1,0)->(1,1)
    i1 = 1;
    j1 = 0;
  } else {
    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
    i1 = 0;
    j1 = 1;
  } // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
  // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
  // c = (3-sqrt(3))/6


  var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords

  var y1 = y0 - j1 + G2;
  var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords

  var y2 = y0 - 1 + 2 * G2; // Work out the hashed gradient indices of the three simplex corners

  i &= 255;
  j &= 255;
  var gi0 = gradP[i + perm[j]];
  var gi1 = gradP[i + i1 + perm[j + j1]];
  var gi2 = gradP[i + 1 + perm[j + 1]]; // Calculate the contribution from the three corners

  var t0 = 0.5 - x0 * x0 - y0 * y0;

  if (t0 < 0) {
    n0 = 0;
  } else {
    t0 *= t0;
    n0 = t0 * t0 * gi0.dot2(x0, y0); // (x,y) of grad3 used for 2D gradient
  }

  var t1 = 0.5 - x1 * x1 - y1 * y1;

  if (t1 < 0) {
    n1 = 0;
  } else {
    t1 *= t1;
    n1 = t1 * t1 * gi1.dot2(x1, y1);
  }

  var t2 = 0.5 - x2 * x2 - y2 * y2;

  if (t2 < 0) {
    n2 = 0;
  } else {
    t2 *= t2;
    n2 = t2 * t2 * gi2.dot2(x2, y2);
  } // Add contributions from each corner to get the final noise value.
  // The result is scaled to return values in the interval [-1,1].


  return 70 * (n0 + n1 + n2);
}; // 3D simplex noise


module.simplex3 = function (xin, yin, zin) {
  var n0, n1, n2, n3; // Noise contributions from the four corners
  // Skew the input space to determine which simplex cell we're in

  var s = (xin + yin + zin) * F3; // Hairy factor for 2D

  var i = Math.floor(xin + s);
  var j = Math.floor(yin + s);
  var k = Math.floor(zin + s);
  var t = (i + j + k) * G3;
  var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.

  var y0 = yin - j + t;
  var z0 = zin - k + t; // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
  // Determine which simplex we are in.

  var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords

  var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords

  if (x0 >= y0) {
    if (y0 >= z0) {
      i1 = 1;
      j1 = 0;
      k1 = 0;
      i2 = 1;
      j2 = 1;
      k2 = 0;
    } else if (x0 >= z0) {
      i1 = 1;
      j1 = 0;
      k1 = 0;
      i2 = 1;
      j2 = 0;
      k2 = 1;
    } else {
      i1 = 0;
      j1 = 0;
      k1 = 1;
      i2 = 1;
      j2 = 0;
      k2 = 1;
    }
  } else {
    if (y0 < z0) {
      i1 = 0;
      j1 = 0;
      k1 = 1;
      i2 = 0;
      j2 = 1;
      k2 = 1;
    } else if (x0 < z0) {
      i1 = 0;
      j1 = 1;
      k1 = 0;
      i2 = 0;
      j2 = 1;
      k2 = 1;
    } else {
      i1 = 0;
      j1 = 1;
      k1 = 0;
      i2 = 1;
      j2 = 1;
      k2 = 0;
    }
  } // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
  // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
  // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
  // c = 1/6.


  var x1 = x0 - i1 + G3; // Offsets for second corner

  var y1 = y0 - j1 + G3;
  var z1 = z0 - k1 + G3;
  var x2 = x0 - i2 + 2 * G3; // Offsets for third corner

  var y2 = y0 - j2 + 2 * G3;
  var z2 = z0 - k2 + 2 * G3;
  var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner

  var y3 = y0 - 1 + 3 * G3;
  var z3 = z0 - 1 + 3 * G3; // Work out the hashed gradient indices of the four simplex corners

  i &= 255;
  j &= 255;
  k &= 255;
  var gi0 = gradP[i + perm[j + perm[k]]];
  var gi1 = gradP[i + i1 + perm[j + j1 + perm[k + k1]]];
  var gi2 = gradP[i + i2 + perm[j + j2 + perm[k + k2]]];
  var gi3 = gradP[i + 1 + perm[j + 1 + perm[k + 1]]]; // Calculate the contribution from the four corners

  var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;

  if (t0 < 0) {
    n0 = 0;
  } else {
    t0 *= t0;
    n0 = t0 * t0 * gi0.dot3(x0, y0, z0); // (x,y) of grad3 used for 2D gradient
  }

  var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;

  if (t1 < 0) {
    n1 = 0;
  } else {
    t1 *= t1;
    n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
  }

  var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;

  if (t2 < 0) {
    n2 = 0;
  } else {
    t2 *= t2;
    n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
  }

  var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;

  if (t3 < 0) {
    n3 = 0;
  } else {
    t3 *= t3;
    n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
  } // Add contributions from each corner to get the final noise value.
  // The result is scaled to return values in the interval [-1,1].


  return 32 * (n0 + n1 + n2 + n3);
}; // ##### Perlin noise stuff


function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a, b, t) {
  return (1 - t) * a + t * b;
} // 2D Perlin Noise


module.perlin2 = function (x, y) {
  // Find unit grid cell containing point
  var X = Math.floor(x),
      Y = Math.floor(y); // Get relative xy coordinates of point within that cell

  x = x - X;
  y = y - Y; // Wrap the integer cells at 255 (smaller integer period can be introduced here)

  X = X & 255;
  Y = Y & 255; // Calculate noise contributions from each of the four corners

  var n00 = gradP[X + perm[Y]].dot2(x, y);
  var n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
  var n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
  var n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1); // Compute the fade curve value for x

  var u = fade(x); // Interpolate the four results

  return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
}; // 3D Perlin Noise


module.perlin3 = function (x, y, z) {
  // Find unit grid cell containing point
  var X = Math.floor(x),
      Y = Math.floor(y),
      Z = Math.floor(z); // Get relative xyz coordinates of point within that cell

  x = x - X;
  y = y - Y;
  z = z - Z; // Wrap the integer cells at 255 (smaller integer period can be introduced here)

  X = X & 255;
  Y = Y & 255;
  Z = Z & 255; // Calculate noise contributions from each of the eight corners

  var n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
  var n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
  var n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
  var n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
  var n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
  var n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
  var n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
  var n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(x - 1, y - 1, z - 1); // Compute the fade curve value for x, y, z

  var u = fade(x);
  var v = fade(y);
  var w = fade(z); // Interpolate

  return lerp(lerp(lerp(n000, n100, u), lerp(n001, n101, u), w), lerp(lerp(n010, n110, u), lerp(n011, n111, u), w), v);
};

/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./src/js/lib/prism.js":
/*!*****************************!*\
  !*** ./src/js/lib/prism.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* PrismJS 1.15.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+bash+ruby+css-extras+diff+markup-templating+graphql+less+handlebars+json+markdown+php+php-extras+sql+python+yaml&plugins=autolinker */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function () {
  var e = /\blang(?:uage)?-([\w-]+)\b/i,
      t = 0,
      n = _self.Prism = {
    manual: _self.Prism && _self.Prism.manual,
    disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
    util: {
      encode: function encode(e) {
        return e instanceof a ? new a(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
      },
      type: function type(e) {
        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
      },
      objId: function objId(e) {
        return e.__id || Object.defineProperty(e, "__id", {
          value: ++t
        }), e.__id;
      },
      clone: function clone(e, t) {
        var a = n.util.type(e);

        switch (t = t || {}, a) {
          case "Object":
            if (t[n.util.objId(e)]) return t[n.util.objId(e)];
            var r = {};
            t[n.util.objId(e)] = r;

            for (var i in e) {
              e.hasOwnProperty(i) && (r[i] = n.util.clone(e[i], t));
            }

            return r;

          case "Array":
            if (t[n.util.objId(e)]) return t[n.util.objId(e)];
            r = [];
            return t[n.util.objId(e)] = r, e.forEach(function (e, a) {
              r[a] = n.util.clone(e, t);
            }), r;
        }

        return e;
      }
    },
    languages: {
      extend: function extend(e, t) {
        var a = n.util.clone(n.languages[e]);

        for (var r in t) {
          a[r] = t[r];
        }

        return a;
      },
      insertBefore: function insertBefore(e, t, a, r) {
        var i = (r = r || n.languages)[e];

        if (2 == arguments.length) {
          a = arguments[1];

          for (var s in a) {
            a.hasOwnProperty(s) && (i[s] = a[s]);
          }

          return i;
        }

        var o = {};

        for (var l in i) {
          if (i.hasOwnProperty(l)) {
            if (l == t) for (var s in a) {
              a.hasOwnProperty(s) && (o[s] = a[s]);
            }
            o[l] = i[l];
          }
        }

        var u = r[e];
        return r[e] = o, n.languages.DFS(n.languages, function (t, n) {
          n === u && t != e && (this[t] = o);
        }), o;
      },
      DFS: function DFS(e, t, a, r) {
        r = r || {};

        for (var i in e) {
          e.hasOwnProperty(i) && (t.call(e, i, e[i], a || i), "Object" !== n.util.type(e[i]) || r[n.util.objId(e[i])] ? "Array" !== n.util.type(e[i]) || r[n.util.objId(e[i])] || (r[n.util.objId(e[i])] = !0, n.languages.DFS(e[i], t, i, r)) : (r[n.util.objId(e[i])] = !0, n.languages.DFS(e[i], t, null, r)));
        }
      }
    },
    plugins: {},
    highlightAll: function highlightAll(e, t) {
      n.highlightAllUnder(document, e, t);
    },
    highlightAllUnder: function highlightAllUnder(e, t, a) {
      var r = {
        callback: a,
        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      };
      n.hooks.run("before-highlightall", r);

      for (var i, s = r.elements || e.querySelectorAll(r.selector), o = 0; i = s[o++];) {
        n.highlightElement(i, !0 === t, r.callback);
      }
    },
    highlightElement: function highlightElement(t, a, r) {
      for (var i, s, o = t; o && !e.test(o.className);) {
        o = o.parentNode;
      }

      o && (i = (o.className.match(e) || [, ""])[1].toLowerCase(), s = n.languages[i]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + i, t.parentNode && (o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + i));
      var l = {
        element: t,
        language: i,
        grammar: s,
        code: t.textContent
      };
      if (n.hooks.run("before-sanity-check", l), !l.code || !l.grammar) return l.code && (n.hooks.run("before-highlight", l), l.element.textContent = l.code, n.hooks.run("after-highlight", l)), void n.hooks.run("complete", l);

      if (n.hooks.run("before-highlight", l), a && _self.Worker) {
        var u = new Worker(n.filename);
        u.onmessage = function (e) {
          l.highlightedCode = e.data, n.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, n.hooks.run("after-highlight", l), n.hooks.run("complete", l), r && r.call(l.element);
        }, u.postMessage(JSON.stringify({
          language: l.language,
          code: l.code,
          immediateClose: !0
        }));
      } else l.highlightedCode = n.highlight(l.code, l.grammar, l.language), n.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, n.hooks.run("after-highlight", l), n.hooks.run("complete", l), r && r.call(t);
    },
    highlight: function highlight(e, t, r) {
      var i = {
        code: e,
        grammar: t,
        language: r
      };
      return n.hooks.run("before-tokenize", i), i.tokens = n.tokenize(i.code, i.grammar), n.hooks.run("after-tokenize", i), a.stringify(n.util.encode(i.tokens), i.language);
    },
    matchGrammar: function matchGrammar(e, t, a, r, i, s, o) {
      var l = n.Token;

      for (var u in a) {
        if (a.hasOwnProperty(u) && a[u]) {
          if (u == o) return;
          var d = a[u];
          d = "Array" === n.util.type(d) ? d : [d];

          for (var g = 0; g < d.length; ++g) {
            var p = d[g],
                c = p.inside,
                m = !!p.lookbehind,
                f = !!p.greedy,
                h = 0,
                b = p.alias;

            if (f && !p.pattern.global) {
              var E = p.pattern.toString().match(/[imuy]*$/)[0];
              p.pattern = RegExp(p.pattern.source, E + "g");
            }

            p = p.pattern || p;

            for (var k = r, T = i; k < t.length; T += t[k].length, ++k) {
              var S = t[k];
              if (t.length > e.length) return;

              if (!(S instanceof l)) {
                if (f && k != t.length - 1) {
                  if (p.lastIndex = T, !(P = p.exec(e))) break;

                  for (var y = P.index + (m ? P[1].length : 0), I = P.index + P[0].length, A = k, N = T, O = t.length; O > A && (I > N || !t[A].type && !t[A - 1].greedy); ++A) {
                    N += t[A].length, y >= N && (++k, T = N);
                  }

                  if (t[k] instanceof l) continue;
                  R = A - k, S = e.slice(T, N), P.index -= T;
                } else {
                  p.lastIndex = 0;
                  var P = p.exec(S),
                      R = 1;
                }

                if (P) {
                  m && (h = P[1] ? P[1].length : 0);
                  I = (y = P.index + h) + (P = P[0].slice(h)).length;
                  var w = S.slice(0, y),
                      L = S.slice(I),
                      v = [k, R];
                  w && (++k, T += w.length, v.push(w));
                  var C = new l(u, c ? n.tokenize(P, c) : P, b, P, f);
                  if (v.push(C), L && v.push(L), Array.prototype.splice.apply(t, v), 1 != R && n.matchGrammar(e, t, a, k, T, !0, u), s) break;
                } else if (s) break;
              }
            }
          }
        }
      }
    },
    tokenize: function tokenize(e, t) {
      var a = [e],
          r = t.rest;

      if (r) {
        for (var i in r) {
          t[i] = r[i];
        }

        delete t.rest;
      }

      return n.matchGrammar(e, a, t, 0, 0, !1), a;
    },
    hooks: {
      all: {},
      add: function add(e, t) {
        var a = n.hooks.all;
        a[e] = a[e] || [], a[e].push(t);
      },
      run: function run(e, t) {
        var a = n.hooks.all[e];
        if (a && a.length) for (var r, i = 0; r = a[i++];) {
          r(t);
        }
      }
    }
  },
      a = n.Token = function (e, t, n, a, r) {
    this.type = e, this.content = t, this.alias = n, this.length = 0 | (a || "").length, this.greedy = !!r;
  };

  if (a.stringify = function (e, t, r) {
    if ("string" == typeof e) return e;
    if ("Array" === n.util.type(e)) return e.map(function (n) {
      return a.stringify(n, t, e);
    }).join("");
    var i = {
      type: e.type,
      content: a.stringify(e.content, t, r),
      tag: "span",
      classes: ["token", e.type],
      attributes: {},
      language: t,
      parent: r
    };

    if (e.alias) {
      var s = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
      Array.prototype.push.apply(i.classes, s);
    }

    n.hooks.run("wrap", i);
    var o = Object.keys(i.attributes).map(function (e) {
      return e + '="' + (i.attributes[e] || "").replace(/"/g, "&quot;") + '"';
    }).join(" ");
    return "<" + i.tag + ' class="' + i.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + i.content + "</" + i.tag + ">";
  }, !_self.document) return _self.addEventListener ? (n.disableWorkerMessageHandler || _self.addEventListener("message", function (e) {
    var t = JSON.parse(e.data),
        a = t.language,
        r = t.code,
        i = t.immediateClose;
    _self.postMessage(n.highlight(r, n.languages[a], a)), i && _self.close();
  }, !1), _self.Prism) : _self.Prism;
  var r = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
  return r && (n.filename = r.src, n.manual || r.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))), _self.Prism;
}();

 true && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism), Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: /<!DOCTYPE[\s\S]+?>/i,
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>\/:]+:/
        }
      },
      "attr-value": {
        pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
        inside: {
          punctuation: [/^=/, {
            pattern: /(^|[^\\])["']/,
            lookbehind: !0
          }]
        }
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          namespace: /^[^\s>\/:]+:/
        }
      }
    }
  },
  entity: /&#?[\da-z]{1,8};/i
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.hooks.add("wrap", function (e) {
  "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"));
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.css = {
  comment: /\/\*[\s\S]*?\*\//,
  atrule: {
    pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
    inside: {
      rule: /@[\w-]+/
    }
  },
  url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
  selector: /[^{}\s][^{};]*?(?=\s*\{)/,
  string: {
    pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
  important: /!important\b/i,
  "function": /[-a-z0-9]+(?=\()/i,
  punctuation: /[(){};:]/
}, Prism.languages.css.atrule.inside.rest = Prism.languages.css, Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
  style: {
    pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
    lookbehind: !0,
    inside: Prism.languages.css,
    alias: "language-css",
    greedy: !0
  }
}), Prism.languages.insertBefore("inside", "attr-value", {
  "style-attr": {
    pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
    inside: {
      "attr-name": {
        pattern: /^\s*style/i,
        inside: Prism.languages.markup.tag.inside
      },
      punctuation: /^\s*=\s*['"]|['"]\s*$/,
      "attr-value": {
        pattern: /.+/i,
        inside: Prism.languages.css
      }
    },
    alias: "language-css"
  }
}, Prism.languages.markup.tag)), Prism.languages.clike = {
  comment: [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: !0
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: !0,
    greedy: !0
  }],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  "class-name": {
    pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
    lookbehind: !0,
    inside: {
      punctuation: /[.\\]/
    }
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  "boolean": /\b(?:true|false)\b/,
  "function": /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/
}, Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [Prism.languages.clike["class-name"], {
    pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
    lookbehind: !0
  }],
  keyword: [{
    pattern: /((?:^|})\s*)(?:catch|finally)\b/,
    lookbehind: !0
  }, /\b(?:as|async|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/],
  number: /\b(?:(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+)n?|\d+n|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
  "function": /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\(|\.(?:apply|bind|call)\()/,
  operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
    lookbehind: !0,
    greedy: !0
  },
  "function-variable": {
    pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
    alias: "function"
  },
  constant: /\b[A-Z][A-Z\d_]*\b/
}), Prism.languages.insertBefore("javascript", "string", {
  "template-string": {
    pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
    greedy: !0,
    inside: {
      interpolation: {
        pattern: /\${[^}]+}/,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\${|}$/,
            alias: "punctuation"
          },
          rest: Prism.languages.javascript
        }
      },
      string: /[\s\S]+/
    }
  }
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
  script: {
    pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
    lookbehind: !0,
    inside: Prism.languages.javascript,
    alias: "language-javascript",
    greedy: !0
  }
}), Prism.languages.js = Prism.languages.javascript, function (e) {
  var t = {
    variable: [{
      pattern: /\$?\(\([\s\S]+?\)\)/,
      inside: {
        variable: [{
          pattern: /(^\$\(\([\s\S]+)\)\)/,
          lookbehind: !0
        }, /^\$\(\(/],
        number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
        operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
        punctuation: /\(\(?|\)\)?|,|;/
      }
    }, {
      pattern: /\$\([^)]+\)|`[^`]+`/,
      greedy: !0,
      inside: {
        variable: /^\$\(|^`|\)$|`$/
      }
    }, /\$(?:[\w#?*!@]+|\{[^}]+\})/i]
  };
  e.languages.bash = {
    shebang: {
      pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
      alias: "important"
    },
    comment: {
      pattern: /(^|[^"{\\])#.*/,
      lookbehind: !0
    },
    string: [{
      pattern: /((?:^|[^<])<<\s*)["']?(\w+?)["']?\s*\r?\n(?:[\s\S])*?\r?\n\2/,
      lookbehind: !0,
      greedy: !0,
      inside: t
    }, {
      pattern: /(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1/,
      greedy: !0,
      inside: t
    }],
    variable: t.variable,
    "function": {
      pattern: /(^|[\s;|&])(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|[\s;|&])/,
      lookbehind: !0
    },
    keyword: {
      pattern: /(^|[\s;|&])(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|[\s;|&])/,
      lookbehind: !0
    },
    "boolean": {
      pattern: /(^|[\s;|&])(?:true|false)(?=$|[\s;|&])/,
      lookbehind: !0
    },
    operator: /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
    punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];]/
  };
  var n = t.variable[1].inside;
  n.string = e.languages.bash.string, n["function"] = e.languages.bash["function"], n.keyword = e.languages.bash.keyword, n["boolean"] = e.languages.bash["boolean"], n.operator = e.languages.bash.operator, n.punctuation = e.languages.bash.punctuation, e.languages.shell = e.languages.bash;
}(Prism), function (e) {
  e.languages.ruby = e.languages.extend("clike", {
    comment: [/#.*/, {
      pattern: /^=begin(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?=end/m,
      greedy: !0
    }],
    keyword: /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
  });
  var t = {
    pattern: /#\{[^}]+\}/,
    inside: {
      delimiter: {
        pattern: /^#\{|\}$/,
        alias: "tag"
      },
      rest: e.languages.ruby
    }
  };
  e.languages.insertBefore("ruby", "keyword", {
    regex: [{
      pattern: /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
      greedy: !0,
      inside: {
        interpolation: t
      }
    }, {
      pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
      greedy: !0,
      inside: {
        interpolation: t
      }
    }, {
      pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
      greedy: !0,
      inside: {
        interpolation: t
      }
    }, {
      pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
      greedy: !0,
      inside: {
        interpolation: t
      }
    }, {
      pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
      greedy: !0,
      inside: {
        interpolation: t
      }
    }, {
      pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
      lookbehind: !0,
      greedy: !0
    }],
    variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
    symbol: {
      pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/,
      lookbehind: !0
    }
  }), e.languages.insertBefore("ruby", "number", {
    builtin: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
    constant: /\b[A-Z]\w*(?:[?!]|\b)/
  }), e.languages.ruby.string = [{
    pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
    greedy: !0,
    inside: {
      interpolation: t
    }
  }, {
    pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
    greedy: !0,
    inside: {
      interpolation: t
    }
  }, {
    pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
    greedy: !0,
    inside: {
      interpolation: t
    }
  }, {
    pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
    greedy: !0,
    inside: {
      interpolation: t
    }
  }, {
    pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
    greedy: !0,
    inside: {
      interpolation: t
    }
  }, {
    pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
    inside: {
      interpolation: t
    }
  }];
}(Prism), Prism.languages.css.selector = {
  pattern: /[^{}\s][^{}]*(?=\s*\{)/,
  inside: {
    "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
    "pseudo-class": /:[-\w]+(?:\(.*\))?/,
    "class": /\.[-:.\w]+/,
    id: /#[-:.\w]+/,
    attribute: /\[[^\]]+\]/
  }
}, Prism.languages.insertBefore("css", "function", {
  hexcode: /#[\da-f]{3,8}/i,
  entity: /\\[\da-f]{1,8}/i,
  number: /[\d%.]+/
}), Prism.languages.diff = {
  coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d+.*$/m],
  deleted: /^[-<].*$/m,
  inserted: /^[+>].*$/m,
  diff: {
    pattern: /^!(?!!).+$/m,
    alias: "important"
  }
}, Prism.languages["markup-templating"] = {}, Object.defineProperties(Prism.languages["markup-templating"], {
  buildPlaceholders: {
    value: function value(e, t, n, a) {
      e.language === t && (e.tokenStack = [], e.code = e.code.replace(n, function (n) {
        if ("function" == typeof a && !a(n)) return n;

        for (var r = e.tokenStack.length; -1 !== e.code.indexOf("___" + t.toUpperCase() + r + "___");) {
          ++r;
        }

        return e.tokenStack[r] = n, "___" + t.toUpperCase() + r + "___";
      }), e.grammar = Prism.languages.markup);
    }
  },
  tokenizePlaceholders: {
    value: function value(e, t) {
      if (e.language === t && e.tokenStack) {
        e.grammar = Prism.languages[t];

        var n = 0,
            a = Object.keys(e.tokenStack),
            r = function r(i) {
          if (!(n >= a.length)) for (var s = 0; s < i.length; s++) {
            var o = i[s];

            if ("string" == typeof o || o.content && "string" == typeof o.content) {
              var l = a[n],
                  u = e.tokenStack[l],
                  d = "string" == typeof o ? o : o.content,
                  g = d.indexOf("___" + t.toUpperCase() + l + "___");

              if (g > -1) {
                ++n;
                var p,
                    c = d.substring(0, g),
                    m = new Prism.Token(t, Prism.tokenize(u, e.grammar, t), "language-" + t, u),
                    f = d.substring(g + ("___" + t.toUpperCase() + l + "___").length);
                if (c || f ? (p = [c, m, f].filter(function (e) {
                  return !!e;
                }), r(p)) : p = m, "string" == typeof o ? Array.prototype.splice.apply(i, [s, 1].concat(p)) : o.content = p, n >= a.length) break;
              }
            } else o.content && "string" != typeof o.content && r(o.content);
          }
        };

        r(e.tokens);
      }
    }
  }
}), Prism.languages.graphql = {
  comment: /#.*/,
  string: {
    pattern: /"(?:\\.|[^\\"\r\n])*"/,
    greedy: !0
  },
  number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  "boolean": /\b(?:true|false)\b/,
  variable: /\$[a-z_]\w*/i,
  directive: {
    pattern: /@[a-z_]\w*/i,
    alias: "function"
  },
  "attr-name": /[a-z_]\w*(?=\s*:)/i,
  keyword: [{
    pattern: /(fragment\s+(?!on)[a-z_]\w*\s+|\.{3}\s*)on\b/,
    lookbehind: !0
  }, /\b(?:query|fragment|mutation)\b/],
  operator: /!|=|\.{3}/,
  punctuation: /[!(){}\[\]:=,]/
}, Prism.languages.less = Prism.languages.extend("css", {
  comment: [/\/\*[\s\S]*?\*\//, {
    pattern: /(^|[^\\])\/\/.*/,
    lookbehind: !0
  }],
  atrule: {
    pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,
    inside: {
      punctuation: /[:()]/
    }
  },
  selector: {
    pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
    inside: {
      variable: /@+[\w-]+/
    }
  },
  property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
  punctuation: /[{}();:,]/,
  operator: /[+\-*\/]/
}), Prism.languages.insertBefore("less", "punctuation", {
  "function": Prism.languages.less["function"]
}), Prism.languages.insertBefore("less", "property", {
  variable: [{
    pattern: /@[\w-]+\s*:/,
    inside: {
      punctuation: /:/
    }
  }, /@@?[\w-]+/],
  "mixin-usage": {
    pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
    lookbehind: !0,
    alias: "function"
  }
}), function (e) {
  e.languages.handlebars = {
    comment: /\{\{![\s\S]*?\}\}/,
    delimiter: {
      pattern: /^\{\{\{?|\}\}\}?$/i,
      alias: "punctuation"
    },
    string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    "boolean": /\b(?:true|false)\b/,
    block: {
      pattern: /^(\s*~?\s*)[#\/]\S+?(?=\s*~?\s*$|\s)/i,
      lookbehind: !0,
      alias: "keyword"
    },
    brackets: {
      pattern: /\[[^\]]+\]/,
      inside: {
        punctuation: /\[|\]/,
        variable: /[\s\S]+/
      }
    },
    punctuation: /[!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]/,
    variable: /[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~\s]+/
  }, e.hooks.add("before-tokenize", function (t) {
    e.languages["markup-templating"].buildPlaceholders(t, "handlebars", /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g);
  }), e.hooks.add("after-tokenize", function (t) {
    e.languages["markup-templating"].tokenizePlaceholders(t, "handlebars");
  });
}(Prism), Prism.languages.json = {
  comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
  property: {
    pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    greedy: !0
  },
  string: {
    pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    greedy: !0
  },
  number: /-?\d+\.?\d*(e[+-]?\d+)?/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  "boolean": /\b(?:true|false)\b/,
  "null": /\bnull\b/
}, Prism.languages.jsonp = Prism.languages.json, Prism.languages.markdown = Prism.languages.extend("markup", {}), Prism.languages.insertBefore("markdown", "prolog", {
  blockquote: {
    pattern: /^>(?:[\t ]*>)*/m,
    alias: "punctuation"
  },
  code: [{
    pattern: /^(?: {4}|\t).+/m,
    alias: "keyword"
  }, {
    pattern: /``.+?``|`[^`\n]+`/,
    alias: "keyword"
  }],
  title: [{
    pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
    alias: "important",
    inside: {
      punctuation: /==+$|--+$/
    }
  }, {
    pattern: /(^\s*)#+.+/m,
    lookbehind: !0,
    alias: "important",
    inside: {
      punctuation: /^#+|#+$/
    }
  }],
  hr: {
    pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
    lookbehind: !0,
    alias: "punctuation"
  },
  list: {
    pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
    lookbehind: !0,
    alias: "punctuation"
  },
  "url-reference": {
    pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
    inside: {
      variable: {
        pattern: /^(!?\[)[^\]]+/,
        lookbehind: !0
      },
      string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
      punctuation: /^[\[\]!:]|[<>]/
    },
    alias: "url"
  },
  bold: {
    pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: {
      punctuation: /^\*\*|^__|\*\*$|__$/
    }
  },
  italic: {
    pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: {
      punctuation: /^[*_]|[*_]$/
    }
  },
  url: {
    pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
    inside: {
      variable: {
        pattern: /(!?\[)[^\]]+(?=\]$)/,
        lookbehind: !0
      },
      string: {
        pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
      }
    }
  }
}), Prism.languages.markdown.bold.inside.url = Prism.languages.markdown.url, Prism.languages.markdown.italic.inside.url = Prism.languages.markdown.url, Prism.languages.markdown.bold.inside.italic = Prism.languages.markdown.italic, Prism.languages.markdown.italic.inside.bold = Prism.languages.markdown.bold, function (e) {
  e.languages.php = e.languages.extend("clike", {
    keyword: /\b(?:and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
    constant: /\b[A-Z0-9_]{2,}\b/,
    comment: {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
      lookbehind: !0
    }
  }), e.languages.insertBefore("php", "string", {
    "shell-comment": {
      pattern: /(^|[^\\])#.*/,
      lookbehind: !0,
      alias: "comment"
    }
  }), e.languages.insertBefore("php", "keyword", {
    delimiter: {
      pattern: /\?>|<\?(?:php|=)?/i,
      alias: "important"
    },
    variable: /\$+(?:\w+\b|(?={))/i,
    "package": {
      pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
      lookbehind: !0,
      inside: {
        punctuation: /\\/
      }
    }
  }), e.languages.insertBefore("php", "operator", {
    property: {
      pattern: /(->)[\w]+/,
      lookbehind: !0
    }
  });
  var t = {
    pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
    lookbehind: !0,
    inside: {
      rest: e.languages.php
    }
  };
  e.languages.insertBefore("php", "string", {
    "nowdoc-string": {
      pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
      greedy: !0,
      alias: "string",
      inside: {
        delimiter: {
          pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
          alias: "symbol",
          inside: {
            punctuation: /^<<<'?|[';]$/
          }
        }
      }
    },
    "heredoc-string": {
      pattern: /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
      greedy: !0,
      alias: "string",
      inside: {
        delimiter: {
          pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
          alias: "symbol",
          inside: {
            punctuation: /^<<<"?|[";]$/
          }
        },
        interpolation: t
      }
    },
    "single-quoted-string": {
      pattern: /'(?:\\[\s\S]|[^\\'])*'/,
      greedy: !0,
      alias: "string"
    },
    "double-quoted-string": {
      pattern: /"(?:\\[\s\S]|[^\\"])*"/,
      greedy: !0,
      alias: "string",
      inside: {
        interpolation: t
      }
    }
  }), delete e.languages.php.string, e.hooks.add("before-tokenize", function (t) {
    if (/(?:<\?php|<\?)/gi.test(t.code)) {
      e.languages["markup-templating"].buildPlaceholders(t, "php", /(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/gi);
    }
  }), e.hooks.add("after-tokenize", function (t) {
    e.languages["markup-templating"].tokenizePlaceholders(t, "php");
  });
}(Prism), Prism.languages.insertBefore("php", "variable", {
  "this": /\$this\b/,
  global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
  scope: {
    pattern: /\b[\w\\]+::/,
    inside: {
      keyword: /static|self|parent/,
      punctuation: /::|\\/
    }
  }
}), Prism.languages.sql = {
  comment: {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
    lookbehind: !0
  },
  variable: [{
    pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
    greedy: !0
  }, /@[\w.$]+/],
  string: {
    pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
    greedy: !0,
    lookbehind: !0
  },
  "function": /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
  keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
  "boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
  number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
  operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
  punctuation: /[;[\]()`,.]/
}, Prism.languages.python = {
  comment: {
    pattern: /(^|[^\\])#.*/,
    lookbehind: !0
  },
  "triple-quoted-string": {
    pattern: /("""|''')[\s\S]+?\1/,
    greedy: !0,
    alias: "string"
  },
  string: {
    pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  "function": {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: !0
  },
  "class-name": {
    pattern: /(\bclass\s+)\w+/i,
    lookbehind: !0
  },
  keyword: /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|pass|print|raise|return|try|while|with|yield)\b/,
  builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  "boolean": /\b(?:True|False|None)\b/,
  number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
  punctuation: /[{}[\];(),.:]/
}, Prism.languages.yaml = {
  scalar: {
    pattern: /([\-:]\s*(?:![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\2[^\r\n]+)*)/,
    lookbehind: !0,
    alias: "string"
  },
  comment: /#.*/,
  key: {
    pattern: /(\s*(?:^|[:\-,[{\r\n?])[ \t]*(?:![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,
    lookbehind: !0,
    alias: "atrule"
  },
  directive: {
    pattern: /(^[ \t]*)%.+/m,
    lookbehind: !0,
    alias: "important"
  },
  datetime: {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?)(?=[ \t]*(?:$|,|]|}))/m,
    lookbehind: !0,
    alias: "number"
  },
  "boolean": {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:true|false)[ \t]*(?=$|,|]|})/im,
    lookbehind: !0,
    alias: "important"
  },
  "null": {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:null|~)[ \t]*(?=$|,|]|})/im,
    lookbehind: !0,
    alias: "important"
  },
  string: {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)("|')(?:(?!\2)[^\\\r\n]|\\.)*\2(?=[ \t]*(?:$|,|]|}|\s*#))/m,
    lookbehind: !0,
    greedy: !0
  },
  number: {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+\.?\d*|\.?\d+)(?:e[+-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,
    lookbehind: !0
  },
  tag: /![^\s]+/,
  important: /[&*][\w]+/,
  punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
}, function () {
  if (("undefined" == typeof self || self.Prism) && ("undefined" == typeof global || global.Prism)) {
    var e = /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~\/.:=&]+(?:\?[\w\-+%~\/.:#=?&!$'()*,;]*)?(?:#[\w\-+%~\/.:#=?&!$'()*,;]*)?/,
        t = /\b\S+@[\w.]+[a-z]{2}/,
        n = /\[([^\]]+)]\(([^)]+)\)/,
        a = ["comment", "url", "attr-value", "string"];
    Prism.plugins.autolinker = {
      processGrammar: function processGrammar(r) {
        r && !r["url-link"] && (Prism.languages.DFS(r, function (r, i, s) {
          a.indexOf(s) > -1 && "Array" !== Prism.util.type(i) && (i.pattern || (i = this[r] = {
            pattern: i
          }), i.inside = i.inside || {}, "comment" == s && (i.inside["md-link"] = n), "attr-value" == s ? Prism.languages.insertBefore("inside", "punctuation", {
            "url-link": e
          }, i) : i.inside["url-link"] = e, i.inside["email-link"] = t);
        }), r["url-link"] = e, r["email-link"] = t);
      }
    }, Prism.hooks.add("before-highlight", function (e) {
      Prism.plugins.autolinker.processGrammar(e.grammar);
    }), Prism.hooks.add("wrap", function (e) {
      if (/-link$/.test(e.type)) {
        e.tag = "a", e.attributes.target = "_blank noopener";
        var t = e.content;
        if ("email-link" == e.type && 0 != t.indexOf("mailto:")) t = "mailto:" + t;else if ("md-link" == e.type) {
          var a = e.content.match(n);
          t = a[2], e.content = a[1];
        }
        e.attributes.href = t;
      }

      try {
        e.content = decodeURIComponent(e.content);
      } catch (e) {}
    });
  }
}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/lib/svgBlob.js":
/*!*******************************!*\
  !*** ./src/js/lib/svgBlob.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _noise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./noise */ "./src/js/lib/noise.js");
/* harmony import */ var resize_detector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! resize-detector */ "./node_modules/resize-detector/esm/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




(function (global) {
  var SvgBlob =
  /*#__PURE__*/
  function () {
    function SvgBlob(elements, options) {
      _classCallCheck(this, SvgBlob);

      this.defaults = {
        clipPadding: 20,
        minPointsDistance: 80,
        speedFactor: 1,
        animateOnHover: true,
        animateWhenVisible: false,
        round: true,
        resize: true,
        resizeTimeout: 100,
        debug: false
      };
      this.init(elements, options);
    }

    _createClass(SvgBlob, [{
      key: "init",
      value: function init(elements, options) {
        var _this = this;

        this.options = extend({}, this.defaults, options);
        var nodes = is.str(elements) ? document.querySelectorAll(elements) : elements;
        this.elements = [];

        for (var index = 0; index < nodes.length; index++) {
          var node = nodes[index];
          this.elements.push(this.initElement(node));
          this.updatePath(index, 0);

          if (this.options.animateOnHover) {
            node.addEventListener('mouseenter', this.resumeAnimation.bind(this, index));
            node.addEventListener('mouseleave', this.pauseAnimation.bind(this, index));
          }

          if (this.options.animateWhenVisible) {
            var interIndex = index,
                observer = new IntersectionObserver(function (entries) {
              entries.forEach(function (entry) {
                entry.isIntersecting ? _this.resumeAnimation(interIndex) : _this.pauseAnimation(interIndex);
              });
            }, {
              rootMargin: "0px",
              threshold: 0.1
            });
            observer.observe(node);
          }

          if (this.options.resize) {
            var resize = function resize(index) {
              var element = this.elements[index];

              if (element.resizeTimer) {
                clearTimeout(element.resizeTimer);
              }

              element.resizeTimer = setTimeout(this.resizeElement.bind(this, index), this.options.resizeTimeout);
            };

            Object(resize_detector__WEBPACK_IMPORTED_MODULE_1__["addListener"])(node, resize.bind(this, index));
          }
        }
      }
    }, {
      key: "initElement",
      value: function initElement(node) {
        var width = node.offsetWidth;
        var height = node.offsetHeight;
        var points = this.getPoints(width, height, this.options);
        var svg = document.createElementNS(_svgNS, 'svg');
        svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height + '');
        var path = document.createElementNS(_svgNS, 'path');
        path.setAttribute('class', 'svg-blob__path');

        if (this.options.debug) {
          svg.setAttribute('class', 'svg-blob__svg --debug');
          svg.appendChild(path);
        } else {
          svg.setAttribute('class', 'absolute left-0 top-0 w-full h-full');
          var defs = document.createElementNS(_svgNS, 'defs');
          svg.appendChild(defs);
          var clipPath = document.createElementNS(_svgNS, 'clipPath');
          var clipPathId = 'svg-blob__clip--' + uuidv4() + '';
          clipPath.setAttribute('id', clipPathId);
          defs.appendChild(clipPath);
          node.style.clipPath = 'url(#' + clipPathId + ')';
          clipPath.appendChild(path);
        }

        node.insertBefore(svg, node.firstChild);
        return {
          node: node,
          points: points,
          svg: svg,
          path: path,
          time: randomInRange(0, 10000),
          raf: {
            id: 0,
            timeDiff: 0,
            paused: true
          }
        };
      }
    }, {
      key: "getPoints",
      value: function getPoints(width, height) {
        var clipPadding = this.options.clipPadding;
        var sides = [{
          name: 'top',
          points: this.generatePoints(width)
        }, {
          name: 'right',
          points: this.generatePoints(height)
        }, {
          name: 'bottom',
          points: this.generatePoints(width)
        }, {
          name: 'left',
          points: this.generatePoints(height)
        }];
        var points = [];
        sides.forEach(function (side) {
          var horizontal = side.name === 'top' || side.name === 'bottom';
          var topOrRight = side.name === 'top' || side.name === 'right';
          var topOrLeft = side.name === 'top' || side.name === 'left';
          var value, valueRange, randRange;
          side.points.forEach(function (point) {
            value = topOrRight ? point : (horizontal ? width : height) - point;
            valueRange = topOrRight ? [value - clipPadding, value] : [value, value + clipPadding];
            randRange = topOrLeft ? [0, clipPadding] : [-clipPadding, 0];

            if (side.name === 'right') {
              randRange[0] += width;
              randRange[1] += width;
            } else if (side.name === 'bottom') {
              randRange[0] += height;
              randRange[1] += height;
            }

            points.push({
              xRange: horizontal ? valueRange : randRange,
              yRange: horizontal ? randRange : valueRange
            });
          });
        });
        return points;
      }
    }, {
      key: "generatePoints",
      value: function generatePoints(len) {
        var minPointsDistance = this.options.minPointsDistance;
        var points = [];
        var lines = [{
          x: 0,
          w: len
        }];

        function splitLine() {
          if (lines.length) {
            var line = lines.shift();

            if (line.w > minPointsDistance * 2) {
              var line1Size = randomInRange(minPointsDistance, line.w - minPointsDistance);
              var line1 = extend({}, line, {
                w: line1Size
              });
              var line2 = extend({}, line, {
                x: line.x + line1Size,
                w: line.w - line1Size
              });
              lines.push(line1, line2);
            } else {
              points.push(line);
              splitLine();
            }
          } else {
            points = points.sort(function (a, b) {
              return a.x - b.x;
            }).map(function (line) {
              return line.x;
            });
            points.shift();
            points.push(len);
          }
        }

        while (lines.length) {
          splitLine();
        }

        return points;
      }
    }, {
      key: "updatePath",
      value: function updatePath(index, timeDiff) {
        var speedFactor = this.options.speedFactor;
        var element = this.elements[index];
        var time = element.time + timeDiff;
        element.points.forEach(function (point, pointIndex) {
          var noiseX = (_noise__WEBPACK_IMPORTED_MODULE_0__["default"].simplex2(pointIndex * 2, time * 0.0005 * speedFactor) + 1) / 2;
          var noiseY = (_noise__WEBPACK_IMPORTED_MODULE_0__["default"].simplex2(pointIndex * 2 + 1, time * 0.0005 * speedFactor) + 1) / 2;
          var xMin = point.xRange[0];
          var xMax = point.xRange[1];
          var yMin = point.yRange[0];
          var yMax = point.yRange[1];
          point.x = noiseX * (xMax - xMin) + xMin;
          point.y = noiseY * (yMax - yMin) + yMin;
        });
        element.path.setAttribute('d', this.buildPath(element.points));
      }
    }, {
      key: "buildPath",
      value: function buildPath(points) {
        var d = 'M ' + points[0].x + ' ' + points[0].y + '';
        var i,
            p0,
            p1,
            len = points.length;

        for (i = 0; i <= len; i++) {
          p0 = points[i >= len ? i - len : i];
          p1 = points[i + 1 >= len ? i + 1 - len : i + 1];

          if (this.options.round) {
            d += ' Q ' + p0.x + ' ' + p0.y + ' ' + (p0.x + p1.x) * 0.5 + ' ' + (p0.y + p1.y) * 0.5 + '';
          } else {
            d += ' L ' + p0.x + ' ' + p0.y + '';
          }
        }

        return d;
      }
    }, {
      key: "resumeAnimation",
      value: function resumeAnimation(index) {
        var raf = this.elements[index].raf;

        if (raf.paused) {
          var render = function render() {
            time1 = performance.now();
            timeDiff = time1 - time0;
            self.updatePath(index, timeDiff);
            raf.timeDiff = timeDiff;
            raf.id = requestAnimationFrame(render);
          };

          var time0 = performance.now();
          var time1, timeDiff;
          var self = this;
          raf.paused = false;
          raf.timeDiff = 0;
          raf.id = requestAnimationFrame(render);
        }
      }
    }, {
      key: "pauseAnimation",
      value: function pauseAnimation(index) {
        var element = this.elements[index];
        var raf = element.raf;

        if (!raf.paused) {
          cancelAnimationFrame(raf.id);
          element.time += raf.timeDiff;
          raf.paused = true;
        }
      }
    }, {
      key: "resizeElement",
      value: function resizeElement(index) {
        var element = this.elements[index];
        this.pauseAnimation(index);
        var width = element.node.offsetWidth;
        var height = element.node.offsetHeight;
        element.points = this.getPoints(width, height);
        element.svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height + '');
        element.time = randomInRange(0, 10000);
        element.raf = {
          id: 0,
          timeDiff: 0
        };
        this.updatePath(index, 0);
      }
    }]);

    return SvgBlob;
  }();

  var _svgNS = 'http://www.w3.org/2000/svg';
  var is = {
    arr: function arr(a) {
      return Array.isArray(a);
    },
    str: function str(a) {
      return typeof a === 'string';
    },
    fnc: function fnc(a) {
      return typeof a === 'function';
    },
    und: function und(a) {
      return typeof a === 'undefined';
    }
  };

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }

  function extendSingle(target, source) {
    for (var key in source) {
      target[key] = is.arr(source[key]) ? source[key].slice(0) : source[key];
    }

    return target;
  }

  function extend(target, source) {
    if (!target) target = {};

    for (var i = 1; i < arguments.length; i++) {
      extendSingle(target, arguments[i]);
    }

    return target;
  }

  function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  global.SvgBlob = SvgBlob;
})(window);

/***/ }),

/***/ "./src/less/style.less":
/*!*****************************!*\
  !*** ./src/less/style.less ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./src/js/index.js ./src/less/style.less ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/m1guelpiedrafita/www/new-website/src/js/index.js */"./src/js/index.js");
module.exports = __webpack_require__(/*! /Users/m1guelpiedrafita/www/new-website/src/less/style.less */"./src/less/style.less");


/***/ })

/******/ });
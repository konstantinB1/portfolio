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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var blockA = document.querySelector('.block-var-a');
var blockB = document.querySelector('.block-var-b');

function scrollIndicator(el) {
	var winScroll = el.scrollTop || el.scrollTop;
	var height = el.scrollHeight - el.clientHeight;
	var scrolled = winScroll / height * 100;
	document.querySelector('.scroll-indicator-status').style.width = scrolled + "%";
}

function randomAnimation(el) {

	var prefix = 'slide-in-text-';
	var classes = ['bottom', 'top'];
	var pick = Math.floor(Math.random() * (classes.length - 1));
	var clName = prefix + classes[pick];

	for (var i = 0; i < classes.length; i++) {
		var cl = prefix + classes[i];
		if (clName !== cl) el.classList.remove(cl);
	}

	el.classList.add(clName);
}

function fetchData(src, onload) {

	var route = src.substr(0, src.length - 5);
	history.pushState(src, '', route === 'index' ? './' : route);

	fetch('pages/' + src).then(function (resp) {
		return resp.text();
	}).then(function (data) {

		var page = document.querySelector('.fetch-wrap');
		page.innerHTML = data;
		var fetched = document.querySelector('.index');

		if (!onload) {
			fetched.classList.remove('intro-anim-dl');
			randomAnimation(fetched);
		}
	});
}

function colHover(e) {
	if (e.type == 'mouseenter') this.children[0].classList.add('col-icon-hover');
	if (e.type == 'mouseleave') this.children[0].classList.remove('col-icon-hover');
}

function navigate(ev) {

	ev.stopImmediatePropagation();
	ev.stopPropagation();
	ev.preventDefault();

	var stateChange = ev.type == 'popstate' ? ev.state : null;

	if (ev.target.nodeName == 'h1' || ev.path.length === 8 || ev.path.length === 7 || stateChange) {

		var id = !stateChange ? ev.target.hasAttribute('id') ? ev.target.getAttribute('id') : ev.path[1].getAttribute('id') : null;
		var highlight = document.querySelector('.highliter');

		var highlightLocation = highlight.dataset.position;

		switch (true) {
			case highlightLocation == 1:
				if (id === 'sec' || stateChange == 'about.html') {
					highlight.dataset.position = 2;
					highlight.style.transform = 'translateY(15vh)';
				} else if (id === 'thr' || stateChange == 'skills.html') {
					highlight.dataset.position = 3;
					highlight.style.transform = 'translateY(30vh)';
				}
				break;
			case highlightLocation == 2:
				if (id === 'first' || stateChange == 'index.html') {
					highlight.dataset.position = 1;
					highlight.style.transform = 'translateY(0vh)';
				} else if (id === 'thr' || stateChange == 'skills.html') {
					highlight.dataset.position = 3;
					highlight.style.transform = 'translateY(30vh)';
				}
				break;
			case highlightLocation == 3:
				if (id === 'first' || stateChange == 'index.html') {
					highlight.dataset.position = 1;
					highlight.style.transform = 'translateY(0vh)';
				} else if (id === 'sec' || stateChange == 'about.html') {
					highlight.dataset.position = 2;
					highlight.style.transform = 'translateY(15vh)';
				}
				break;
		}

		var location = window.location.pathname;

		if (stateChange) fetchData(stateChange);
		if (id == 'first') fetchData('index.html');
		if (id == 'sec') fetchData('about.html');
		if (id == 'thr') fetchData('skills.html');
	}
}

window.onload = function () {

	setTimeout(function () {
		blockB.classList.remove('block-b-intro-move-right');
		blockB.classList.add('block-b-intro-move-right-fix-right');
		blockA.classList.remove('block-a-intro-open-left');
		blockA.classList.add('block-a-intro-move-left-fix-left');
	}, 1600);

	var navColumn = document.querySelectorAll('.sidebar-column');

	fetchData('index.html', true);

	navColumn.forEach(function (el) {
		el.addEventListener('click', navigate, true);
		el.addEventListener('mouseenter', colHover);
		el.addEventListener('mouseleave', colHover);
	});
};

document.querySelector('.fetch-wrap').onscroll = function () {
	scrollIndicator(this);
};

window.addEventListener('popstate', function (e) {
	navigate(e);
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
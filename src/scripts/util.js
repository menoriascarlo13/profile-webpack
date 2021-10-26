// Create Element.remove() function if not exist // BECAUSE IE 11
// if (!('remove' in Element.prototype)) {
// 	Element.prototype.remove = function () {
// 		if (this.parentNode) {
// 			this.parentNode.removeChild(this);
// 		}
// 	};

// }
const util = {
	init() {
		return true
	},

	strToBool(str) {
		//console.log( typeof str );
		if (typeof str == 'boolean') {
			return str;
		}
		switch (str.toLowerCase().trim()) {
			case 'true':
			case 'yes':
			case '1':
				return true;
			case 'false':
			case 'no':
			case '0':
			case null:
				return false;
			default:
				return Boolean(str);
		}
	},

	findAncestor(el, cls) {
		while ((el = el.parentElement) && !el.classList.contains(cls));
		return el;
	},

	isMobile() {
		let result = false;
		(function (a) {
			result = /Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(a);
		})(navigator.userAgent || navigator.vendor || window.opera);

		return result;
	},

	isInView(el, view) {
		var rect = el.getBoundingClientRect();
		var html = document.documentElement;

		if (view == 'completely') {
			// to check if completely visible
			return (
				rect.top >= 0 &&
				rect.bottom <= (window.innerHeight || html.clientHeight)
			);
		} else if (view == 'partially') {
			// to check if partially visible
			return (
				rect.bottom >= 0 &&
				rect.top < (window.innerHeight || html.clientHeight)
			);
		} else {
			// if partially visible or above current fold,
			return (
				rect.top < (window.innerHeight || html.clientHeight)
			);
		}
	},

	getScript(source, callback) {
		var script = document.createElement('script');
		var prior = document.getElementsByTagName('script')[0];
		script.async = 1;

		script.onload = script.onreadystatechange = function (_, isAbort) {
			if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
				script.onload = script.onreadystatechange = null;
				script = undefined;

				if (!isAbort) {
					if (callback) {
						callback();
					}
				}
			}
		};

		script.src = source;
		prior.parentNode.insertBefore(script, prior);
	},

	setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = 'expires=' + d.toUTCString();
		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	},

	getCookie(cname) {
		var name = cname + '=';
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	},

	replaceUrlParam(url, paramName, paramValue) {
		if (paramValue == null) {
			paramValue = '';
		}
		var pattern = new RegExp('\\b(' + paramName + '=).*?(&|#|$)');
		if (url.search(pattern) >= 0) {
			return url.replace(pattern, '$1' + paramValue + '$2');
		}
		url = url.replace(/[?#]$/, '');

		return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
	},
	debounce(func, wait, immediate) {
		var timeout;

		return function () {
			var context = this,
				args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	},
	loadingTime(status) {
		if (status) {
			let loadingTime = 0;

			let loadingInterval = setInterval(function () {
				loadingTime++;
				if (document.readyState === 'complete') {
					clearInterval(loadingInterval);
					console.info(`Total Complete Load: ${ loadingTime } second(s)`);
				}
			}, 1000);
		}
	},
	genericDeviceDetector() {
		let isDevice = (util.isMobile()) ? 'isMobile' : 'isDesktop';

		if (document.body.classList.contains('isMobile') == true && isDevice == 'isDesktop') {
			document.body.classList.remove('isMobile');
		} else {
			document.body.classList.remove('isDesktop');
		}

		document.body.classList.add(isDevice);
	},
	platformDetector() {
		var Platform = {};

		Platform.detectDevice = function () {
			var body = document.body;
			var ua = navigator.userAgent;
			var checker = {
				// OS
				Windows: ua.match(/Windows/),
				MacOS: ua.match(/Mac/),
				Android: ua.match(/Android/),

				// Browser
				Msie: ua.match(/Trident/),
				Edge: ua.match(/Edge/),
				Chrome: ua.match(/Chrome/),
				Firefox: ua.match(/Firefox/),
				Safari: ua.match(/Safari/),

				// Device
				isApple: ua.match(/(iPhone|iPod|iPad)/),
				iPhone: ua.match(/iPhone/),
				iPad: ua.match(/iPad/),
				iPod: ua.match(/iPod/),
			};

			if (checker.isApple) {
				// Apple
				body.classList.add('isApple');

				if (checker.iPhone) {
					// Apple iPhone
					body.classList.add('iphone');
				} else if (checker.iPad) {
					// Apple iPad
					body.classList.add('ipad');
				} else if (checker.iPod) {
					// Apple iPod
					body.classList.add('ipod');
				}

			} else if (checker.Windows) {
				// Windows OS
				body.classList.add('windowsOS');

				if (checker.Edge) {
					// Edge Browser
					body.classList.add('edge');
				} else if (checker.Chrome) {
					// Chrome Browser
					body.classList.add('chrome');
				} else if (checker.Safari) {
					// Safari Browser
					body.classList.add('safari');
				} else if (checker.Firefox) {
					// Firefox Browser
					body.classList.add('firefox');
				} else if (checker.Msie) {
					// IE Browser
					body.classList.add('msie');
				}

			} else if (checker.MacOS) {
				// Mac OS
				body.classList.add('macOS');

				if (checker.Chrome) {
					// Chrome Browser
					body.classList.add('chrome');
				} else if (checker.Safari) {
					// Safari Browser
					body.classList.add('safari');
				} else if (checker.Firefox) {
					// Firefox Browser
					body.classList.add('firefox');
				}

			} else if (checker.Android) {
				// Android OS
				body.classList.add('AndroidOS');
			}

		}

		Platform.detectDevice();
	},
	themeSet() {
		(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? document.body.classList.add('dark-theme'): document.body.classList.add('light-theme');
	},
	documentWidth() {
		let e = window,
			a = 'inner';

		if (!('innerWidth' in window)) {
			a = 'client';
			e = document.documentElement || document.body;
		}

		return {
			width: e[a + 'Width'],
			height: e[a + 'Height']
		};
	},
}

const ultilViewPort = {
	init() {
		return true
	},

	documentWidth() {
		let e = window,
			a = 'inner';

		if (!('innerWidth' in window)) {
			a = 'client';
			e = document.documentElement || document.body;
		}

		return {
			width: e[a + 'Width'],
			height: e[a + 'Height']
		};
	},
}

export default util;
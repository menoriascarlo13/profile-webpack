const arrowUp = document.getElementById('js-arrow-up');
let currectActiveElement = [];
let toDelete;

const scroller = {
	init() {
		let lastScrollTop = 0;
		let timer = null;
		const targetHeight = (window.innerHeight / 3).toFixed();

		try {
			if (arrowUp == null) {
				throw `Missing arrow up button element / id. Event is not added`;
			}

			arrowUp.addEventListener('click', () => {
				// document.body.scrollTop = 0;
				// console.log('i was clicked');
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			});
		} catch (error) {
			console.warn(error);
		}

		// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
		window.addEventListener("scroll", function () { // or window.addEventListener("scroll"....
			let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
			let finalSt = (st > lastScrollTop) ? 'scrollingDown' : 'scrollingUp';

			if (timer !== null) {
				clearTimeout(timer);
			}

			timer = setTimeout(function () {
				if (finalSt === 'scrollingDown' && st > targetHeight) {
					scroller.showScrollTopButton(true);
				}

				if (finalSt === 'scrollingUp' && st < targetHeight) {
					scroller.showScrollTopButton(false);
				}

				// scroller.detectSection();
			}, 150);

			lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
		}, false);
	},
	showScrollTopButton(e) {
		try {
			if (arrowUp == null) {
				throw `Missing arrow up button element / id. Its now hidden by default.`;
			}

			if (e) {
				arrowUp.classList.add('is-show');
			} else {
				if (arrowUp.classList.contains('is-show')) {
					arrowUp.classList.remove('is-show');
					document.title = `JCPM - Profile`;
				}
			}
		} catch (error) {
			console.warn(error);
		}

	},
}

export default scroller;
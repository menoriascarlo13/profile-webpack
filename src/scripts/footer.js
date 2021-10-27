import showError from './error';

const footer = {
	init() {
		footer.footerItem();
	},
	footerItem() {
		const footerItem = document.getElementsByClassName('js-footer-link');

		try {
			if (footerItem.length == 0) {
				throw `footer.js: Missing Footer Item Class / Element.`;
			}

			for (let i = 0; i < footerItem.length; i++) {
				footerItem[i].id = `${footerItem[i].dataset.nav}-footer`;

				footerItem[i].addEventListener('click', function (e) {
					footer.changeTabTitle(e);
					footer.scrollToSection(e);
					footer.toggleFooter(footerItem, `${e.target.dataset.nav}-footer`);
					// e.target.classList.add('active');
				});
			}

		} catch (error) {
			console.error(error);
			showError.init();
		}
	}, 
	toggleFooter(elements, currentId) {
		for (let i = 0; i < elements.length; i++) {
			if(elements[i].id != currentId) {
				elements[i].classList.remove('active');
			}
		}
	},
	changeTabTitle(element) {
		document.title = `JCPM - ${element.target.innerText}`;
	},
	scrollToSection(element) {
		const currElement = document.getElementById(element.target.dataset.nav);
		const navbar = document.getElementById('js-navbar');

		try {
			if (currElement == null) {
				throw `footer.js: Missing Target Navigation Item Class / Element.`
			}

			if (navbar == null) {
				throw `footer.js: Missing Navigation Id / Element. Scrolling to section might not be exact or might not work`;
			}

			const finalPosition = currElement.offsetTop - navbar.offsetHeight;

			window.scrollTo(0, finalPosition);
		} catch (error) {
			console.warn(error);
		}
	}
}

export default footer;
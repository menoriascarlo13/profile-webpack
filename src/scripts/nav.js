const nav = {
	init() {
		const navbar = document.getElementById('js-navbar');
		const header = document.getElementById('js-header');
		let navbarHeight;
		try {
			if (navbar == null) {
				throw `nav.js: Missing Navigation Id / Element. Setting padding top of body to default. Removing fixed position setting of Navigation bar`;
			}

			if (header == null) {
				throw `nav.js: Missing Header Id / Element. Setting padding top of body to default. Removing fixed position setting of Header bar`;
			}

			navbarHeight = navbar.offsetHeight;
			document.body.style.paddingTop = `${navbarHeight}px`;
			navbar.classList.add('is-fixed');
			header.classList.add('is-fixed');
		} catch (error) {
			console.error(error);
			showError.init();
		}

		nav.navItem();
	},
	navItem() {
		const navItem = document.getElementsByClassName('js-nav-link');

		try {
			if (navItem.length == 0) {
				throw `nav.js: Missing Navigation Item Class / Element.`;
			}

			for (let i = 0; i < navItem.length; i++) {
				navItem[i].id = `${navItem[i].dataset.nav}-nav`;

				navItem[i].addEventListener('click', function (e) {
					nav.changeTabTitle(e);
					nav.scrollToSection(e);
					// nav.toggleNav(navItem, `${e.target.dataset.nav}-nav`);
					// e.target.classList.add('active');
				});
			}

		} catch (error) {
			console.error(error);
			showError.init();
		}
	},
	toggleNav(elements, currentId) {
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
				throw `nav.js: Missing Target Navigation Item Class / Element.`
			}

			if (navbar == null) {
				throw `nav.js: Missing Navigation Id / Element. Scrolling to section might not be exact or might not work`;
			}

			const finalPosition = currElement.offsetTop - navbar.offsetHeight;

			window.scrollTo(0, finalPosition);
		} catch (error) {
			console.warn(error);
		}
	}
}

export default nav;
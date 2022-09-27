import $ from 'jquery';
import imgLazy from './imgLazy';
import showError from './error';
import Cuttr from 'Cuttr';

const projectListLimit = 6;
const projectCardContainer = document.getElementById('js-project-cards');
let newLimit = 0;
let previousLimit = 0;
let addLoadMoreOnce = true;



const projectList = {
	init() {
		this.initialProcess(projectListData);
	},
	initialProcess(data) {
		projectList.insertElement(projectCardContainer, projectListLimit, data, previousLimit);
	},
	loadMore() {
		const loadMoreBtn = document.getElementById('js-load-more');

		try {
			if (loadMoreBtn == null) {
				throw 'project.js: Missing load more button. Loading more function will not work';
			}

			newLimit = projectListLimit;
			loadMoreBtn.addEventListener('click', function () {
				newLimit = newLimit + projectListLimit;
				previousLimit = previousLimit + projectListLimit;
				projectList.insertElement(projectCardContainer, newLimit, projectListData, previousLimit);
				imgLazy.init('update');
			});
		} catch (err) {
			console.warn(err);
			showError.init();
		}
	},
	insertElement(container, limit, data, prevLimit) {
		try {
			if (container == null) {
				throw 'project.js: Portfolio Section: missing project container element or id. Hiding Portfolio Section for now';
			}

			if (data == null) {
				throw 'project.js: Portfolio Section: missing or undefined data. Hiding Portfolio Section for now';
			}

			if (data.length == 0) {
				throw 'project.js: Portfolio Section: Data Empty. Hiding Portfolio Section for now';
			}

			Object.keys(data).forEach(function (key) {
				if (key >= prevLimit && key < limit) {
					container.insertAdjacentHTML('beforeend', `
					<div class="col-12 col-md-6 col-lg-4 project-item-container">
						<div id="project-item-${data[key].id}" class="project-card" 
						data-name="${data[key].projectName}" 
						data-id="${data[key].id}">
							<a href="${data[key].projectLink}" target="_blank">
								<figure class="project-image lazy-shine">
									<img width="356" height="356" alt="${data[key].projectName}" class="js-lazy" data-src="assets/${data[key].projectImage}">
								</figure>
							</a>
							<div class="project-description-wrapper">
								<h3 class="project-name text-center text-lg-start">${data[key].projectName}</h3>
								<p class="project-description js-project-description text-center text-lg-start">${data[key].projectDescription}</p>
							</div>
						</div>
					</div>
				`);
				}

				if (key == data.length - 1) {
					if (data.length > limit) {
						if (addLoadMoreOnce) {
							container.insertAdjacentHTML('afterend', `
							<div class="text-center" id="js-load-more-container">
								<button id="js-load-more" class="btn btn-loadMore text-uppercase">
									Load More
								</button>
							</div>
						`);

							projectList.loadMore();
						}

						addLoadMoreOnce = false;
					} else {
						const loadMoreBtn = document.getElementById('js-load-more-container');
						try {
							if (loadMoreBtn == null) {
								throw `project.js: Missing or Wrong ID on Load More button at Profile section`;
							}

							loadMoreBtn.classList.add('d-none');
						} catch (error) {
							console.warn(error);
						}
					}

					projectList.truncateData();
				}
			});
		} catch (err) {
			console.warn(err);
			showError.init();
		}
	},
	truncateData() {
		const projectDescription = document.getElementsByClassName('js-project-description');

		try {
			if (projectDescription.length == 0) {
				throw 'project.js: Missing Project Description element';
			}

			new Cuttr('.js-project-description', {
				truncate: 'words',
				length: 17
			});
			// console.log($(projectDescription));

		} catch (err) {
			console.warn(err);
			showError.init();
		}
	},
}


const projectListData = [{
	"id": 1,
	"projectName": "Nutrilett SE",
	"projectDescription": "Nutrilett is a proven effective method for weight loss and contains all the necessary vitamins, proteins, minerals that the body needs",
	"projectLink": "https://www.nutrilett.se/",
	"projectYear": "2020",
	"projectImage": "nutrilett-se.png"
}, {
	"id": 2,
	"projectName": "Nutrilett NO",
	"projectDescription": "Nutrilett is a proven effective method for weight loss and contains all the necessary vitamins, proteins, minerals that the body needs",
	"projectLink": "https://www.nutrilett.no/",
	"projectYear": "2021",
	"projectImage": "nutrilett-no.png"
}, {
	"id": 3,
	"projectName": "Möllers Global",
	"projectDescription": "Möller’s brand is Norway’s number 1 omega-3 brand*",
	"projectLink": "https://www.mollers.com/",
	"projectYear": "2019",
	"projectImage": "mollers-global.png"
}, {
	"id": 4,
	"projectName": "Möllers NO",
	"projectDescription": "Möller’s brand is Norway’s number 1 omega-3 brand*",
	"projectLink": "https://www.mollers.no/",
	"projectYear": "2021",
	"projectImage": "mollers-no.png"
}, {
	"id": 5,
	"projectName": "Jordan",
	"projectDescription": "Jordan is a Scandinavian brand that has been caring for people’s teeth since 1927. Our range of high quality, easy-to-use and stylish products are designed for every stage of your life, making sure you will find one that fits you.",
	"projectLink": "https://www.jordanoralcare.com/",
	"projectYear": "2020",
	"projectImage": "jordan.png"
}, {
	"id": 6,
	"projectName": "Grand Frank",
	"projectDescription": "Grand Frank is an E-commerce Website for Men Apparel, Essentials, Shirts, Tailoring, Trousers, etc",
	"projectLink": "https://www.grandfrank.com/",
	"projectYear": "2020",
	"projectImage": "gf.png"
}, {
	"id": 7,
	"projectName": "Maximsports NO",
	"projectDescription": "Maxim is the first sports nutrition series launched in Europe, covering products for every stage of sports performance. Maxim's products are perfect for both top athletes and fitness enthusiasts. The product range is very wide and you are sure to find a suitable option, whatever your species.",
	"projectLink": "https://www.maximsport.no/",
	"projectYear": "2020",
	"projectImage": "maxim-no.png"
}, {
	"id": 8,
	"projectName": "DOM",
	"projectDescription": `Drop of mindfulness is a well-being brand founded by Princess Sofia and Carolina Pihl in New York 2010. For more than ten years, we have designed training clothes for life with the goal of making women dare to focus on themselves and find exactly what they feel good of
	- whatever it is.`,
	"projectLink": "https://www.dropofmindfulness.se/",
	"projectYear": "2020",
	"projectImage": "dom.png"
}, {
	"id": 9,
	"projectName": "Stellar Equipment",
	"projectDescription": `design and manufacture world class technical outdoor equipment for ourselves, and for anyone else who loves to spend their lives in the mountains.`,
	"projectLink": "https://www.stellarequipment.com/",
	"projectYear": "2019",
	"projectImage": "stellar.png"
}, {
	"id": 10,
	"projectName": "Nitty Gritty",
	"projectDescription": `Nitty Gritty® is an independent multi brand retailer, online store and showroom located in Stockholm, Sweden. Our carefully curated assortment consists of emerging designers mixed with well-established and respected fashion labels`,
	"projectLink": "https://nittygrittystore.com/",
	"projectYear": "2021",
	"projectImage": "nittygritty.png"
}, {
	"id": 11,
	"projectName": "Chimi",
	"projectDescription": `CHIMI was founded in Stockholm in 2016 on the idea of creating eyewear, ready-to-wear and accessories engineered for a fearless lifestyle. To inspire the wearer to capture every aspect of modern active life, the products are imagined through the eye of futuristic simplicity, wearability and aesthetical longevity.`,
	"projectLink": "https://chimieyewear.com/",
	"projectYear": "2022",
	"projectImage": "chimi.png"
}]

export default projectList;
import $ from 'jquery';
import util from './util';
import imgLazy from './imgLazy';
import projectList from './projects';
import tech from './tech';
import nav from './nav';
import scroller from './scrolling';


window.addEventListener('load', () => {
	util.platformDetector();
	util.themeSet();
	projectList.init();
	tech.init();
	nav.init();
	scroller.init();
	imgLazy.init('load');

	window.addEventListener('resize', util.debounce(function () {
		imgLazy.init('update');
	}, 500));
});
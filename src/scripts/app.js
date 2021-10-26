import util from './util';
import imgLazy from './imgLazy';
import projectList from './projects';
import tech from './tech';

window.addEventListener('load', () => {
	projectList.init();
	tech.init();
	imgLazy.init('load');

	window.addEventListener('resize', util.debounce(function () {
		imgLazy.init('update');
	}, 500));
});
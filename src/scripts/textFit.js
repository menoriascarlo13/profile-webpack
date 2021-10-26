import textFit from "textFit"

const txtFit = {
	init(element, option) {
		if(option != null || option != undefined) {
			textFit(document.getElementsByClassName(element), option);
		}
	}
}

export default txtFit;
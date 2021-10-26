const showError = {
	init() {
		const posterError = document.createElement('DIV');
		posterError.innerHTML = `
		SITE IS HAVING A<br>
		<span>TECHNICAL DIFFICULTY</span><br>
		
		SORRY FOR THE 
		INCONVENIENCE`;
		posterError.classList.add('posterError');
		document.body.appendChild(posterError);
		document.body.style.overflow = 'hidden';
	}
}

export default showError;
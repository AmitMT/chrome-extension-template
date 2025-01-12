console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
window.addEventListener('load', (_) => {
	console.log('##############################################################');

	const a = document.getElementById('content');
	console.log(a);
	if (!!a) {
		a.style.backgroundColor = 'red';
	}
});

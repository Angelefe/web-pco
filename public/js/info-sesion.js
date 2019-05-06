window.addEventListener('scroll', function (e) {
	const maximoScroll = document.querySelector('body').clientHeight - window.innerHeight;
	console.log(window.scrollY / maximoScroll);
});

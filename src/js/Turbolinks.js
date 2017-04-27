import turbolinks from 'turbolinks';

export function checkLoad (message) {
	document.addEventListener("turbolinks:load", function() {
		console.log(message);
	});
}

import {log} from './Test';
import turbolinks from 'turbolinks';

//log('Boom!');

document.addEventListener("turbolinks:load", function() {
	console.log('Turbolinks loaded: ' + window.location.pathname);
});

turbolinks.start();

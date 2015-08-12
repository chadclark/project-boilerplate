//  $$$$$$\                                 $$\
// $$  __$$\                                $$ |
// $$ /  $$ |$$\    $$\  $$$$$$\   $$$$$$\  $$ | $$$$$$\  $$\   $$\
// $$ |  $$ |\$$\  $$  |$$  __$$\ $$  __$$\ $$ | \____$$\ $$ |  $$ |
// $$ |  $$ | \$$\$$  / $$$$$$$$ |$$ |  \__|$$ | $$$$$$$ |$$ |  $$ |
// $$ |  $$ |  \$$$  /  $$   ____|$$ |      $$ |$$  __$$ |$$ |  $$ |
//  $$$$$$  |   \$  /   \$$$$$$$\ $$ |      $$ |\$$$$$$$ |\$$$$$$$ |
//  \______/     \_/     \_______|\__|      \__| \_______| \____$$ |
//                                                        $$\   $$ |
//                                                        \$$$$$$  |
//                                                         \______/
//
//
//

window.Overlay = (function () {

	var _overlay = $('<div>', {class: 'overlay'});

	var show = function(clip) {
		_overlay.appendTo('body').velocity('fadeIn', {duration: 200, easing: 'ease-in-out'});

		if (clip) {
			$('body').addClass('clip');
		}
	};

	var hide = function() {
		_overlay.velocity('reverse', {
			complete: function() { _overlay.remove(); }
		});
		$('body').removeClass('clip');
	};

	return {
		show: show,
		hide: hide
	};

})();
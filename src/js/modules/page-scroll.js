//  $$$$$$$\                                      $$$$$$\                                $$\ $$\
//  $$  __$$\                                    $$  __$$\                               $$ |$$ |
//  $$ |  $$ |$$$$$$\   $$$$$$\   $$$$$$\        $$ /  \__| $$$$$$$\  $$$$$$\   $$$$$$\  $$ |$$ |
//  $$$$$$$  |\____$$\ $$  __$$\ $$  __$$\       \$$$$$$\  $$  _____|$$  __$$\ $$  __$$\ $$ |$$ |
//  $$  ____/ $$$$$$$ |$$ /  $$ |$$$$$$$$ |       \____$$\ $$ /      $$ |  \__|$$ /  $$ |$$ |$$ |
//  $$ |     $$  __$$ |$$ |  $$ |$$   ____|      $$\   $$ |$$ |      $$ |      $$ |  $$ |$$ |$$ |
//  $$ |     \$$$$$$$ |\$$$$$$$ |\$$$$$$$\       \$$$$$$  |\$$$$$$$\ $$ |      \$$$$$$  |$$ |$$ |
//  \__|      \_______| \____$$ | \_______|       \______/  \_______|\__|       \______/ \__|\__|
//                     $$\   $$ |
//                     \$$$$$$  |
//                      \______/

var PageScroll = (function() {

	var init = function () {
		// Bind UI actions
		_bindUiActions();
	};

	var _bindUiActions = function() {
		$('body').on('click', 'a[data-link="smooth-scroll"]', _smoothJazzScroll);
	};

	var _smoothJazzScroll = function(event) {

		var $this = $(this),
			getHref = $this.attr('href'),
			link = $(getHref)
		;

		link.velocity('scroll', { duration: 500, offset: -50, easing: 'easeInSine' });
		console.log("Smoooooooooth");

		event.preventDefault();
	};

	return {
		init: init
	};

})();

PageScroll.init();
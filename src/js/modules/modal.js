// $$\      $$\                 $$\           $$\
// $$$\    $$$ |                $$ |          $$ |
// $$$$\  $$$$ | $$$$$$\   $$$$$$$ | $$$$$$\  $$ |
// $$\$$\$$ $$ |$$  __$$\ $$  __$$ | \____$$\ $$ |
// $$ \$$$  $$ |$$ /  $$ |$$ /  $$ | $$$$$$$ |$$ |
// $$ |\$  /$$ |$$ |  $$ |$$ |  $$ |$$  __$$ |$$ |
// $$ | \_/ $$ |\$$$$$$  |\$$$$$$$ |\$$$$$$$ |$$ |
// \__|     \__| \______/  \_______| \_______|\__|
//
//
//

var Modal = (function () {

	var _modal,
		_target;

	var init = function () {
		// Bind UI actions
		_bindUiActions();
	};

	var _bindUiActions = function() {
		// Show modal
		$('body').on('click', '*[data-modal]', _show);

		// Close modal
		$('body').on('click', '.modal__close, .modal', _close);
	};

	var _show = function(event) {
		// Which modal should we show?
		_modal = $(this).data('modal');

		// Show it
		$('#' + _modal).removeClass('modal--hidden').addClass('modal--visible');

		// Set top px value for clip class
		var scrollPosition = $(window).scrollTop();
		$(window).scrollTop(scrollPosition);

		console.log(scrollPosition);

		// Show overlay
		Overlay.show(true);

		event.preventDefault();

	};

	var _close = function(event) {
		var clicked = $(event.target);

		if (clicked.is('.modal__content') || clicked.parents().is('.modal__content')) return;

		// Hide it
		$('.modal').removeClass('modal--visible').addClass('modal--hidden');

		// Hide overlay
		Overlay.hide();

		event.preventDefault();
	};

	return {
		init: init
	};

})();

Modal.init();
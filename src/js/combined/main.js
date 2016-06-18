$(function() {

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

});
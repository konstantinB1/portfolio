(function($) {
    // --------------------------------------------- //


	let harmonica = $('.harmonica-content'),
	    harmonicaClick = $('.harmonica-header'), 
	    menu = $('.nav-burger-popup'),
	    page =  $('.page-full'),

	    clicked = true;

    function harmonicaTrigger() {  
	    if($(this).hasClass('harmonica-close')) {
		    	$(this).next().slideToggle(455);
		    	$(this).removeClass('harmonica-close')
		    	       .addClass('harmonica-open');	 
	    }
	    else {
	    	$(this).next().slideToggle(455);
	    	$(this).removeClass('harmonica-open')
	    	       .addClass('harmonica-close');
	    }
	}
   
	function menuPop(e) {
		e.preventDefault();

		if(clicked) {
	        page.removeClass('page-full-close');
	        menu.removeClass('nav-burger-popup-close')   			
	        page.addClass('page-full-open');
	        menu.addClass('nav-burger-popup-open')
	        $('.burger-nav').find('ul').show(155);
	        $('.burger-btm-wrap').fadeIn(355);        
	        clicked = false;
		}
		else {
	        page.removeClass('page-full-open');
	        menu.removeClass('nav-burger-popup-open')
	        page.addClass('page-full-close');
	        menu.addClass('nav-burger-popup-close');
	        $('.burger-btm-wrap').fadeOut(355);
	        $('.burger-nav').find('ul').hide(155);	        	        
	        clicked = true;			
		}
	}

	function hideMenu(e) {
		e.preventDefault();
		if($(this).innerWidth() > 1351) {
			menu.removeClass('nav-burger-popup-open');
	        page.removeClass('page-full-open');	
	        page.removeClass('page-full-close');
	        menu.removeClass('nav-burger-popup-close') 	        
	        clicked = true;		
		}
	}

    function checkbox(e) {
    	e.preventDefault();

    	let el = $(this);
    	let data = el.data('check');
    	let aria = el.attr('aria-checked');

       	if(aria && data && el.hasClass('checkbox-active')) {
	        el.removeClass('checkbox-active')
	          .addClass('checkbox')
	          .data('check', false)
	          .attr('aria-checked', false);
    	} else {
 	        el.addClass('checkbox-active')
	          .removeClass('checkbox')
	          .data('check', true)
	          .attr('aria-checked', true);

    	}
    }


	harmonica.hide();
	harmonica.first().show();

	harmonicaClick.click(harmonicaTrigger); 
    $('.browser-sup-close').click(function() {$('.browser-support').hide(); })
    $('.nav-burger').click(menuPop);
    $('.checkbox, .checkbox-active').click(checkbox);

    $(window).resize(hideMenu);


})(jQuery);

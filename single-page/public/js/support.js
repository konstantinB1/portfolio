(function() {

	let m           = Modernizr,
	    html        = $('html'),
        sections    = $('.page-full').children(),

        jsfolder    = 'js/support/',

        scripts     = {

	    	calc: 'calc'
        },

        getScript    = function(script) {
            return $('body').append(
            	'<script src="' + jsfolder + scripts[script] + 
            	'.js"></script>');
        };

    
    // if( !m.calc || html.hasClass('no-calc') ) { getScript('calc') }

    if( m.flexbox && html.hasClass('flexbox')) {
    	let el = $('.userstory');
    	el.addClass('userstory-flexbox');
    }


})();
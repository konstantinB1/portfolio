$(document).ready(function() {

	$('#recommended').slick({
		  infinite: false,
		  slidesToShow: 4,
		  slidesToScroll: 2,
		  speed: 500,
		  nextArrow: '<button class="arrow"><span class="arr-next"></span></button>',
		  prevArrow: '<button class="arrow"><span class="arr-prev"></span></button>',
	      accessibility:true,
		  responsive: [
		    {
		      breakpoint: 1000,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1
		      }
		    },
		    {
		      breakpoint: 800,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		  ]
    });

	$('#top-products').slick({
		  infinite: false,
		  slidesToShow: 4,
		  slidesToScroll: 2,
		  speed: 500,
		  nextArrow: '<button class="arrow"><span class="arr-next"></span></button>',
		  prevArrow: '<button class="arrow"><span class="arr-prev"></span></button>',
	      accessibility:true,
		  responsive: [
		    {
		      breakpoint: 1000,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1
		      }
		    },
		    {
		      breakpoint: 800,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		  ]
    });

	$('#new-prod, #new-prod').slick({
		  infinite: false,
		  slidesToShow: 4,
		  slidesToScroll: 2,
		  speed: 500,
		  nextArrow: '<button class="arrow"><span class="arr-next"></span></button>',
		  prevArrow: '<button class="arrow"><span class="arr-prev"></span></button>',
	      accessibility:true,
		  responsive: [
		    {
		      breakpoint: 1000,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1
		      }
		    },
		    {
		      breakpoint: 800,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		  ]
    });

	$('#disc').slick({
		  infinite: false,
		  slidesToShow: 4,
		  slidesToScroll: 2,
		  speed: 500,
		  nextArrow: '<button class="arrow"><span class="arr-next"></span></button>',
		  prevArrow: '<button class="arrow"><span class="arr-prev"></span></button>',
	      accessibility:true,
		  responsive: [
		    {
		      breakpoint: 1000,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1
		      }
		    },
		    {
		      breakpoint: 800,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		  ]
    });

	$('.carousel').slick({
	  lazyLoad: 'ondemand',
	  slidesToShow: 1,
	  nextArrow: '<button class="arrow-car"><span class="arr-next"></span></button>',
      prevArrow: '<button class="arrow-car"><span class="arr-prev"></span></button>',	  
	  slidesToScroll: 1
	});

})

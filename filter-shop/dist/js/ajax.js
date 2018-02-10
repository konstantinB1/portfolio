
$(document).ready(function() {

   var location   = $('#select-loc'),
       price      = $('#price'),
       bolig      = $('#boli'),       
       type       = $('#htypes').find('.btype'),
       rent       = $('#renting').find('.rentper'),       
       sizeLrooms = $('#lrooms'),
       sizeBathr  = $('#bathr'),
       sizeBedr   = $('#bedr'),
       nav        = $('.links-hamb'),
       menu       = $('.collapse-list'),
       filterBut  = $('.filter'),
       filterSec  = $('.sect-filter'),
       resultSec  = $('.sect-res'),
       xFilter    = $('.glyphicon.glyphicon-remove'),
       filterRes  = $('#filterRes'),
       buttons    = $('.btype')
       resultIt   = $('.res-block')     
       isTypeClick = false,

       lrooms     = $('#lrooms'),
       bathr      = $('#bathr'),
       bedr       = $('#bedr');  

       /**
        * [ajaxCall calling ajax]
        * @return {[ajax object]} [returning ajax call]
        */
	   function ajaxCall() {
		    return $.ajax ({
		       url: 'lib/house-data.json',
		       method: 'GET',
		       dataType: 'json',
		       done: function(data) {
		       	return data;
		       }
	       });
	    }

	    var ajax = ajaxCall();

	 //  Array.prototype.compare = function(arr2) {
		// 	var ret = [];
		// 	this.sort();
		// 	arr2.sort();
		// 	for(var i = 0; i < this.length; i += 1) {
		// 		if(arr2.indexOf(this[i]) > -1) {
		// 			ret.push(this[i]);
		// 		}
		// 	}
		// 	return ret;
		// }


	   /**
	    * [imageHandler checking if data exists]
	    * @param  {[number]} id []
	    * @return {[string]}    []
	    */
	   function imageHandler(id) {
	      var url;
		   	 if(id == null)
		   	 	url = '<img class="img-noimg" src="img/houses/noImg.jpg "></img>';
		   	 else
		   	 	url = '<img class="img-house" src="img/houses/' + id + '"></img>';
			 return url;
	   }



       /**
        * [filter filtering data results from json]
        * @param  {[string identifier} initLoad [using for on document ready only]
        * @return {[object]} [returning results]
        */
	   function filter(initLoad){

	      ajax.done(function(data) {

	         var obj2 = data.results,		 	
				 intersec =[],   		 
				 locations = [],
				 prices = [],
				 boligs = [],
				 resblock = $('.displayres').find('.row');

				  /************************/
				 /*      LOCATIONS       */
				/************************/	

			  if ( location.val() != []){
			      for(var j = 0; j < location.val().length; j++) {
				      for(var k = 0; k < obj2.length; k++) {
						  if(obj2[k].area.name == location.val()[j]) {
				             locations.push(obj2[k].id);					
							}
				         }
				      }
				    if (locations.length > 0) {
				    		intersec.push(locations);
				    }
				  }



					  /************************/
					 /*        ROOMS         */
					/************************/

			       if ((bathr.val() !== null || bathr.val() !== '' || lrooms.val() == 'Badeværelser')  
                   ||  (lrooms.val() !== null || lrooms.val() !== '' || lrooms.val() == 'Væerlesr') 
                   ||  (bedr.val() !== null || bedr.val() !== '' || lrooms.val() == 'Stuer'))
				    {
			        var lroomsFound = [],
			            bedrFound = [],
			            bathrFound = [];

						for(var g = 0; g < obj2.length; g++) {
	 
							 if  ((bedr.val() == '5+' && obj2[g].bedrooms >= 5) ||
							      (bedr.val() == obj2[g].bedrooms) ) 
							 {
							       bedrFound.push(obj2[g].id);	
							 }

							 if  (lrooms.val() == obj2[g].living_rooms) 
							 {
							       lroomsFound.push(obj2[g].id);						  	
							 }
					
							 if   (bathr.val() == obj2[g].bathrooms)
							 {
							       bathrFound.push(obj2[g].id);						  	
							 }                 
						}

						if(bathrFound.length > 0) {
						   intersec.push(bathrFound);
						}
						if(lroomsFound.length > 0) {
						   intersec.push(lroomsFound);
						}
						if(bedrFound.length > 0) {
						   intersec.push(bedrFound);
						}					
				    }



				  /************************/
				 /*        PRICES        */
				/************************/	


			    if(price.val() !== '' && price.val() !== null) {
			    	var values = price.val().split(","),
			          	min = values[0],
			    	    max = values[1];

			    	for(var k = 0; k < obj2.length; k++) {

			    		   if (obj2[k].rent_amount >= min  &&  
			    		   	   obj2[k].rent_amount <= max)
			    		   {
			    			     prices.push(obj2[k].id);			    		   	
			    		   }

			         }

			            if(prices.length > 0) {
			        		intersec.push(prices);
			        	}

			        }


				  /****************************/
				 /* SURFACE AREA(NOTWORKING) */
				/****************************/	  

			    // if(bolig.val() !== '' && bolig.val() !== null) {
			    // 	var bValues = bolig.val().split(","),
			    //       	bMin = values[0],
			    // 	    bMax = values[1],
			    // 	    bRent;

			    // 	for(var k = 0; k < obj2.length; k++) {

			    // 		   if(obj2[k].surface_area >= bMin && 
			    // 		   	  obj2[k].surface_area <= bMax) 
			    // 		   {
			    // 			  boligs.push(obj2[k].id);
			    // 		   }
			    //      }

			    //         if(boligs.length > 0) {
			    //     		intersec.push(boligs);
			    //     	}
			    //     }			        



				  /****************************/
				 /*       HOUSE TYPES        */
				/****************************/	

		            var ithas = [],
		                types = [];

			    for(var i = 0; i < type.length; i++) {
			        if(type[i].outerHTML.includes('active')) {
			           ithas.push(type[i].innerHTML.toLowerCase());
			           }
                 
			    }	    
	             if(ithas.length > 0) {
			        for(var x = 0; x < ithas.length; x++) {
			            for(var u = 0; u < obj2.length; u++) {
			          	 	if(obj2[u].localized_title.includes(ithas[x])) {
			                    types.push(obj2[u].id);
			          	 	}

			          	 }
			          }
	          	 	if(types.length > 0) {
	          	 		intersec.push(types);
	          	 	}			          	 
			       } 	

				  /****************************/
				 /*       RENT PERIOD        */
				/****************************/	
	              var bTypes = [],
	                  rents  = [];

				    for(var a = 0; a < rent.length; a++) {
				        if(rent[a].outerHTML.includes('active')) {
				           bTypes.push(rent[a].innerHTML);
				           }
	                 
				    }

	             if(bTypes.length > 0) {
			        for(var x = 0; x < bTypes.length; x++) {
			            for(var u = 0; u < obj2.length; u++) {
			          	 	if ((    bTypes[x] === '1-12md.' 
			          	 	      && obj2[u].rent_period_max < 12 ) 
			          	 	   ||
			          	 	    (    bTypes[x] === '1-2-ar.' 
			          	 	      &&  obj2.rent_period_min >= 12 
			          	 	      &&  obj2[u].rent_period_max <= 24 ) 
			          	 	   ||			          	 	     
			          	 	    (    bTypes[x] === '2+ ar' 
			          	 	      && obj2[u].rent_period_max > 24 ))
			          	 	 {
                                     rents.push(obj2[u].id);
			          	 	 }
			                    
			          	 }
			          }	  	
	          	 	if(rents.length > 0) {
	          	 		intersec.push(rents);
	          	 	}			          
	               }

				  /****************************/
				 /*      GETTING RESULTS     */
				/****************************/

				 var filterResult1 = _.intersection.apply(_, intersec),
				     filterResult  = [];

			     for(var j = 0; j < filterResult1.length; j++) {
					 var first = filterResult1[j];
						for(var k = 0; k < obj2.length; k++) {
							var second = obj2[k].id;
							    if(first == second) {
						           filterResult.push(obj2[k]);					
								}
						}
				  }

			      if(filterResult.length == 0) {
			      	  resblock.html('<div class="col-lg-12 col-md-12 col-sm-12' 
			      	  	           + 'col-xs-12 noresults"><h3>No results </h3></div>');
				     
				      $('.results').html('0 boliger');       	  
			      }
			      else 
			      {
				      resblock.html('');
				      $('.results').html(filterResult.length + ' boliger');            

					  for(var i = 0; i < filterResult.length; i++) {
				                 resblock.append('<div class="res-block col-lg-4 col-md-6 col-sm-12 col-xs-12">'
				               +'<div class="res-item"><a class="imglink" href="' + filterResult[i].url + '">'
				               + imageHandler(filterResult[i].featured_image_url)
				               + '<h4>' + filterResult[i].localized_title + '</h4></a>'
				               + '<div class="areaid">'
				               + '<span class="area"> ' + filterResult[i].area.name + '</span>'
				               + '<span class="id">No ' + filterResult[i].case_number + '</span>'		               	           	               
				               + '</div>'
				               + '<div class="localdesc">' + filterResult[i].localized_short_description + '</div>'
				               + '<span class="size">' + filterResult[i].surface_area + ' - ' 
				               + filterResult[i].rent_amount + ' DKK / md.</span>'               
				               + '</div></div>'); 
				      }  	      	
			      }
	        });
	   }




      //
      //
      // Complete mess of responsive stuff (^_^)
      //
      //


       $('.selectpicker').selectpicker();
       filterRes.css({'display':'none'});
       
	    $(xFilter).click(function(ev) {
          $(window).resize(function(eve) {
             if(window.innerWidth >= 1275 && resultSec.hasClass('col-lg-9')) {
                   if(filterSec.not(':visible') && resultSec.hasClass('col-lg-9')) {
                         resultSec.removeClass('col-lg-9').addClass('col-lg-12');
                         filterRes.show();                          
                   }      
                   if(filterSec.is(':visible') && resultSec.hasClass('col-lg-12'))  {
                         resultSec.removeClass('col-lg-12').addClass('col-lg-9');
                          filterRes.hide();                           
                   }          
             }  

          });   
	    if(filterSec.not(':visible') && resultSec.hasClass('col-lg-9')) {
	      resultSec.removeClass('col-lg-9').addClass('col-lg-12');     
	      filterSec.hide();
	      filterRes.css({'display':'inline'})
	      .click(function() {
	          filterSec.show();     
	          filterRes.hide();
	          resultSec.removeClass('col-lg-12').addClass('col-lg-9');                                   
	      })
	    }
	    else {
	      resultSec.removeClass('col-lg-12').addClass('col-lg-9');          
	      filterSec.show();          
	    }
	});
	 $(window).resize(function() {
	    if(window.innerWidth >= 1275 && resultSec.hasClass('col-lg-12')) {
	          resultSec.removeClass('col-lg-12').addClass('col-lg-9');    
	   }
	 })
    if(resultSec.hasClass('col-lg-12') && resultIt.hasClass('col-lg-4')) {
         resultIt.removeClass('col-lg-4').addClass('.col-lg-3');
    }
    else {
         resultIt.removeClass('col-lg-3').addClass('.col-lg-4');      
    }
    filterBut.click(function(ev) {
        if(filterSec.is(':visible')) {
          filterSec.hide(150);        
        }
        else {
          if(filterSec.hasClass('col-md-3'))
            filterSec.addClass('col-md-12');
          filterSec.show(150);
        }   
     });
      // Navigation toggle
	    nav.click(function(){
	      if(menu.is(':visible')) {
	        menu.hide(150);
	        $('.whitespace').animate({'height':'-=100px'}, 100);	        
	      }
	      else {
	        menu.show(150);
	        $('.whitespace').animate({height:'+=100px'}, 100);
	      } 	
	                 
	    });
 
    price.jRange({
    from: 0,
    to: 40000,
    width: '100%',
    isRange: true,
    onstatechange: function() {
      filter();
    }
    });

    bolig.jRange({
    from: 0,
    to: 500,
    width: '100%',
    isRange: true,
    ondragend: function() {
      filter();
    }
    });


   //                //
   //                //
   // Click handlers //
   //                //
   //                //


   $('#htypes').find('.btype').click(function() {
      if(!$(this).hasClass('active')) {
         $(this).removeClass('notact').addClass('active');
          filter();
      }
      else {
        $(this).removeClass('active').addClass('notact');
          filter();
      }
   });

   $('#renting').find('.rentper').click(function() {
      if(!$(this).hasClass('active')) {
         $(this).removeClass('notact').addClass('active');
          filter();
      }
      else {
        $(this).removeClass('active').addClass('notact');
          filter();
      }
   });   

   $('#bedr, #bathr, #lrooms, #select-loc').on('changed.bs.select', function() {     
        filter();        
   }); 

   filter('load');



});

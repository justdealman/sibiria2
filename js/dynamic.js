$(window).load(function() {
	$('.range.price').each(function() {
		handle = $(this).find('.ui-slider-handle');    
		var start = $(this).slider('values',0);
		handle.eq(0).addClass('first').append('<span class="value">'+start+' руб</span>');
		var mf = handle.eq(0).find('span').width() / 2;
		handle.eq(0).find('span').css({'margin-left': -mf+'px'});
		var end = $(this).slider('values',1);
		handle.eq(1).addClass('second').append('<span class="value">'+end+' руб</span>');
		var ms = handle.eq(1).find('span').width() / 2;
		handle.eq(1).find('span').css({'margin-left': -ms+'px'});
		var ld = handle.eq(0).find('span').offset().left+handle.eq(0).find('span').width()+14;
		var rd = handle.eq(1).find('span').offset().left;
		if ( ld > rd) {
			var difference = (ld-rd)/2;
			handle.eq(0).find('span').css({'margin-left': -mf-difference+'px'});
			handle.eq(0).find('span').append(' -');
			handle.eq(1).find('span').css({'margin-left': -ms+difference+'px'});
		}
	});
	$('.range.square').each(function() {
		handle = $(this).find('.ui-slider-handle');    
		var start = $(this).slider('values',0);
		handle.eq(0).addClass('first').append('<span class="value">'+start+' м<sup>2</sup></span>');
		var mf = handle.eq(0).find('span').width() / 2;
		handle.eq(0).find('span').css({'margin-left': -mf+'px'});
		var end = $(this).slider('values',1);
		handle.eq(1).addClass('second').append('<span class="value">'+end+' м<sup>2</sup></span>');
		var ms = handle.eq(1).find('span').width() / 2;
		handle.eq(1).find('span').css({'margin-left': -ms+'px'});
		var ld = handle.eq(0).find('span').offset().left+handle.eq(0).find('span').width()+14;
		var rd = handle.eq(1).find('span').offset().left;
		if ( ld > rd) {
			var difference = (ld-rd)/2;
			handle.eq(0).find('span').css({'margin-left': -mf-difference+'px'});
			handle.eq(0).find('span').append(' -');
			handle.eq(1).find('span').css({'margin-left': -ms+difference+'px'});
		}
	});
	$('.range.floor').each(function() {
		handle = $(this).find('.ui-slider-handle');    
		var start = $(this).slider('values',0);
		handle.eq(0).addClass('first').append('<span class="value">'+start+' этаж</span>');
		var mf = handle.eq(0).find('span').width() / 2;
		handle.eq(0).find('span').css({'margin-left': -mf+'px'});
		var end = $(this).slider('values',1);
		handle.eq(1).addClass('second').append('<span class="value">'+end+' этаж</span>');
		var ms = handle.eq(1).find('span').width() / 2;
		handle.eq(1).find('span').css({'margin-left': -ms+'px'});
		var ld = handle.eq(0).find('span').offset().left+handle.eq(0).find('span').width()+14;
		var rd = handle.eq(1).find('span').offset().left;
		if ( ld > rd) {
			var difference = (ld-rd)/2;
			handle.eq(0).find('span').css({'margin-left': -mf-difference+'px'});
			handle.eq(0).find('span').append(' -');
			handle.eq(1).find('span').css({'margin-left': -ms+difference+'px'});
		}
	});
});
function zoom() {
	var scrollobjectheight;
	var zoom;

	if ( $(window).height() < 772 ) {
		zoom = $(window).height()/772;
		$('.index').css({'padding-top': '0'});
		$('.prenew').css({'padding-top': '0'});
		$('.clear').css({'padding-top': '0'});
		scrollobjectheight = $('.index .nav div#5').position().top;
		$('.index .object').removeClass('wide');
		$('.index .object .gallery').css({'zoom': '1', 'margin': '7px 121px 0 0'});
	}
	else {
		if ( $(window).height() < 872 ) {
			zoom = 1;
			var margin = ( $(window).height() - 792 )/3;
			$('.index').css({'padding-top': margin+'px'});
			$('.prenew').css({'padding-top': margin+'px'});
			$('.clear').css({'padding-top': margin+'px'});
			scrollobjectheight = $('.index .nav div#5').position().top;
			$('.index .object').removeClass('wide');
			$('.index .object .gallery').css({'zoom': '1', 'margin': '7px 121px 0 0'});
		}
		else {
			zoom = 1;
			var margin = ( $(window).height() - 872 )/3;
			$('.index').css({'padding-top': margin+'px'});
			$('.prenew').css({'padding-top': margin+'px'});
			$('.clear').css({'padding-top': margin+'px'});
			scrollobjectheight = $('.index .nav div#6').position().top;
			$('.index .object').addClass('wide');
			$('.index .object .gallery').css({'zoom': '1.2', 'margin': '4px 60px 0 -20px'});
		}
	}
	$('section .wrapper').css({'zoom': zoom});
	
	modalheight = Math.floor(($('.index').height()-20)*zoom);
	
	$('section').each(function() {

		$(this).find('.index .nav > div').height(scrollobjectheight);
		var scrollobjectpreview = $(this).find('.index .nav > div').jScrollPane({
			autoReinitialise: true,
			animateScroll: true,
			hijackInternalLinks: true
		});
		var api = scrollobjectpreview.data('jsp');
	
		var current = 1;
		$(this).find('.index .nav > .prev').bind('click', function() {
			if ( current > 1 ) {
				if (current == 2) {
					current = current - 1;
					target = 0;
					api.scrollToY(0, true);
				}
				else {
					current = current - 1;
					var target = $(this).parent('.nav').find('#'+current).position().top;
					api.scrollToY(target, true);
				}
			}
			return false;
		});

		$(this).find('.index .nav > .next').bind('click', function() {
			var rp = $(this).parent('.nav').find('.jspPane').height() - $(this).parent('.nav').find('#'+current).position().top - $(this).parent('.nav').find('.jspScrollable').height();
			if ( rp > 0 ) {
				current = current + 1;
				var target = $(this).parent('.nav').find('#'+current).position().top;
				api.scrollToY(target, true);
			}
			return false;
		});

		var aa = $(this).find('.element.active').attr('id');
		var ip = $(this).find('.jspPane').height() - $(this).find('#'+aa).position().top - $(this).find('.jspScrollable').height();
		if ( aa == 1 ) {
			ip = 0;
		}
		api.scrollToY(-ip, true);
	});
	
}
$(window).resize(function() {
	zoom();
});
$(window).load(function() {
	zoom();
});
$(document).ready(function() {
	$('.index.buildings .nav .element').bind('click', function() {
		var target = $(this).attr('id');
		$('.main').moveTo(target);
		return false;
	});
	
	$('.object .gallery > div').each(function() {
		var objectheight = $('.object .gallery > div').height() - $(this).find('.navigation').position().top;
		$(this).find('.pictures img').css({'bottom': objectheight+'px'});
		$(this).find('.pictures img:first-child').show();
		$(this).find('.prev').addClass('disabled');
	});

	$('.object .gallery > div .next').bind('click', function() {
		if ( $(this).parents('.gallery').find('.pictures img:visible').next().length > 0 ) {
			$(this).parents('.gallery').find('.pictures img:visible').hide().next().fadeIn();
			$(this).parents('.gallery').find('.prev').removeClass('disabled');
			if ( $(this).parents('.gallery').find('.pictures img:visible').next().length == 0 ) {
				$(this).parents('.gallery').find('.next').addClass('disabled');
			}
		}
		return false;
	});
	
	setInterval(function() {
		$('.object .gallery > div').each(function() {
			$(this).find('.next').click();
		})
	}, 5000);

	$('.object .gallery > div .prev').bind('click', function() {
		if ( $(this).parents('.gallery').find('.pictures img:visible').prev().length > 0 ) {
			$(this).parents('.gallery').find('.pictures img:visible').hide().prev().fadeIn();
			$(this).parents('.gallery').find('.next').removeClass('disabled');
			if ( $(this).parents('.gallery').find('.pictures img:visible').prev().length == 0 ) {
				$(this).parents('.gallery').find('.prev').addClass('disabled');
			}
		}
		return false;
	});
	if ( $('.index.buildings').length || $('.index.floors').length ) {
		var xxx = 1;
		var first = 1;
		
		$('section .index.buildings .nav').each(function() {
			var ind = $(this).parents('section').index()+1;
			$(this).find('.element:nth-of-type('+ind+')').addClass('active');
		});	
	}
	
	if ( $('.index').length ) {
		$('.index.buildings .object').each(function() {
			$(this).find('.links li a').bind('click', function() {
				var modalheight = $('.index').height();
				$(this).parents('.index').find('.modal').height(modalheight-20);
				$(this).parents('.index').find('.modal .scrollable').height(modalheight-112);
				var target = $(this).attr('href');

				if ( target == 'map' ) {
					$(this).parents('.object').find('.modal.map iframe').height(modalheight-20);
				}
				$(this).parents('.object').find('.modal.'+target).fadeIn(150);
				$('body').on('wheel.modal mousewheel.modal', function () {
					return false;
				});
				
				return false;
			});
		});
		$('.index.buildings .object .modal').each(function() {
			$(this).append('<span class="close"></span>');
			var modalscroll = $(this).height()-89;
			$(this).find('.scrollable').height(modalscroll)
			$(this).find('.scrollable').jScrollPane({
				verticalDragMinHeight: 42,
				verticalDragMaxHeight: 42,
				autoReinitialise: true
			});
		});
	}
	
	$('.modal .close').bind('click', function() {
		$(this).parent().fadeOut(150);
		$('body').off('wheel.modal mousewheel.modal');
		return false;
	});
	$(this).keydown(function(eventObject){
		if (eventObject.which == 27) {
			$('.modal').fadeOut(150);
			$('body').off('wheel.modal mousewheel.modal');
		}
	});
	$('.index.buildings .object .modal.stages .photos > div').each(function() {
		var total = $(this).find('img').size();
		$(this).find('div img:first-child').show();
		var current = 1;
		$(this).find('h5 strong').empty().text(current+' - '+total);
		$(this).find('.prev').addClass('disabled');
		$(this).find('.next').bind('click', function() {
			if ( $(this).parent().parent().find('div img:visible').next().length > 0 ) {
				$(this).parent().parent().find('div img:visible').hide().next().fadeIn();
				var current = $(this).parent().parent().find('div img:visible').index()+1;
				$(this).parent().parent().find('h5 strong').empty().text(current+' - '+total);
				$(this).parent().parent().find('.prev').removeClass('disabled');
				if ( $(this).parent().parent().find('div img:visible').next().length == 0 ) {
					$(this).addClass('disabled');
				}
			}
			return false;
		});
		$(this).find('.prev').bind('click', function() {
			if ( $(this).parent().parent().find('div img:visible').prev().length > 0 ) {
				$(this).parent().parent().find('div img:visible').hide().prev().fadeIn();
				var current = $(this).parent().parent().find('div img:visible').index()+1;
				$(this).parent().parent().find('h5 strong').empty().text(current+' - '+total);
				$(this).parent().parent().find('.next').removeClass('disabled');
				if ( $(this).parent().parent().find('div img:visible').prev().length == 0 ) {
					$(this).addClass('disabled');
				}
			}
			return false;
		});
	});
	$('.index.buildings .object .modal.stages').each(function() {
		var stagetabs = $(this).find('.photos > div');
		$(this).find('ul li a').click(function () {
			var targetstage = $(this).attr('href');
			stagetabs.hide();
			stagetabs.filter('.'+targetstage).stop(true, true).fadeIn(150);
			$(this).parent().siblings().removeClass('active');
			$(this).parent().addClass('active');
			return false;
		}).filter(':first').click();
	});
	
	$('.floor .tooltip').append('<span class="arrow"></span>');
	$('.floor .tooltip').append('<span class="close">x</span>');
	$('.prenew > div').slides({
		generatePagination: false,
		generateNextPrev: true,
		container: 'container',
		effect: 'fade',
		fadeSpeed: 150,
		play: 5000,
		pause: 2500
	});
	$('.content > h1, .filter h1').each(function() {
		$(this).append('<em class="left"></em><em class="right"></em>')
		var h1 = (960-($(this).children('span').width()+18))/2;
		$(this).find('em.left, em.right').css({'width': h1+'px'});
	});
	$('.range.price').slider({
		range: true,
		min: 1000000,
		max: 4000000,
		step: 50000,
		values: [1500000, 2500000],
		stop: function(event, ui) {
			var start = $(this).slider('values',0);
			var end = $(this).slider('values',1);
			handle = $(this).find('.ui-slider-handle');
			handle.eq(0).empty().append('<span class="value">'+$(this).slider("values",0)+' руб</span>');
			var mf = handle.eq(0).find('span').width() / 2;
			handle.eq(0).find('span').css({'margin-left': -mf+'px'});
			handle.eq(1).empty().append('<span class="value">'+$(this).slider("values",1)+' руб</span>');
			var ms = handle.eq(1).find('span').width() / 2;
			handle.eq(1).find('span').css({'margin-left': -ms+'px'});
			var ld = handle.eq(0).find('span').offset().left+handle.eq(0).find('span').width()+14;
			var rd = handle.eq(1).find('span').offset().left;
			if ( ld > rd) {
				var difference = (ld-rd)/2;
				handle.eq(0).find('span').css({'margin-left': -mf-difference+'px'});
				handle.eq(0).find('span').append(' -');
				handle.eq(1).find('span').css({'margin-left': -ms+difference+'px'});
			}
		},
		slide: function(event, ui){
			var start = $(this).slider('values',0);
			var end = $(this).slider('values',1);
			handle = $(this).find('.ui-slider-handle');
			handle.eq(0).empty().append('<span class="value">'+$(this).slider("values",0)+' руб</span>');
			var mf = handle.eq(0).find('span').width() / 2;
			handle.eq(0).find('span').css({'margin-left': -mf+'px'});
			handle.eq(1).empty().append('<span class="value">'+$(this).slider("values",1)+' руб</span>');
			var ms = handle.eq(1).find('span').width() / 2;
			handle.eq(1).find('span').css({'margin-left': -ms+'px'});
			var ld = handle.eq(0).find('span').offset().left+handle.eq(0).find('span').width()+20;
			var rd = handle.eq(1).find('span').offset().left;
			if ( ld > rd) {
				var difference = (ld-rd)/2;
				handle.eq(0).find('span').css({'margin-left': -mf-difference+'px'});
				handle.eq(0).find('span').append(' -');
				handle.eq(1).find('span').css({'margin-left': -ms+difference+'px'});
			}
		}
    });
	$('.range.square').slider({
		range: true,
		min: 10,
		max: 100,
		step: 1,
		values: [20, 45],
		stop: function(event, ui) {
			var start = $(this).slider('values',0);
			var end = $(this).slider('values',1);
			handle = $(this).find('.ui-slider-handle');
			handle.eq(0).empty().append('<span class="value">'+$(this).slider("values",0)+' м<sup>2</sup></span>');
			var mf = handle.eq(0).find('span').width() / 2;
			handle.eq(0).find('span').css({'margin-left': -mf+'px'});
			handle.eq(1).empty().append('<span class="value">'+$(this).slider("values",1)+' м<sup>2</sup></span>');
			var ms = handle.eq(1).find('span').width() / 2;
			handle.eq(1).find('span').css({'margin-left': -ms+'px'});
			var ld = handle.eq(0).find('span').offset().left+handle.eq(0).find('span').width()+14;
			var rd = handle.eq(1).find('span').offset().left;
			if ( ld > rd) {
				var difference = (ld-rd)/2;
				handle.eq(0).find('span').css({'margin-left': -mf-difference+'px'});
				handle.eq(0).find('span').append(' -');
				handle.eq(1).find('span').css({'margin-left': -ms+difference+'px'});
			}
		},
		slide: function(event, ui){
			var start = $(this).slider('values',0);
			var end = $(this).slider('values',1);
			handle = $(this).find('.ui-slider-handle');
			handle.eq(0).empty().append('<span class="value">'+$(this).slider("values",0)+' м<sup>2</sup></span>');
			var mf = handle.eq(0).find('span').width() / 2;
			handle.eq(0).find('span').css({'margin-left': -mf+'px'});
			handle.eq(1).empty().append('<span class="value">'+$(this).slider("values",1)+' м<sup>2</sup></span>');
			var ms = handle.eq(1).find('span').width() / 2;
			handle.eq(1).find('span').css({'margin-left': -ms+'px'});
			var ld = handle.eq(0).find('span').offset().left+handle.eq(0).find('span').width()+20;
			var rd = handle.eq(1).find('span').offset().left;
			if ( ld > rd) {
				var difference = (ld-rd)/2;
				handle.eq(0).find('span').css({'margin-left': -mf-difference+'px'});
				handle.eq(0).find('span').append(' -');
				handle.eq(1).find('span').css({'margin-left': -ms+difference+'px'});
			}
		}
    });
	$('.range.floor').slider({
		range: true,
		min: 1,
		max: 16,
		step: 1,
		values: [2, 8],
		stop: function(event, ui) {
			var start = $(this).slider('values',0);
			var end = $(this).slider('values',1);
			handle = $(this).find('.ui-slider-handle');
			handle.eq(0).empty().append('<span class="value">'+$(this).slider("values",0)+' этаж</span>');
			var mf = handle.eq(0).find('span').width() / 2;
			handle.eq(0).find('span').css({'margin-left': -mf+'px'});
			handle.eq(1).empty().append('<span class="value">'+$(this).slider("values",1)+' этаж</span>');
			var ms = handle.eq(1).find('span').width() / 2;
			handle.eq(1).find('span').css({'margin-left': -ms+'px'});
			var ld = handle.eq(0).find('span').offset().left+handle.eq(0).find('span').width()+14;
			var rd = handle.eq(1).find('span').offset().left;
			if ( ld > rd) {
				var difference = (ld-rd)/2;
				handle.eq(0).find('span').css({'margin-left': -mf-difference+'px'});
				handle.eq(0).find('span').append(' -');
				handle.eq(1).find('span').css({'margin-left': -ms+difference+'px'});
			}
		},
		slide: function(event, ui){
			var start = $(this).slider('values',0);
			var end = $(this).slider('values',1);
			handle = $(this).find('.ui-slider-handle');
			handle.eq(0).empty().append('<span class="value">'+$(this).slider("values",0)+' этаж</span>');
			var mf = handle.eq(0).find('span').width() / 2;
			handle.eq(0).find('span').css({'margin-left': -mf+'px'});
			handle.eq(1).empty().append('<span class="value">'+$(this).slider("values",1)+' этаж</span>');
			var ms = handle.eq(1).find('span').width() / 2;
			handle.eq(1).find('span').css({'margin-left': -ms+'px'});
			var ld = handle.eq(0).find('span').offset().left+handle.eq(0).find('span').width()+20;
			var rd = handle.eq(1).find('span').offset().left;
		}
    });
	$('input[type="radio"]').uniform();
	$('.filter ul li').each(function() {
		var hh = ($(this).find('p').height()-18)/2;
		$(this).find('p').css({'margin-top': -hh+'px'});
	});
	$('table.list th span').append('<em class="down"></em><em class="up"></em>');
	$('table.list th span').click(function() {
		if ( $(this).find('em.active').length != 0 ) {
			$(this).find('em').toggleClass('active');
		}
		else {
			$(this).parent().siblings().find('em').removeClass('active');
			$(this).find('em:first').addClass('active');
		}
		return false;
	});
	
	$('.menu').append('<span class="close"></span>');
	
	if ( $('.menu').hasClass('active') ) {
		$('.showmenu').hide();
	}
	else {
		$('.menu').hide();
	}
	
	$('.showmenu > p').bind('click', function() {
		$(this).parent().hide();
		$('.menu').show();
		return false;
	});
	
	$('.menu .close').bind('click', function() {
		$(this).parent().hide();
		$('.showmenu').show();
		return false;
	});

	$('.index .buildphoto').each(function() {
		var buildphotos = $(this).children('div');
		$(this).children('ul').children('li').children('a').click(function () {
			buildphotos.hide();
			var target = $(this).attr('href');
			buildphotos.filter('.'+target).stop(true, true).fadeIn(0);
			$(this).parent().siblings().removeClass('active');
			$(this).parent().addClass('active');
			return false;
		}).filter(':first').click();
	});
	
	$('.commercialscheme > div').each(function() {
		var commercial = $(this).children('div');
		$(this).children('ul').children('li').children('a').click(function () {
			commercial.hide();
			var target = $(this).attr('href');
			commercial.filter('.'+target).stop(true, true).fadeIn(150);
			$(this).parent().siblings().removeClass('active');
			$(this).parent().addClass('active');
			return false;
		}).filter(':first').click();
	});
	
	$('.buildphoto > div > div > div a').fancybox();
	
	$('html').click(function() {
		$('.modal').hide();
		$('body').off('wheel.modal mousewheel.modal');
	});
	$('.modal').click(function(event){
		event.stopPropagation();
	});

	$('.index .floor').each(function() {
		$(this).children('ul').find('li a').bind('click', function() {
			var target = $(this).attr('href');
			$(this).parents('.floor').children('div').hide();
			$(this).parents('.floor').children('div.'+target).fadeIn(150);
			$(this).parent().addClass('active').siblings().removeClass('active');
			return false;
		}).filter(':first').click();
	});

	var building1_floor1_paths = {
		apartment1: {
			name: 'Apartment1',
			path: 'M 181 4.7 C 174.2 5.3 161.8 7.1 160.4 7.7 C 159.3 8.1 159 11.3 159 23.5 L 159 38.8 L 125.3 39.3 C 95.6 39.6 90.7 39.9 85 41.6 L 78.5 43.5 L 78.2 64.8 L 78 86 L 75.5 86 L 73 86 L 73 68.4 L 73 50.8 L 69.4 52.9 C 65.2 55.4 64.3 55.5 63.8 53.5 C 63.5 52.1 63.2 52.2 61.1 53.6 L 58.7 55.3 L 61 56.2 L 63.3 57 L 60.4 60 C 57.9 62.5 57.3 62.7 56.4 61.4 C 55.5 60.2 55.1 60.2 54.2 61.3 C 53.4 62.3 53.4 63 54.1 63.7 C 55.8 65.4 52.2 70.9 49.9 70.3 C 47.9 69.7 47.3 71.4 49 72.5 C 50.4 73.4 47.3 79 45.4 79 C 44.3 79 44.1 79.6 44.5 80.9 C 45.4 83.9 44 87.7 41.7 88.5 C 39.8 89.1 39.7 89.3 41.3 89.7 C 43.1 90.2 43.3 91.2 42.4 94.8 C 42 96.2 41.2 96.9 40.4 96.6 C 39.5 96.3 39 96.8 39 98 C 39 99.3 39.5 99.8 40.5 99.4 C 41.6 98.9 42 99.5 42 101.9 C 42 104.3 41.6 105 40 105 C 38.9 105 38 105.6 38 106.4 C 38 107.3 38.7 107.6 40 107.3 C 41.6 106.9 42 107.3 42 109.4 L 42 112 L 57.5 112 L 73 112 L 73 105 C 73 98.2 73.1 98 75.5 98 C 78 98 78 98 78 107.5 L 78 117 L 51 117 L 24 117 L 24 145.5 L 24 174 L 69.5 174 C 114.3 174 115 174 115 172 C 115 170 115.7 170 147 170 C 174.8 170 179 170.2 179 171.5 C 179 172.7 180.6 173 187 173 C 193.4 173 195 172.7 195 171.5 C 195 170.4 196.2 170 199.5 170 L 204 170 L 204 158.5 L 204 147 L 188.5 147 L 173 147 L 173 140 C 173 134.4 173.3 133 174.5 133 C 175.7 133 176 134.3 176 138.5 L 176 144 L 190 144 L 204 144 L 204 125.5 L 204 107 L 190 107 L 176 107 L 176 115 C 176 121.4 175.7 123 174.5 123 C 173.3 123 173 121.2 173 113.2 L 173 103.5 L 188.5 103.8 L 204 104.2 L 204 96.1 L 204 88 L 190 88 C 176.7 88 176 88.1 176 90 C 176 91.1 175.3 92 174.5 92 C 173.5 92 173 90.9 173 88.5 L 173 85 L 188.5 85 L 204 85 L 204 44.5 L 204 4 L 194.3 4.2 C 188.9 4.2 182.9 4.5 181 4.7Z'
		},
		apartment2: {
			name: 'Apartment2',
			path: 'M 329 45.3 L 329 86 L 344.5 86 L 360 86 L 360 89.5 C 360 91.9 359.5 93 358.5 93 C 357.7 93 357 92.1 357 91 C 357 89.1 356.3 89 343 89 L 329 89 L 329 97.1 L 329 105.2 L 344.5 104.8 L 360 104.5 L 360 114.2 C 360 122.2 359.7 124 358.5 124 C 357.3 124 357 122.4 357 116 L 357 108 L 343 108 L 329 108 L 329 126.5 L 329 145 L 343 145 L 357 145 L 357 139.5 C 357 135.3 357.3 134 358.5 134 C 359.7 134 360 135.4 360 141 L 360 148 L 344.5 148 L 329 148 L 329 159.5 L 329 171 L 333.5 171 C 336.8 171 338 171.4 338 172.5 C 338 173.7 339.6 174 346 174 C 352.4 174 354 173.7 354 172.5 C 354 171.2 358.2 171 386 171 C 417.3 171 418 171 418 173 C 418 175 418.7 175 463.5 175 L 509 175 L 509 146.5 L 509 118 L 482 118 L 455 118 L 455 108.5 C 455 99 455 99 457.5 99 C 459.9 99 460 99.2 460 106 L 460 113 L 475.5 113 L 491 113 L 491 110.4 C 491 108.3 491.4 107.9 493 108.3 C 494.5 108.7 495 108.3 495 107 C 495 105.7 494.5 105.3 493 105.7 C 491.3 106.2 491 105.7 491 103 C 491 100.6 491.4 99.9 492.5 100.4 C 493.5 100.8 494 100.3 494 99 C 494 97.8 493.5 97.3 492.6 97.6 C 491.8 97.9 491 97.2 490.6 95.8 C 489.7 92.2 489.9 91.2 491.8 90.7 C 493.3 90.3 493.2 90.1 491.3 89.5 C 489 88.7 487.6 84.9 488.5 81.9 C 488.9 80.6 488.7 80 487.6 80 C 485.7 80 482.6 74.4 484 73.5 C 485.7 72.4 485.1 70.7 483.1 71.3 C 480.7 71.9 477.3 66.6 478.9 64.6 C 479.6 63.7 479.6 63 478.8 62.2 C 478 61.4 477.4 61.4 476.6 62.5 C 475.7 63.7 475 63.4 472.6 61 L 469.7 58 L 472 57.2 L 474.3 56.3 L 471.9 54.6 C 469.8 53.2 469.5 53.1 469.2 54.5 C 468.7 56.5 467.8 56.4 463.6 53.9 L 460 51.8 L 460 69.4 L 460 87 L 457.5 87 L 455 87 L 454.8 65.8 L 454.5 44.5 L 448 42.6 C 442.3 40.9 437.2 40.6 407.8 40.3 L 374 39.8 L 374 24.5 C 374 10.7 373.8 9.1 372.3 8.6 C 367.6 7.2 356.2 5.9 343.3 5.3 L 329 4.7 L 329 45.3Z'
		},
		apartment3: {
			name: 'Apartment3',
			path: 'M 514 175 C 514 182.3 513.8 183 512 183 C 510.4 183 510 183.7 510 186.5 C 510 189.6 509.7 190 507.5 190 C 505.2 190 505 189.7 505 185 L 505 180 L 459.5 180 L 414 180 L 414 193.5 L 414 207 L 405 207 C 399.7 207 396 206.6 396 206 C 396 205.4 399.2 205 403.5 205 L 411 205 L 411 193.6 C 411 187.4 410.7 180.8 410.4 179.1 L 409.8 176 L 385.9 176 L 362 176 L 362 190.5 L 362 205 L 373 205 C 379.7 205 384 205.4 384 206 C 384 206.6 379.4 207 372.1 207 L 360.3 207 L 359.6 210.1 C 359.3 211.8 359 217.5 359 222.6 L 359 232 L 387.5 232 L 416 232 L 416 260 L 416 288 L 463 288 L 510 288 L 510 259.5 L 510 231 L 507.5 231 L 505 231 L 505 217 L 505 203 L 507.5 203 L 510 203 L 510 214.5 L 510 226 L 512.5 226 C 514.9 226 515 226.2 515 232.6 C 515 238.4 515.2 239.1 516.5 238 C 517.4 237.3 518.3 237 518.7 237.3 C 519 237.7 520 236.5 520.9 234.7 C 521.9 232.7 523.4 231.4 524.8 231.2 C 526.4 231 527 230.4 526.6 229.4 C 525.8 227.3 527.7 223 529.5 223 C 531.2 223 531.5 221.9 530.1 220.4 C 528.8 219 530 213 531.6 213 C 532.4 213 533 212.5 533 212 C 533 211.4 532.3 211 531.4 211 C 530.2 211 530 210.3 530.5 207.7 C 530.9 206 531.6 204.3 532.1 204.2 C 533.3 203.7 533.3 201 532.1 201 C 530.6 201 530.3 192.1 531.7 191.5 C 533.4 190.9 533.3 189 531.6 189 C 529.7 189 527.6 182.9 529.1 181.9 C 529.7 181.5 529.9 180.7 529.6 180.1 C 529.2 179.5 528.4 179.2 527.9 179.6 C 526.3 180.6 523 175.7 523.5 173.2 C 524 171.3 523.8 170.9 522.2 171.4 C 521 171.8 519.6 171.2 518 169.5 C 516.7 168.1 515.3 167 514.8 167 C 514.4 167 514 170.6 514 175Z'
		},
		apartment4: {
			name: 'Apartment4',
			path: 'M 16.1 170.4 C 14.5 172.1 13 172.8 11.8 172.4 C 10.2 171.9 10 172.3 10.5 174.2 C 11 176.7 7.7 181.6 6.1 180.6 C 5.6 180.2 4.8 180.5 4.4 181.1 C 4.1 181.7 4.3 182.5 4.9 182.9 C 6.4 183.9 4.3 190 2.4 190 C 1.6 190 1 190.7 1 191.5 C 1 192.3 1.6 193 2.3 193 C 3.1 193 3.4 194.4 3.2 197.5 C 3 200 2.4 202 1.9 202 C 0.7 202 0.7 204.7 1.9 205.2 C 2.4 205.3 3.1 207 3.5 208.7 C 4 211.3 3.8 212 2.6 212 C 1.7 212 1 212.4 1 213 C 1 213.5 1.6 214 2.4 214 C 4 214 5.2 220 3.9 221.4 C 2.5 222.9 2.8 224 4.5 224 C 6.3 224 8.2 228.3 7.4 230.5 C 7 231.5 7.4 232 8.8 232 C 11 232 13 234 13.5 236.7 C 13.6 237.7 14.3 238.4 15 238.2 C 15.7 238.1 16.8 238.5 17.6 239.1 C 18.8 240.1 19 239.2 19 233.6 C 19 227.2 19.1 227 21.5 227 L 24 227 L 24 215.5 L 24 204 L 26.5 204 L 29 204 L 29 218 L 29 232 L 26.5 232 L 24 232 L 24 260.5 L 24 289 L 71 289 L 118 289 L 118 261 L 118 233 L 146.5 233 L 175 233 L 175 223.6 C 175 218.5 174.7 212.8 174.4 211.1 L 173.8 208 L 161.9 208 C 154.6 208 150 207.6 150 207 C 150 206.4 154.2 206 160.5 206 L 171 206 L 171 190.5 L 171 175 L 147 175 L 123 175 L 123 190.5 L 123 206 L 130.5 206 C 134.8 206 138 206.4 138 207 C 138 207.6 134.3 208 129 208 L 120 208 L 120 193.5 L 120 179 L 74 179 L 28 179 L 28 184 C 28 188.7 27.8 189 25.5 189 C 23.3 189 23 188.6 23 185.5 C 23 182.7 22.6 182 21 182 C 19.3 182 19.1 181.2 18.8 174.9 L 18.5 167.8 L 16.1 170.4Z'
		},
		apartment5: {
			name: 'Apartment5',
			path: 'M 259 231.5 C 259 232.7 257.2 233 248.5 233 L 238 233 L 238 243 C 238 249 237.6 253 237 253 C 236.4 253 236 249 236 243 L 236 233 L 222.5 233 L 209 233 L 209 260 L 209 287 L 222.5 287 L 236 287 L 236 275 C 236 267.7 236.4 263 237 263 C 237.6 263 238 267.4 238 274.2 C 238 280.4 238.3 286.5 238.6 287.7 C 239.2 289.9 239 290 231.6 290 C 227.2 290 224 290.4 224 291 C 224 291.6 220.8 292 216.5 292 L 209 292 L 209 328 L 209 364 L 244 364 L 279 364 L 279 366.5 L 279 369 L 244 369 L 209 369 L 209 378.5 L 209 388 L 213 388 C 215.9 388 217 388.4 217 389.5 C 217 390.3 217.7 391 218.5 391 C 219.3 391 220 390.3 220 389.5 C 220 388.4 221.2 388 224.5 388 C 227.8 388 229 388.4 229 389.5 C 229 390.3 229.7 391 230.5 391 C 231.3 391 232 390.3 232 389.5 C 232 388.4 233.1 388 236.1 388 C 239.3 388 241 388.7 243.6 391 C 245.5 392.6 246.5 394.2 245.9 394.5 C 245.2 395 245.3 395.7 246.1 396.6 C 246.9 397.6 247.6 397.7 248.5 397 C 250.4 395.4 256.5 400.7 255 402.5 C 254.1 403.5 254.4 404.1 255.9 405 C 257.3 405.7 258 405.7 258 405 C 258 403.3 259.7 403.9 262.9 406.6 L 266 409.2 L 269.2 406.8 C 271 405.5 273.6 404.5 275 404.5 C 276.9 404.5 277.4 404 277.2 402.5 C 276.9 400.1 282.5 395.3 283.5 397.1 C 284.4 398.5 287 396.2 286.4 394.6 C 285.5 392.3 292.4 388 296.9 388 C 299.9 388 301 388.4 301 389.5 C 301 390.3 301.7 391 302.5 391 C 303.3 391 304 390.3 304 389.5 C 304 388.4 305.2 388 308.5 388 C 311.8 388 313 388.4 313 389.5 C 313 390.3 313.7 391 314.5 391 C 315.3 391 316 390.3 316 389.5 C 316 388.5 317.1 388 319.5 388 L 323 388 L 323 378.5 L 323 369 L 308 369 L 293 369 L 293 366.5 L 293 364 L 308 364 L 323 364 L 323 298.5 L 323 233 L 298.5 233 C 277.4 233 274 232.8 274 231.5 C 274 230.3 272.5 230 266.5 230 C 260.5 230 259 230.3 259 231.5Z'
		},
		apartment6: {
			name: 'Apartment6',
			path: 'M 181 236 C 181 238 180.3 238 152 238 L 123 238 L 123 266 L 123 294 L 99.5 294 L 76 294 L 76 301 C 76 307.3 75.8 308 74 308 C 72.2 308 72 307.3 72 301 L 72 294 L 57 294 C 44.7 294 42 294.3 42 295.4 C 42 296.2 41.5 297 40.8 297.2 C 40.1 297.5 39.9 298.3 40.5 299.6 C 40.9 300.6 41.4 304.6 41.6 308.5 C 41.8 312.3 42.7 317.1 43.5 319.1 C 44.2 321.1 44.6 323 44.3 323.4 C 44 323.7 44.5 324.9 45.6 326.1 C 46.6 327.2 47.5 329.3 47.6 330.8 C 47.7 332.3 47.9 333.9 47.9 334.4 C 48 334.8 48.6 335 49.4 334.7 C 50.7 334.2 51.5 335.5 53.4 341.3 C 53.7 342.2 54.5 343 55.2 343 C 55.9 343 57.6 344.6 58.9 346.6 C 61 349.7 68 354 70.9 354 C 71.6 354 72 348.9 72 339 C 72 324.7 72.1 324 74 324 C 75.9 324 76 324.8 76.2 342.2 L 76.5 360.4 L 83.5 362.2 C 89.5 363.8 95.2 364.1 124.7 364.3 L 159 364.5 L 159 382.1 L 159 399.7 L 165.9 400.9 C 169.8 401.5 180.1 402 188.9 402 L 205 402 L 205 360 L 205 318 L 188.5 318 L 172 318 L 172 306.5 C 172 299.5 172.4 295 173 295 C 173.6 295 174 299 174 305 L 174 315 L 189.5 315 L 205 315 L 205 290 L 205 265 L 189.5 265 L 174 265 L 174 275.5 C 174 282 173.6 286 173 286 C 172.3 286 172 281.8 172.2 274.2 L 172.5 262.5 L 188.8 262.2 L 205 262 L 205 250 L 205 238 L 201 238 C 197.7 238 197 237.7 197 236 C 197 234.2 196.3 234 189 234 C 181.7 234 181 234.2 181 236Z'
		},
		apartment7: {
			name: 'Apartment7',
			path: 'M 335 236 C 335 237.7 334.3 238 331 238 L 327 238 L 327 250 L 327 262 L 343.3 262.2 L 359.5 262.5 L 359.8 274.2 C 360 281.8 359.7 286 359 286 C 358.4 286 358 282 358 275.5 L 358 265 L 342.5 265 L 327 265 L 327 290 L 327 315 L 342.5 315 L 358 315 L 358 305 C 358 299 358.4 295 359 295 C 359.6 295 360 299.5 360 306.5 L 360 318 L 343.5 318 L 327 318 L 327 360 L 327 402 L 343.1 402 C 351.9 402 362.2 401.5 366.1 400.9 L 373 399.7 L 373 382.1 L 373 364.5 L 407.3 364.3 C 436.8 364.1 442.5 363.8 448.5 362.2 L 455.5 360.4 L 455.8 342.2 C 456 324.8 456.1 324 458 324 C 459.9 324 460 324.7 460 339 C 460 348.9 460.4 354 461.1 354 C 464 354 471 349.7 473.1 346.6 C 474.4 344.6 476.1 343 476.8 343 C 477.5 343 478.3 342.2 478.6 341.2 C 480.5 335.5 481.3 334.2 482.6 334.7 C 483.4 335 484 334.8 484.1 334.4 C 484.1 333.9 484.3 332.3 484.4 330.8 C 484.5 329.3 485.4 327.2 486.4 326.1 C 487.5 324.9 488 323.7 487.7 323.4 C 487.4 323 487.8 321.1 488.5 319.1 C 489.3 317.1 490.2 312.3 490.4 308.5 C 490.6 304.6 491.1 300.6 491.5 299.6 C 492.1 298.3 491.9 297.5 491.2 297.2 C 490.5 297 490 296 490 294.9 C 490 293.1 489.1 293 475 293 L 460 293 L 460 300.5 C 460 307.3 459.8 308 458 308 C 456.2 308 456 307.3 456 300.5 L 456 293 L 433.5 293 L 411 293 L 411 265 L 411 237 L 382 237 C 356.9 237 353 236.8 353 235.5 C 353 234.3 351.3 234 344 234 C 335.7 234 335 234.1 335 236Z'
		}
	}

	var building1_floor2_paths = {
		apartment1: {
			name: 'Apartment1',
			path: 'M 183 4.7 C 176 5.2 162.1 7 160.5 7.6 C 159.3 8.1 159 11 159 23.6 C 159 38.9 159 39 156.8 39 C 155.5 38.9 140.3 39.1 123 39.4 C 96 39.8 90.6 40.2 85 41.8 L 78.5 43.7 L 78.2 64.8 L 78 86 L 75.5 86 L 73 86 L 73 69 C 73 51.1 72.8 50.3 68.6 53.5 C 66 55.5 64.2 55.4 63.8 53.4 C 63.5 52 63.1 52.1 61 54 C 59.4 55.3 59.1 56 60.2 55.6 C 63.1 54.7 63 57.7 60 60.5 C 57.4 63 57 63.1 56.4 61.6 C 55.9 60.4 55.4 60.2 54.4 61.1 C 53.4 61.9 53.4 62.6 54.2 64 C 55.1 65.4 54.9 66.3 53.4 68.2 C 52.4 69.5 50.7 70.4 49.7 70.2 C 47.9 69.8 47.3 71.5 49 72.5 C 50.4 73.4 47.3 79 45.4 79 C 44.3 79 44.1 79.6 44.5 80.9 C 45.4 83.9 44 87.7 41.7 88.5 C 39.8 89.1 39.7 89.3 41.3 89.7 C 43.1 90.2 43.3 91.2 42.4 94.8 C 42 96.2 41.2 96.9 40.4 96.6 C 39.5 96.3 39 96.8 39 98 C 39 99.3 39.5 99.8 40.5 99.4 C 41.6 98.9 42 99.5 42 101.9 C 42 104.3 41.6 105 40 105 C 38.9 105 38 105.6 38 106.4 C 38 107.3 38.7 107.6 40 107.3 C 41.6 106.9 42 107.3 42 109.4 L 42 112 L 57.5 112 L 73 112 L 73 105 C 73 98.2 73.1 98 75.5 98 C 78 98 78 98 78 107.5 L 78 117 L 51 117 L 24 117 L 24 145.5 L 24 174 L 69.5 174 C 114.3 174 115 174 115 172 C 115 170 115.7 170 147 170 C 174.8 170 179 170.2 179 171.5 C 179 172.7 180.6 173 187 173 C 193.4 173 195 172.7 195 171.5 C 195 170.4 196.2 170 199.5 170 L 204 170 L 204 158.5 L 204 147 L 188.5 147 L 173 147 L 173 140 C 173 134.4 173.3 133 174.5 133 C 175.7 133 176 134.3 176 138.5 L 176 144 L 190 144 L 204 144 L 204 125.5 L 204 107 L 190 107 L 176 107 L 176 115 C 176 121.4 175.7 123 174.5 123 C 173.3 123 173 121.2 173 113.2 L 173 103.5 L 188.5 103.8 L 204 104.2 L 204 96.1 L 204 88 L 190 88 C 176.7 88 176 88.1 176 90 C 176 91.1 175.3 92 174.5 92 C 173.5 92 173 90.9 173 88.5 L 173 85 L 188.5 85 L 204 85 L 204 44.5 L 204 4 L 195.8 4.2 C 191.2 4.3 185.5 4.5 183 4.7Z'
		},
		apartment2: {
			name: 'Apartment2',
			path: 'M 329 45.3 L 329 86 L 344.5 86 L 360 86 L 360 89.5 C 360 91.9 359.5 93 358.5 93 C 357.7 93 357 92.1 357 91 C 357 89.1 356.3 89 343 89 L 329 89 L 329 97.1 L 329 105.2 L 344.5 104.8 L 360 104.5 L 360 114.2 C 360 122.2 359.7 124 358.5 124 C 357.3 124 357 122.4 357 116 L 357 108 L 343 108 L 329 108 L 329 126.5 L 329 145 L 343 145 L 357 145 L 357 139.5 C 357 135.3 357.3 134 358.5 134 C 359.7 134 360 135.4 360 141 L 360 148 L 344.5 148 L 329 148 L 329 159.5 L 329 171 L 333.5 171 C 336.8 171 338 171.4 338 172.5 C 338 173.7 339.6 174 346 174 C 352.4 174 354 173.7 354 172.5 C 354 171.2 358.2 171 386 171 C 417.3 171 418 171 418 173 C 418 175 418.7 175 463.5 175 L 509 175 L 509 146.5 L 509 118 L 482 118 L 455 118 L 455 108.5 C 455 99 455 99 457.5 99 C 459.9 99 460 99.2 460 106 L 460 113 L 475.5 113 L 491 113 L 491 110.4 C 491 108.3 491.4 107.9 493 108.3 C 494.5 108.7 495 108.3 495 107 C 495 105.7 494.5 105.3 493 105.7 C 491.3 106.2 491 105.7 491 103 C 491 100.6 491.4 99.9 492.5 100.4 C 493.5 100.8 494 100.3 494 99 C 494 97.8 493.5 97.3 492.6 97.6 C 491.8 97.9 491 97.2 490.6 95.8 C 489.7 92.2 489.9 91.2 491.8 90.7 C 493.3 90.3 493.2 90.1 491.3 89.5 C 489 88.7 487.6 84.9 488.5 81.9 C 488.9 80.6 488.7 80 487.6 80 C 485.7 80 482.6 74.4 484 73.5 C 485.7 72.4 485.1 70.7 483.1 71.3 C 480.7 71.9 477.3 66.6 478.9 64.6 C 479.6 63.7 479.6 63 478.8 62.2 C 478 61.4 477.4 61.4 476.6 62.5 C 475.7 63.7 475 63.4 472.6 61 L 469.7 58 L 472 57.2 L 474.3 56.3 L 471.9 54.6 C 469.8 53.2 469.5 53.1 469.2 54.5 C 468.7 56.5 467.8 56.4 463.6 53.9 L 460 51.8 L 460 69.4 L 460 87 L 457.5 87 L 455 87 L 454.8 65.8 L 454.5 44.5 L 448 42.6 C 442.3 40.9 437.2 40.6 407.8 40.3 L 374 39.8 L 374 24.5 C 374 10.7 373.8 9.1 372.3 8.6 C 367.6 7.2 356.2 5.9 343.3 5.3 L 329 4.7 L 329 45.3Z'
		},
		apartment3: {
			name: 'Apartment3',
			path: 'M 15.7 170 C 14.3 171.1 12.4 172 11.5 172 C 10.3 172 10 172.5 10.4 173.6 C 11.2 175.6 7.9 181.2 6.3 180.6 C 4.6 179.9 3.5 181.9 4.8 183.2 C 6.2 184.6 4.3 190 2.4 190 C 1.6 190 1 190.7 1 191.5 C 1 192.3 1.5 193 2 193 C 2.6 193 3 195 3 197.5 C 3 200 2.6 202 2 202 C 1.5 202 1 202.7 1 203.5 C 1 204.3 1.4 205 1.9 205 C 2.4 205 3 206.6 3.2 208.5 C 3.5 210.9 3.2 212 2.3 212 C 1.6 212 1 212.7 1 213.5 C 1 214.3 1.6 214.7 2.4 214.4 C 3.4 214 3.9 214.9 4.2 217.5 C 4.4 219.5 4.2 221.3 3.8 221.6 C 2.5 222.4 2.9 224 4.4 224 C 5.9 224 7.4 227.1 7.5 230.2 C 7.5 231.2 8 232 8.5 232 C 10 232.2 14 236.2 13.5 237.1 C 13.1 237.7 18.3 241 19.8 241 C 20.1 241 20 237.8 19.6 234 L 19 227 L 22 227 L 25 227 L 25 215.5 C 25 204.7 25.1 204 27 204 C 28.9 204 29 204.7 29 218 L 29 232 L 26.5 232 L 24 232 L 24 260.5 L 24 289 L 50.6 289 L 77.3 289 L 76.6 292.7 C 76.3 294.8 76 299.1 76 302.2 C 76 307.3 75.8 308 74 308 C 72.2 308 72 307.3 72 301 L 72 294 L 57 294 C 44.7 294 42 294.3 42 295.4 C 42 296.2 41.5 297 40.8 297.2 C 40.1 297.5 39.9 298.3 40.5 299.6 C 40.9 300.6 41.4 304.6 41.6 308.5 C 41.8 312.3 42.7 317.1 43.5 319.1 C 44.2 321.1 44.6 323 44.3 323.4 C 44 323.7 44.5 324.9 45.6 326.1 C 46.6 327.2 47.5 329.3 47.6 330.8 C 47.7 332.3 47.9 333.9 47.9 334.4 C 48 334.8 48.6 335 49.4 334.7 C 50.7 334.2 51.5 335.5 53.4 341.2 C 53.7 342.2 54.5 343 55.2 343 C 55.9 343 57.6 344.6 58.9 346.6 C 61 349.7 68 354 70.9 354 C 71.6 354 72 348.9 72 339 C 72 324.7 72.1 324 74 324 C 75.9 324 76 324.8 76.2 342.2 L 76.5 360.4 L 83.5 362.2 C 89.5 363.8 95.2 364.1 124.7 364.3 L 159 364.5 L 159 382.1 L 159 399.7 L 165.9 400.9 C 169.8 401.5 180.1 402 188.9 402 L 205 402 L 205 359.2 L 205 316.5 L 189 316.8 L 173 317.1 L 173 311.5 C 173 307.3 173.3 306 174.5 306 C 175.6 306 176 307.1 176 309.9 L 176 313.9 L 190.5 314.2 L 205 314.5 L 205 303.5 L 205 292.5 L 190 292.8 C 175.9 293.1 175 293.2 175 295.1 C 175 296.1 174.5 297 173.9 297 C 173.3 297 173 295.6 173.2 293.8 L 173.5 290.5 L 189.2 290.5 L 204.9 290.5 L 204.9 264.2 L 204.9 238 L 201 238 C 197.7 238 197 237.7 197 236 C 197 234.2 196.3 234 189 234 C 181.7 234 181 234.2 181 236 C 181 237.9 180.3 238 160.5 238 L 140 238 L 140 227 C 140 217.9 140.3 216 141.5 216 C 142.7 216 143 217.7 143 225.5 L 143 235 L 157.5 235 L 171.9 235 L 172 205 L 172 175 L 147.5 175 C 123.7 175 123 175.1 123 177 C 123 178.6 122.3 179 120 179 L 116.9 179 L 117.2 192.2 L 117.5 205.5 L 125.3 205.8 C 136.1 206.2 135 208 124 208 L 115 208 L 115 193.5 L 115 179 L 71.5 179 L 28 179 L 28 184 C 28 188.3 27.7 189 26 189 C 24.4 189 24 188.3 24 185.5 C 24 182.7 23.6 182 22.1 182 C 19.7 182 18.8 178.6 19.6 172.6 C 20.3 167.5 19.6 167 15.7 170Z'
		},
		apartment4: {
			name: 'Apartment4',
			path: 'M 513.3 173.2 C 514.1 179.9 513.3 183 510.9 183 C 509.4 183 509 183.7 509 186.5 C 509 189.3 508.6 190 507 190 C 505.3 190 505 189.3 505 185 L 505 180 L 461.5 180 L 418 180 L 418 194 L 418 208 L 409 208 C 398 208 396.9 206.2 407.8 205.8 L 415.5 205.5 L 415.8 192.7 L 416.1 180 L 413 180 C 410.7 180 410 179.6 410 178 C 410 176.1 409.3 176 386 176 L 362 176 L 362 185.2 C 362 190.3 361.7 203.6 361.3 214.7 L 360.7 235 L 375.3 235 L 390 235 L 390 225.5 C 390 217.7 390.3 216 391.5 216 C 392.7 216 393 217.9 393 227 L 393 238 L 372.5 238 C 352.7 238 352 237.9 352 236 C 352 234.2 351.3 234 344 234 C 336.7 234 336 234.2 336 236 C 336 237.7 335.3 238 331.9 238 L 327.9 238 L 328.1 252.4 C 328.3 263.9 328.6 266.7 329.7 266.3 C 330.5 266 331 266.5 331 267.5 C 331 268.6 330.5 269 329.5 268.6 C 328.2 268.1 328 270.4 328 285.8 L 328 303.5 L 343 303.2 L 358 302.9 L 358 285.9 L 358 269 L 349 269 C 341.7 269 340 268.7 340 267.5 C 340 266.3 341.8 266 350 266 L 360 266 L 360 286 L 360 306.1 L 344.1 305.8 L 328.1 305.5 L 328 353.7 L 328 402 L 344 402 C 352.9 402 363.2 401.5 367.1 400.9 L 374 399.7 L 374 382.1 L 374 364.5 L 408.3 364.3 C 437.8 364.1 443.5 363.8 449.5 362.2 L 456.5 360.4 L 456.8 342.2 C 457 324.8 457.1 324 459 324 C 460.9 324 461 324.7 461 339 C 461 348.9 461.4 354 462.1 354 C 465 354 472 349.7 474.1 346.6 C 475.4 344.6 477.1 343 477.8 343 C 478.5 343 479.3 342.2 479.6 341.2 C 481.5 335.5 482.3 334.2 483.6 334.7 C 484.4 335 485 334.8 485.1 334.4 C 485.1 333.9 485.3 332.3 485.4 330.8 C 485.5 329.3 486.4 327.2 487.4 326.1 C 488.5 324.9 489 323.7 488.7 323.4 C 488.4 323 488.8 321.1 489.5 319.1 C 490.3 317.1 491.2 312.3 491.4 308.5 C 491.6 304.6 492.1 300.6 492.5 299.6 C 493.1 298.3 492.9 297.5 492.2 297.2 C 491.5 297 491 296.2 491 295.4 C 491 294.3 488.3 294 476 294 L 461 294 L 461 301 C 461 307.3 460.8 308 459 308 C 457.2 308 457 307.3 457 302.2 C 457 299.1 456.7 294.8 456.4 292.7 L 455.7 289 L 482.4 289 L 509 289 L 509 260.5 L 509 232 L 506.5 232 L 504 232 L 504 218 C 504 204.7 504.1 204 506 204 C 507.9 204 508 204.7 508 215.5 L 508 227 L 511 227 L 514 227 L 513.4 234 C 513 237.8 512.9 241 513.2 241 C 514.7 241 519.9 237.7 519.5 237.1 C 519 236.2 523.8 231.4 524.8 231.7 C 525.2 231.9 525.5 231.2 525.5 230.2 C 525.6 227.1 527.1 224 528.6 224 C 530.1 224 530.5 222.4 529.2 221.6 C 528.8 221.3 528.6 219.5 528.8 217.5 C 529.1 214.9 529.6 214 530.6 214.4 C 531.4 214.7 532 214.3 532 213.5 C 532 212.7 531.4 212 530.7 212 C 529.8 212 529.5 210.9 529.8 208.5 C 530 206.6 530.6 205 531.1 205 C 531.6 205 532 204.3 532 203.5 C 532 202.7 531.6 202 531 202 C 530.5 202 530 200 530 197.5 C 530 195 530.5 193 531 193 C 531.6 193 532 192.3 532 191.5 C 532 190.7 531.4 190 530.6 190 C 528.7 190 526.8 184.6 528.2 183.2 C 529.5 181.9 528.4 179.9 526.7 180.6 C 525.1 181.2 521.8 175.6 522.6 173.6 C 523 172.5 522.7 172 521.5 172 C 520.6 172 518.7 171.1 517.3 170 C 513.3 166.9 512.7 167.4 513.3 173.2Z'
		},
		apartment5: {
			name: 'Apartment5',
			path: 'M 259 231.5 C 259 232.7 257.2 233 249 233 L 239 233 L 239 243 C 239 251.2 238.7 253 237.5 253 C 236.3 253 236 251.2 236 243 L 236 233 L 222.5 233 L 209 233 L 209 260 L 209 287 L 222.5 287 L 236 287 L 236 275 C 236 265 236.3 263 237.5 263 C 238.8 263 239 265.2 239 276.5 L 239 290 L 231.5 290 C 227.2 290 224 290.4 224 291 C 224 291.6 220.8 292 216.5 292 L 209 292 L 209 328 L 209 364 L 244 364 L 279 364 L 279 366.5 L 279 369 L 244 369 L 209 369 L 209 378.5 L 209 388 L 213 388 C 215.9 388 217 388.4 217 389.5 C 217 390.3 217.7 391 218.5 391 C 219.3 391 220 390.3 220 389.5 C 220 388.4 221.2 388 224.5 388 C 227.8 388 229 388.4 229 389.5 C 229 390.3 229.7 391 230.5 391 C 231.3 391 232 390.3 232 389.5 C 232 386.8 239.7 387.6 243.4 390.7 C 245.1 392.1 246.4 393.8 246.2 394.3 C 246 394.9 246.2 396 246.5 396.8 C 246.9 397.9 247.3 398 248.5 397 C 250.6 395.2 256 399.7 255.3 402.6 C 255 404 255.4 405 256.4 405.3 C 257.3 405.7 258 405.5 258 405 C 258 403.2 260.4 404 263.1 406.6 L 265.8 409.2 L 269.2 406.7 C 271.6 404.8 273.3 404.3 275 404.7 C 277 405.2 277.2 405 276.7 403.1 C 276.3 401.5 276.9 400.4 279.1 398.7 C 280.8 397.5 283.1 396.5 284.3 396.5 C 285.8 396.5 286.4 396 286.2 394.8 C 285.8 392 292.1 388 296.8 388 C 299.9 388 301 388.4 301 389.5 C 301 390.3 301.7 391 302.5 391 C 303.3 391 304 390.3 304 389.5 C 304 388.4 305.2 388 308.5 388 C 311.8 388 313 388.4 313 389.5 C 313 390.3 313.7 391 314.5 391 C 315.3 391 316 390.3 316 389.5 C 316 388.4 317.1 388 320 388 L 324 388 L 324 378.5 L 324 369 L 308.5 369 L 293 369 L 293 366.5 L 293 364 L 308.5 364 L 324 364 L 324 298.5 L 324 233 L 299 233 C 277.4 233 274 232.8 274 231.5 C 274 230.3 272.5 230 266.5 230 C 260.5 230 259 230.3 259 231.5Z'
		}
	}

	$('.floor > div > div').each(function() {
		var cover = $(this).find('.cover');
		var w = cover.width(); 
		var h = cover.height(); 
		var src = cover.attr('src');
		cover.hide();
		
		$(this).css({'background-image': 'url('+src+')'});
		$(this).width(w);
		$(this).height(h);

		var ooo = $(this).attr('id');

		var r = Raphael(ooo, w, h), attributes = {
			fill: '#ffffff',
			opacity: '0',
			stroke: '#3899E6',
			'stroke-width': 0,
			'stroke-linejoin': 'round'
		},
		arr = new Array();
		for (var apartment in eval(ooo)) {
			var obj = r.path(eval(ooo)[apartment].path);
			obj.attr(attributes);
			arr[obj.id] = apartment;
			obj.hover(function(){
				this.stop(true, true).animate({
					fill: '#ffffff',
					opacity: '0.4'
				}, 250);
				this.attr({'cursor':'pointer'});
			}, function(){
				this.stop(true, true).animate({
					fill: attributes.fill,
					opacity: attributes.opacity
				}, 250);
				this.attr({'cursor':'default'});
			}).click(function(){
				var currentapartment = arr[this.id];
				$('#'+ooo).children('div').fadeOut(150);
				var bbox = this.getBBox();
				$('#'+ooo).find('.'+currentapartment).css({'left': (bbox.width/2)+bbox.x+'px', 'top': (bbox.height/2)+bbox.y+'px'});
				$('#'+ooo).find('.'+currentapartment).stop(true, true).fadeIn(150);
				$('#'+ooo).find('.'+currentapartment+' .close').bind('click', function() {
					$(this).parent().stop(true, true).fadeOut(150);
					return false;
				});
				return false;
			});
		}
	});	
});
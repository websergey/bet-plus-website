jQuery(document).ready(function ($) {

	// Добавление последних дат в фильтр

	function formatDate(date) {
	  var dd = date.getDate();
	  if (dd < 10) dd = '0' + dd;

	  var mm = date.getMonth() + 1;
	  if (mm < 10) mm = '0' + mm;

	  var yy = date.getFullYear() % 100;
	  if (yy < 10) yy = '0' + yy;

	  return dd + '.' + mm + '.' + yy;
	}

	var now = new Date();
	for (var i = 0; i < 7; i++) {
		var temp = now;
		temp.setDate(now.getDate() + i);
		$('.filter-date').append('<a class="filter-item-date" href="#">' + formatDate(temp) + '</a>');
	}

		// Выбор валюты для ставки в купоне

	var currency = ['fa-ruble-sign', 'fa-dollar-sign', 'fa-euro-sign'];

	$('.currency-item').click(function() {
		$(this).attr('id') == 'currency-1' ? k = 0 : k = 1;
		for (var i = 0; i < currency.length; i++) {
			for (var j = 0; j < currency.length; j++) {
				if ($('.currency-btn i:first').hasClass(currency[i]) == true) {
	 				if ($('.currency-item:eq(' + k + ') i').hasClass(currency[j]) == true) {
	 					$('.currency-btn i:first').removeClass(currency[i]).addClass(currency[j]);
						$('.summary-win-num i').removeClass(currency[i]).addClass(currency[j]);
	 					$('.currency-item:eq(' + k + ') i').removeClass(currency[j]).addClass(currency[i]);
						return;
	 				}
				}
			}
		}
	})

	// Проверка вводимого значения в поле суммы для ставки

	var v = "";
	$('#bet-sum').on('input', function () {
		$(this).val($(this).val().replace(/[^\d]/g, ''));
		temp = $(this).val() * parseFloat($('#koef-num').html());
		$('#win-num').html(temp.toFixed(2));
	});

	// Анимация меню выбора режима ставки в купоне

	$('#coupon-toggle-1').click(function() {
		if ($(this).hasClass('toggle-selected') == false) {
			$(this).addClass('toggle-selected');
			$('#coupon-toggle-2').removeClass('toggle-selected');
		}
	});
	$('#coupon-toggle-2').click(function() {
		if ($(this).hasClass('toggle-selected') == false) {
			$(this).addClass('toggle-selected');
			$('#coupon-toggle-1').removeClass('toggle-selected');
		}
	});

	// Открытие списков событий

	$('.event-head').each(function () {
		if ($(this).hasClass('event-selected-item')) {
			$(this).css('border-radius', '5px 5px 0 0');
			$(this).find('i.fa-angle-down').css('transform', 'rotate(-180deg) translateY(2px)');
			$(this).parent().children('div.event-body').show();
		}
	});

	$('.event-head').click(function(){
		var event = $(this).parent().children('div.event-body');
		var arrow = $(this).find('i.fa-angle-down');

		if (event.is(':hidden')) {
			arrow.css('transform', 'rotate(-180deg) translateY(2px)');
			$(this).addClass('event-selected-item');
			$(this).css('border-radius', '5px 5px 0 0');
		} else {
			arrow.css('transform', 'rotate(0deg) translateY(0px)');
			$(this).removeClass('event-selected-item');
			$(this).css('border-radius', '5px');
		}
	  event.slideToggle('normal');
	});

	// Открытие доп. меню событий

	$('.event-other-koefs').click(function(){
		var event = $(this).parents('tr.event-block').next('tr.event-other').eq(0);
		var content = event.find('.event-other-block');
		var arrow = $(this).find('i.fa-caret-down');
		event.toggleClass('event-other-open');
		content.toggleClass('event-other-block-open');
		arrow.toggleClass('rotate');
	});

	$('.event-other-button').click(function(){
		var event = $(this).parent().children('div.event-other-category-koefs');
		var arrow = $(this).find('i.fa-angle-down');

		if (event.is(':hidden')) {
			arrow.css('transform', 'rotate(-180deg) translateY(2px)');
			$(this).toggleClass('event-other-button-selected');
			event.slideToggle('fast');
			$(this).css('border-radius', '5px 5px 0 0');
		} else {
			arrow.css('transform', 'rotate(0deg) translateY(0px)');
			$(this).toggleClass('event-other-button-selected');
			event.slideToggle('fast');
			$(this).css('border-radius', '5px');
		}
	});

	// Установка количества доп. коэффициентов

	$('.event-other').each(function () {
		var other_koefs = $(this).find('.event-koef');
		$(this).prev().find('.event-other-koefs-num').html(other_koefs.length);
	});

	// Выбор коэффициента для ставки на событие

	/*var type_arr = [];

	for (var i = 0; $('.event-body thead tr th').length; i++) {
		type_arr.push($('.event-body thead tr th').eq(i).html());
	}*/

	var coupon_count = 0;

	$('.event-koef').on("click", function(event){
	 	var target = $(event.target);
		var targetBlock = $(this).parents().closest('tr');
		var koef = $(event.target).html();
		var name = targetBlock.find('.event-item-name').html();
		var bet = targetBlock.find('.other-grid-event').html();

		if (targetBlock.hasClass('event-block')) {
			var other = targetBlock.next().find('.event-koef-red');
		} else if (targetBlock.hasClass('event-other')) {
			name = targetBlock.prev().find('.event-item-name').html();
			bet = targetBlock.find('.other-grid-event').html();
			var other = targetBlock.prev().find('.event-koef-red');
		}

		if ('content' in document.createElement('template')) {
			var t = $('#coupon-event-template');
			t.contents().find('.coupon-event-name').html(name);
			t.contents().find('.coupon-event-koef').html(koef);
			t.contents().find('.coupon-event-bet').html(bet);
			var newcoupon = t.contents().eq(1).clone();
			newcoupon.attr('id', 'coupon-' + coupon_count);
		}

		var koefs = targetBlock.find('.event-koef-red');
		koefs = $.merge(other, koefs);

		if (koefs.length == 0) {

			target.data('coupon', newcoupon.attr('id'));
			target.toggleClass('event-koef-red');
			$('.coupon-event-container ul').append(newcoupon);
			coupon_count += 1;

		} else {

			if (target.hasClass('event-koef-red')) {
				target.toggleClass('event-koef-red');
				$('.coupon-event-container ul').find('#' + target.data('coupon')).remove();
				return;
			}

			if (targetBlock.hasClass('event-block')) {
				var other = targetBlock.next().find('.event-koef');
			} else if (targetBlock.hasClass('event-other')) {
				var other =  targetBlock.prev().find('.event-koef');
			}

			var coupons = targetBlock.find('.event-koef')
			coupons = $.merge(other, coupons);

			coupons.each(function () {
				if ($(this).data('coupon') != target.data('coupon')) {
					$('.coupon-event-container ul').find('#' + $(this).data('coupon')).remove();
					$(this).removeData('coupon');
				}
			});

			$('.coupon-event-container ul').append(newcoupon);
			target.data('coupon', newcoupon.attr('id'));
			coupon_count += 1;

			koefs.removeClass('event-koef-red');
			target.toggleClass('event-koef-red');

		};
 	});

	$('.event-other-koefs').each(function () {
		if ($(this).children('i.fa-lock').length > 0) {
			$(this).addClass('disabled');
		}
	})

	var nav = $('.filters');

	$('.page-content').scroll(function () {
		if ($(this).scrollTop() > $('#slider').height()) {
			nav.addClass("fixed-filters");
		} else {
			nav.removeClass("fixed-filters");
		}
	});

});

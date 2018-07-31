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

	// Выбор ставки для события

	$('.event-koef').on("click", function(event){
	 	var target = $(event.target);
		var targetBlock = $(this).parents().closest('tr');
		var koefs = targetBlock.find('.event-koef-red');
		if (koefs.length == 0) {
			target.toggleClass('event-koef-red');
		} else {
			if (target.hasClass('event-koef-red')) {
				target.toggleClass('event-koef-red');
				return;
			}
			koefs.removeClass('event-koef-red');
			target.toggleClass('event-koef-red');
		};
 	});

});

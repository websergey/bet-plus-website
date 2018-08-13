jQuery.fn.extend({
    unwrapInner: function(selector) {
        return this.each(function() {
            var t = this,
                c = $(t).children(selector);
            if (c.length === 1) {
                c.contents().appendTo(t);
                c.remove();
            }
        });
    }
});

$(window).on('load', function() {
  setTimeout(function() {
    $('#preloader').fadeOut('fast', function() {});
  }, 700);
});

jQuery(document).ready(function ($) {

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

	// Проверка вводимого значения в числовые поля

	$('#bet-sum').on('input', function () {
		$(this).val($(this).val().replace(/[^\d]/g, ''));
		temp = $(this).val() * parseFloat($('#koef-num').html());
		$('#win-num').html(temp.toFixed(2));
	});

	$('#balance-add').on('input', function () {
		$(this).val($(this).val().replace(/[^\d]/g, ''));
	});

	$('#balance-out').on('input', function () {
		$(this).val($(this).val().replace(/[^\d]/g, ''));
	});

	// Анимация меню выбора режима ставки в купоне

	$('#tab-toggle-1').click(function() {
		if ($(this).hasClass('toggle-selected') == false) {
			$(this).addClass('toggle-selected');
			$('#tab-toggle-2').removeClass('toggle-selected');
			$('.right-menu-form').toggle();
			$('.coupon-toggle-block').toggle();
			$('.coupon-history').toggle();
		}
	});
	$('#tab-toggle-2').click(function() {
		if ($(this).hasClass('toggle-selected') == false) {
			$(this).addClass('toggle-selected');
			$('#tab-toggle-1').removeClass('toggle-selected');
			$('.right-menu-form').toggle();
			$('.coupon-toggle-block').toggle();
			$('.coupon-history').toggle();
		}
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

  $('.user-mobile-time').click(function() {
    $('.user-mobile-dropdown').slideToggle('fast');
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

	var coupon_count = 0;

	function checkCoupons() {
		var len = $('.coupon-event-container ul li').length;
		var login = $('.coupon-login');
		if (len == 0 && login.length == 0) {
      // Если полозователь не авторизован
      /*$('.coupon-event-container').prepend('<div class="coupon-login"><a href="#reg" rel="modal:open">Зарегистрируйтесь</a> или <a href="#login" rel="modal:open">авторизуйтесь</a>, чтобы выбрать событие</div>');*/
			$('.coupon-event-container').prepend('<div class="coupon-login">Выберите событие из списка ставок</div>');
			$('#coupon-toggle-1').removeClass('toggle-selected').addClass('disabled');
			$('#coupon-toggle-2').addClass('disabled')
			$('.right-menu-form button').addClass('disabled').removeClass('btn-white-red').css('color', '#bfc7d5');
      $('#koef-num').html(parseFloat(0).toFixed(2));
			return false;
		} else {
			if (len == 1) {
				$('#coupon-toggle-1').addClass('toggle-selected');
				$('#coupon-toggle-2').removeClass('toggle-selected').addClass('disabled')
				$('.right-menu-form button').removeClass('disabled').addClass('btn-white-red').css('color', '');
			} else if (len > 1) {
				$('#coupon-toggle-1').removeClass('toggle-selected')
				$('#coupon-toggle-2').addClass('toggle-selected').removeClass('disabled');
			}
			login.remove();
		}
	}

	checkCoupons();

	$('.event-koef').on("click", function(event){
	 	var target = $(event.target);
		var targetBlock = $(this).parents().closest('tr');
		var koef = $(event.target).html();
		var koefsum = $('#koef-num');
		var winsum = $('#win-num');
		var name = targetBlock.find('.event-item-name').html();
		var bet = target.data('type');

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
		var couponsBlock = $('.coupon-event-container ul');
		koefs = $.merge(other, koefs);

		if (koefs.length == 0) {
			target.data('coupon', newcoupon.attr('id'));
			target.toggleClass('event-koef-red');
			couponsBlock.append(newcoupon);
      var couponDeleteBtn = couponsBlock.find('#' + newcoupon.attr('id')).children().eq(0);
      couponDeleteBtn.on('click', function(event) {
        var target = $(event.target);
        var coupon_del = target.parents('li');
        couponsBlock.find('#' + coupon_del.attr('id')).remove();
        $('.event-koef-red').each(function () {
          if ($(this).data('coupon') == coupon_del.attr('id')) {
            $(this).removeData('coupon');
            $(this).toggleClass('event-koef-red');
          }
        });
        koefsum.html((parseFloat(koefsum.html()) / parseFloat(coupon_del.find('.coupon-event-koef').html())).toFixed(2));
        winsum.html(($('#bet-sum').val() * koefsum.html()).toFixed(2));
        checkCoupons();
      });
      if (parseFloat(koefsum.html()) == 0) {koefsum.html('1')};
			koefsum.html((parseFloat(koefsum.html()) * parseFloat(target.html())).toFixed(2));
			winsum.html(($('#bet-sum').val() * koefsum.html()).toFixed(2));
			coupon_count += 1;
			checkCoupons();

		} else {

			if (target.hasClass('event-koef-red')) {
				target.toggleClass('event-koef-red');
				couponsBlock.find('#' + target.data('coupon')).remove();
				koefsum.html((parseFloat(koefsum.html()) / parseFloat(target.html())).toFixed(2));
				winsum.html(($('#bet-sum').val() * koefsum.html()).toFixed(2));
				checkCoupons();
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
					var coupon_del = couponsBlock.find('#' + $(this).data('coupon'));
					koefsum.html((parseFloat(koefsum.html()) / parseFloat(coupon_del.find('.coupon-event-koef').html())).toFixed(2));
					winsum.html(($('#bet-sum').val() * koefsum.html()).toFixed(2));
					coupon_del.remove();
					$(this).removeData('coupon');
				}
			});

			couponsBlock.append(newcoupon);
      var couponDeleteBtn = couponsBlock.find('#' + newcoupon.attr('id')).children().eq(0);
      couponDeleteBtn.on('click', function(event) {
        var target = $(event.target);
        var coupon_del = target.parents('li');
        couponsBlock.find('#' + coupon_del.attr('id')).remove();
        $('.event-koef-red').each(function () {
          if ($(this).data('coupon') == coupon_del.attr('id')) {
            $(this).removeData('coupon');
            $(this).toggleClass('event-koef-red');
          }
        });
        koefsum.html((parseFloat(koefsum.html()) / parseFloat(coupon_del.find('.coupon-event-koef').html())).toFixed(2));
        winsum.html(($('#bet-sum').val() * koefsum.html()).toFixed(2));
        checkCoupons();
      });

			koefsum.html((parseFloat(koefsum.html()) * parseFloat(target.html())).toFixed(2));
			winsum.html(($('#bet-sum').val() * koefsum.html()).toFixed(2));
			target.data('coupon', newcoupon.attr('id'));
			coupon_count += 1;

			koefs.removeClass('event-koef-red');
			target.toggleClass('event-koef-red');

			checkCoupons();
		 }

    checkBetsCount();
 	});

	// Отключение дополнительного меню ставок для неактивного события

	$('.event-other-koefs').each(function () {
		if ($(this).children('i.fa-lock').length > 0) {
			$(this).addClass('disabled');
		}
	})

	// Фиксированние фильтров в основном блоке

	var nav = $('.filters');

	$('.page-content').scroll(function () {
		if ($(this).scrollTop() > $('#slider').height()) {
			nav.addClass("fixed-filters");
		} else {
			nav.removeClass("fixed-filters");
		}
	});

	// Добавление последних дат в фильтр

  $('.history-event-status.status-win').each(function () {
    $(this).closest('.history-subitem-coupon').css('border', '2px solid #bdd9bc');
  });
  $('.history-event-status.status-loose').each(function () {
    $(this).closest('.history-subitem-coupon').css('border', '2px solid #ebb6b6');
  });
  $('.history-event-status.status-back').each(function () {
    $(this).closest('.history-subitem-coupon').css('border', '2px solid #e2d27a');
  });
  $('.history-event-status.status-wait').each(function () {
    $(this).closest('.history-subitem-coupon').css('border', '2px solid #d6dff2');
  });

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

	$(window).bind('resize', checkPosition);


  function checkBetsCount() {
    if ($('.coupon-event').length == 0) {
      $('#bets-count').html('Выбери события');
    } else {
      $('#bets-count').html($('.coupon-event').length);
    }
  }

	function checkPosition()
	{
    if ($(window).width() < 769) {
      if ($('.koef-type').length == 0) {
          $('.event-block .event-koef').each(function () {
            $(this).parent().prepend('<span class="koef-type">' + $(this).data('type') + '</span>');
          });
          $('.total-koef').each(function () {
            $(this).wrapInner('<div></div>')
            $(this).prepend('<span class="koef-type-total">Тотал</span>');
          });
          $('.event-block').each(function () {
            var childs = $(this).children().eq(1);
            for (var i = 2; i < 10; i++) {
              childs = $.merge(childs, $(this).children().eq(i));
            }
            childs.wrapAll('<div class="mobile-koefs"></div>');
          });
        }
      if ($('#left-toggle').length == 0) $('.site-nav').prepend('<li class="site-nav-item" id="left-toggle"><i class="fas fa-list-ul"></i></li>');
      if ($('#right-toggle').length == 0) $('.site-nav').append('<li class="site-nav-item" id="right-toggle"><i class="fas fa-user"></i></li>');
      if ($('#left-close').length == 0) $('.left-menu').prepend('<a class="closebtn" id="left-close"><i class="fas fa-angle-left"></i></a>');
      if ($('#coupon-close').length == 0) $('.right-menu').prepend('<a class="closebtn" id="coupon-close"><i class="fas fa-angle-left"></i></a>');
      if ($('#right-close').length == 0) $('.user-menu-mobile').prepend('<a class="closebtn" id="right-close"><i class="fas fa-angle-left"></i></a>');
      $('#coupon-toggle').show();
      checkBetsCount();
      $('#left-toggle').click(function () {
        $('.left-menu').addClass('menu-open')
      });
      $('#right-toggle').click(function () {
        $('.user-menu-mobile').addClass('menu-open')
      });
      $('#coupon-toggle').click(function () {
        $('.right-menu').addClass('menu-open')
      });
      $('#left-close').click(function () {
        $('.left-menu').removeClass('menu-open')
      });
      $('#right-close').click(function () {
        $('.user-menu-mobile').removeClass('menu-open')
      });
      $('#coupon-close').click(function () {
        $('.right-menu').removeClass('menu-open')
      });
    } else {
      $('.koef-type').each(function () {
        $(this).remove();
      });
      $('.koef-type-total').each(function () {
        $(this).remove();
      });
      $('.total-koef').each(function () {
        $(this).unwrapInner();
      });
      $('.mobile-koefs').each(function () {
        $('.mobile-koefs').find('td').unwrap();
      });
      $('.site-nav').children('#left-toggle').remove();
      $('.site-nav').children('#right-toggle').remove();
      $('.site-nav').children('#coupon-toggle').remove();
      $('.left-menu').removeClass('menu-open');
      $('.right-menu').removeClass('menu-open');
      $('.user-menu-mobile').removeClass('menu-open');
      $('#coupon-toggle').hide();
      $('.closebtn').remove();
    }
	}
	checkPosition();
});

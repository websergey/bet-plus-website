jQuery(document).ready(function ($) {

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

	var v = "";
	$('#bet-sum').on('input', function () {
		$(this).val($(this).val().replace(/[^\d]/g, ''));
		temp = $(this).val() * parseFloat($('#koef-num').html());
		$('#win-num').html(temp.toFixed(2));
	});

});

$(function(){
    $(window).scroll(function () {
        if ($(document).scrollTop() >= $('.pic-content-wrap').offset().top) {
            $('.suspend-search-wrap').removeClass('suspend-hide').addClass('suspend-show');
        } else {
            $('.suspend-search-wrap').removeClass('suspend-show').addClass('suspend-hide');
        }
    });
    $('.sus-triggers').hover(
	  function () { $(this).addClass("sus-triggers-hover");  },
	  function () { $(this).removeClass("sus-triggers-hover"); }
	);
    $('.suspend-trigger').hover(
	  function () {
	  	if (!$(this).hasClass("selected")) {
	  		$('.suspend-search-triggers .selected').removeClass('selected');
	  		$(this).addClass("selected");
	  	}
	  },
	  function () {
	   	$(this).removeClass("selected");
	   	if (!$('.suspend-trigger:first').hasClass('selected')){
	   		$('.suspend-trigger:first').addClass('selected');
	   	}
	  }
	);
	$('.suspend-trigger').bind('click',function(){
		var page_id = $(this).data('id');
		if ($('input[name=suspend-ys-submit]').hasClass('suspend-search-s'+page_id)) {
			return false;
		}
		$('.suspend-search-triggers').prepend($(this));
		var page_word_list = {};
		$('.suspend-trigger').each(function(){
			page_word_list[$(this).data('id')] = '搜'+$(this).text();
		});
		for (var i in page_word_list) {
			$('.suspend-search-body').removeClass('sus-body-c'+i);
			$('input[name=suspend-ys-submit]').removeClass('suspend-search-s'+i);
		}
		$('.suspend-search-body').addClass('sus-body-c'+page_id);
		$('input[name=suspend-ys-submit]').addClass('suspend-search-s'+page_id).data('id',page_id).attr('value',page_word_list[page_id]);
		$('.sus-triggers').removeClass('sus-triggers-hover');
	});
})
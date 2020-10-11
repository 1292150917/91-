$(function(){
	$('.activity-comment-replay-btn').bind('click',function(){
		if ($(this).closest('.activity-comment-content').find('.activity-comment-replay').length > 0) {
			if ($(this).text() == '回复') {
				$(this).closest('.activity-comment-content').find('.activity-comment-replay').show();
				$(this).text('取消回复');
			} else {
				$(this).closest('.activity-comment-content').find('.activity-comment-replay').hide();
				$(this).text('回复');
			}
			return false;
		}
		var replayObj = $('.activity-comment-replay-tpl').clone();
		replayObj.removeClass('activity-comment-replay-tpl').addClass('activity-comment-replay');
		$(this).closest('.comment-item').find('.activity-comment-c-p').append(replayObj);
		$(this).text('取消回复');
		replayDone(replayObj.find('.activity-comment-replay-submit'));
	});
	$('.comment-btn').bind('click',function(){
		if (no_login) {
			loginBoxShow();
			return false;
		}
		var value = $('#comment-content').val();
		var aid = $(this).data('aid');
		value = value.replace(/(^\\s+)|(\\s+$)/g,"");
		if (value.length < 4) {
			alert('必须输入至少4个汉字');
			return false;
		}
		if (urlFormat.test(value)){
			alert('评论中不能带网址链接');
			return false;
		}

		$.ajax({url:_domain+'index.php?m=activity&a=saveComment',dataType:'json',type:'post',data:{value:value,aid:aid}})
			.success(function(data){
				if (data.status == 0) {
					window.location.reload();
				} else {
					alert(data.info);
				}
			})
			.fail(function(){
				alert('发表失败');
			})
	});
	$('.support-btn').bind('click',function(){
		if (no_login) {
			loginBoxShow();
			return false;
		}
		var that = $(this);
		var cid = $(this).data('cid');
		$.ajax({url:_domain+'index.php?m=activity&a=saveSupport',dataType:'json',type:'post',data:{cid:cid}})
			.success(function(data){
				if (data.status == 0) {
					alert(data.info);
					that.closest('.activity-comment-c-t-r').find('b').text(parseInt(that.closest('.activity-comment-c-t-r').find('b').text())+1);
					that.html('<i></i>已赞');
				} else {
					alert(data.info);
				}
			})
			.fail(function(){
				alert('点赞失败');
			})
	});
});

function replayDone(obj) {
	obj.bind('click',function(){
		if (no_login) {
			loginBoxShow();
			return false;
		}
		var value = obj.closest('.activity-comment-replay').find('.comment-replay-v').val();
		value = value.replace(/(^\\s+)|(\\s+$)/g,"");
		if (value.length < 4) {
			alert('必须输入至少4个汉字');
			return false;
		}
		if (urlFormat.test(value)){
			alert('回复中不能带网址链接');
			return false;
		}
		var id = $(this).closest('.activity-comment-content').data('id');
		var aid = $(this).data('aid');

		$.ajax({url:_domain+'index.php?m=activity&a=saveReplay',dataType:'json',type:'post',data:{value:value,id : id,aid:aid}})
			.success(function(data){
				if (data.status == 0) {
					window.location.reload();
				} else {
					alert(data.info);
				}
			})
			.fail(function(){
				alert('回复失败');
			})
	});
}
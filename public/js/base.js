function loginByQQ(){
    window.open("http://www.51yuansu.com/index.php?m=login&a=thirdLogin&way=qq","","width=696, height=566, top=14, left=55");
}
function loginBoxShow(){
	$('.login-alert').show();
}
function regBoxShow(){
	$('.reg-alert').show();
}
function clipGo() {
	ZeroClipboard.setMoviePath('http://www.51yuansu.com/component/vip/js/ZeroClipboard.swf');
	var clip = new ZeroClipboard.Client();
	clip.setHandCursor(true);
	clip.setText($('#add-qun-fvip-id').val());
	clip.addEventListener( "mouseUp", function(client) {
		$("#add-qun-free-copy").text('复制成功');
	});
	clip.glue("add-qun-free-copy","add-qun-free-copy-wrap");
}
function freeVipNoAlert(){
	$.ajax({url:_domain+'index.php?m=ajax&a=addQunNoAlert',dataType:'json',type:'get'})
		.success(function(data){
			$(".add-qun-box-free").css("visibility","hidden");
		})
		.fail(function(data){

		});
}
function statistNav(type) {
	$.ajax({url:_domain+'index.php?m=statistAjax&a=nav&type='+type,dataType:'json',type:'get'})
		.success(function(data){
			
		})
		.fail(function(data){

		});
}
function stopDefault(e) { 
    if ( e && e.preventDefault ) 
        e.preventDefault(); 
    else 
        window.event.returnValue = false; 
    return false; 
}

$(function(){
	var globalSearch = {
		option : {callback : null,handleObj : $('.search-submit-btn')},
		curId : null,
		curhandle : null,
		init : function(option) {
			var that = this;
			$.extend(that.option,option);

			$(that.option.handleObj).bind('click',function(){
				that.curId = $(this).data('id');
				that.curhandle = $(this);
				that.search();
			});
			$(that.option.handleObj.closest('form').find('.search-keyword')).keydown(function(e){
				that.curId = $(this).closest('form').find('.search-submit-btn').data('id');
				that.curhandle = $(this);
				if (e.keyCode == 13) {
					stopDefault(e);
					that.search();
				}
			});
		},
		search : function() {
			var that = this;
			var _val = $(that.curhandle.closest('form').find('.search-keyword')).val();
			_val = _val.replace(/^\s+/g,"").replace(/\s+$/g,"");
			if (_val.length <= 0) {
				that.noticeShow('搜索词不能为空哦O(∩_∩)O~~');
				return false;
			}
			$.ajax({url:_domain+'index.php?m=Index&a=pinYin&k='+_val,dataType:'json',type:'get'})
				.success(function(data){
					that.ajaxCallback(data);
				})
				.fail(function(data){
					var data_s = data.responseText;
					if (data_s) {
						data_s=data_s.replace(new RegExp('<script[^>]*>[\\s\\S]*?</'+'script>','gi'),'');
						var data_obj =  JSON.parse(data_s);
						that.ajaxCallback(data_obj);
					}
				});
		},
		noticeShow : function(content){
			$(".tiny-info-wrap").css({width:'410px',marginLeft:'-205px'});
			$(".tiny-info-wrap p").text(content);
			$(".tiny-info-box").show();
			setTimeout('$(".tiny-info-box").fadeOut();',1000);
		},
		ajaxCallback : function(data) {
			var that = this;
			if (data.status == 0) {
				if (!that.option.callback) {
					if (that.curId == 1) {
						window.location.href = _domain+'search/'+data.py+'.html';
					} else if (that.curId == 2) {
						window.location.href = _domain+'bsearch/'+data.py+'.html';
					}
				} else {
					that.option.callback(data.py);
				}
			} else {
				that.noticeShow('搜索词只能为中文,英文,数字O(∩_∩)O~~');
			}
		}
	};
	var globalKeep = {
		option : {pngObj:$('.p-keep-operate'),bgObj:$('.b-keep-operate'),callback:null},
		cnt : 1,
		hashid : '',
		init : function(option) {
			var that = this;
			$.extend(that.option,option);

			$(that.option.pngObj).bind('click',function(){
				that.keep($(this),1);
			});
			$(that.option.bgObj).bind('click',function(){
				that.keep($(this),2);
			});
		},
		keep : function(curObj,type) {
			var that = this;
			if ($(curObj).hasClass('log-cl')) {
				regBoxShow();
				return false;
			}

			var _picid = $(curObj).data('id');
			if (!_picid) return false;

			if (_picid != that.hashid) {
				that.hashid = _picid;
				that.cnt = 1;
			}
			if (that.cnt > 6) {
				alert('收藏的太频繁了哦');
				return false;
			}
			that.cnt++;

			var _url = '';
			if (type == 1) {
				if ($(curObj).hasClass('p-unkeep')) {
					_url = _domain+'index.php?m=ajax&a=keep';
				} else if ($(curObj).hasClass('p-keeped')) {
					_url = _domain+'index.php?m=ajax&a=ukeep';
				}
			} else if (type == 2) {
				if ($(curObj).hasClass('b-unkeep')) {
					_url = _domain+'index.php?m=ajax&a=bkeep';
				} else if ($(curObj).hasClass('b-keeped')) {
					_url = _domain+'index.php?m=ajax&a=bukeep';
				}
			}

			$.ajax({url:_url,dataType:'json',type:'get',data:{id:_picid}})
				.success(function(data){
					that.ajaxCallback(data,curObj,type);
				})
				.fail(function(data){
					var data_s = data.responseText;
					if (data_s) {
						data_s=data_s.replace(new RegExp('<script[^>]*>[\\s\\S]*?</'+'script>','gi'),'');
						var data_obj =  JSON.parse(data_s);
						that.ajaxCallback(data_obj,curObj,type);
					}
				});
		},
		ajaxCallback : function(data,curObj,type) {
			var that = this;
			if (data.status == 0) {
				if (!that.option.callback) {
					if (type == 1) {
						if ($(curObj).hasClass('p-unkeep')) {
							$(curObj).removeClass('p-unkeep').addClass('p-keeped');
						} else if ($(curObj).hasClass('p-keeped')) {
							$(curObj).removeClass('p-keeped').addClass('p-unkeep');
						}
					} else if (type == 2) {
						if ($(curObj).hasClass('b-unkeep')) {
							$(curObj).removeClass('b-unkeep').addClass('b-keeped');
						} else if ($(curObj).hasClass('b-keeped')) {
							$(curObj).removeClass('b-keeped').addClass('b-unkeep');
						}
					}
				} else {
					that.option.callback(curObj,type);
				}
			} else {
				alert('收藏失败,程序君正在帮你排查');
			}
		}
	};
	var downVerify = {
		opt : null,
		pid : null,
		type : null,
		init : function(pid,type){
			var that = this;
			that.freshVerify();
			that.pid = pid;
			that.type = type;
			$('.down-verify').show();
			if (!that.opt) {
				that.opt = 1;
		    	$('.down-verify-fresh,.down-verify-img').bind('click',function(){
		    		that.freshVerify();
		    	});
		    	$('.down-verify-del').bind('click',function(){
		    		$('.down-verify').hide();
		    	});
		    	$('.down-verify-btn').bind('click',function(){
		    		that.verifySubmit();
		    	});
				$('input[name=down-verify-code]').keydown(function(e){
					if (e.keyCode == 13) {
						stopDefault(e);
						that.verifySubmit();
					}
				});
			}
		},
		freshVerify : function() {
	    	$('.down-verify-img').attr('src',_domain+'?m=login&a=verifycode'+'&t='+Math.random());
	    	$('input[name=down-verify-code]').val('');
		},
		verifySubmit : function() {
	    	var that = this;
			var code = $('input[name=down-verify-code]').val();
			if (!/^[a-zA-Z0-9]+$/.test(code)) {
				$('.down-verify-error').text('输入验证码错误').show();
				setTimeout("$('.down-verify-error').hide();",2000);
				that.freshVerify();
				return;
			}
			$.ajax({url:_domain+'index.php?m=ajax&a=checkcode',dataType:'json',type:'post',data:{code:code}})
				.success(function(data){
					if (data.status == 0) {	
						$('.down-verify').hide();
						that.continueDown();
					} else {
	    				$('.down-verify-error').text('输入验证码错误').show();
	    				setTimeout("$('.down-verify-error').hide();",2000);
	    				that.freshVerify();
					}
				})
				.fail(function(data){
					var data_s = data.responseText;
					if (data_s) {
						data_s=data_s.replace(new RegExp('<script[^>]*>[\\s\\S]*?</'+'script>','gi'),'');
						var data_obj =  JSON.parse(data_s);
						if (data_obj.status == 0) {
							$('.down-verify').hide();
							that.continueDown();
						} else {
		    				$('.down-verify-error').text('输入验证码错误').show();
		    				setTimeout("$('.down-verify-error').hide();",2000);
		    				that.freshVerify();
						}
					}
				});
		},
		continueDown : function() {
			var that = this;
			globalDown.downById(that.pid,that.type,null);
		}
	};
	var globalDown = {
		option : {pObj:$('.p-down-operate'),pzipObj:$('.p-down-operate-zip'),bObj:$('.b-down-operate'),bzipObj:$('.b-down-operate-zip')},
		init : function(option) {
			var that = this;
			$.extend(that.option,option);

			$(that.option.pObj).bind('click',function(){
				that.downByObj($(this),1);
			});
			$(that.option.pzipObj).bind('click',function(){
				that.downByObj($(this),2);
			});
			$(that.option.bObj).bind('click',function(){
				that.downByObj($(this),3);
			});
			$(that.option.bzipObj).bind('click',function(){
				that.downByObj($(this),4);
			});
		},
		downByObj : function (curObj,type) {
			var that = this;
			if ($(curObj).hasClass('log-cl')) {
				regBoxShow();
				return false;
			}

			var _picid = $(curObj).data('id');
			if (!_picid) {
				alert('缺少参数');
				return false;
			}
			that.downById(_picid,type,curObj);
		},
		downById : function (id,type,curObj) {
			var that = this;
			var _url = '';
			if (type == 1) {
				_url = _domain+'index.php?m=ajax&a=down';
			} else if (type == 2) {
				_url = _domain+'index.php?m=ajax&a=downPsd';
			} else if (type == 3) {
				_url = _domain+'index.php?m=ajax&a=bdown';
			} else if (type == 4) {
				_url = _domain+'index.php?m=ajax&a=bdownPsd';
			}
			$.ajax({url:_url,dataType:'json',type:'get',data:{id:id}})
				.success(function(data){
					that.ajaxCallback(data,id,type,curObj);
				})
				.fail(function(data){
					var data_s = data.responseText;
					if (data_s) {
						data_s=data_s.replace(new RegExp('<script[^>]*>[\\s\\S]*?</'+'script>','gi'),'');
						var data_obj =  JSON.parse(data_s);
						that.ajaxCallback(data_obj,id,type,curObj);
					}
				});
		},
		ajaxCallback : function (data,id,type,curObj) {
			var that = this;
			if (data.status == 0) {
				if (!data.has_aq_show) {
					$(".add-qun-box-free").css("visibility","visible");
				}
				window.location.href = data.url;
			} else if (data.status == 3) {
				$(".tiny-info-wrap").css({width:'510px',marginLeft:'-255px'});
				$(".tiny-info-wrap p").text('o(╯□╰)o您已经下载过宝宝了哦~请把机会留给其他的元素宝宝吧!');
				$(".tiny-info-box").show();
				setTimeout('$(".tiny-info-box").fadeOut();',2000);
			} else if (data.status == 2) {
				$('#normal-d-box').show();
			} else if (data.status == 1) {
				$('#vip-d-box').show();
			} else if (data.status == 4) {
				downVerify.init(id,type);
			} else if (data.status == 5) {
				$('#mass-d-box').show();
			} else if (data.status == 6) {
				$('#normal-psd-dbox').show();
			} else if (data.status == 7) {
				$('#month-d-box').show();
			}
		}
	};
	globalSearch.init();
	globalKeep.init();
	globalDown.init();

	$(".reg-alert-bg,.reg-alert-del").bind('click',function(){
		$(".reg-alert,.login-alert").hide();
	});
	$(".tiny-info-bg").bind('click',function(){
		$(".tiny-info-box").hide();
	});
	$(".normal-d-del,.normal-d-bg,.normal-d-btn").bind('click',function(){
		$(".normal-d-box").hide();
	});
	$(".add-qun-free-bg,.add-qun-del-btn").bind('click',function(){
		freeVipNoAlert();
	});

	$(window).scroll(function() {
	    if($(window).scrollTop()>100)
	        $("#right-gotop").fadeIn(100);
	    else
	        $("#right-gotop").fadeOut(100);
	});
	$("#right-gotop").click(function() {
	    $('body,html').animate({scrollTop:0},600);
	});
	$('.lazy,.show-image').bind("contextmenu", function(e){ return false; });
	$('.pt-search-table a').bind('click',function(){
		var page_id = $(this).data('id');
		var page_word_list = {1:'搜元素',2:'搜背景'};
		if ($(this).closest('li').hasClass('pt-current'+page_id)) {
			return false;
		}
		$('.pt-current'+$('.search-submit-btn').data('id')).removeClass('pt-current'+$('.search-submit-btn').data('id'));
		$(this).closest('li').addClass('pt-current'+page_id);
		$('.pt-search-box input[type=text]').removeClass('pt-search-w1').removeClass('pt-search-w2').addClass('pt-search-w'+page_id);
		$('.pt-search-box input[type=button]').removeClass('pt-search-s1').removeClass('pt-search-s2').addClass('pt-search-s'+page_id).data('id',page_id).attr('value',page_word_list[page_id]);
	});
});
$(function(){
	$('.switch-to-reg').bind('click',function(){
		$('.login-alert').hide();
		$('.reg-alert').show();
	});
	$('.switch-to-login').bind('click',function(){
		$('.reg-alert').hide();
		$('.login-alert').show();
	});
	$('.dialog-alert-del,.dialog-alert-bg').bind('click',function(){
		$('.dialog-alert').hide();
	});
	$('.find-pwd-del,.find-pwd-bg').bind('click',function(){
		$('.find-pwd-alert').hide();
	});
	$('.pwd-switch-to-login').bind('click',function(){
		$('.find-pwd-alert').hide();
		$('.login-alert').show();
	});
	$('.login-alert-fpwd').bind('click',function(){
		$('.login-alert').hide();
		$('.find-pwd-alert').show();
	});
	var loginCheck = {
		regExp : {
			email : /^\w+([-.]\w+)*@\w+([-]\w+)*\.(\w+([-]\w+)*\.)*[a-z]{2,3}$/,
			pwd : /^[a-zA-Z0-9 &!#$%()*+,-=.\/:;'"?@\[\]^_`<>{|}\\~]+$/
		},
	    msg: {
	    	msg0 : "密码长度6-20位字母、数字和标点符号",
	    	msg1 : "请输入正确的邮箱地址",
	    },
	    checkEmail : function(value) {
	    	if ('' == value) {
	    		return 0;
	    	} else {
	    		if (this.regExp.email.test(value)) {
	    			return 1;
	    		} else {
	    			return 0;
	    		}
	    	}
	    },
	    checkPwd : function(value) {
	    	if ('' == value) {
	    		return 0;
	    	} else if (value.length < 6 || value.length > 20) {
	    		return 0;
	    	} else {
	    		if (this.regExp.pwd.test(value)) {
	    			return 1;
	    		} else {
	    			return 0;
	    		}
	    	}
	    },
	    dialogBind : function (type) {
	    	var that = this;
	    	$('.dialog-btn').unbind('click');
	    	if (type == 1) {
	    		$('.dialog-btn').bind('click',function(){
	    			$('.dialog-alert').hide();
	    		});
	    	} else {
	    		$('input[name=dialog-verfiy-code]').keydown(function(e){
					if (e.keyCode == 13) {
						stopDefault(e);
						that.verifySubmit();
					}
				});
	    		$('.dialog-btn').bind('click',function(){
	    			that.verifySubmit();
	    		});
	    	}
	    },
	    showMsg : function(msg,type) {
	    	if (type == 1) {
	    		$('.ic-info-info').text(msg);
	    		$('.dialog-verify-wrap').hide();
	    		$('.dialog-content-info').show();
	    	} else {
	    		this.freshVerify();
	    		$('.dialog-content-info').hide();
	    		$('.dialog-verify-wrap').show();
	    	}
			this.dialogBind(type);
	    	$('.dialog-alert').show();
	    },
	    freshVerify : function () {
	    	$('.dialog-verify-img').attr('src',_domain+'?m=login&a=verifycode'+'&t='+Math.random());
	    	$('input[name=dialog-verfiy-code]').val('');
	    },
	    init : function () {
	    	var that = this;
	    	$('.login-email-btn').bind('click',function() {
	    		that.submit();
	    	});
	    	$('.dialog-verify-fresh,.dialog-verify-img').bind('click',function(){
	    		that.freshVerify();
	    	});
			$('input[name=login-pwd],input[name=login-email]').keydown(function(e){
				if (e.keyCode == 13) {
					stopDefault(e);
					that.submit();
				}
			});
	    },
	    submit : function () {
	    	var that = this;
    		if (that.checkEmail($('input[name=login-email]').val()) == 0) {
    			that.showMsg(that.msg.msg1,1);
    			return;
    		}
    		if (that.checkPwd($('input[name=login-pwd]').val()) == 0) {
    			that.showMsg(that.msg.msg0,1);
    			return;
    		}
    		$.ajax({url:_domain+'?m=login&a=emailLogin',dataType:'json',type:'post',data:{email:$('input[name=login-email]').val(),pwd:$('input[name=login-pwd]').val()}})
    			.success(function(data){
    				if (data.status == 0) {
    					window.location.reload();
    				} else if (data.status == 10) {
    					that.showMsg('',2);
    				} else {
    					that.showMsg(data.info,1);
    				}	
    			})
    			.fail(function(data){
					var data_s = data.responseText;
					if (data_s) {
						data_s=data_s.replace(new RegExp('<script[^>]*>[\\s\\S]*?</'+'script>','gi'),'');
						var data_obj =  JSON.parse(data_s);
	    				if (data_obj.status == 0) {
	    					window.location.reload();
	    				} else if (data_obj.status == 10) {
	    					that.showMsg('',2);
	    				} else {
	    					that.showMsg(data_obj.info,1);
	    				}
					}
    			});
	    },
	    verifySubmit : function() {
	    	var that = this;
			var code = $('input[name=dialog-verfiy-code]').val();
			if (!/^[a-zA-Z0-9]+$/.test(code)) {
				$('.dialog-error').text('输入验证码错误').show();
				setTimeout("$('.dialog-error').hide();",2000);
				that.freshVerify();
				return;
			}
    		$.ajax({url:_domain+'?m=login&a=checkcode',dataType:'json',type:'post',data:{code:code}})
    			.success(function(data){
					if (data.status == 0) {
						that.showMsg('验证成功，请继续完成后续操作',1);
					} else {
	    				$('.dialog-error').text('输入验证码错误').show();
	    				setTimeout("$('.dialog-error').hide();",2000);
						that.freshVerify();
					}
    			})
    			.fail(function(data){
					var data_s = data.responseText;
					if (data_s) {
						data_s=data_s.replace(new RegExp('<script[^>]*>[\\s\\S]*?</'+'script>','gi'),'');
						var data_obj =  JSON.parse(data_s);
						if (data_obj.status == 0) {
							that.showMsg('验证成功，请继续完成后续操作',1);
						} else {
		    				$('.dialog-error').text('输入验证码错误').show();
		    				setTimeout("$('.dialog-error').hide();",2000);
							that.freshVerify();
						}
					}
    			});
	    }
	}
	loginCheck.init();

	var findPwd = {
		regExp : {
			email : /^\w+([-.]\w+)*@\w+([-]\w+)*\.(\w+([-]\w+)*\.)*[a-z]{2,3}$/
		},
	    msg: {
	    	msg0 : "请输入正确的邮箱地址"
	    },
	    checkEmail : function(value) {
	    	if ('' == value) {
	    		return 0;
	    	} else {
	    		if (this.regExp.email.test(value)) {
	    			return 1;
	    		} else {
	    			return 0;
	    		}
	    	}
	    },
	    showMsg : function(msg,type) {
	    	if (type == 1) {
	    		$('.ic-info-info').text(msg);
	    		$('.dialog-verify-wrap').hide();
	    		$('.dialog-content-info').show();
	    	} else {
	    		this.freshVerify();
	    		$('.dialog-content-info').hide();
	    		$('.dialog-verify-wrap').show();
	    	}
			this.dialogBind(type);
	    	$('.dialog-alert').show();
	    },
	    freshVerify : function () {
	    	$('.dialog-verify-img').attr('src',_domain+'?m=login&a=verifycode'+'&t='+Math.random());
	    	$('input[name=dialog-verfiy-code]').val('');
	    },
	    dialogBind : function (type) {
	    	var that = this;
	    	$('.dialog-btn').unbind('click');
	    	if (type == 1) {
	    		$('.dialog-btn').bind('click',function(){
	    			$('.dialog-alert').hide();
	    		});
	    	} else {
	    		$('input[name=dialog-verfiy-code]').keydown(function(e){
					if (e.keyCode == 13) {
						stopDefault(e);
						that.verifySubmit();
					}
				});
	    		$('.dialog-btn').bind('click',function(){
	    			that.verifySubmit();
	    		});
	    	}
	    },
	    init : function() {
	    	var that = this;
	    	$('.find-pwd-btn').bind('click',function(){
	    		that.submit();
	    	});
	    	$('.dialog-verify-fresh,.dialog-verify-img').bind('click',function(){
	    		that.freshVerify();
	    	});
			$('input[name=find-pwd-email]').keydown(function(e){
				if (e.keyCode == 13) {
					stopDefault(e);
					that.submit();
				}
			});
	    },
	    submit : function() {
	    	var that = this;
    		if (that.checkEmail($('input[name=find-pwd-email]').val()) == 0) {
    			that.showMsg(that.msg.msg0,1);
    			return;
    		}
    		$.ajax({url:_domain+'?m=login&a=findPwd',dataType:'json',type:'post',data:{email:$('input[name=find-pwd-email]').val()}})
    			.success(function(data){
    				if (data.status == 10) {
    					that.showMsg('',2);
    				} else {
    					that.showMsg(data.info,1);
    				}	
    			})
    			.fail(function(data){
					var data_s = data.responseText;
					if (data_s) {
						data_s=data_s.replace(new RegExp('<script[^>]*>[\\s\\S]*?</'+'script>','gi'),'');
						var data_obj =  JSON.parse(data_s);
	    				if (data_obj.status == 10) {
	    					that.showMsg('',2);
	    				} else {
	    					that.showMsg(data_obj.info,1);
	    				}
					}
    			});	
	    },
	    verifySubmit : function() {
	    	var that = this;
			var code = $('input[name=dialog-verfiy-code]').val();
			if (!/^[a-zA-Z0-9]+$/.test(code)) {
				$('.dialog-error').text('输入验证码错误').show();
				setTimeout("$('.dialog-error').hide();",2000);
				that.freshVerify();
				return;
			}
    		$.ajax({url:_domain+'?m=login&a=checkcode',dataType:'json',type:'post',data:{code:code}})
    			.success(function(data){
					if (data.status == 0) {
						that.showMsg('验证成功，请继续完成后续操作',1);
					} else {
	    				$('.dialog-error').text('输入验证码错误').show();
	    				setTimeout("$('.dialog-error').hide();",2000);
						that.freshVerify();
					}
    			})
    			.fail(function(data){
					var data_s = data.responseText;
					if (data_s) {
						data_s=data_s.replace(new RegExp('<script[^>]*>[\\s\\S]*?</'+'script>','gi'),'');
						var data_obj =  JSON.parse(data_s);
						if (data_obj.status == 0) {
							that.showMsg('验证成功，请继续完成后续操作',1);
						} else {
		    				$('.dialog-error').text('输入验证码错误').show();
		    				setTimeout("$('.dialog-error').hide();",2000);
							that.freshVerify();
						}
					}
    			});
	    }
	}
	findPwd.init();
})
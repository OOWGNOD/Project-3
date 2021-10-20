
$(function() {
$('#fullpage').fullpage({
	//options here
	licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
	autoScrolling:true,
	navigation: true,
	navigationPosition: 'right',
	navigationTooltips: ['Main','About', 'Skills','Projects','Contact'],
	loopBottom: true,
	loopTop: true,
	scrollOverflow: true,
	afterLoad: function(){
		jQuery('.fp-table.active .aos-init').addClass('aos-animate');
	},
	onLeave: function(){
		jQuery('.fp-table.active .aos-init').removeClass('aos-animate');
	}
});
AOS.init();
});

$('.strip').each(function(){
var $t = $(this),
	rows = $.trim($t.html()).split('<br>');

$t.html('');

$.each(rows, function(i, val){
	$('<span class="row"></span>').appendTo($t);

	var letters = $.trim(val).split('');

	$.each(letters, function(j, v){
	v = (v == ' ') ? '&nbsp;' : v;
	$('<span>' + $.trim(v) + '</span>').appendTo($('.row:last', $t));
	});

});
});

$('body').click(function(){
for (i = 0; i < $('.strip span').length; i++) {
	(function(ind) {
	setTimeout(function(){
		$('.strip span:not(".row")').eq(ind).toggleClass('animate');
	}, ind * 15);
	})(i);
}
}).click();

$(function() {
var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
	splitLetters(words[i]);
}

function changeWord() {
	var cw = wordArray[currentWord];
	var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
	for (var i = 0; i < cw.length; i++) {
	animateLetterOut(cw, i);
	}
	
	for (var i = 0; i < nw.length; i++) {
	nw[i].className = 'letter behind';
	nw[0].parentElement.style.opacity = 1;
	animateLetterIn(nw, i);
	}
	
	currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
	setTimeout(function() {
		cw[i].className = 'letter out';
	}, i*80);
}

function animateLetterIn(nw, i) {
	setTimeout(function() {
		nw[i].className = 'letter in';
	}, 340+(i*80));
}

function splitLetters(word) {
	var content = word.innerHTML;
	word.innerHTML = '';
	var letters = [];
	for (var i = 0; i < content.length; i++) {
	var letter = document.createElement('span');
	letter.className = 'letter';
	letter.innerHTML = content.charAt(i);
	word.appendChild(letter);
	letters.push(letter);
	}
	
	wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);

});

$(function() {

var set = function(x, opts) {
	var _pt = [{
		x: 0,
		y: 0
	}, {
		x: 0,
		y: 0
	}, {
		x: 0,
		y: 0
	}];
	var rnd1 = [Math.random() + 1, Math.random() + 1, Math.random() + 1];
	var rnd2 = [0, 0, 0];
	var cnt = 0;
	var arr = [];
	var loop = null;
	var t = null;
	var _h = opts._h;
	var _w = opts._w;
	var img = opts.img;
	var mshov = false;

	x.css({
		position: "relative"
	});

	for (var i = 0; i < _h; i++) {
		var pos = -i + "px";
		x.append("<div></div>");
		x.find("div").eq(i).css({
		backgroundImage: "url(" + img + ")",
		backgroundPosition: "0px " + pos,
		height: "1px",
		width: _w + "px",
		position: "absolute",
		top: i + "px"
		});
		arr.push(x.find("div").eq(i));
	}

	if (opts.auto) {
		t = setInterval(function() {
		if (mshov) return;
		go();

		setTimeout(pause, opts.delay / 2 * Math.random());
		}, opts.delay);
	}

	x.mouseover(go);
	x.mouseout(pause);

	function go() {
		mshov = true;
		clearInterval(loop);
		loop = setInterval(run, 30);
	}

	function pause() {
		mshov = false;
		clearInterval(loop);
		loop = null;

		for (var i = 0; i < _h; i++) {
		arr[i].css({
			left: 0
		});
		}
	}

	function run() {
		var i;
		for (i = 0; i < 3; i++) {
		if (rnd1[i] >= 1) {
			--rnd1[i];
			rnd2[i] = Math.random() / 4 + 0.03;
		}
		rnd1[i] += rnd2[i];
		cnt += (38 - cnt) * 0.25;
		_pt[i].x = Math.ceil(Math.sin(rnd1[i] * Math.PI * 2) * rnd2[i] * cnt * 2);
		_pt[i].y = 0;
		}
		var num = (Math.abs(_pt[0].x) + Math.abs(_pt[1].x) + Math.abs(_pt[2].x) + 8) / 4;

		i = _h;
		while (i -= 1) {
		var _off = Math.sin(i / _h * Math.PI * (Math.random() / 8 + 1)) * 0.8 * num * num;
		arr[i].css({
			left: _off + "px "
		});
		}
	}
	};

	jQuery.fn.noisy = function(opts) {
	this.each(function() {
		opts = jQuery.extend({}, jQuery.fn.noisy.defs, opts);
		set(jQuery(this), opts);
	});
	};

	jQuery.fn.noisy.defs = {
	_h: 0,
	_w: 0,
	img: "",
	auto: true,
	delay: 4000
	};

});

$(function() {
	$("#img").noisy({
	_w: 360,
	_h: 350,
	img: '../img/emoji.gif'
	});
});

$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}	

	var accordion = new Accordion($('#accordion'), false);
});

$(function() {
	$('.cover').click(function(){
		$('.cover').css("filter","grayscale(0%)")
		$('.scrolldown-wrapper').css("opacity","1")
		$('.main-header').css("opacity","1")
		$('#fp-nav').css("opacity","1")
		$('.common-aside').css("opacity","1")
		$('.text').css("opacity","1")
		$('.clickme').css("display","none")
	});
	AOS.init();
});
$(function() {

	$(".btn_open1").click(function() { 
		$(".popup_box1").show()
		$("#mask").fadeIn(100)
		$("body").css("overflow","hidden");
	}); 
	$(".btn_close").click(function() { 
		$(".popup_box").hide()
		$("#mask").fadeOut(100)
		$("body").removeClass("overflow","scroll");
	});
		var $layerPopup = $(".popup_box1"); 
		var left = ($(window).scrollLeft() + ($(window).width() - $layerPopup.width()) / 2);
		var top = ($(window).scrollTop() + ($(window).height() - $layerPopup.height()) / 2 ); 
		$layerPopup.css({ "left": left, "top":top, "position": "absolute" }); 
		$("body").css("position", "relative").append($layerPopup);

	});

	$(function() {

	$(".btn_open2").click(function() { 
		$(".popup_box2").show()
		$("#mask").fadeIn(100)
		$("body").css("overflow","hidden");
		}); 
		$(".btn_close").click(function() { 
			$(".popup_box").hide()
			$("#mask").fadeOut(100)
			$("body").removeClass("overflow","scroll");
		});
			var $layerPopup = $(".popup_box2"); 
			var left = ($(window).scrollLeft() + ($(window).width() - $layerPopup.width()) / 2);
			var top = ($(window).scrollTop() + ($(window).height() - $layerPopup.height()) / 2 ); 
			$layerPopup.css({ "left": left, "top":top, "position": "absolute" }); 
			$("body").css("position", "relative").append($layerPopup);

			});
			$(function() {

			$(".btn_open3").click(function() { 
				$(".popup_box3").show()
				$("#mask").fadeIn(100)
				$("body").css("overflow","hidden");
				}); 
				$(".btn_close").click(function() { 
					$(".popup_box").hide()
					$("#mask").fadeOut(100)
					$("body").removeClass("overflow","scroll");
				});
					var $layerPopup = $(".popup_box3"); 
					var left = ($(window).scrollLeft() + ($(window).width() - $layerPopup.width()) / 2);
					var top = ($(window).scrollTop() + ($(window).height() - $layerPopup.height()) / 2 ); 
					$layerPopup.css({ "left": left, "top":top, "position": "absolute" }); 
					$("body").css("position", "relative").append($layerPopup);

					});


					$(function() {

					function copyToClipboard(val) {
						var t = document.createElement("textarea");
						document.body.appendChild(t);
						t.value = val;
						t.select();
						document.execCommand('copy');
						document.body.removeChild(t);
						}
					
						$('.rainbow-text').click(function() {
						  copyToClipboard('dongwoozzik@naver.com');
						  alert('주소를 복사하였습니다');
						});
					});
					



var savedParticipants = [];
var mainObj = {
	active: false,
	lastTarget: null,
	viewWidth: $(".glib-stats-data").outerWidth(),
	viewHeight: $(".glib-stats-data").outerHeight(),
	hide: function(){
		$(".extra-tooltip").remove();
		mainObj.active = false;
	},
	show: function(html, left){
		$(".glib-stats-data > .box").append(html);
		mainObj.active = true;
	}
};

function extraTooltip(){
	var clickEvent = ("ontouchend" in window ? "touchend" : "click");
	var elements = ".glib-stats-content tr.main th, .glib-stats-content tr td.col_rank, .glib-stats-content .form-bg";
	if(clickEvent == "touchend"){
		$(document).on(clickEvent, elements, function(e){
			createTooltip(e, clickEvent);
		});
		$(document).on("scroll",function(){
			mainObj.hide();
		});
	}else{
		$(document).on("mouseenter", elements, function(e){
			createTooltip(e, clickEvent);
		});
		$(document).on("mouseleave", elements, function(){
			mainObj.hide();
		});
	}
}
function createTooltip(e, clickEvent){
	var targ = $(e.target);
	if(typeof(targ.attr("data-title")) == "undefined"){
		return;
	}
	if(targ.parents(".extra-tooltip").hasClass("et-large")){
		return;
	}
	if(mainObj.active){
		mainObj.hide();
	}
	var tObj = {
		top: targ.position().top,
		left: targ.position().left,
		checkedLeft: 0,
		checkedTop: 0,
		height: targ.outerHeight(),
		text: targ.attr("data-title"),
		html: "",
		arrow: ["top", "left"],
		checkAlignH: function(left){
			if(mainObj.viewWidth-left < 224){
				return tObj.left+targ.outerWidth()-224;
			}else{
				return tObj.left;
			}
		},
		checkAlignV: function(top){
			if($(".glib-stats-data").outerHeight()-top < 110){
				this.arrow[0] = "bottom";
				return tObj.top+targ.outerHeight()-110;
			}else{
				this.arrow[0] = "top";
				return tObj.top+targ.outerHeight();
			}
		}
	};
	tObj.tTop = parseInt(tObj.height)+parseInt(tObj.top);
	tObj.checkedLeft = tObj.checkAlignH(tObj.left);
	tObj.checkedTop = tObj.checkAlignV(tObj.top);

	if($(e.target).parent("tr").hasClass("main")){
		var pos = "left: "+tObj.left+"px; ";
		if($(e.target).is(':last-child')){
			pos = "right: 0;";
			tObj.arrow[1] = "right";
		}
		tObj.html = "" +
			"<div class=\"extra-tooltip extra-tooltip--"+tObj.arrow[0]+" extra-tooltip--"+tObj.arrow[1]+" et-simple \" style=\"top: "+tObj.tTop+"px; "+pos+"\">" +
			tObj.text+
			"</div>";
	}else if($(e.target).hasClass("col_rank")){
		tObj.html = "" +
			"<div class=\"extra-tooltip extra-tooltip--"+tObj.arrow[0]+" extra-tooltip--"+tObj.arrow[1]+" et-simple\" style=\"top: "+tObj.tTop+"px; left: "+tObj.left+"px;\">" +
			tObj.text+
			"</div>";
	}else if($(e.target).parents("td").hasClass("form") || $(e.target).parents("td").hasClass("last_5")){
		tObj.arrow[1] = "right";
		var link = "";
		if(clickEvent == "touchend"){
			link = $(e.target).attr("data-href");
			link = "<a href=\""+link+"\" class=\"et-link\">Match Detail</a>";
		}else{
			$(e.target).click(function(){
				window.location.href = $(this).attr("data-href");
			});
		}

		tObj.html = "" +
			"<div class=\"extra-tooltip extra-tooltip--"+tObj.arrow[0]+" extra-tooltip--"+tObj.arrow[1]+" et-large\" style=\"top: "+tObj.checkedTop+"px; left: "+tObj.checkedLeft+"px;\">" +
			"<div class=\"et-content\">"+tObj.text+"</div>"+link+
			"</div>";
	}
	mainObj.lastTarget = $(e.target);
	mainObj.show(tObj.html, tObj.left);
}
function lhlStart(thisEl){
	if(thisEl.is("[class^='glib-participants'], [class*=' glib-participants']")){
		var cls = thisEl.attr("class").split(" ");
		for(var a = 0; cls.length > a; a++){
			var str = $.trim(cls[a]);
			if(str.indexOf("glib-participants") > -1){
				var participants = str.substr(18, str.length);
				var participantA = participants.substr(0,participants.indexOf("-"));
				var participantB = participants.substr(participants.indexOf("-")+1, participants.length);
				$(".stats-table").find(".glib-participant-"+participantA).addClass("light-highlight");
				$(".stats-table").find(".glib-participant-"+participantB).addClass("light-highlight");
				savedParticipants.push(participantA);
				savedParticipants.push(participantB);
			}
		}
	}
}
function lhlEnd(thisEl){
	if(thisEl.is("[class^='glib-participants'], [class*=' glib-participants']")){
		if(savedParticipants.length != 0){
			$(".stats-table").find(".glib-participant-"+savedParticipants[0]).removeClass("light-highlight");
			$(".stats-table").find(".glib-participant-"+savedParticipants[1]).removeClass("light-highlight");
			savedParticipants.shift();
			savedParticipants.shift();
		}
	}
}
function titlesEditing(e){
	if($(e.target).attr('data-title-edited')){
		return;
	}else{
		var title = $(e.target).attr('title');
		var dataTitle = $(e.target).attr('title');
		if (title)
		{
			// formating data title
			dataTitle = dataTitle.replace(/\[b\]/i, '<strong>');
			dataTitle = dataTitle.replace(/\[\/b\]/i, '</strong>');
			dataTitle = dataTitle.replace(/\[br\]/ig, '<br />');
			dataTitle = dataTitle.replace(/\[u\]/i, ' &raquo; ');
			dataTitle = dataTitle.replace(/\[d\]/i, ' &raquo; ');
			dataTitle = dataTitle.replace(/\n/g, "<br \/>");
			dataTitle = dataTitle.replace(/\\'/g, '\'');

			// formating title
			title = title.replace(/\[b\]/i, '');
			title = title.replace(/\[\/b\]/i, '');
			title = title.replace(/\[br\]/ig, ' ');
			title = title.replace(/\[u\]/i, '');
			title = title.replace(/\[d\]/i, '');
			title = title.replace(/\n/g, ' ');
			title = title.replace(/\\'/g, '\'');
			title = title.replace('&nbsp;', ' ');


			$(e.target).attr('data-title', dataTitle);
			$(e.target).attr('title', "");
			$(e.target).attr('data-title-edited', 'y');
		}
	}
}
function setTitles()
{
	var clickEvent = ("ontouchend" in window ? "touchend" : "click");
	if(clickEvent == "click"){
		$('.glib-stats-data').on('mouseover', ".form-bg, tr.main th", function(e){
			titlesEditing(e);
			lhlStart($(this));
		});
		$('.glib-stats-data').on('mouseout', ".form-bg, tr.main th", function(e){
			lhlEnd($(this));
		});
	}else if(clickEvent == "touchend"){
		$('.glib-stats-data').on('touchstart', ".form-bg, tr.main th", function(e){
			titlesEditing(e);
			lhlEnd($(this));
			lhlStart($(this));
		});
	}
 }


/*$(document).ready(function(){
	$('body').append("<span style=\"background-color: green;position: fixed; top:20px; left: 0;\">harry1</span>");
	$("body .glib-stats-content th").on("click", function(){
		$('body').append("<span style=\"background-color: green;position: fixed; top:0; left: 0;\">harry2</span>");
	});
});*/
/*var ie = browser_detect('ie');
var ie6 = browser_detect('ie6');
var ie7 = browser_detect('ie7');
var ie8 = browser_detect('ie8');
var ff = browser_detect('ff');
var webkit = browser_detect('webkit');

function browser_detect(type)
{
	if(type == 'ie' && navigator.userAgent.match(/MSIE/))
	return true;
	else if(type == 'ie6' && navigator.userAgent.match(/MSIE 6/))
	return true;
	else if(type == 'ie7' && navigator.userAgent.match(/MSIE 7/))
	return true;
	else if(type == 'ie8' && navigator.userAgent.match(/MSIE 8/))
	return true;
	else if(type == 'ff' && navigator.userAgent.match(/Gecko/))
	return true;
	else if(type == 'webkit' && navigator.userAgent.match(/WebKit/))
	return true;

	return false;
};

function set_attr(element, name, content)
{
	if(ie)
	{
		switch(name)
		{
			default:
				break;

			case 'class':
				element.className = content;
				break;

			case 'rowspan':
				element.rowSpan = content;
				break;

			case 'colspan':
				element.colSpan = content;
				break;
				
			case 'id':
				element.id = content;
				break;

			case 'title':
				element.title = content;
				break;

			case 'type':
				element.type = content;
				break;

			case 'name':
				element.name = content;
				break;
		}
	}
	else
		element.setAttribute(name, content);
};

function setTitles(element)
{
	if (!element)
	{
		element = document.body;
	}
	var els = $(element).find('[title]');
	els.mouseover(function(e)
	{
		var title = $(e.target).attr('title');
		if (title)
		{
			// formating
			title = title.replace(/\[b\]/i, '<strong>');
			title = title.replace(/\[\/b\]/i, '</strong>');
			title = title.replace(/\[br\]/ig, '<br />');
			title = title.replace(/\[u\]/i, ' &raquo; ');
			title = title.replace(/\[d\]/i, ' &raquo; ');
			title = title.replace(/\n/g, "<br \/>");
			title = title.replace(/\\'/g, '\'');

			$(e.target).attr('title', title);
		}
		if (this.className != 'name_fixed_1' && this.className != 'name_fixed_2')
		{
			stats_tooltip.show(this, ie8 ? e : this, $(this).hasClass('col_rank'));
		}
	});

	els.mouseout(function()
	{
		stats_tooltip.hide(this);
	});*/

		/*
		// -- render livescore
		try
		{
			if (typeof liveScore != 'undefined')
			{
				liveScore.render($(element));

			}
		} catch (e)
		{

		}
		// -- render match highlight
		if (this.eventId)
		{
			$(element).find('[xteid=' + this.eventId + ']').parent('tr').addClass('highlight');
		}

		// -- render match highlight

		if (this.teams)
		{
			for (var i = 0; i < this.teams.length; i++)
			{
				$(element).find('[xpid=' + this.teams[i] + ']').addClass('highlight');
			}
		}
	*//*
}
*/
/*function tooltip(div_input_id)
{
	this.max_width = 400;
	this.container_id = 'tooltip';
	this.is_init = false;
	this.div = null;
	this.div_width = 0;
	this.div_id = div_input_id;
	this.div_content = null;
	this.div_element = null;
	this.td_parent = null;
	this.tr_parent = null;
	this.td_parent_title = '';
	this.tr_parent_title = '';
	this.pointer = {'x':0, 'y':0};

	this.init = function()
	{
		if (this.is_init)
		{
			return;
		}

		this.resetPointerDetector();

		if (typeof this.div_id == 'undefined')
		{
			this.div_id = 'fsbody';
		}

		this.div_element = document.getElementById(this.div_id);

		if (!this.div_element)
		{
			return;
		}

		this.div = document.createElement('div');
		set_attr(this.div, 'id', this.container_id);

		this.div_content = document.createElement('span');
		this.div.appendChild(this.div_content);
		this.div_content.style.padding = '0.5rem 0.75rem';
		this.div_content.style.fontSize = '0.75rem';
		this.div_content.style.color = '#000';

		var div_lt = document.createElement('div');
		set_attr(div_lt, 'id', 'tooltip-lt');
		this.div.appendChild(div_lt);

		var div_rt = document.createElement('div');
		set_attr(div_rt, 'id', 'tooltip-rt');
		this.div.appendChild(div_rt);

		var div_lb = document.createElement('div');
		set_attr(div_lb, 'id', 'tooltip-lb');
		this.div.appendChild(div_lb);

		var div_cb = document.createElement('div');
		set_attr(div_cb, 'id', 'tooltip-cb');
		this.div.appendChild(div_cb);

		var div_rb = document.createElement('div');
		set_attr(div_rb, 'id', 'tooltip-rb');
		this.div.appendChild(div_rb);

		this.div_element.appendChild(this.div);

		this.is_init = true;
	};

	this.resetPointerDetector = function()
	{
		$(document).unbind('mousemove').bind('mousemove',function(e){
			this.pointer.x = e.pageX;
			this.pointer.y = e.pageY;
		}.bind(this));
	};

	this.show = function(elm, elm_event, opposite_direction)
	{

		if (typeof opposite_direction == 'undefined')
		{
			opposite_direction = 0;
		}

		if (!this.is_init)
		{
			return;
		}

		var title = elm.title;
		var title_length = title.length;

		if (title_length > 0)
		{
			this.div_content.innerHTML = title.replace(/\n/g, "<br \/>");
			elm.title = '';

			var span_parent = elm.parentNode;

			this.td_parent = span_parent.parentNode;
			this.td_parent_title = this.td_parent.title;
			this.td_parent.title = '';

			this.tr_parent = this.td_parent.parentNode;
			this.tr_parent_title = this.tr_parent.title;
			this.tr_parent.title = '';
			if (opposite_direction)
			{
				$(this.div).addClass("revert");
			}

			this.div.style.display = 'block';
			this.div.style.position = 'fixed';
			this.div_width = this.div.style.width = this.div.offsetWidth > this.max_width ? this.max_width : this.div.offsetWidth;
			this.div.style.width += 'px';
			this.div.style.zIndex = '999';
			this.div.style.border = "1px solid #b71c1c";
			this.div.style.background = "#fff";

			// IE6 fixes
			document.getElementById(this.container_id + '-lt').style.height = this.div.offsetHeight + 'px';
			document.getElementById(this.container_id + '-rt').style.height = this.div.offsetHeight + 'px';
			document.getElementById(this.container_id + '-cb').style.width = this.div.offsetWidth + 'px';

			this.div.style.top = (this.pointer.y + 15 - $(document).scrollTop()) + 'px';
			this.div.style.left = opposite_direction ? (this.pointer.x - $(document).scrollLeft() + 10) + 'px' : Math.max(10, this.pointer.x - this.div_width - 10 - $(document).scrollLeft()) + 'px';

			$(document).bind('mousemove',function(){
				this.div.style.top = (this.pointer.y + 15 - $(document).scrollTop()) + 'px';
				this.div.style.left = opposite_direction ? (this.pointer.x - $(document).scrollLeft() + 10) + 'px' : Math.max(10, this.pointer.x - this.div_width - 10 - $(document).scrollLeft()) + 'px';
			}.bind(this));
		}
	};

	this.hide = function(elm)
	{
		if (!this.is_init)
		{
			return;
		}

		var title = this.div_content.innerHTML.replace(/<br( \/){0,1}>/gi, "\n");
		if (title.length > 0)
		{
			if (elm.title == '')
			{
				elm.title = title;
			}

			this.div.style.display = 'none';
			this.div.style.width = 'auto';
			this.div_content.innerHTML = '';
			$(this.div).removeClass("revert");
			this.resetPointerDetector();

			if (this.td_parent.title == '')
			{
				this.td_parent.title = this.td_parent_title;
			}
			if (this.tr_parent.title == '')
			{
				this.tr_parent.title = this.tr_parent_title;
			}
		}
	};

	this.hide_all = function()
	{
		if (!this.is_init)
		{
			return;
		}

		this.div.style.display = 'none';
		$(this.div).removeClass("revert");
		this.resetPointerDetector();
	};
	this.init();
};
*/
/*
// TOOLTIP Z OP, KTERY FUNGUJE V IE8
function tooltip_ie8(div_input_id)
{
	var max_width = 300;
	var container_id = 'tooltip';
	var is_init = false;
	var div = null;
	var div_id = div_input_id;
	var div_content = null;
	var td_parent = null;
	var tr_parent = null;
	var td_parent_title = '';
	var tr_parent_title = '';

	function init()
	{
		if (is_init)
		{
			return;
		}

		var div_element = null;
		if (typeof div_id == 'undefined')
		{
			div_id = 'fsbody';
		}

		div_element = document.getElementById(div_id);

		if (!div_element)
		{
			return;
		}

		div = document.createElement('div');
		if (!div.setAttribute('id', container_id))
		{
			div.id = container_id;
		}

		div_content = document.createElement('span');
		div.appendChild(div_content);

		var div_lt = document.createElement('div');
		if (!div_lt.setAttribute('id', 'tooltip-lt'))
		{
			div_lt.id = 'tooltip-lt';
		}
		div.appendChild(div_lt);

		var div_rt = document.createElement('div');
		if (!div_rt.setAttribute('id', 'tooltip-rt'))
		{
			div_rt.id = 'tooltip-rt';
		}
		div.appendChild(div_rt);

		var div_lb = document.createElement('div');
		if (!div_lb.setAttribute('id', 'tooltip-lb'))
		{
			div_lb.id = 'tooltip-lb';
		}
		div.appendChild(div_lb);

		var div_cb = document.createElement('div');
		if (!div_cb.setAttribute('id', 'tooltip-cb'))
		{
			div_cb.id = 'tooltip-cb';
		}
		div.appendChild(div_cb);

		var div_rb = document.createElement('div');
		if (!div_rb.setAttribute('id', 'tooltip-rb'))
		{
			div_rb.id = 'tooltip-rb';
		}
		div.appendChild(div_rb);

		div_element.appendChild(div);

		is_init = true;
	}

	this.show = function(elm, elm_event, opposite_direction)
	{
		if (!is_init)
		{
			return;
		}

		if (typeof opposite_direction == 'undefined')
		{
			opposite_direction = 0;
		}
		
		if (opposite_direction)
		{
			if (!div.setAttribute('className', 'revert'))
			{
				div.className = 'revert';
			}
		}
		
		var title = elm.title;
		var title_length = title.length;

		if (title_length > 0)
		{
			var x = parseInt(elm_event.clientX);
			var y = parseInt(elm_event.clientY);

			if (typeof window.pageYOffset != 'undefined')
			{
				var window_top = window.pageYOffset;
				var window_left = window.pageXOffset;
			}
			else
			{
				var window_top = document.documentElement.scrollTop;
				var window_left = document.documentElement.scrollLeft;
			}

			div_content.innerHTML = title.replace(/\n/g, "<br \/>");
			elm.title = '';

			var span_parent = elm.parentNode;

			td_parent = span_parent.parentNode;
			td_parent_title = td_parent.title;
			td_parent.title = '';

			tr_parent = td_parent.parentNode;
			tr_parent_title = tr_parent.title;
			tr_parent.title = '';

			div.style.display = 'block';
			div.style.width = div.offsetWidth + 'px';

			// IE6 fixes
			document.getElementById(container_id + '-lt').style.height = div.offsetHeight + 'px';
			document.getElementById(container_id + '-rt').style.height = div.offsetHeight + 'px';
			document.getElementById(container_id + '-cb').style.width = div.offsetWidth + 'px';

			var div_width = div.offsetWidth;
			if (div_width > max_width)
			{
				div_width = max_width;
				div.style.width = max_width + 'px';
			}

			div.style.zIndex = '999';
			div.style.left = opposite_direction ? (x + 10 + window_left) + 'px' : Math.max(10, x - div_width - 10 + window_left) + 'px';
			div.style.top = (y + 10 + window_top) + 'px';

			div.focus();
		}
	};

	this.hide = function(elm)
	{
		if (!is_init)
		{
			return;
		}

		var title = div_content.innerHTML.replace(/<br( \/){0,1}>/gi, "\n");
		if (title.length > 0)
		{
			if (elm.title == '')
			{
				elm.title = title;
			}

			div.style.display = 'none';
			div.style.width = 'auto';
			div.className = '';

			if (td_parent.title == '')
			{
				td_parent.title = td_parent_title;
			}
			if (tr_parent.title == '')
			{
				tr_parent.title = tr_parent_title;
			}
		}
	};

	this.hide_all = function()
	{
		if (!is_init)
		{
			return;
		}

		div.style.display = 'none';
		div.className = '';
	};

	init();
}
;
*/

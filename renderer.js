// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var remote = require('electron').remote;     

$(document).on('click', 'span', function(){
	if ( $(this).attr('id') == 'close' ) {
		remote.getCurrentWindow().close();
	} 
	if ( $(this).attr('id') == 'minimize' ) {
		remote.getCurrentWindow().minimize();
	}
});

$(document).on('click', 'span.delete-item', function(){ 
		$(this).parent().animate({marginLeft:"-500px"}, 300, "linear", function(){
			$(this).animate({marginTop: -($(this).outerHeight()) }, 500, "linear", function(){
				$(this).hide();
				localStorage.removeItem( $(this).find("span").first().data("timestamp") );
			});
		});
}); 

$(document).on('keydown', 'input[type=text]',function(e) {
	var note, important = 0;
	if ( e.which == 13 && (note = $(this).val()) ) {
		var timestamp = $.now();

		if ( note.match("^:!") ) {
			note = (note.split(":!"))[1];
			important = 1;
		} 
		var note_data = JSON.stringify([important, note]);

		localStorage.setItem(timestamp, note_data);

		if ( !$('div.box').length ) {
			$('div.container').after(renderNote(timestamp, note_data));
		} else {
			$('div.box').last().after(renderNote(timestamp, note_data));
		}

		$(this).val("");
		e.preventDefault();
	}
});

function GetTodayDate() {
	var tdate = new Date();
	var dd = tdate.getDate();
	var MM = tdate.getMonth();
	var yyyy = tdate.getFullYear();
	var hrs = tdate.getHours();
	var mins = tdate.getMinutes();
	var xxx = dd + "-" +( MM+1) + "-" + yyyy + " " + hrs + ":" + mins;

	return xxx;
}

$(window).on('scroll', function(event) {
	if ( $(document).scrollTop() > 0 ) {
		$('#panel').css({ borderBottom:'2px solid #304057' });
	} else {
		$('#panel').css({ borderBottom:0 });
	}
});

function renderNote(key, value) {
	options = JSON.parse(value);
	return '<div class="box '+ (options[0] ? 'important' : '') +'"><span class="date" data-timestamp="' + key + '">' + GetTodayDate(key) + '</span>' + options[1] + '<span class="delete-item">delete</span></div>';
}

function getNotes() {
	if ( localStorage.length ) {
		var note;
		$.each(localStorage, function(key, value){
			note = renderNote(key, value);
			if ( $('div.box').length ) {
				$('div.box').last().after(note);
			} else {
				$('div.container').after(note);
			}
		});
	}
}

$(function(){
	getNotes();
});


// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var remote = require('electron').remote;     

$('span').click(function(){
	if ( $(this).attr('id') == 'close' ) {
		remote.getCurrentWindow().close()
	} 
	if ( $(this).attr('id') == 'minimize' ) {
		remote.getCurrentWindow().minimize()
	}
})

$('input[type=text]').on('keydown', function(e) {
	if ( e.which == 13 && $(this).val() ) {
		var date = GetTodayDate()
		var newval = $('<div />').html($(this).val()).html()
		var newitem = '<span class="date">' + date + '</span><div class="box">' + newval + '</div>'

		localStorage.setItem(date, newitem)

		$('div.box').last().after(newitem)
		$(this).val("")
		e.preventDefault()
	}
})

function GetTodayDate() {
   var tdate = new Date()
   var dd = tdate.getDate() //yields day
   var MM = tdate.getMonth() //yields month
   var yyyy = tdate.getFullYear() //yields year
   var hrs = tdate.getHours() //yields year
   var mins = tdate.getMinutes() //yields year
   var xxx = dd + "-" +( MM+1) + "-" + yyyy + " " + hrs + ":" + mins

   return xxx;
}

$(window).scroll(function(event) {
    if ( $(document).scrollTop() > 0 ) {
    	$('#panel').css({ borderBottom:'2px solid #304057' })
    } else {
    	$('#panel').css({ borderBottom:0 })
    }
})

function getNotes() {
	if ( localStorage.length ) {
		$.each(localStorage, function(key, value){
			$('body').append(localStorage.getItem(key))
		})
	}
}

$(function(){
	getNotes()
})

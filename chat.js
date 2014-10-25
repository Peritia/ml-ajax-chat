	var chat = null;
	var name = "";
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
	}
	
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			console.log('in post:' , c);
			if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
		}
		console.log('post for');
		return "";
	}
		
		function login_submit() {
			name = $("#name-input").val();
			if(name == "") {
				$("#name-input").css('border-color', 'red');
				return;
			}
			name = name.replace(/(<([^>]+)>)/ig,"");
			
			setCookie("chat_2_name", name);
			$("#login-box").css('display','none');
			init_chat();
		}
        
		function logout() {
			document.cookie = "chat_2_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
			location.reload();
		}
		
		function init_chat() {
			
			// display name on page
			$("#name-span").html(name);
			
			// kick off chat
			chat =  new Chat();
			chat.update();
			chat.getState(); 
			setInterval
			
			setInterval('chat.update()', 3000);
			 // watch textarea for release of key press
			 $('#sendie').keyup(function(e) {	
								 
				  if (e.keyCode == 13) { 
				  
					var text = $(this).val();
					
					
					
					chat.send(text, name);	
					$(this).val("");
	
					
					
				  }
			 });
	}
			
		
		
		$(document).ready(function() {
			$("#login-form").submit(function (e) {
				e.preventDefault();
				login_submit();
			});
			
			
			name = getCookie("chat_2_name");
			console.log("Name: '" + name + "'");
			if(name == ""){
				$("#login-box").css('display','block');

			}
			else {
				init_chat();
			}
		});


/* 
Created by: Kenrick Beckett

Name: Chat Engine
*/

var instanse = false;
var state = 0;
var mes;
var file;

function Chat () {
    this.update = updateChat;
    this.send = sendChat;
	this.getState = getStateOfChat;
}

//gets the state of the chat
function getStateOfChat(){
	if(!instanse){
		 instanse = true;
		 $.ajax({
			   type: "POST",
			   url: "process.php",
			   data: {  
			   			'function': 'getState',
						'file': file
						},
			   dataType: "json",
			
			   success: function(data){
				   state = data.state;
				   instanse = false;
			   },
			});
	}	 
}

//Updates the chat
function updateChat(){
	 if(!instanse){
		 instanse = true;
	     $.ajax({
			   type: "POST",
			   url: "process.php",
			   data: {  
			   			'function': 'update',
						'state': state,
						'file': file
						},
			   dataType: "json",
			   success: function(data){
					var cid = 0;
				   if(data.text){
						for (cid = 0; cid < data.text.length; cid++) {
                            $('#chat-area').append($("<p>"+ data.text[cid] +"</p>"));
                        }								  
				   }
				   if(cid > 0) {
						document.getElementById('chat-area').scrollTop = document.getElementById('chat-area').scrollHeight;
				   }
				   
				   instanse = false;
				   state = data.state;
			   },
			});
	 }
	 else {
		 setTimeout(updateChat, 1500);
	 }
}

//send the message
function sendChat(message, nickname)
{       
    updateChat();
     $.ajax({
		   type: "POST",
		   url: "process.php",
		   data: {  
		   			'function': 'send',
					'message': message,
					'nickname': nickname,
					'file': file
				 },
		   dataType: "json",
		   success: function(data){
			   updateChat();
		   },
		});
}

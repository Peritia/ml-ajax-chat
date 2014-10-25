<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    
    <title>Chat</title>
    
    <link rel="stylesheet" href="style.css" type="text/css" />
    
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script type="text/javascript" src="chat.js?v=2"></script>

</head>

<body>
<div id="login-box">
	<h1>Chat</h1>
	<form id="login-form">
	<label for="name-input">Full Name:</label><input type="text" name="name-input" id="name-input" autofocus />
	<input type="submit" value="Login" id="login" />
	</form>
</div>
    <div id="page-wrap">
    <div id="chat-left">
        <h2>Chat - <?php
$dirname =  stripslashes(basename(__DIR__));
$dirname = str_replace("_", " ", $dirname);
$dirname = ucwords($dirname);
echo $dirname;
		?></h2>
        
        <p id="name-area"><span id="name-span"></span> (<a href="javascript:logout();">Logout</a>)</p>
        
        <form id="send-message-area">
            <p>Your message: </p>
            <textarea id="sendie" ></textarea>
        </form>
	</div>
        <div id="chat-wrap"><div id="chat-area"></div></div>
        

    <p></p>
	
    </div>

</body>

</html>
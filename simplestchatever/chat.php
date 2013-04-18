
<?php 
include_once 'dbconnect.php';
$mysqli = $_SESSION["connection"];
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>HeyPano - Simplest Chat Ever</title>
  <meta name="description" content="Simplest Chat Ever">
  <meta name="author" content="Pano">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,600,300,400' rel='stylesheet' type='text/css'>
  <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
  <style>
  html,body{
    height:100%;
    max-height:100%;
    overflow:hidden;
  }
  body, input{
    font-family: 'Open Sans', sans-serif;
    font-size: 120%;
    width:auto;
    padding:10px;
    max-width:100%;
    /*line-height: 150%;
    font-size: 120%;*/
  }
  
  input[type="text"]{
    border: 1px solid rgb(150,150,150);
    -moz-border-radius: 5px;
    border-radius: 5px;
    margin-right:20px;
  }
  h1,h2,h3,h4,h5{
    font-weight:300;
    margin-top:0px;
    margin-bottom:0px;
  }
  
  h6{
    font-weight:300;
    margin-top:0px;
    margin-bottom:10px;
  }
  #message{
    width: 50%;
  }
  #name{
    width: 10%;
  }
  #chat{
    height: 60%;
    overflow: auto;
    max-width:100%;
    overflow-x:hidden;
    margin-bottom: 30px;
  }
  </style>
  <script>
  var scrolling = false;
  
  $(document).ready(function(){
      //When user presses enter
      $("#message").change(function(){
        name = jQuery('#name').val();
        message = jQuery('#message').val();
        jQuery('#message').val('');
        $.ajax({
            url: "insert.php",
            data: {name: name, message:message},
            type: "post",
            success: function(data) {
              refreshChat();
            }
        });
      });
      //Pull data      
      refreshChat();
      //Refresh the chat every one second
      var refreshTimer = setInterval(refreshChat,3000);
      

      
    });
    
    function refreshChat(){
        //Force scroll to bottom 
        $.get('get.php', function(data) {
          oldLength = $('#chat').html().length;
          chatData = JSON.parse(data);
          //empty the chat
          //TODO: Optimize this, obvi
          $('#chat').html('');
          //Refill it
          $(chatData).each(function(ind,obj){
            $('#chat').append(prettifyMessage(obj));
          });
          newLength = $('#chat').html().length;
          //Force scrollbar at the bottom 
          if(newLength != oldLength)$("#chat").scrollTop($("#chat")[0].scrollHeight);
        });
    }
    
    function prettifyMessage(messageObject){
      if($.trim(messageObject.name)=='')messageObject.name= 'Anonymous';
      return messageObject.date+' - '+messageObject.name+': '+messageObject.message+'<br>';
    }
    
  </script>
  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>
<body>
<h2>HeyPano public chat</h2>
<h6>Everything you're typing will remain on the website, so be careful</h6>
<div id="chat"></div>
<label>Name: </label>
<input type="text" id="name" autofocus/>
<label>Message: </label>
<input type="text" id="message"/>
</body>
</html>
<?php

$mysqli->close();

?>
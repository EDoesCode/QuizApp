<?php
// the message
$msg = "First line of text\nSecond line of text";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

// send email
mail("fuller.mark.e@gmail.com","Test email from PHP",$msg);
echo "<h1>Email sent to fuller.mark.e@gmail.com</h1>";
?>

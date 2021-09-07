<?php
// ** Form validation code **
// We will use the $_POST "super global" associative array to extract the values of the form fields
// #1 - was the submit button pressed?
$to = "ajr6974@rit.edu"; // !!! REPLACE WITH YOUR EMAIL !!!

$name = sanitize_string($_POST["name"]);

$from = sanitize_string($_POST["email"]);

$subject = empty(trim($_POST["subject"])) ?  "Question About Portfolio" : sanitize_string($_POST["subject"]);

$message = sanitize_string($_POST["message"]);

$message = "From " . $name . "\n\n" . $message;

$headers = "From: $from" . "\r\n";

$sent = mail($to, $subject, $message, $headers);

// #9 - this handy helper function is very necessary whenever
// we are going to put user input onto a web page or a database
// For example, if the user entered a <script> tag, and we added that <script> tag to our HTML page
// they could perform an XSS attack (Cross-site scripting)
function sanitize_string($string)
{
    $string = trim($string);
    $string = strip_tags($string);
    return $string;
}

<?php
require("./third-party/sendgrid-php/sendgrid-php.php");
// JUST A SAMPLE FOR MAIL TESTING!

$email = new \SendGrid\Mail\Mail();
$email->setFrom("webmaster.matcha@gmail.com", "Webmaster");
$email->setSubject("Notifications testing v2.0");
$email->addTo("maksym.bil@gmail.com", "User");
$email->addContent("text/plain", "Just a sample piece of plain text. Nothing special!");

$sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));

try {
    $response = $sendgrid->send($email);
    print $response->statusCode() . "\n";
    print_r($response->headers());
    print $response->body() . "\n";
} catch (Exception $e) {
    echo 'Caught exception: '. $e->getMessage() ."\n";
}
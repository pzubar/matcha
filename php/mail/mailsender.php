<?php
require("../third-party/sendgrid-php/sendgrid-php.php");

function mailSend($address, $content) {
    $email = new \SendGrid\Mail\Mail();

    $email->setFrom("webmaster.matcha@gmail.com", "Webmaster");
    $email->setSubject($content["title"]);
    $email->addTo($address, "User");
    $email->addContent("text/plain", $content["msg"]);

    $sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));

    try {
        $response = $sendgrid->send($email);
        print $response->statusCode() . "\n";
        print_r($response->headers());
        print $response->body() . "\n";
    } catch (Exception $e) {
        echo 'Caught exception: ' . $e->getMessage() . "\n";
    }
}


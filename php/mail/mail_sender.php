<?php
require("../third-party/sendgrid-php/sendgrid-php.php");

function mailSend($address, $content) {
    $email = new \SendGrid\Mail\Mail();

    $email->setFrom("webmaster.matcha@gmail.com", "Matcha");
    $email->setSubject($content["title"]);
    $email->addTo($address, "User");
    $email->addContent("text/html", $content["msg"]);

    $sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));

    try {
        $response = $sendgrid->send($email);
        $response->headers();
    } catch (Exception $e) {
        echo 'Caught exception: ' . $e->getMessage() . "\n";
    }
}


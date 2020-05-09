<?php

function getIdTimeLock($str) {
    $firstPcnt = strpos($str, "%");
    $userId = base64_decode(substr($str, 0, $firstPcnt));
    $str = rawurldecode(substr($str, $firstPcnt + 1));

    $lastPcnt = strrpos($str, "%");
    $sent = base64_decode(substr($str, $lastPcnt));

    $lock = substr($str, 0, $lastPcnt);

    return [
        "userId" => $userId,
        "lock" => $lock,
        "sent" => $sent,
    ];
}

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

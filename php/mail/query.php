<?php
include "./mail_utilities.php";
include './templates.php';
include_once '../general_utilities.php';

/*
 * POST requests are used for sending emails &
 * GET requests are used for a forgotten password recovery
 * or for a new account confirmation
 */

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    $userId = $data["userId"];
    $event = $data["event"];

    if (empty($userId)) {
        error(5.00, 'no user id in post request');
        exit();
    } else {
        $userData = getUserData($userId);
    }

    function mailDispatcher($userId, $event, $userData) {
        switch ($event) {
            case "like":
                $msgDetails = likeTemplate($userData["login"]);
                break;
            case "check":
                $msgDetails = checkTemplate($userData["login"]);
                break;
            case "message":
                $msgDetails = newMessageTemplate($userData["login"]);
                break;
            case "mutual":
                $msgDetails = mutualTemplate($userData["login"]);
                break;
            case "dislike":
                $msgDetails = dislikeTemplate($userData["login"]);
                break;
            case "forgotten":
                $msgDetails = sendPasswordTemplate($userId, $userData);
                break;
            case "signup":
                $msgDetails = signupTemplate($userId, $userData);
                break;
            default:
                error(5.02, 'no event in post request');
                $msgDetails = false;
        }
        return $msgDetails;  //$msgDetails = [ "title" => "Some title", "msg" => "Some text"];
    }

    $content = mailDispatcher($userId, $event, $userData);
    if ($content != false) {
        include "./mail_sender.php";
        mailSend($userData["address"], $content);
    }
} // A decryption starts here by GET request:
elseif ($_SERVER["REQUEST_METHOD"] == "GET"){
    if ( !empty($_REQUEST ["verify"])){
        $target = ($_GET["verify"]);
        $event = "Signup";
    } elseif ( !empty($_REQUEST ["recover"])) {
        $target = ($_GET["recover"]);
        $event = "Forgotten";
    } else {
        header("HTTP/1.1 422 Unprocessable Entity."); // Send when a request contains no expected input
    }

    $idTimeLock = getIdTimeLock($target);
    $expirationPeriod  = 600; // 10 minutes. Here it is possible to choose any 'life time' for links

    if ((time() - $idTimeLock["sent"]) <= $expirationPeriod) {
        $userData = getUserData($idTimeLock["userId"]);
        handleLink($event, $idTimeLock["userId"], $userData, $idTimeLock);
    } else {
        header("HTTP/1.1 403 Forbidden."); // This link has expired, user needs to request a new link
    }
} else {
    exit();
}

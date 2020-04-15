<?php
include "./utilities.php";
include './templates.php';

/*
 * POST requests are used for sending emails &
 * GET requests are used for a forgotten password recovery
 * or for a new account confirmation
 */

if ($_SERVER["REQUEST_METHOD"] == "POST" && $_REQUEST ["event"] == 1) {

    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    $userid = ($data["userid"]);
    $event = ($data["event"]);
    $data = ($data["data"]);

    if (empty($userid)) {
        error(5.00, 'no user id');
        exit();
    } else {
        $userData = getUserData($userid);
    }

    function mailDispatcher($userid, $event, $userData) {
        switch ($event) {
            case "Like":
                $msgDetails = likeTemplate($userData["login"]);
                break;
            case "Check":
                $msgDetails = checkTemplate($userData["login"]);
                break;
            case "Message":
                $msgDetails = newMessageTemplate($userData["login"]);
                break;
            case "Mutual":
                $msgDetails = mutualTemplate($userData["login"]);
                break;
            case "Dislike":
                $msgDetails = dislikeTemplate($userData["login"]);
                break;
            case "Forgotten":
                $msgDetails = sendPasswordTemplate($userid, $userData);
                break;
            case "Signup":
                $msgDetails = signupTemplate($userid, $userData);
                break;
            default:
                error(5.02, 'no event in request');
                $msgDetails = false;
        }
        return $msgDetails;  //$msgDetails = [ "title" => "Some title", "msg" => "Some text"];
    }

    $content = mailDispatcher($userid, $event, $userData);
    if ($content != false) {
        include "./mailsender.php";
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
        $userData = getUserData($idTimeLock["userid"]);
        handleLink($event, $idTimeLock["userid"], $userData, $idTimeLock);
    } else {
        header("HTTP/1.1 403 Forbidden."); // This link has expired, user needs to request a new link
    }
} else {
    exit();
}

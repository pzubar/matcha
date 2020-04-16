<?php

include './link_handler.php';
/*
 * Mandatory emails:
 * A new account confirmation & a forgotten password recovery
 */
function signupTemplate($userid, $userData) {
    $rl =  handleLink("signup", $userid, $userData);
    echo $rl;
    $msg = "Dear " . ucfirst($userData["login"]) . ",\nTo verify your account on Matcha".
        " please follow this link:\r\n" . $rl;

    return [
        "title" => "Verify your account on Matcha!",
        "msg" => $msg,
    ];
}

function sendPasswordTemplate ($userid, $userData) {
    $msg = "Dear " . ucfirst($userData["login"]) . ",\nTo recover your password from Matcha".
        " please follow this link:\r\n" . handleLink("forgotten", $userid, $userData);

    return [
        "title" => "Recover your password on Matcha",
        "msg" => $msg,
    ];
}

/*
 * Additional email notifications (the second way of users' informing):
 */
function likeTemplate($login) {
    $msg = "Dear " . ucfirst($login) . ",\nSomebody liked you on Matcha!";

    return [
        "title" => "Like on Matcha!",
        "msg" => wordwrap($msg, 80, "\r\n"),
    ];
}

function newMessageTemplate($login) {
    $msg = "Dear " . ucfirst($login) . ",\nSomebody sent you a new message on ".
    "Matcha. Check it out!";

    return [
        "title" => "New message on Matcha",
        "msg" => wordwrap($msg, 80, "\r\n"),
    ];
}

function checkTemplate($login) {
    $msg = "Dear " . ucfirst($login) . ",\nSomebody checked your profile on ".
        "Matcha. Enter your account to see who it was.";

    return [
        "title" => "New check on Matcha",
        "msg" => wordwrap($msg, 80, "\r\n"),
    ];
}

function mutualTemplate($login) {
    $msg = "Dear " . ucfirst($login) . ",\nYour person of interest sent you a ".
    "mutual like on Matcha!";

    return [
        "title" => "Mutual Like on Matcha!",
        "msg" => wordwrap($msg, 80, "\r\n"),
    ];
}

function dislikeTemplate($login) {
    $msg = "Dear " . ucfirst($login) . ",\nOne of your connections disliked ".
        "your profile on Matcha. We are so sorry.";

    return [
        "title" => "Oops! You've got dislike on Matcha!",
        "msg" => wordwrap($msg, 80, "\r\n"),
    ];
}


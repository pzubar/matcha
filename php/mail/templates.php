<?php
include './link_handler.php';

/*
 * Mandatory emails:
 * A new account confirmation & a forgotten password recovery
 */
function signupTemplate($userId, $userData) {
    $msg = "Dear " . ucfirst($userData["login"]) . ",<br>To verify your account on Matcha".
        " please follow this link:<br><a href='" . handleLink("signup", $userId, $userData).
        "'>verification link</a>";

    return [
        "title" => "Verify your account on Matcha!",
        "msg" => $msg,
    ];
}

function sendPasswordTemplate ($userId, $userData) {
    $msg = "Dear " . ucfirst($userData["login"]) . ",<br>To recover your password from Matcha".
        " please follow this link:<br><a href='" . handleLink("forgotten", $userId, $userData).
        "'>password recovery link</a>";

    return [
        "title" => "Recover your password on Matcha",
        "msg" => $msg,
    ];
}

/*
 * Additional email notifications (the second way of users' informing):
 */
function likeTemplate($login) {
    $msg = "Dear " . ucfirst($login) . ",<br>Somebody liked you on Matcha!";

    return [
        "title" => "Like on Matcha!",
        "msg" => wordwrap($msg, 80, "<br>"),
    ];
}

function newMessageTemplate($login) {
    $msg = "Dear " . ucfirst($login) . ",<br>Somebody sent you a new message on ".
    "Matcha. Check it out!";

    return [
        "title" => "New message on Matcha",
        "msg" => wordwrap($msg, 80, "<br>"),
    ];
}

function checkTemplate($login) {
    $msg = "Dear " . ucfirst($login) . ",<br>Somebody checked your profile on ".
        "Matcha. Enter your account to see who it was.";

    return [
        "title" => "New check on Matcha",
        "msg" => wordwrap($msg, 80, "<br>"),
    ];
}

function mutualTemplate($login) {
    $msg = "Dear " . ucfirst($login) . ",<br>Your person of interest sent you a ".
    "mutual like on Matcha!";

    return [
        "title" => "Mutual Like on Matcha!",
        "msg" => wordwrap($msg, 80, "<br>"),
    ];
}

function dislikeTemplate($login) {
    $msg = "Dear " . ucfirst($login) . ",<br>One of your connections disliked ".
        "your profile on Matcha. We are so sorry.";

    return [
        "title" => "Oops! You've got dislike on Matcha!",
        "msg" => wordwrap($msg, 80, "<br>"),
    ];
}


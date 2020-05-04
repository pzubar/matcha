<?php

include_once '../db_connect.php';
include_once '../general_utilities.php';
include 'validate_fields.php';

/*
 * PATCH request is for editing users' profiles
 * So far it is preliminary idea about the form of request
 */

function parseUpdates($data) {
    // Check how many changes is needed
    $username = $data["username"];

    $firstName = $data["firstName"];

    $lastName = $data["lastName"];

    $email = $data["email"];

    $password = $data["password"]; // complete this point later

    $gender = $data["gender"];

    $birthday = $data["birthday"];

    $biography = $data["biography"];

    $orientation = $data["orientation"];

    return 0;
}


if ($_SERVER["REQUEST_METHOD"] == "PATCH") {

    $patchData = file_get_contents('php://input');
    $data = json_decode($patchData, true);

    $requestedFields = parseUpdates($data);
    $changeableData = validateUpdates($requestedFields);

    $userId = $data["userId"];
    //changeable profile fields:
    $username = $data["username"];

    $firstName = $data["firstName"];

    $lastName = $data["lastName"];

    $email = $data["email"];

    $password = $data["password"]; // complete this point later

    $gender = $data["gender"];

    $birthday = $data["birthday"];

    $biography = $data["biography"];

    $orientation = $data["orientation"];

    if (empty($userId)) {
        error(5.04, 'no user id in patch request');
        exit();
    }
    elseif(empty($data)) {
        error(5.05, 'no data in patch request');
        exit();
    }
    else {
        parseUpdates($data);
    }

} else {
    exit();
}


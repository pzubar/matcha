<?php

include_once '../db_connect.php';
include_once '../general_utilities.php';
include 'validate_fields.php';

/*
 * PATCH request is for editing users' profiles
 * So far it is preliminary idea about the form of request
 */

function isNew($field, $newVal) {
    // get old val

    // compare with $newVal
    if (1) {
        return true;
    }
    return false;
}

function isValue($val) {
    if(!empty($val) && $val != NULL) {
        return true;
    }
    return false;
}


function parseUpdates($data) {
    // Check how many changes is needed
    $username = $data["username"];

    if (isValue($username) || !isNew('username', $username)) {

    }
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
    $dataDecoded = json_decode($patchData, true);

    $userId = $dataDecoded["userId"];

    if(empty($dataDecoded)) {
        error(5.04, 'no data in patch request');
        exit();
    }
    elseif (empty($userId)) {
        error(5.05, 'no user id in patch request');
        exit();
    }
    else {//working changeable profile fields:
        $requestedFields = parseUpdates($dataDecoded);
        $changeableData = validateUpdates($requestedFields);
    }

} else {
    exit();
}


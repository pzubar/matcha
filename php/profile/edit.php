<?php

include_once '../db_connect.php';
include_once '../general_utilities.php';
include 'validate_fields.php';
include 'profile_editor.php';

/*
 * PATCH request is for editing users' profiles
 * So far it is preliminary idea about the form of request
 */

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
    else {//working with changeable profile fields:
        $requestedFields = parseUpdates($dataDecoded);
        $changeableData = validateUpdates($requestedFields);
    }

} else {
    exit();
}


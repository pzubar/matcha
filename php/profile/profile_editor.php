<?php

include_once '../db_connect.php';
include_once '../general_utilities.php';

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

function hasValue($val) {
    if(!empty($val) && $val != NULL) {
        return true;
    }
    return false;
}


function parseUpdates($data) {
    // Check how many changes is needed
    $requestedFields = [
        'username' => '',
        'firstName'=> '',
        'lastName'=> '',
        'email'=> '',
        'password'=> '',
        'gender'=> '',
        'birthday'=> '',
        'biography'=> '',
        'orientation'=> ''];
    $queryCode = [0,0,0,0,0,0,0,0,0];
    $i = 0;
    echo "i start: " . $i;
    // All changeable profile fields below:

    $newUsername = $data['username'];
    if (hasValue($newUsername) && !isNew('username', $newUsername)) {
        $requestedFields['username'] = $newUsername;
        echo "Username i # " . $i . " = " . $i;
        $queryCode[$i++] = 1;
    }
    else {
        $requestedFields['username'] = NULL;
        echo "Username i # " . $i . " = " . $i;
        $i++;
    }

    $newFirstName = $data['firstName'];
    if (hasValue($newFirstName) && !isNew('firstName', $newFirstName)) {
        $requestedFields['firstName'] = $newFirstName;
        echo "Firstname i # " . $i . " = " . $i;
        $queryCode[$i++] = 1;
    }
    else {
        $requestedFields['firstName'] = NULL;
        echo "Firstname i # " . $i . " = " . $i;
        $i++;
    }

    $newLastName = $data['lastName'];
    if (hasValue($newLastName) && !isNew('lastName', $newLastName)) {
        $requestedFields['lastName'] = $newLastName;
        echo "LastName i # " . $i . " = " . $i;
        $queryCode[$i++] = 1;
    }
    else {
        $requestedFields['lastName'] = NULL;
        echo "LastName i # " . $i . " = " . $i;
        $i++;
    }

    $newEmail = $data['email'];
    if (hasValue($newEmail) && !isNew('email', $newEmail)) {
        $requestedFields['email'] = $newEmail;
        echo "Email i # " . $i . " = " . $i;
        $queryCode[$i++] = 1;
    }
    else {
        $requestedFields['email'] = NULL;
        echo "Email i # " . $i . " = " . $i;
        $i++;
    }

    /*
     * REWORK the password part later, with PZUBAR
     */
    $newPassword = $data['password'];
    if (hasValue($newPassword) && !isNew('password', $newPassword)) {
        $requestedFields['password'] = $newPassword;
        echo "Password i # " . $i . " = " . $i;
        $queryCode[$i++] = 1;
    }
    else {
        $requestedFields['password'] = NULL;
        echo "Password i # " . $i . " = " . $i;
        $i++;
    }

    $newGender= $data['gender'];
    if (hasValue($newGender) && !isNew('gender', $newGender)) {
        $requestedFields['gender'] = $newGender;
        echo "Gender i # " . $i . " = " . $i;
        $queryCode[$i++] = 1;
    }
    else {
        $requestedFields['gender'] = NULL;
        echo "Gender i # " . $i . " = " . $i;
        $i++;
    }

    $newBirthday= $data['birthday'];
    if (hasValue($newBirthday) && !isNew('birthday', $newBirthday)) {
        $requestedFields['birthday'] = $newBirthday;
        echo "Birthday i # " . $i . " = " . $i;
        $queryCode[$i++] = 1;
    }
    else {
        $requestedFields['birthday'] = NULL;
        echo "Birthday i # " . $i . " = " . $i;
        $i++;

    }

    $newBiography= $data['biography'];
    if (hasValue($newBiography) && !isNew('biography', $newBiography)) {
        $requestedFields['biography'] = $newBiography;
        echo "Biography i # " . $i . " = " . $i;
        $queryCode[$i++] = 1;
    }
    else {
        $requestedFields['biography'] = NULL;
        echo "Biography i # " . $i . " = " . $i;
        $i++;

    }

    $newOrientation= $data['orientation'];
    if (hasValue($newOrientation) && !isNew('orientation', $newOrientation)) {
        $requestedFields['orientation'] = $newOrientation;
        echo "Orientation i # " . $i . " = " . $i;
        $queryCode[$i++] = 1;
    }
    else {
        $requestedFields['orientation'] = NULL;
        echo "Orientation i # " . $i . " = " . $i;
    }
    return $requestedFields;
}


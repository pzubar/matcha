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
    $queryCode = [0,0,0,0,0,0,0,0,0]; // this array shows
    /*
     * Example of result array
     */
    $requestedFields = [
        'username' => NULL,
        'firstName'=> NULL,
        'lastName'=> NULL,
        'email'=> NULL,
        'password'=> NULL,
        'gender'=> NULL,
        'birthday'=> NULL,
        'biography'=> NULL,
        'orientation'=> NULL];

    $i = 0;
    /*
     * All changeable profile fields below. Need to
     * check & to note how many changes is needed:
    */

    $newUsername = $data['username'];
    if (hasValue($newUsername) && !isNew('username', $newUsername)) {
        $requestedFields['username'] = $newUsername;
        echo "Username i # " . $i . " = " . $i; // this is for tests only, DELETE LATER!
        $queryCode[$i] = 1;
        $i++;
    }

    $newFirstName = $data['firstName'];
    if (hasValue($newFirstName) && !isNew('firstName', $newFirstName)) {
        $requestedFields['firstName'] = $newFirstName;
        echo "Firstname i # " . $i . " = " . $i;
        $queryCode[$i] = 1;
        $i++;
    }


    $newLastName = $data['lastName'];
    if (hasValue($newLastName) && !isNew('lastName', $newLastName)) {
        $requestedFields['lastName'] = $newLastName;
        echo "LastName i # " . $i . " = " . $i;
        $queryCode[$i] = 1;
        $i++;
    }

    $newEmail = $data['email'];
    if (hasValue($newEmail) && !isNew('email', $newEmail)) {
        $requestedFields['email'] = $newEmail;
        echo "Email i # " . $i . " = " . $i;
        $queryCode[$i] = 1;
        $i++;
    }

    /*
     * REWORK the password part later, with PZUBAR
     */
    $newPassword = $data['password'];
    if (hasValue($newPassword) && !isNew('password', $newPassword)) {
        $requestedFields['password'] = $newPassword;
        echo "Password i # " . $i . " = " . $i;
        $queryCode[$i] = 1;
        $i++;
    }

    $newGender= $data['gender'];
    if (hasValue($newGender) && !isNew('gender', $newGender)) {
        $requestedFields['gender'] = $newGender;
        echo "Gender i # " . $i . " = " . $i;
        $queryCode[$i] = 1;
        $i++;
    }

    $newBirthday= $data['birthday'];
    if (hasValue($newBirthday) && !isNew('birthday', $newBirthday)) {
        $requestedFields['birthday'] = $newBirthday;
        echo "Birthday i # " . $i . " = " . $i;
        $queryCode[$i] = 1;
        $i++;
    }

    $newBiography= $data['biography'];
    if (hasValue($newBiography) && !isNew('biography', $newBiography)) {
        $requestedFields['biography'] = $newBiography;
        echo "Biography i # " . $i . " = " . $i;
        $queryCode[$i] = 1;
        $i++;
    }

    $newOrientation= $data['orientation'];
    if (hasValue($newOrientation) && !isNew('orientation', $newOrientation)) {
        $requestedFields['orientation'] = $newOrientation;
        echo "Orientation i # " . $i . " = " . $i;
        $queryCode[$i] = 1;
    }

    /*
     * Now the result arrays contains new values or NULL in fields
     */
    return $requestedFields;
}


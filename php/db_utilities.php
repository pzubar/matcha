<?php
include_once 'general_utilities.php';
include_once 'db_connect.php';

function verifyAccount($id) {
    try {
        $sqlQuery = "UPDATE users SET is_verified = true WHERE id = :id AND is_verified = false";
        $dbh = connectToDatabase();
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $qres = $dbh->prepare($sqlQuery);
        $qres->bindParam(':id',$id);
        $qres->execute();
    } catch (PDOException $msg) {
        error(5.03, $msg->getMessage());
        die();
    }
}

function getUserData($id) {

    try {
        $sqlQuery = "SELECT * FROM users WHERE id = :id";
        $dbh = connectToDatabase();
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $qres = $dbh->prepare($sqlQuery);
        $qres->bindParam(':id',$id);
        $qres->execute();
        $qres = $qres->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $msg) {
        error(5.01, $msg->getMessage());
        die();
    }
    return [
        "address" => $qres[0]["email"],
        "login" => $qres[0]["username"],
        "created" => $qres[0]["created_at"]
    ];
}


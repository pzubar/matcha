<?php
function error($code, $txt) {
    echo "Critical error " . $code . " - " . $txt;
    return $code;
}

function verifyNewAccount($id) {
    try {
        $sqlQuery = "UPDATE users SET is_verified = true WHERE id = :id AND is_verified = false";
        $dbh = new PDO('pgsql:host=localhost;port=5432;dbname=matcha_db');
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $qres = $dbh->prepare($sqlQuery);
        $qres->bindParam(':id',$id);
        $qres->execute();
        //$qres = $qres->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $msg) {
        error(5.03, $msg->getMessage());
        die();
    }
}

function getUserData($id) {
    try {
        $sqlQuery = "SELECT * FROM users WHERE id = :id";
        $dbh = new PDO('pgsql:host=localhost;port=5432;dbname=matcha_db');
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

function getIdTimeLock($str) {
    $firstPcnt = strpos($str, "%");

    $userid = base64_decode(substr($str, 0, $firstPcnt));

    $str = rawurldecode(substr($str, $firstPcnt + 1));
    $lastPcnt = strrpos($str, "%");
    $sent = base64_decode(substr($str, $lastPcnt));
    $lock = substr($str, 0, $lastPcnt);

    return [
        "userid" => $userid,
        "lock" => $lock,
        "sent" => $sent,
    ];
}


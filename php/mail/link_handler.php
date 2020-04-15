<?php

function setKeyAndMethods($created) {
    $baseForKey = strval($created);
    $encMethod = "aes-128-ctr";
    $keyMethod = "SHA256";

    $ready_key = openssl_digest($baseForKey, $keyMethod, TRUE);
    return [
        "key" => $ready_key,
        "method" => $encMethod,
    ];
}

function doHybridEncryption($keyAndMethod, $target, $id) {
 $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($keyAndMethod["method"]));
 $ivHex = bin2hex($iv);

 $cryptedTarget = openssl_encrypt($target, $keyAndMethod["method"],
         $keyAndMethod["key"], 0, $iv) . "::" . $ivHex;

 $sent = base64_encode(time());
 $cryptedTarget = base64_encode($id) . '%' . $cryptedTarget . '%' . $sent;
 $cryptedTarget = rawurlencode($cryptedTarget);

 return $cryptedTarget;
}

function decryptHybridTarget($keyAndMethod, $idTimeLock) {
    list($decryptionTarget, $iv) = explode("::", $idTimeLock["lock"]);

    $ivBin = hex2bin($iv);
    $decryptionResult = openssl_decrypt($decryptionTarget,  $keyAndMethod['method'],
        $keyAndMethod['key'], 0, $ivBin);

    return $decryptionResult;
}

function handleLink($event, $id, $userData, $mode="encrypt") {
 $keyAndMethod = setKeyAndMethods($userData["created"]);
 $target = $userData["address"] . " " .  $userData["login"];
 $result = true;

 if ($mode === "encrypt") {
     $getRequestPart = doHybridEncryption($keyAndMethod, $target, $id);
     if ($event == "Signup" && !empty($event)) {
         $result = "http://localhost:8100/mail/query.php?verify=" . $getRequestPart;
     } elseif ($event == "Forgotten" && !empty($event)) {
         $result = "http://localhost:8100/mail/query.php?recover=" . $getRequestPart;
     } else {
         header("HTTP/1.1 422 Unprocessable Entity."); // Send when a request contains no expected input
     }
 } else {
     $decryptionResult = decryptHybridTarget($keyAndMethod, $mode);

     if ($decryptionResult == $target) {
         if ($event == "Signup") {
             verifyNewAccount($id);
             header("HTTP/1.1 200 OK");
         } elseif ($event == "Forgotten") {
             header("HTTP/1.1 200 OK");
         }
     } else {
         header("HTTP/1.1 422 Unprocessable Entity."); // Send when a request contains no expected input
     }
 }
 return $result;
}

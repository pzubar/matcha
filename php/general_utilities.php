<?php

function error($code, $txt) {
    echo "Critical error " . $code . " - " . $txt;
    return $code;
}


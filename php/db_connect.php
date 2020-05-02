<?php

function connectToDatabase() {
    return new PDO('pgsql:host='. getenv('PGHOST').
        ' port='. getenv('PGPORT').
        ' dbname='. getenv('PGDATABASE').
        ' user='. getenv('PGUSER').
        ' password='. getenv('PGPASSWORD'));
}


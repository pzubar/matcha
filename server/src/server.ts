import http from "http";
import express from "express";

const router = express();
const {PORT = 3000} = process.env;
const server = http.createServer(router);

server.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}...`)
);

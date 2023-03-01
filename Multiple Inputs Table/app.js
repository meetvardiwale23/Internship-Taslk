const express = require("express");
const app = express();
const mysql = require("mysql2");
const port = 4070;



const con = mysql.createConnection({
    host: "localhost",
    user: "password",
    password: "password",
    database: ""
})

app.listen(port,(err)=>{
    console.log(`Your port is running on , ${port}`);
})
const { rejects } = require("assert");
const express = require("express");
const app = express();
const mysql = require("mysql2");
const port = 4040;

app.set("view engine", "ejs");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "grid_database",
})

con.connect(function (err) {
    if (err) throw err;
    console.log("connected");
  });

app.get('/gridview',async(req,res)=>{
        
        var user_info;
        await new Promise((resolve,rejects)=>{
            con.query("SELECT * FROM user_info",(err,user_data)=>{
            if(err) rejects(err)
            resolve(user_data);
            user_info = user_data;
            console.log(user_info);
            })
        })
        res.render('app',{user_info});
})
app.listen(port,(err)=>{
    console.log(`Your port is running on , ${port}`);
})
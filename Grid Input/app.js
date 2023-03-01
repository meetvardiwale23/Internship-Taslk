const express = require("express");
const mysql = require("mysql2");
const app = express();
const bodyParser = require("body-parser");
const util = require("util");
const promise = require("ejs");
const url = require("url");
const port = 4040;

const { resolve } = require("path");
const { rejects } = require("assert");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
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
            //console.log(user_info);
            })
        })
        res.render('app',{user_info});
})

app.post('/update',async(req,res)=>{
    
    var id = req.body.user_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var phone_number = req.body.phone_number;
    var city = req.body.city;
    var state = req.body.state;
    
    console.log("This is your update id",id);

    //console.log(req.body);

    
   // console.log(first_name,last_name,phone_number,city,state);
    
    await new Promise((resolve,rejects)=>{
      
            

            con.query(`UPDATE user_info SET first_name='${first_name}', last_name='${last_name}', phone_number='${phone_number}', city='${city}', state='${state}' where user_id = ${id};`,(err,single_update)=>{
                if(err) rejects(err)
                resolve(single_update);
                console.log(single_update);
            })
        
    })
})


app.post('/insert', async(req,res)=>{
    
    console.log(req.body);
    
    for(let i=0;i<req.body.length;i++)
    {
        console.log(req.body[i].fname);
        console.log(req.body[i].lname);
        console.log(req.body[i].phone_number);
        console.log(req.body[i].city);
        console.log(req.body[i].state);
        con.query(`INSERT INTO user_info(first_name,last_name,phone_number,city,state) values('${req.body[i].fname}','${req.body[i].lname}','${req.body[i].phone_number}','${req.body[i].city}','${req.body[i].state}');`,(err,insert_data)=>{
            if(err) throw err;
            console.log("data inserted",insert_data);
        });
    }
})
app.listen(port,(err)=>{
    console.log(`Your port is running on , ${port}`);
})
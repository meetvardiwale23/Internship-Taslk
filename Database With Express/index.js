var mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "root",
    database: "studentMaster",
});

app.get('/getdata',(req,res)=>{

con.connect(function(err){
    if(err) throw err;
    console.log("Connected");
    con.query("SELECT * FROM studentDatabase", function(err,data){
        if(err)throw err;
        //console.log(res);
        res.send(data);
    })
})
})

// app.post('/postdata', (req,res)=>{
//     con.query("INSERT INTO studentDatabase (FirstName,LastName,email,PhoneNumber,College ,City) VALUES('Chaitali','Tapkire','ch@gmail.com','6352422201','PDPU','Ahmedabad');", function(err,data){
//         if(err)throw err;
//         console.log(data);
//         res.send(data);
//     })
// })


app.post('/postdata', (req,res)=>{
    con.query(`INSERT INTO studentDatabase (FirstName,LastName,email,PhoneNumber,College ,City) VALUES('${req.body.FirstName}','${req.body.LastName}','${req.body.email}','${req.body.PhoneNumber}','${req.body.College}','${req.body.City}')`);
    // res.send("compelted")
    res.end()
})
app.listen(port , () => {
    console.log("Listining on the port 3000");
})
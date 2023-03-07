const express = require("express");
const app = express();
const mysql = require('mysql2');
const bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var cookieparse = require('cookie-parser');
const bcrypt = require('bcryptjs');
const util = require('util');
const flash = require('flash');
const port = 4030;


app.set("view engine", "ejs");
app.use(express.static('design'))

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieparse());

app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Authentication",
});

con.connect((err)=>{
    if(err) throw err;
    console.log("Connected");
})

// load form
app.get('/home',(req,res)=>{
    
    
    var token =req.cookies.auth;
    if(!token){
        res.render('app');
    }
    else{
        res.redirect('/dashboard')
    }

})

//post request
app.post('/submit',async(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var hashpass;
    var conform = req.body.conform_password;
    console.log(name,email,password,conform);

    await new Promise((resolve,reject)=>{
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err) reject(err);
                resolve(hash);
                hashpass=hash;
                console.log(hashpass)
    
            })
        })
    })
    

    await new Promise((resovle,reject)=>{
        con.query(`INSERT INTO user_table(user_name,email,user_password) values('${name}','${email}','${hashpass}');`,(err,data)=>{
            if(err) reject(err);
            resovle(data);
            console.log(data);
        })
    })

    res.send('registration done go on <a href="/login">Log In</a>');
    res.end();
})

app.get('/login',(req,res)=>{
    var token =req.cookies.auth;
    if(!token){
        res.render('login');
    }
    else{
        res.redirect('/dashboard')
    }
})

app.post('/onlogin',async(req,res)=>{

    var query = util.promisify(con.query).bind(con);
    var user_data  = await query(`SELECT * FROM user_table WHERE email = "${req.body.email}";`);
    if(user_data.length == 0 )
    {
        res.send("The email dosent exist");
        res.end();
    }
    var isMatch = bcrypt.compareSync(req.body.password,user_data[0].user_password);

    
   // console.log(user_data);

    if(isMatch)
    {   
        console.log("match");
        var token = jwt.sign({user_data},'secret');
        console.log(token);
        res.cookie('auth',token);
        res.redirect('/dashboard');
    }
    else{
        res.send("Your password is incorrect");
    }    

});

app.get('/dashboard',async(req,res)=>{
    var token =req.cookies.auth;
    var token_name;
    if(token)
    {
        jwt.verify(token,'secret',(err,token_data)=>{
            if(err) throw err;
            token_name =token_data.user_data[0].user_name;
        })
        
        res.render('dashboard',{token_name});
    }

});


app.get('/logout',(req,res)=>{

    res.clearCookie('auth');
    res.redirect('/login'); 
})
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Your port is running on ${port}`)
});

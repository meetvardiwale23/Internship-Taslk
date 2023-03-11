const express = require("express");
const app = express();
const mysql = require('mysql2');
const bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var cookieparse = require('cookie-parser');
const bcrypt = require('bcryptjs');
const util = require('util');
const flash = require('flash');
const port = 4000;


//All routes 



const allRoute = require('./allroute')

app.use('/' , allRoute);

app.set("view engine", "ejs");
app.use(express.static('design'));
app.use("/public",express.static('public'));

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
    var conform = req.body.conform_password;
    //console.log(name,email,password,conform);

    await new Promise((resolve,reject)=>{
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err) reject(err);
                resolve(hash);
                
                hashpass=hash;
              //  console.log(hashpass)
    
            })
        })
    })
    
    var insertData;
    await new Promise((resovle,reject)=>{
        con.query(`INSERT INTO user_table(user_name,email,user_password) values('${name}','${email}','${hashpass}');`,(err,data)=>{
            if(err) reject(err);
            resovle(data);
            //console.log(data);
            insertData = data;
        
        })
    })

    
    console.log(insertData.insertId);

    var activationToken = jwt.sign({id: insertData.insertId},'a@#45^7*9');
  
    res.cookie('activation',activationToken);
    res.render("Activation");
    
    res.end();
})

app.get('/generateActivation',async(req,res)=>{
  
    res.render('login');

})

//for link activation
app.post('/active', async(req,res)=>{
    var activeToken = req.cookies.activation;
    var auth = req.cookies.auth;

    console.log("inside Active");
    console.log("Active token",auth);
    

    if(auth)
    {
        jwt.verify(auth,'secret',(err,active_token_data)=>{
            if(err) throw err;
                console.log(active_token_data);
                console.log("asdd",active_token_data.id)
                console.log(active_token_data.user_data[0].email); 

                var sql =` UPDATE user_table SET isActive = 1 WHERE email = "${active_token_data.user_data[0].email}";`
                console.log(sql);
                con.query(sql,(err,update_data)=>{
                if(err) throw err;
                
                console.log(update_data);
                res.redirect('/dashboard');
            });

     
        });
        
    }

    else{
        jwt.verify(activeToken,'a@#45^7*9',(err,active_token_data)=>{
            if(err) throw err;
                console.log(active_token_data);
                console.log("asdd",active_token_data.id)
                console.log(active_token_data.id); 


                var sql =` UPDATE user_table SET isActive = 1 WHERE userid = "${active_token_data.id}";`
                console.log(sql);
                con.query(sql,(err,update_data)=>{
                if(err) throw err;
                
                console.log(update_data);
                res.redirect('/login');
            });

     
        });
        
    }
})


app.get('/login',async(req,res)=>{
    var token =req.cookies.auth;
    var activeToken = req.cookies.activation;

    if(activeToken)
    {
       // res.clearCookie('activation');
        res.render('login');
    }
    else{
        res.render('/generateActivation');
    }

    if(!token){
        
        res.render('login');
    }
    else{
        res.redirect('/dashboard')
    }
    
})

app.get(`/verify/email`,async(req,res)=>{
    var query = util.promisify(con.query).bind(con);
    var user_data  =  await query(`SELECT * FROM user_table`);
    
    res.json(user_data.map(item=>item.email));
});



app.post('/onlogin',async(req,res)=>{

    var query = util.promisify(con.query).bind(con);
    var user_data  = await query(`SELECT * FROM user_table WHERE email = "${req.body.email}";`);
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
        jwt.verify(token,'secret',async(err,token_data)=>{
            if(err) throw err;
          //  console.log("you token data",token_data);

            token_name =token_data.user_data[0].user_name;

            var query = util.promisify(con.query).bind(con);
            
            var user_data  = await query(`SELECT * FROM user_table WHERE email = "${token_data.user_data[0].email}";`);
            console.log("select query",user_data);
            console.log(user_data[0].isActive);

            if(user_data[0].isActive == 1)
            {
                    res.render('dashboard',{token_name});        
            } 
            else{
                res.redirect('/generateActivation');
            }

          
            
        })    
        
    }    
    else{
        res.redirect('login')
    }
    

   
    

});


app.get('/viewTask',async(req,res)=>{

    res.render('viewAll');

})

app.get('/logout',(req,res)=>{

    res.clearCookie('auth');
    res.redirect('/login'); 
})
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Your port is running on ${port}`)
});

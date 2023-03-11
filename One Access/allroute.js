const express = require("express");
const app = express();
const mysql = require('mysql2');
const bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var cookieparse = require('cookie-parser');
const bcrypt = require('bcryptjs');
const util = require('util');
const flash = require('flash');

app.use(cookieparse())

const authenticate = function(req,res){

    jwt.verify(req.cookies.auth,'secret',(err,routeToken)=>{
        if(err) throw err;

        if(!routeToken)
        {
            res.redirect('/login');
        }
        else{
            res.redirect('/home')
        }
        
    })

}

const gridInput = require('./routes/GridInput/app');
const pagination = require('./routes/PaginationOnSearch/app');
const sort = require('./routes/ExpressSortTheDatabase/index');
const job = require('./routes/JobApplicationForm/app');



app.use('/',authenticate, pagination);
app.use('/' , gridInput);
app.use('/', sort);
app.use('/' , job);




module.exports = app;

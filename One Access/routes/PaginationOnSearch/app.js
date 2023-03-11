const mysql = require('mysql2');
const express = require('express');
const app = express();
const url = require('url');


app.set('view engine', 'ejs');


app.get('/ejs', (req,res)=>{
    res.render('search');
});

var con = mysql.createConnection ({

    user:'root',
    host:'localhost',
    password:'root',
    database : 'student_database_express',

});

app.get("/searchview", (req, res) => {
    var query_select = url.parse(req.url, true);
    var search_string = query_select.query.search_string;
  
    console.log("outside if");
    if (!search_string) {
      con.query("SELECT  * FROM student_details", (err, search_data) => {
        console.log(search_data);
        res.render("search", { search_string:"",search_data });
      });
    } else {
      // splitting the string using space
      var search_string_data = [];
      search_string_data = search_string;
      var fname = "";
      var lname = "";
      var email = "";
      var city = "";
      var college = "";
  
      //removing special character from string
  
      for (var i = 0; i < search_string_data.length; i++) {
        if (search_string_data.charAt(i) == "^") {
          for (var j = i + 1; j < search_string_data.length; j++) {
            if (
              search_string_data[j] == "$" ||
              search_string_data[j] == "*" ||
              search_string_data[j] == "#" ||
              search_string_data[j] == "&" ||
              search_string_data[j] == "%"
            ) {
              break;
            }
            fname += search_string_data.charAt(j);
          }
        }
  
        if (search_string_data.charAt(i) == "$") {
          for (var j = i + 1; j < search_string_data.length; j++) {
            if (
              search_string_data[j] == "^" ||
              search_string_data[j] == "*" ||
              search_string_data[j] == "#" ||
              search_string_data[j] == "&" ||
              search_string_data[j] == "%"
            ) {
              break;
            }
            lname += search_string_data.charAt(j);
          }
        }
  
        if (search_string_data.charAt(i) == "#") {
          for (var j = i + 1; j < search_string_data.length; j++) {
            if (
              search_string_data[j] == "^" ||
              search_string_data[j] == "$" ||
              search_string_data[j] == "*" ||
              search_string_data[j] == "&" ||
              search_string_data[j] == "%"
            ) {
              break;
            }
            email += search_string_data[j];
          }
        }
  
        if (search_string_data.charAt(i) == "&") {
          for (var j = i + 1; j < search_string_data.length; j++) {
            if (
              search_string_data[j] == "^" ||
              search_string_data[j] == "$" ||
              search_string_data[j] == "*" ||
              search_string_data[j] == "#" ||
              search_string_data[j] == "%"
            ) {
              break;
            }
            city += search_string_data.charAt(j);
          }
        }
  
        if (search_string_data.charAt(i) == "%") {
          for (var j = i + 1; j < search_string_data.length; j++) {
            if (
              search_string_data[j] == "^" ||
              search_string_data[j] == "$" ||
              search_string_data[j] == "*" ||
              search_string_data[j] == "#" ||
              search_string_data[j] == "&"
            ) {
              break;
            }
            college += search_string_data.charAt(j);
          }
        }
      }
  
      // var limit=20;
      // var page = query_select.query.page || 1;
      // var offset = (page - 1) * limit;
      // var counter;
      //select query
  
      var sql = `SELECT  * FROM student_details WHERE first_name LIKE "%${fname}%"AND last_name LIKE "%${lname}%"  AND email LIKE "%${email}%" AND city LIKE "%${city}%" AND college LIKE "%${college}%"  ;`;
      con.query(sql, (err, search_data) => {
        if (err) throw err;
        //  con.query('SELECT count(*) as count from student_details',function(err,result){
        //     if(err) throw err;
        //      counter = Math.ceil(result[0].count/limit);
        //  })
  
        //                 con.query(`SELECT * FROM student_details WHERE student_id limit ${limit},${offset}`)
  
        res.render("search", { search_data, search_string });
      });
    }
  });

module.exports = app;
    
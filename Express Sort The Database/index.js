const { query } = require("express");
const express = require("express");
const app = express();
const mysql = require('mysql2');
const url = require('url');
const port = 4000;

app.set('view engine', 'ejs');

app.get('/ejs', (req,res)=>{
    res.render('/index');
});
    
 var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database : 'student_database_express',
    
});    
app.post('/insertdata', (req,res)=>{
    
    con.connect(function(err){

    if(err) throw err;
        
    console.log("connected");

    for(var i=0;i<1449;i++)
    {
    var first_name = ['Meet','Nisarg','parth','sagar','vivek','sandhya','om','naresh','rajesh','kinjal','tirth','dev','sanket','kunjan','chaitali','ami','vishwa','nandini','seema','mansi','tushar','shravan','nishchal','sahil','harshil'];
    var last_name = ['patel','dalvadi','kulkarni','dave','limbachiya','harwani','suthar'];
    //var email_arr = ['meet@gmail.com','nisarg@gmail.com','parth@gmail.com','sagar@gmail.com','vivek@gmail.com','sandhya@gmail.com','om@gmail.com','naresh@gmail.com','rajesh@gmail.com','kinjal@gmail.com','tirth@gmail.com','dev@gmail.com','sanket@gmail.com','kunjan@gmail.com','chaitali@gmail.com','ami@gmail.com','vishwa@gmail.com','nandini@gmail.com','seema@gmail.com','mansi@gmail.com','tushar@gmail.com','sharavan@gmail.com','nischal@gmail.com','sahil@gmail.com','harshil@gmail.com'];
    var city_arr = ['Ahmedabad','surat','rajkot','bharuch','bhanbagar','valsad','vadodra'];
    var college_arr = ['Alpha','L.D','Vishwakarma','GEC','Nirma','PDPU','DAIICT','silver oak','L.J'];
    var start = new Date(1995, 0 , 1);
    var end = new Date(2003 , 0 ,1);
    var date ;
    var month ;
    var day;
    var year;
    function getrandomdate()
    {
             var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
             month = '' + (d.getMonth() + 1),
             day = '' + d.getDate(),
             year=  + d.getFullYear();

             if (month.length < 2) month = '0' + month;
             if (day.length < 2) day = '0' + day;
         
             date =  [year, month, day].join('-');
    
    }
    getrandomdate();
    console.log(date);

    // random first name
    var fname = first_name[parseInt(Math.random() * first_name.length)];

    // random last name
    var lname = last_name[parseInt(Math.random() * last_name.length)];

    // random email
    var email = fname + lname +"@gmail.com";

    // random city
    var city = city_arr[parseInt(Math.random() * city_arr.length)];

    // random college
    var college = college_arr[parseInt(Math.random() * college_arr.length)];

     con.query(`INSERT INTO student_details(first_name,last_name,date_of_birth,email,city,college) values('${fname}','${lname}','${date}','${email}','${city}','${college}');`,function(err,data){
        if(err) throw err;
        console.log(data);
     })

    }
  })  


})

app.get('/getdata', (req,res)=>{

    var dataArr ;
    var quuery_select = url.parse(req.url,true);
    var limit = 10;
    var page = quuery_select.query.page || 1;
    var col_nm = quuery_select.query.col_nm || 'student_id';
    var order = quuery_select.query.order || 'ASC';
    var search_data = quuery_select.query.searchDynamic;
    var offset = (page - 1) * limit;
    
    
    
        con.query(`SELECT * FROM student_details ORDER BY ${col_nm} ${order} LIMIT ${offset}, ${limit};`, (err,data) =>{
            if(err) throw err;
            //console.log(data);
        con.query('SELECT count(*) as count from student_details',function(err,result){
              dataArr = data;
              var counter = Math.ceil(result[0].count/limit);
              res.render('index', { dataArr,counter,col_nm,order});
        })
        
        });
       
   
})

app.listen(port , ()=>{
    console.log(`your page is running on this port ${port}`);
})
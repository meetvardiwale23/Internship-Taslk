const express = require("express");
const mysql = require("mysql2");
const app = express();
const bodyParser = require("body-parser");
const util = require("util");
const promise = require("ejs");
const url = require("url");
const port = 4080;
const cors = require("cors");
const { resolve } = require("path");
app.use(cors());

//app.use(express.json());

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "job_app_form",
});

// app.get('/ejs',(req,res)=>{
//     res.render('/index');
// })
con.connect(function (err) {
    if (err) throw err;
    console.log("connected");
});
var state_data = "";
var relation_ship_data = "";
var course_data = "";
var uni_data = "";
var language_data = "";
var tech_data = "";
var location_data = "";
var department_data = "";

app.get("/getformdata", (req, res) => {
    con.query("SELECT state_name from state_master", (err, data) => {
        if (err) throw err;
        state_data = data;
    });

    con.query(
        "SELECT option_value from option_master where select_id=2",
        (err, data) => {
            if (err) throw err;
            console.log();
            relation_ship_data = data;
        }
    );

    con.query(
        "SELECT option_value from option_master where select_id=3",
        (err, data) => {
            if (err) throw err;
            console.log();
            course_data = data;
        }
    );

    con.query(
        "SELECT option_value from option_master where select_id=4",
        (err, data) => {
            if (err) throw err;
            console.log();
            uni_data = data;
        }
    );

    con.query(
        "SELECT option_value from option_master where select_id=5",
        (err, data) => {
            if (err) throw err;
            console.log();
            language_data = data;
        }
    );

    con.query(
        "SELECT option_value from option_master where select_id=6",
        (err, data) => {
            if (err) throw err;
            console.log();
            tech_data = data;
        }
    );

    con.query(
        "SELECT option_value from option_master where select_id=7",
        (err, data) => {
            if (err) throw err;
            console.log();
            location_data = data;
        }
    );

    con.query(
        "SELECT option_value from option_master where select_id=8",
        (err, data) => {
            if (err) throw err;
            department_data = data;
        }
    );
    res.render("index", {
        state_data,
        relation_ship_data,
        course_data,
        uni_data,
        language_data,
        tech_data,
        location_data,
        department_data,
    });
});

app.post("/formdata", async (req, res) => {
    console.log(req.body);
    res.send("post request send successfully");
    // data of basic detail
    var first_name = req.body.first_name;
    var l_name = req.body.last_name;
    var designation = req.body.designation;
    var address = req.body.address;
    var email = req.body.email;
    var phone_number = req.body.phonenumber;
    var state = req.body.state;
    var gender = req.body.gender;
    var city = req.body.city;
    var status = req.body.status;
    var zip_code = req.body.zip_code;
    var dob = req.body.dob;

    console.log("your first name is", first_name);
    console.log("your last name is", l_name);
    console.log("your designation is", designation);
    console.log("your address is", address);
    console.log("your email is", email);
    console.log("your phone_number is", phone_number);
    console.log("your state is", state);
    console.log("your gender is", gender);
    console.log("your city is", city);
    console.log("your status is", status);
    console.log("your zipcode is", zip_code);
    console.log("your dob is", dob);
    var last_id;

    await new Promise((resolve, reject) => {
        con.query(
            `INSERT INTO basic_detail(first_name,last_name,designation,address,email,city,phone_number,state,gender,relation_status,zipcode,DOB) values('${first_name}','${l_name}','${designation}','${address}','${email}','${city}','${phone_number}','${state}','${gender}','${status}','${zip_code}','${dob}');`,
            function (err, result) {
                if (err) return reject(err);
                console.log("data is inserted");
                resolve(result.insertId);
                last_id = result.insertId;
            }
        );
    });

    // academics data
    var course = req.body.course;
    var university = req.body.university;
    var percentage = req.body.percentage;
    var passing_year = req.body.passing_year;

    console.log("your course is", course);
    console.log("your university is", university);
    console.log("your percentage is", percentage);
    console.log("your passing year is", passing_year);

    if (typeof course == "object") {
        for (let i = 0; i < course.length; i++) {
            await new Promise((resolve, reject) => {
                 con.query(
                     `INSERT INTO academic_detail(course,university,passing,candidate_id) values('${course[i]}','${university[i]}','${passing_year[i]}','${last_id}')`,
                     function (err, academic_data) {
                         if (err) throw err;
                         resolve(academic_data);
                         console.log("data is insetred");
                     }
                 );
            });
        }
    } else {
        await new Promise((resolve, reject) => {
            con.query(
                `INSERT INTO academic_detail(course,university,passing,candidate_id) values('${course}','${university}','${passing_year}','${last_id}')`,
                function (err, academic_data) {
                    if (err) throw err;
                    resolve(academic_data);
                    console.log("data is insetred");
                }
            );
        });
    }

     // work experience data
    console.log(req.body.company_name);
    console.log(req.body.company_designation);
    console.log(req.body.ctc);
    console.log(req.body.joining_date);
    console.log(req.body.ending_date);

    if (typeof req.body.company_name == "object") {
        for (let i = 0; i < req.body.company_name.length; i++) {
            await new Promise((resolve, reject) => {
                con.query(
                    `INSERT INTO work_exp_detial(company_name,company_designation,ctc,joining_date,ending_date,candidate_id) values('${req.body.company_name[i]}','${req.body.company_designation[i]}','${req.body.ctc[i]}','${req.body.joining_date[i]}','${req.body.ending_date[i]}','${last_id}');`,
                    function (err, work_data) {
                        if (err) throw err;
                        resolve(work_data);
                        console.log("data inserted in academic table");
                    }
                );
            });
        }
    } else {
        await new Promise((resolve, reject) => {
            con.query(
                `INSERT INTO work_exp_detial(company_name,company_designation,ctc,joining_date,ending_date,candidate_id) values('${req.body.company_name}','${req.body.company_designation}','${req.body.ctc}','${req.body.joining_date}','${req.body.ending_date}','${last_id}');`,
                function (err, work_data) {
                    if (err) throw err;
                    resolve(work_data);
                    console.log("data inserted in academic table");
                }
            );
        });
    }

     // language data

    if (req.body.lang_name == undefined) {
        req.body.lang_read = [];
    }
    if (req.body.lang_read == undefined) {
        req.body.lang_read = [];
    }
    if (req.body.lang_write == undefined) {
        req.body.lang_write = [];
    }
    if (req.body.lang_speak == undefined) {
        req.body.lang_speak = [];
    }
     console.log(req.body.lang_name);
     console.log(req.body.lang_read.includes(req.body.lang_name)?'Yes':'No');
     console.log(req.body.lang_write.includes(req.body.lang_name)?'Yes':'No');
     console.log(req.body.lang_speak.includes(req.body.lang_name)?'Yes':'No');
    if (typeof req.body.lang_name == "object") {
        for (let i = 0; i < req.body.lang_name.length; i++) {
            console.log(req.body.lang_name[i]);
            console.log(
                req.body.lang_read.includes(req.body.lang_name[i]) ? "Yes" : "No"
            );
            console.log(
                req.body.lang_write.includes(req.body.lang_name[i]) ? "Yes" : "No"
            );
            console.log(
                req.body.lang_speak.includes(req.body.lang_name[i]) ? "Yes" : "No"
            );

            await new Promise((resolve, reject) => {
                con.query(
                    `INSERT INTO lang_detail(lang_name,lang_read,lang_write,lang_speak,candidate_id) values('${req.body.lang_name[i]
                    }','${req.body.lang_read.includes(req.body.lang_name[i]) ? "Yes" : "No"
                    }','${req.body.lang_write.includes(req.body.lang_name[i]) ? "Yes" : "No"
                    }','${req.body.lang_speak.includes(req.body.lang_name[i]) ? "Yes" : "No"
                    }','${last_id}');`,
                    (err, lang_result) => {
                        if (err) throw err;
                        resolve(lang_result);
                        console.log("Data inserted in language");
                    }
                );
            });
        }
    } else {
        await new Promise((resolve, reject) => {
            con.query(
                `INSERT INTO lang_detail(lang_name,lang_read,lang_write,lang_speak,candidate_id) values('${req.body.lang_name
                }','${req.body.lang_read.includes(req.body.lang_name) ? "Yes" : "No"
                }','${req.body.lang_write.includes(req.body.lang_name) ? "Yes" : "No"
                }','${req.body.lang_speak.includes(req.body.lang_name) ? "Yes" : "No"
                }','${last_id}');`,
                (err, lang_result) => {
                    if (err) throw err;
                    resolve(lang_result);
                    console.log("Data inserted in language");
                }
            );
        });
    }

    //tech data
    if (typeof req.body.technology_name == "object") {
        for (let i = 0; i < req.body.technology_name.length; i++) {
            console.log(req.body.technology_name[i]);
            console.log(eval("req.body.tech_mode" + (i + 1)));

            await new Promise((resolve, reject) => { 
                con.query(
                    `INSERT INTO tech_detail(tech_name,tech_level,candidate_id) values('${req.body.technology_name[i]}',
                    '${eval("req.body." + req.body.technology_name[i])}','${last_id}');`,
                    (err, tech_data) => {
                        if (err) throw err;
                        resolve(tech_data);
                        console.log("Data is insetred in tech detail");
                    }
                );
            });
        }
    } else {
        await new Promise((resolve, reject) => {
            con.query(
                `INSERT INTO tech_detail(tech_name,tech_level,candidate_id) values('${req.body.technology_name
                }','${eval("req.body." + req.body.technology_name)}','${last_id}');`,
                (err, tech_data) => {
                    if (err) throw err;
                    resolve(tech_data);
                    console.log("Data is insetred in tech detail");
                }
            );
        });
    }

    //Refrence data
    console.log(req.body.ref_name);
    console.log(req.body.ref_contact);
    console.log(req.body.ref_relation);

    console.log(req.body.ref_name_2);
    console.log(req.body.ref_contact_2);
    console.log(req.body.ref_relation_2);

    await new Promise((resolve, reject) => {
        con.query(
            `INSERT INTO ref_detail(ref_name,ref_contact,ref_relation,candidate_id) values('${req.body.ref_name}','${req.body.ref_contact}','${req.body.ref_relation}','${last_id}');`,
            (err, ref_data) => {
                if (err) throw err;
                resolve(ref_data);
                console.log("Data is inserted into tech detail 1");
            }
        );
    });

    await new Promise((resolve, reject) => {
        con.query(
            `INSERT INTO ref_detail(ref_name,ref_contact,ref_relation,candidate_id) values('${req.body.ref_name_2}','${req.body.ref_contact_2}','${req.body.ref_relation_2}','${last_id}');`,
            (err, ref_data_2) => {
                if (err) throw err;
                resolve(ref_data_2);
                console.log("Data is inserted into ref detail 2");
            }
        );
    });

    // prefrences
    console.log(req.body.location);
    console.log(req.body.notice_time);
    console.log(req.body.expected_ctc);
    console.log(req.body.current_ctc);
    console.log(req.body.department);

    await new Promise((resolve, reject) => {
        con.query(
            `INSERT INTO pref_detail(pref_location,pref_notice_time,pref_expected_ctc,pref_current_ctc,pref_department,candidate_id) values('${req.body.location}','${req.body.notice_time}','${req.body.expected_ctc}','${req.body.current_ctc}','${req.body.department}','${last_id}');`,
            (err, pref_data) => {
                if (err) throw err;
                resolve(pref_data);
                console.log("data is inserted into pref ");
            }
        );
    });
});

app.get("/showdata", async (req, res) => {
    var whole_data;
    var search_data = req.query.search_data || 1;
    var limit = 5;
    var page = req.query.page || 1;
    var offset = (page - 1) * limit;
    var ajax = req.query.AJAX || false;

    console.log(page);

    var fname = "";
    var lname = "";
    var email = "";

    // console.log(search_data);
    if (search_data == 1 || "") {
        con.query(`SELECT * FROM basic_detail where is_delted = 0 AND candidate_id limit ${offset} ,${limit}`, (err, data) => {
            if (err) throw err;
            //console.log(data);
            // console.log("wholedata",whole_data);
            con.query('SELECT count(*) as count from basic_detail where is_delted = 0', function (err, result) {
                whole_data = data;                
                var counter = Math.ceil(result[0].count / limit);
                if(!ajax){
                    res.render("showdata", { whole_data, search_data: "",counter });
                }

                else{
                    //console.log("data");
                    res.json(whole_data);
                }
                
            });
        });
    } else {
        for (var i = 0; i < search_data.length; i++) {
            if (search_data.charAt(i) == "^") {
                for (var j = i + 1; j < search_data.length; j++) {
                    if (
                        search_data[j] == "$" ||
                        search_data[j] == "*" ||
                        search_data[j] == "#" ||
                        search_data[j] == "&" ||
                        search_data[j] == "%"
                    ) {
                        break;
                    }
                    fname += search_data.charAt(j);
                }
            }

            if (search_data.charAt(i) == "$") {
                for (var j = i + 1; j < search_data.length; j++) {
                    if (
                        search_data[j] == "^" ||
                        search_data[j] == "*" ||
                        search_data[j] == "#" ||
                        search_data[j] == "&" ||
                        search_data[j] == "%"
                    ) {
                        break;
                    }
                    lname += search_data.charAt(j);
                }
            }

            if (search_data.charAt(i) == "#") {
                for (var j = i + 1; j < search_data.length; j++) {
                    if (
                        search_data[j] == "^" ||
                        search_data[j] == "$" ||
                        search_data[j] == "*" ||
                        search_data[j] == "&" ||
                        search_data[j] == "%"
                    ) {
                        break;
                    }
                    email += search_data[j];
                }
            }
        }

        var sql = `SELECT  * FROM basic_detail WHERE first_name LIKE  "%${fname}%" AND last_name LIKE "%${lname}%" AND email LIKE "%${email}%" and is_delted = 0 order by candidate_id limit ${offset},${limit}; `;

        con.query(sql, (err, data) => {
            if (err) throw err;
            
            con.query(`SELECT count(candidate_id) as count from basic_detail where first_name LIKE  "%${fname}%" AND last_name LIKE "%${lname}%" AND email LIKE "%${email}%" and is_delted = 0;`, function (err, result) {

                whole_data = data;                
                console.log(whole_data);
                var counter = Math.ceil(result[0].count / limit);

                if(!ajax){
                    res.render("showdata", { whole_data, search_data,counter });
                }

                else{
                    //console.log("data");
                    res.json(whole_data);
                }
                
            });
        });
    }
});

app.get("/getformdata/city", async (req, res) => {
    var stateName = req.query.stateName;
    //console.log(stateName);
    var query = util.promisify(con.query).bind(con);

    var cityName = await query(
        `SELECT city_name FROM city_master inner join state_master on city_master.state_id = state_master.state_id WHERE state_master.state_name = ${stateName};`
    );

    res.json(cityName);
});

app.post("/delete", async (req, res) => {
    var delete_element = req.query.id;
    console.log(delete_element);


    var sql = `UPDATE basic_detail SET is_delted = 1 where candidate_id = ${delete_element};`;
    console.log(sql);
    con.query(sql, (err, data) => {
        if (err) throw err;
        console.log("updated");
    });

    //     // var del =  await query(`UPDATE basic_detail SET is_delted = 1 where candidate_id = ${delete_element}`);
});

app.post("/deleteAll", async (req, res) => {
    var delete_element = req.query.id;
    //console.log(delete_element);

    for (let i = 0; i < delete_element.length; i++) {
        var sql = `UPDATE basic_detail SET is_delted = 1 where candidate_id IN (${delete_element});`;
        //console.log(sql);
        con.query(sql, (err, data) => {
            if (err) throw err;
            console.log("updated");
        });
    }


});
app.get("/details", async (req, res) => {
    var aca_detail;
    //res.send("inside the details page")
    var quuery_select = url.parse(req.url, true);
    var cand_id = quuery_select.query.id;
    //console.log(cand_id);

    if (cand_id) {
        var query = util.promisify(con.query).bind(con);

        var data = await query(
            `SELECT * FROM academic_detail where candidate_id = "${cand_id}";`
        );
        res.render("details", { data });

        var work_data = await query(
            `SELECT * FROM work_exp_detial where candidate_id = "${cand_id}";`
        );
        res.render("details", { work_data });
        //  res.json(data)
    }
});


// Update Data Logic
app.get('/edit', async(req,res)=>{
        
    var candidate_id = req.query.id;
    console.log(candidate_id);
   // res.send("this candidate id has fired",candidate_id);

   // query for basic detail
   var basic_glob_data ;
   var edit_state_data;
   await new Promise((resolve,reject)=>{
    
        con.query(`SELECT * FROM basic_detail WHERE candidate_id = ${candidate_id};`,(err,basic_data)=>{
            if(err) reject(err);
            resolve(basic_data);
            basic_glob_data = basic_data;
            console.log(basic_glob_data);
        })
   });

   await new Promise((resolve,reject)=>{
    
    con.query("SELECT state_name FROM state_master",(err,state_data)=>{
        if(err) reject(err);
        resolve(state_data);
        edit_state_data = state_data;
        console.log(edit_state_data);
    })
});
   
    res.render("edit",{basic_glob_data,edit_state_data});
})


app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Running on port ${port}`);
});

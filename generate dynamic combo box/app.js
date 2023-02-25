const { rejects } = require("assert");
const express = require("express");
const app = express();
const mysql = require("mysql2");
const { resolve } = require("path");
const port = 4020;

var con = mysql.createConnection({
    host :"localhost",
    user :"root",
    password: "root",
    database :"generate_combobox",
});

app.set("view engine", "ejs");

con.connect((err)=>{
    if(err) throw err;
    console.log("connected");
});

app.get('/function', async(req,res)=>{
    
   
   var university = await university_name("university_id",3);
   var gender_name =  await gender("gender_id",1);
   var subject_name =  await subject("subject_id",2);
   var college_name =  await college("college_id",4);
   var course_name =  await course("course_id",5);
   var category_name =  await category("category_id",6);
   var relation_status =  await relation("relation_id",7);
   var location_name =  await location("location_id",8);
   var result_status =  await result("result_id",9);
   var lang_name =  await langauge("language_id",10);

   res.render('app',{university,gender_name,subject_name,college_name,course_name,category_name,relation_status,location_name,result_status,lang_name});

});

var uni_select = "";
// function for university
async function university_name(key,id)
{
    await new Promise((resolve,rejects)=>{
        
        con.query(`SELECT * FROM option_master WHERE select_id = ${id} ;`,(err,uni_data)=>{
            if(err) rejects(err);
            resolve(uni_data);
            console.log(uni_data);
            var select = ""

            select += `<select id="${uni_data.option_name}">Select city`;
            select += `<option value=""disabled selected hidden>Select city </option>`;
            for(let i=0;i<uni_data.length;i++)
            {
                select += 
                   ` <option>${uni_data[i].option_name}</option>
                `;
            }
            select += `</select>`;
            //console.log("this is uni"+uni_data);
            uni_select = select;
        })
    })
    console.log(uni_select);
    return uni_select;
}

// for gender
 var gen_select ="";
async function gender (key,id)
{
    await new Promise((resolve,rejects)=>{
        con.query(`SELECT * FROM option_master WHERE select_id = ${id} ;`,(err,gender_data)=>{
        if(err) rejects(err);
        resolve(gender_data);
        console.log(gender_data);
        
        var gen = "";
        for(let i=0;i<gender_data.length;i++)
        {
            gen += `<input type="radio" id="${gender_data[i].option_name}" name="gender" value="${gender_data[i].option_name}">
                            <label> ${gender_data[i].option_name} </label>`;
        }
         gen_select = gen;

        })
        
    })
    return gen_select;
}

// function for university
var sub_select = "";

async function subject(key,id)
{
    await new Promise((resolve,rejects)=>{
        
        con.query(`SELECT * FROM option_master WHERE select_id = ${id} ;`,(err,sub_data)=>{
            if(err) rejects(err);
            resolve(sub_data);
            console.log(sub_data);
            var sub = ""

            sub += `<select id="${sub.option_name}">`;
            sub += `<option value=""disabled selected hidden>Select Subject </option>`;
            for(let i=0;i<sub_data.length;i++)
            {
                sub += 
                   ` <option>${sub_data[i].option_name}</option>
                `;
            }
            sub += `</select>`;
            //console.log("this is uni"+uni_data);
            sub_select = sub;
        })
    })
    console.log(sub_select);
    return sub_select;
}


// function for college
var cllg_select = "";
async function college(key,id)
{
    await new Promise((resolve,rejects)=>{
        
        con.query(`SELECT * FROM option_master WHERE select_id = ${id} ;`,(err,cllg_data)=>{
            if(err) rejects(err);
            resolve(cllg_data);
            console.log(cllg_data);
            var cllg = ""

            cllg += `<select id="${cllg_data.option_name}">`;
            cllg += `<option value=""disabled selected hidden>Select College </option>`;
            for(let i=0;i<cllg_data.length;i++)
            {
                cllg += 
                   ` <option>${cllg_data[i].option_name}</option>
                `;
            }
            cllg += `</select>`;
            //console.log("this is uni"+uni_data);
            cllg_select = cllg;
        })
    })
    console.log(cllg_select);
    return cllg_select;
}

// function for course
var course_select = "";
async function course(key,id)
{
    await new Promise((resolve,rejects)=>{
        
        con.query(`SELECT * FROM option_master WHERE select_id = ${id} ;`,(err,course_data)=>{
            if(err) rejects(err);
            resolve(course_data);
            console.log(course_data);
            var crs = ""

            crs += `<select id="${course_data.option_name}">`;
            crs += `<option value=""disabled selected hidden>Select Course </option>`;
            for(let i=0;i<course_data.length;i++)
            {
                crs += 
                   ` <option>${course_data[i].option_name}</option>
                `;
            }
            crs += `</select>`;
            //console.log("this is uni"+uni_data);
            course_select = crs;
        })
    })
    console.log(course_select);
    return course_select;
}

// function for category
var cat_select = "";
async function category(key,id)
{
    await new Promise((resolve,rejects)=>{
        
        con.query(`SELECT * FROM option_master WHERE select_id = ${id} ;`,(err,cat_data)=>{
            if(err) rejects(err);
            resolve(cat_data);
            
            var cat = ""

            cat += `<select id="${cat_data.option_name}">`;
            cat += `<option value=""disabled selected hidden>Select Category </option>`;
            for(let i=0;i<cat_data.length;i++)
            {
                cat += 
                   ` <option>${cat_data[i].option_name}</option>
                `;
            }
            cat += `</select>`;
            //console.log("this is uni"+uni_data);
            cat_select = cat;
        })
    })
    console.log(course_select);
    return cat_select;
}

// function for relation_status
var rel_select = "";
async function relation(key,id)
{
    await new Promise((resolve,rejects)=>{
        
        con.query(`SELECT * FROM option_master WHERE select_id = ${id} ;`,(err,rel_data)=>{
            if(err) rejects(err);
            resolve(rel_data);
            
            var rel = ""

            rel += `<select id="${rel_data.option_name}">`;
            rel += `<option value=""disabled selected hidden>Select Relationship 
            Stauts </option>`;
            for(let i=0;i<rel_data.length;i++)
            {
                rel += 
                   ` <option>${rel_data[i].option_name}</option>
                `;
            }
            rel += `</select>`;
            //console.log("this is uni"+uni_data);
            rel_select = rel;
        })
    })
    //console.log(course_select);
    return rel_select;
}

// function for location
var loc_select = "";
async function location(key,id)
{
    await new Promise((resolve,rejects)=>{
        
        con.query(`SELECT * FROM option_master WHERE select_id = ${id} ;`,(err,loc_data)=>{
            if(err) rejects(err);
            resolve(loc_data);
            
            var loc = ""

            loc += `<select id="${loc_data.option_name}">`;
            loc += `<option value=""disabled selected hidden>Select Location </option>`;
            for(let i=0;i<loc_data.length;i++)
            {
                loc += 
                   ` <option>${loc_data[i].option_name}</option>
                `;
            }
            loc += `</select>`;
            //console.log("this is uni"+uni_data);
            loc_select = loc;
        })
    })
    //console.log(course_select);
    return loc_select;
}


// function for  result
var res_select = "";
async function result(key,id)
{
    await new Promise((resolve,rejects)=>{
        
        con.query(`SELECT * FROM option_master WHERE select_id = ${id} ;`,(err,res_data)=>{
            if(err) rejects(err);
            resolve(res_data);
            
            var res = ""

            res += `<select id="${res_data.option_name}">`;
            res += `<option value=""disabled selected hidden>Select Result </option>`;
            for(let i=0;i<res_data.length;i++)
            {
                res += 
                   ` <option>${res_data[i].option_name}</option>
                `;
            }
            res += `</select>`;
            //console.log("this is uni"+uni_data);
            res_select = res;
        })
    })
    //console.log(course_select);
    return res_select;
}

// function for language
var lang_select = "";
async function langauge(key,id)
{
    await new Promise((resolve,rejects)=>{
        
        con.query(`SELECT * FROM option_master WHERE select_id = ${id} ;`,(err,lang_data)=>{
            if(err) rejects(err);
            resolve(lang_data);
            
            var lang = ""

            lang += `<select id="${lang_data.option_name}">`;
            lang += `<option value=""disabled selected hidden>Select Languages </option>`;
            for(let i=0;i<lang_data.length;i++)
            {
                lang += 
                   ` <option>${lang_data[i].option_name}</option>
                `;
            }
            lang += `</select>`;
            //console.log("this is uni"+uni_data);
            lang_select = lang;
        })
    })
    //console.log(course_select);
    return lang_select;
}


app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`your port is running on port:${port}`);
})
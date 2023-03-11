console.log("Hello world");
// global varaibles
var mitGlobalmitCounter = 1;
var mitCount = 0;
var mitDispScore = document.getElementById("dispScore");

// function to generate the dynamic table
function generateTable()
{
    
    var incrementid = 1;
    var mitI,mitJ;
    var mitStr = "";
    for(mitI = 0; mitI<=mitGlobalmitCounter; mitI++)
    {
            mitStr =  mitStr + "<tr>"

            for(mitJ = 0 ; mitJ<=mitGlobalmitCounter; mitJ++)
            {
                mitStr = mitStr + `<td id=td${incrementid++}> </td>`; 
            }
            mitStr = mitStr + "</tr>";
    }
    mitGlobalmitCounter++;
    document.getElementById("tableID").innerHTML = mitStr;

    // logic for mitRandom ID assign
    var mitRandom = parseInt(Math.random()* (mitGlobalmitCounter * mitGlobalmitCounter));
    if(mitRandom==0)
    {
        mitRandom=1
    }

    
    var mitCell = document.getElementById("td"+mitRandom);

    // Accessing the clicked td element
    mitCell.addEventListener('click', generateTable);
    console.log(mitCell);
    mitCell.style.opacity = "0.8"

    // logic for changin different color    
    var mitmitRandomColor = '#' +Math.floor(Math.random()*16777215).toString(16) ;
    var mittd = document.getElementsByTagName("td");
    console.log(mittd);

    for(var mitlen = 0; mitlen < mittd.length;mitlen++)
    {
        mittd[mitlen].style.background = mitmitRandomColor;
    }
    
    // logic for mitCounting the score
    mitCell.onclick = function(){
        mitCount ++;
        mitDispScore.innerHTML = mitCount;
    }
    
    
   
}

    // logic for Timmer 
    var mitSetTimmer =  document.getElementById("setTimmer");
    var mitGetTimmer = 30;

    setInterval(function(){
        if(mitGetTimmer >= 0){
            
            mitSetTimmer.innerHTML = mitGetTimmer;
            mitGetTimmer--;
        }
        if(mitGetTimmer == 0)
        {
            alert("Your Score is :"+mitCount);
        }
              
    },1000);

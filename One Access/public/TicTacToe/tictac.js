//Getting td elements
var mitOneCell = document.getElementById("1");
var mitSecondCell = document.getElementById("2");
var mitThirdCell = document.getElementById("3");
var mitForthCell = document.getElementById("4");
var mitFifthCell = document.getElementById("5");
var mitSixthCell = document.getElementById("6");
var mitSeventhCell = document.getElementById("7");
var mitEighthCell = document.getElementById("8");
var mitNinethCell = document.getElementById("9");
var mitFlagForX = 1;

var mitGlobalDisabledOne = 1;
var mitGlobalDisabledSecond = 1;
var mitGlobalDisabledThird = 1;
var mitGlobalDisabledForth = 1;
var mitGlobalDisabledFifth = 1;
var mitGlobalDisabledSixth = 1;
var mitGlobalDisabledSeventh = 1;
var mitGlobalDisabledEight = 1;
var mitGlobalDisablednineth = 1;



// array elements
var mitWins = [
    [mitOneCell, mitSecondCell, mitThirdCell],
    [mitForthCell, mitFifthCell, mitSixthCell],
    [mitSeventhCell, mitEighthCell, mitNinethCell],
    [mitOneCell, mitForthCell, mitSeventhCell],
    [mitSecondCell, mitFifthCell, mitEighthCell],
    [mitThirdCell, mitSixthCell, mitNinethCell],
    [mitOneCell, mitFifthCell, mitNinethCell],
    [mitThirdCell, mitFifthCell, mitSeventhCell],
];

function setreturn()
{
    mitGlobalDisabledOne = 1;
    mitGlobalDisabledSecond = 1;
    mitGlobalDisabledThird = 1;
    mitGlobalDisabledForth = 1;
    mitGlobalDisabledFifth = 1;
    mitGlobalDisabledSixth = 1;
    mitGlobalDisabledSeventh = 1;
    mitGlobalDisabledEight = 1;
    mitGlobalDisablednineth = 1;
    
}

function disableClick()
{   

    mitGlobalDisabledOne = 0;
    mitGlobalDisabledSecond = 0;
    mitGlobalDisabledThird = 0;
    mitGlobalDisabledForth = 0;
    mitGlobalDisabledFifth = 0;
    mitGlobalDisabledSixth = 0;
    mitGlobalDisabledSeventh = 0;
    mitGlobalDisabledEight = 0;
    mitGlobalDisablednineth = 0;
    
}

// onclick functions for X & O
function handleOneClick(x) {
    if(mitGlobalDisabledOne == 1)
    {
    if (mitFlagForX == 1) {
        document.getElementById("1").innerHTML = "X";
        mitOneCell.style.color ="white";
        mitFlagForX = 0;
    }
    else {
        mitOneCell.innerHTML = "O";
        mitOneCell.style.color ="white";
        mitFlagForX = 1;
    }
    mitGlobalDisabledOne = 0;
}
return;

}
function handleSecondClick(x) {
    if(mitGlobalDisabledSecond == 1){
    if (mitFlagForX == 1) {
        mitSecondCell.innerHTML = "X";
        mitSecondCell.style.color ="white";
        mitFlagForX = 0;
    }
    else {
        mitSecondCell.innerHTML = "O";
        mitSecondCell.style.color ="white";
        mitFlagForX = 1;
    }
    mitGlobalDisabledSecond = 0;
}
return;
}

function handleThirdClick(x) {
    if(mitGlobalDisabledThird == 1){
    if (mitFlagForX == 1) {
        mitThirdCell.innerHTML = "X";
        mitThirdCell.style.color ="white";
        mitFlagForX = 0;
    }
    else {
        mitThirdCell.innerHTML = "O";
        mitThirdCell.style.color ="white";
        mitFlagForX = 1;
    }
    mitGlobalDisabledThird = 0;
}
return
}

function handleFourthClick(x) {
    if(mitGlobalDisabledForth == 1){
    if (mitFlagForX == 1) {
        mitForthCell.innerHTML = "X";
        mitForthCell.style.color ="white";
        mitFlagForX = 0;
    }
    else {
        mitForthCell.innerHTML = "O";
        mitForthCell.style.color ="white";
        mitFlagForX = 1;
    }
    mitGlobalDisabledForth = 0;
}
return
}

function handleFifthClick(x) {
    if(mitGlobalDisabledFifth == 1){
    if (mitFlagForX == 1) {
        mitFifthCell.innerHTML = "X";
        mitFifthCell.style.color ="white";
        mitFlagForX = 0;
    }
    else {
        mitFifthCell.innerHTML = "O";
        mitFifthCell.style.color ="white";
        mitFlagForX = 1;
    }
    mitGlobalDisabledFifth =0;
}
return;
}

function handleSixthClick(x) {
    if(mitGlobalDisabledSixth == 1){
    if (mitFlagForX == 1) {
        mitSixthCell.innerHTML = "X";
        mitSixthCell.style.color ="white";
        mitFlagForX = 0;
    }
    else {
        mitSixthCell.innerHTML = "O";
        mitSixthCell.style.color ="white";
        mitFlagForX = 1;
    }
    mitGlobalDisabledSixth = 0;
}
return;
}

function handleSeventhClick(x) {
    if(mitGlobalDisabledSeventh == 1){
    if (mitFlagForX == 1) {
        mitSeventhCell.innerHTML = "X";
        mitSeventhCell.style.color ="white";
        mitFlagForX = 0;
    }
    else {
        mitSeventhCell.innerHTML = "O";
        mitSeventhCell.style.color ="white";
        mitFlagForX = 1;
    }
    mitGlobalDisabledSeventh = 0;
}
return
}

function handleEighthClick(x) {
    if(mitGlobalDisabledEight == 1){
    if (mitFlagForX == 1) {
        mitEighthCell.innerHTML = "X";
        mitEighthCell.style.color ="white";
        mitFlagForX = 0;
    }
    else {
        mitEighthCell.innerHTML = "O";
        mitEighthCell.style.color ="white";
        mitFlagForX = 1;
    }
    mitGlobalDisabledEight = 0;
}
return;
}
function handleninethClick(x) {
    if(mitGlobalDisablednineth == 1){
    if (mitFlagForX == 1) {
        mitNinethCell.innerHTML = "X";
        mitNinethCell.style.color ="white";
        mitFlagForX = 0;
    }
    else {
        mitNinethCell.innerHTML = "O";
        mitNinethCell.style.color ="white";
        mitFlagForX = 1;
    }
    mitGlobalDisablednineth = 0;
}
return;
}

// Winning Logic
function mitWinningPos() {
    
    if(mitGlobalDisabledOne == 0 && mitGlobalDisabledSecond == 0 && mitGlobalDisabledThird == 0 && mitGlobalDisabledForth == 0 && mitGlobalDisabledFifth ==0 && mitGlobalDisabledSixth ==0 && mitGlobalDisabledSeventh == 0 && mitGlobalDisabledEight == 0 && mitGlobalDisablednineth == 0)
        {
            document.getElementById("message").innerHTML="Draw Try Again !!";
            
        }
    mitWins.forEach(wins => {
        console.log(wins[0])
        if(wins[0].innerText == "O" && wins[1].innerText == "O" && wins[2].innerText == "O")
        {
                document.getElementById("message").innerHTML = "O wins the game";
                disableClick();
        }
    
        if(wins[0].innerText == "X" && wins[1].innerText == "X" && wins[2].innerText == "X" ) {        
                document.getElementById("message").innerHTML =" X wins the game";
                disableClick();
        }

       
    });

}

// Reset logic
function reset()
{   
    var mittable = document.getElementById("tableID");
    var mittr = mittable.getElementsByTagName("td");   
     
    for (var i=0; i<mittr.length; i++)
    {
            console.log(mittr[i]);
            mittr[i].innerText = "-";
            
    }

    setreturn();
    
}
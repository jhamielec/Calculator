let LENMAX=11;

let displayVal='0';
let heldVal='0'
let negative=false;
let decimal=0;
let operator='';

updateScreen(0);

buttons=document.querySelectorAll('button')
buttons.forEach( button=> {
    let cList=button.classList;
    button.addEventListener('click',()=>{
        if (button.id=="negative" && displayVal==0) {
            negative=(!negative)
        }else if (cList.contains('number')) {
            updateNumber(button)
        } else if (button.id=="clear") {
            clearScreen()
        }else if (button.id=="decimal") {
            decimal=(!decimal);
        } else if (cList.contains('operator')) {
            operations(button,last);
        } else if (button.id=="delete") {
            deleteButton()
        }
        //clean up negative flag if any button is pressed directly after negative
        if (button.id!="negative" && button.id!="decimal") {negative=false};
        last=button
        console.log("action: "+button.value)
        console.log("Display: "+displayVal)
        console.log("decimal: "+decimal)
    }
        );
})

function operations(button,last) {
    if (button.value=='=' && operator=='') {return;}
    lastDisplay=displayVal;
    if (operator=='*') {
        displayVal=parseFloat(displayVal)*parseFloat(heldVal);
        displayVal=displayVal.toString()
    } if (operator=='-') {
        displayVal=parseFloat(heldVal)-parseFloat(displayVal);
        displayVal=displayVal.toString()
    }  if (operator=='+') {
        displayVal=parseFloat(displayVal)+parseFloat(heldVal);
        displayVal=displayVal.toString()
    }  if (operator=='/') {
        if (divByZero()) return;
        displayVal=parseFloat(heldVal)/parseFloat(displayVal);
        displayVal=displayVal.toString()
    }  if (operator=='%') {
        if (divByZero()) return;
        displayVal=parseFloat(heldVal)%parseFloat(displayVal);
        displayVal=displayVal.toString();
    }
    let strLen=displayVal.split('.');
    strLen=strLen[0].toString();
    strLen=strLen.length;
    if (strLen>LENMAX)  {
        clearScreen();
        updateScreen('NaN');
        return;
    }
    displayVal=displayVal.slice(0,LENMAX)
    heldVal=displayVal;
    displayVal='0';
   
    if (button.value=='=') {displayVal=heldVal}
    operator=button.value;
    updateScreen(heldVal);
      
}

function divByZero() {
    let dispFloat=parseFloat(displayVal);
    if (dispFloat!=0) return false;
    clearScreen();
    updateScreen('DIV 0 ERR');
    return true;
}

function updateNumber(button) {
    let minus='';
    let period='';
    let noDecFlag=!displayVal.includes('.')
    if (negative && displayVal==0) {
        minus='-'
    }
    if (decimal && noDecFlag) {
        period='.'
    }
    if (button.value==0 && noDecFlag && period=='' &&displayVal==0) {return;}
    if (displayVal==0&& period==''&&button.value!=0&&noDecFlag) {displayVal=''} 
    displayVal=minus+displayVal+period+button.value
    displayVal=displayVal.slice(0,LENMAX)
    if (displayVal[LENMAX-1]=='.') {displayVal=displayVal.slice(0,LENMAX-1)}
    updateScreen(displayVal)
    decimal=false;
}

function updateScreen(value) {
    document.getElementById("displayVal").innerText=value;
}



function clearScreen(){
    displayVal='0';
    updateScreen(0);
    heldVal='0'
    negative=false;
    decimal=false;
    operator=''
}

function deleteButton() {
    let len=displayVal.length
    displayVal=displayVal.slice(0,len-1)
    if (displayVal[len-2]=='.') {
        displayVal=displayVal.slice(0,len-2);
        decimal=false;
    }
    if (displayVal=='') {displayVal='0'}
    updateScreen(displayVal)

}
//document.getElementById("draws").innerText=draws

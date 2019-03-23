//ANALOG CLOCK SECTION
function getAnalogClock(elementName, hour, minute){

  var element = document.getElementById(elementName);
  var graphic = element.getContext("2d");
  var radius = element.height / 2;
  var widthByTwo = element.width / 2;
  graphic.translate(widthByTwo, radius);
  //JTR - want to remove this line if I don't need it
  // radius = radius * 0.90

  startClock(graphic, radius, hour, minute);
}

function startClock(graphic, radius, hour, minute) {
  drawFace(graphic, radius);
  drawNumbers(graphic, radius);
  drawTime(graphic, radius, hour, minute);
}
 
function drawFace(graphic, radius) {
  var grad;
  graphic.beginPath();
  graphic.arc(0, 0, radius, 0, 2*Math.PI);
  graphic.fillStyle = 'white';
  graphic.fill();
 
  graphic.stroke();
  graphic.beginPath();
  graphic.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  graphic.fillStyle = '#333';
  graphic.fill();
}
 
function drawNumbers(graphic, radius) {
  var angle;
  var number;
  graphic.font = radius*0.15 + "px arial";
  graphic.textBaseline="middle";
  graphic.textAlign="center";
  for(number = 1; number < 13; number++){
    angle = number * Math.PI / 6;
    graphic.rotate(angle);
    graphic.translate(0, -radius*0.85);
    graphic.rotate(-angle);
    graphic.fillText(number.toString(), 0, 0);
    graphic.rotate(angle);
    graphic.translate(0, radius*0.85);
    graphic.rotate(-angle);
  }
}
 
function drawTime(graphic, radius, hour, minute){
    var hour = hour;
    var minute = minute;
    var second = 0;
    //JTR - passing in time
    // var currentTime = new Date();
    // var hour = currentTime.getHours();
    // var minute = currentTime.getMinutes();
    // var second = currentTime.getSeconds();
    
    hour=hour%12;
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(graphic, hour, radius*0.5, radius*0.07);
 
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(graphic, minute, radius*0.8, radius*0.07);
 
    second=(second*Math.PI/30);
    drawHand(graphic, second, radius*0.9, radius*0.02);
}
function drawHand(graphic, position, length, width) {
    graphic.beginPath();
    graphic.lineWidth = width;
    graphic.lineCap = "round";
    graphic.moveTo(0,0);
    graphic.rotate(position);
    graphic.lineTo(0, -length);
    graphic.stroke();
    graphic.rotate(-position);
}

//clear all the canvases if they exist
function clearCanvas(element){

  var canvas = document.getElementById(element);
  if (canvas){
    var graphic = canvas.getContext("2d");
    //JTR - this is the correct way to clear canvas, but it wasn't working
    //graphic.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.width;
  }
  
}

//DIGITAL CLOCK SECTION
function getDigitalClock(elementName, hour, minute) {
  var element = document.getElementById(elementName);
  //ensure minute is two digits
  if (minute == 0){
    minute = "00"
  }
  
  element.innerHTML = hour + ":" + minute;
}
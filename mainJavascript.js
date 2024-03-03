let x1, x2, w1, w2, threshold;

const arrayData = [];
const arraytrue = [];
const arraypredict = [];

//step1
function initialization() {
  w1 = Math.random() * (0.5 - -0.5) + -0.5;
  w2 = Math.random() * (0.5 - -0.5) + -0.5;
  threshold = Math.random() * (0.5 - -0.5) + -0.5;
}

//step2
function Activation(x1, x2, w1, w2, threshold) {
  let y_actioal = x1 * w1 + x2 * w2 + threshold;
  let sigmoid_value = 1 / (1 + Math.E ** -y_actioal);
  return sigmoid_value;
}

function weightTranining(error, x1, x2, alfa) {
  const w1Correction = x1 * alfa * error;
  const w2Correction = x2 * alfa * error;
  w1 = w1 + w1Correction;
  w2 = w2 + w2Correction;
}

const canvas = document.getElementById("myCanvas");
const pen = canvas.getContext("2d");

const devicePixelRatio = window.devicePixelRatio || 1;
const canvasWidth = canvas.clientWidth * devicePixelRatio;
const canvasHeight = canvas.clientHeight * devicePixelRatio;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

canvas.addEventListener("mousedown", function (event) {
  //print();
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * devicePixelRatio;
  const y = (event.clientY - rect.top) * devicePixelRatio;
  if (event.button === 0) {
    //left button //class 0
    const obj = new Object();
    obj.x = x;
    obj.y = y;
    obj.output = 0;
    arrayData.push(obj);
    arraytrue.push(0);
    drowRectangle(x, y);
  } else if (event.button === 2) {
    //right button //class 1
    const obj = new Object();
    obj.x = x;
    obj.y = y;
    obj.output = 1;
    arrayData.push(obj);
    arraytrue.push(1);
    drawTriangle(x, y);
  }
});

canvas.addEventListener("contextmenu", function (event) {
  event.preventDefault(); // Prevent context menu
});

function drowRectangle(x, y) {
  pen.fillStyle = "#37d7e6";
  pen.fillRect(x, y, 20, 20);
}
function drawTriangle(x, y) {
  pen.fillStyle = "#8e10c0";
  console.log(x + " " + y);
  pen.beginPath();
  pen.moveTo(x, y);
  pen.lineTo(x + 25, y);
  pen.lineTo(x + 12.5, y - 17);
  pen.closePath();
  pen.fill();
}

function sysperfo(maxarray, predictarray) {
  const accuracy = predictarray / maxarray;
  return accuracy;
}

const startLearning = document.getElementById("startLearning");
startLearning.addEventListener("click", function () {
  const alfa = document.getElementById("learningRate").value;
  const maxNumberOfIteration = document.getElementById(
    "maximumNumberOfIterations"
  ).value;

  console.log(alfa + " " + maxNumberOfIteration);

  initialization();

  let j = 0;

  for (let i = 0; i < maxNumberOfIteration; i = i + 1) {
    console.log(i);
    const yActioal = Activation(
      arrayData[j].x,
      arrayData[j].y,
      w1,
      w2,
      threshold
    );

    if (yActioal == arrayData[j].output) {
      arraypredict.push(yActioal);
    }

    const error = arrayData[j].output - yActioal;
    if (error != 0) {
      weightTranining(error, arrayData[j].x, arrayData[j].y, alfa);
    }
    if (j == arrayData.length - 1) {
      j = 0;
    } else {
      j = j + 1;
    }
  }

  // draw line
  const xPoint1 = 0;
  const yPoint1 = (-(w1 * xPoint1) - threshold) / w2;
  const xPoint2 = 875;
  const yPoint2 = (-(w1 * xPoint2) - threshold) / w2;
  pen.beginPath();
  pen.moveTo(xPoint1, yPoint1);
  pen.lineTo(xPoint2, yPoint2);
  pen.strokeStyle = "blue";
  pen.lineWidth = 2;
  pen.stroke();

  //calculate performence
  const accuracyfinal = sysperfo(maxNumberOfIteration, arraypredict.length);
  document.getElementById("performance").innerHTML = accuracyfinal;
});

const checkpoint = document.getElementById("checkpoint");

checkpoint.addEventListener("click", function () {
  let xValue = document.getElementById("xnum").value;
  let yValue = document.getElementById("ynum").value;

  const pointvalue = Activation(xValue, yValue, w1, w2, threshold);

  if (pointvalue == 1) {
    //1 Triangle
    document.getElementById("result").innerText = "Triangle";
    drawTriangle(xValue, yValue);
  } else if (pointvalue == 0) {
    //0 Rectangle
    document.getElementById("result").innerText = "Rectangle";
    drowRectangle(xValue, yValue);
  } else {
    document.getElementById("result").innerText = "I Don't Know :( ";
  }
});

const clearcanv = document.getElementById("ClearCanves");
clearcanv.addEventListener("click", function () {
  pen.clearRect(0, 0, canvas.width, canvas.height);
  arrayData.length = 0;
  arraypredict.length = 0;
});

const cleardata = document.getElementById("Cleardata");
cleardata.addEventListener("click", function () {
  document.getElementById("learningRate").value = "";
  document.getElementById("maximumNumberOfIterations").value = "";
  document.getElementById("xnum").value = "";
  document.getElementById("ynum").value = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("performance").innerHTML = "";
});

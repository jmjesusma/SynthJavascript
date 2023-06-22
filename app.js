
let synth, sineButton, squareButton, triButton, sawButton, chorusButton, pianoButton;

var pressed=0;
var i = 0
//variables para controlar las posiciones de los botones
var oscPosX=950;
var oscPosY=-180;
var adslPosX=945;
var adslPosY=33;
var chorusPosX=50;
var chorusPosY=-30;
var octPosX=720;
var octPosY=150;
var bPosX=46;
var bPosY=615;
var lPosX=90;
var lPosY=514;

let player;
let chorus;
let distort;
let button;
let freqSlider;
let depthSlider;
let timeSlider;
let wetMix;

var oct = 4;
var oct2=5;

let  attack, decay, sus, release; 
let oscTypeText = "Sine";
let backColor = [227, 191, 129];

let showtext=true;

let piano=true;

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Circle variables for knob
var x = 260;
var y = 180;
var r = 40;

// Knob angle
var angle = 0;

var count = 0;

// Offset angle for turning knob
var offsetAngle = 0;

const sampler = new Tone.Sampler({
  urls: {
      A0: "A0.mp3",
      C1: "C1.mp3",
      "D#1": "Ds1.mp3",
      "F#1": "Fs1.mp3",
      A1: "A1.mp3",
      C2: "C2.mp3",
      "D#2": "Ds2.mp3",
      "F#2": "Fs2.mp3",
      A2: "A2.mp3",
      C3: "C3.mp3",
      "D#3": "Ds3.mp3",
      "F#3": "Fs3.mp3",
      A3: "A3.mp3",
      C4: "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      A4: "A4.mp3",
      C5: "C5.mp3",
      "D#5": "Ds5.mp3",
      "F#5": "Fs5.mp3",
      A5: "A5.mp3",
      C6: "C6.mp3",
      "D#6": "Ds6.mp3",
      "F#6": "Fs6.mp3",
      A6: "A6.mp3",
      C7: "C7.mp3",
      "D#7": "Ds7.mp3",
      "F#7": "Fs7.mp3",
      A7: "A7.mp3",
      C8: "C8.mp3"
  },

  // Cela règle la durée de permanence des notes jouées
  release: 10,
  
   // vibratoRate: 10,
  
    filter:{
     
        Q: 1,
        type: "highpass",
        rolloff: -40
      

    }, envelope: { //sets the various sound properties for the synth
      attack: 0.05,
      decay: 0.5,
      sustain: 1,
      release: 5
    },

  // Source locale des sons
  // baseUrl: "./audio/salamander/"

  baseUrl: "https://tonejs.github.io/audio/salamander/"
}).toDestination();

  //chorus = new Tone.Chorus(4, 10, 1).toMaster();
  distort= new Tone.Distortion(0).toDestination();
  synth = new Tone.FMSynth({ //nuevo objeto tipo tono llamado synth
    oscillator: { //oscilador por defecto senoidal
      type: "sine"
    },
    harmonicity:5,
    modulationIndex:5,
    envelope: { //sets the various sound properties for the synth
      attack: 0.05,
      decay: 0.5,
      sustain: 1,
      release: 5
    },
    filter:{
     
        Q: 1,
        type: "lowpass",
        rolloff: -12
      

    },
    //vibratoRate: 1,
}
  ).toDestination();
   chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination();
 var filter = new Tone.Filter({
    type: "lowpass",
    Q: 1, // Ajusta la resonancia aquí
    frequency: 500 ,
    rolloff : -12 // Ajusta la frecuencia de corte del filtro aquí
  }).toDestination();
 // var filter = new Tone.Filter(400, 'lowpass').toDestination();
//var feedbackDelay = new Tone.FeedbackDelay(0.125, 0.5).toDestination();
 

synth.connect(filter);
  synth.connect(chorus);
  synth.connect(distort);
  sampler.connect(distort);
  sampler.connect(chorus);
  sampler.connect(filter);
 // synth.connect(feedbackDelay);
 // sampler.connect(feedbackDelay);

 


function setup() {
  createCanvas(1342, 800);//tamaño de la ventana
  bg = loadImage('img/base.png');
  pB = loadImage('img/B.png');
  pL = loadImage('img/L.png');
  sampler.volume.value=-48;
/*
  let invisibleButton = createButton('aaa');
  invisibleButton.position(10, 10);
  invisibleButton.style('border', 'none');
  invisibleButton.style('padding', '20px 0');

  
  // Establecer el color de fondo y del borde del botón a transparente
  invisibleButton.style('background-color', 'transparent');
*/
   //coro

   let colorButton = color(25, 23 , 200, 50);
   slider = createSlider(1, 2000, 8, 0);
   slider.position((width/2-10)+chorusPosX, 100+chorusPosY);
   slider2 = createSlider(1, 16, 1, 0);
   slider2.position((width/2-10)+chorusPosX, 140+chorusPosY);
   disButton=  createSlider(0, 1, 0, 0.01);
   disButton.position(oscPosX-500, (height / 2 + 70)+oscPosY);
  
   disButton.style('background-color', colorButton);
  resButton=  createSlider(0, 10000, 0, 0.01);
  resButton.position(oscPosX-500, (height / 2 + 70)+oscPosY+50);

 pianoButton = createButton("Piano mode");
 pianoButton.position(oscPosX-215, (height / 2 + 70)+oscPosY-90);
  pianoButton.mousePressed(changePiano);
  
  sineButton = createButton("Sine"); //crea un botón en p5 con el texto Sine y lo convierte en una variable sineButton
  sineButton.position(oscPosX, (height / 2 + 70)+oscPosY); //posicion del boton
  sineButton.mousePressed(changeSine);//llama a la funcion changeSine cuando el botton es pulsado
  sineButton.style('background-color', colorButton);

  squareButton = createButton("Square");
  squareButton.position((56)+oscPosX, (height / 2 + 70)+oscPosY);
  squareButton.mousePressed(changeSquare);
  squareButton.style('background-color', colorButton);

  triButton = createButton("Triangle");
  triButton.position((126)+oscPosX, (height / 2 + 70)+oscPosY);
  triButton.mousePressed(changeTri);
  triButton.style('background-color', colorButton);

  sawButton = createButton("Sawtooth");
  sawButton.position((200)+oscPosX, (height / 2 + 70)+oscPosY);
  sawButton.mousePressed(changeSaw);
  sawButton.style('background-color', colorButton);
  
  attack = createSlider(0, 1, 0.5, 0.01);
  attack.position(0+adslPosX,300+adslPosY);
  decay = createSlider(0, 1, 0.5, 0.01);
  decay.position(150+adslPosX, 300+adslPosY);
  sus = createSlider(0, 1, 0.5, 0.01);
  sus.position(0+adslPosX,350+adslPosY);
  release = createSlider(0, 1, 0.5, 0.01);
  release.position(150+adslPosX, 350+adslPosY);

  wetMix = createSlider(0,1,0,0);
  wetMix.style("width","200px");
  wetMix.position((width/2-300)+chorusPosX, 100+chorusPosY);
  
  freqSlider= createSlider(0,4,2,1);
  freqSlider.style("width","200px");
  freqSlider.position((width/2-300)+chorusPosX, 120+chorusPosY);
  
  
  
  timeSlider= createSlider(2,20,4,0.25);
  timeSlider.style("width","200px");
  timeSlider.position((width/2-300)+chorusPosX, 140+chorusPosY);
  
  depthSlider= createSlider(0,1,0.7,0);
  depthSlider.style("width","200px");
  depthSlider.position((width/2-300)+chorusPosX, 160+chorusPosY);

  octPlus=createButton("-");
  octPlus.position(octPosX, octPosY);
  octPlus.mousePressed(octM);
  octMinus=createButton("+");
  octMinus.position(octPosX+100, octPosY);
  octMinus.mousePressed(octP);




 angleMode(DEGREES);//establece a modo angulo para no tener que hacer conversión

  
}

function draw() {
  //The code in the draw() block writes our text to the screen.
  
 //c sampler.frequency.value = resButton.value();
  //filter.frequency=resButton.value();
  background(backColor);
  background(bg);
  frameRate(60); 

  // draw function is called repeatedly by the engine
 
    
    // each time draw() is called, i is incremented by one  
    i = i + 1
    
    // every 10th time, the condition is true
    if (i % 50 === 0){
      noStroke(); // fill with 50
      fill(90,0,0,30);
      ellipse(130,100,50,50);
      noStroke();
    } if(i%60===0) {
      noStroke();// all the otehr times, fill with 255
      fill(210, 0, 0,40);
      ellipse(130,100,50,60); 
      noStroke();
      if(i%80===0) {
        noStroke();// all the otehr times, fill with 255
        fill(210, 0, 0,45);
        ellipse(130,100,50,60); 
        noStroke();
      }
    }if(i%100===0) {
      noStroke();// all the otehr times, fill with 255
      fill(255, 0, 0,50);
      ellipse(120,100,50,70);
      
      
    }
    synth.modulationIndex.value = slider.value()
  synth.harmonicity.value = slider2.value()
  distort.set({ distortion: disButton.value() });
 synth.frequency.value = resButton.value();
 // feedbackDelay.delayTime.value=10;
  //feedbackDelay.feedback.value = 10;
 if(showtext==true){
  textAlign(CENTER);
  textSize(15);
  text(
    "Press the 1 - 8 Keys to Play a Scale!",
    width / 2,
    height / 2
  );
  textSize(12);
  text(
    "Click the buttons to change between oscillator types",
    width / 2,
    height / 2 + 30
  );
  }
  fill(171,0,12);
  text(oscTypeText+" \n"+"Octave"+" "+oct, 930, 80);
  fill(255,255, 255);
  textStyle(BOLDITALIC);
  textSize(14);
  
  text('Resonancia '+resButton.value()+" Hz", adslPosX-430, 295+adslPosY);
  text('Distorsión '+disButton.value(), adslPosX-430, 245+adslPosY);
  text('attack', 70+adslPosX, 295+adslPosY);
  text('decay', 205+adslPosX, 295+adslPosY);
  text('sustain', 70+adslPosX, 345+adslPosY);
  text('release', 205+adslPosX, 345+adslPosY);

  text('Wet', 535+chorusPosX-200, 115+chorusPosY);
  text('Frequency', 535+chorusPosX-200, 135+chorusPosY);
  text('Delay', 535+chorusPosX-200, 155+chorusPosY);
  text('Depth', 535+chorusPosX-200, 175+chorusPosY);
 
  text('Modulation', (width/2-10)+chorusPosX+70, 92+chorusPosY);
  text('Harmony', (width/2-10)+chorusPosX+70, 132+chorusPosY);
  text('Octave', octPosX+60, octPosY+15);

  text("Z", bPosX+10, bPosY+125);
  text("X", bPosX+15+90, bPosY+125);
  text("C", bPosX+15+180, bPosY+125);
  text("V", bPosX+15+270, bPosY+125);
  text("B", bPosX+15+360, bPosY+125);
  text("N", bPosX+15+455, bPosY+125);
  text("M", bPosX+15+544, bPosY+125);
  text(",", bPosX+15+635, bPosY+125);
  text(".", bPosX+15+728, bPosY+125);
  text("-", bPosX+15+818, bPosY+125);
  text("Q", bPosX+15+908, bPosY+125);
  text("W", bPosX+15+1000, bPosY+125);
  text("E", bPosX+15+1090, bPosY+125);
  text("R", bPosX+15+1180, bPosY+125);
  text("S", bPosX+60, bPosY-28);
  text("D", bPosX+60+91, bPosY-28);
  text("G", bPosX+60+274, bPosY-28);
  text("H", bPosX+60+360, bPosY-28);
  text("J", bPosX+60+455, bPosY-28);
  text("L", bPosX+60+635, bPosY-28);
  text("Ñ", bPosX+60+728, bPosY-28);
  text("2", bPosX+60+900, bPosY-28);
  text("3", bPosX+60+990, bPosY-28);
  text("4", bPosX+60+1080, bPosY-28);


 /* synth.envelope.attack = attack.value();
  synth.envelope.decay = decay.value();
  synth.envelope.sustain = sus.value();
  synth.envelope.release = release.value();*/
sampler.attack = attack.value();
sampler.decay = decay.value();
sampler.sustain = sus.value();
sampler.release = release.value();
  
  chorus.wet.value = wetMix.value();
  chorus.frequency.value = freqSlider.value();
  //sampler.chain(chorus.frequency.value , Tone.Destination);
  //In this instance, the delayTime property does NOT need to have a .value added to it
  chorus.delayTime = timeSlider.value();
  chorus.depth.value =depthSlider.value();

  
 
   waveForm();
    
    keyPressed();
    
   

}



function keyPressed() {//teclas a presionar
  showtext=false;
  if ((keyCode == 90)||(pressed==1)) {
    synth.triggerAttackRelease("C"+oct, 1);
    sampler.triggerAttackRelease("C"+oct, 1);
    image(pB, bPosX, bPosY, 72, 140);
  } else if ((keyCode == 88)||(pressed==2)) {
    synth.triggerAttackRelease("D"+oct, 1);
    sampler.triggerAttackRelease("D"+oct, 1);
    image(pB, bPosX+90, bPosY, 72, 140);
  } else if ((keyCode == 67)||(pressed==3)) {
    sampler.triggerAttackRelease("E"+oct, 1);
    synth.triggerAttackRelease("E"+oct, 1);
    image(pB, bPosX+180, bPosY, 72, 140);
  } else if ((keyCode == 86)||(pressed==4)) {
    sampler.triggerAttackRelease("F"+oct, 1);
    synth.triggerAttackRelease("F"+oct, 1);
    image(pB, bPosX+270, bPosY, 72, 140);
  } else if((keyCode == 66)||(pressed==5)) {
    sampler.triggerAttackRelease("G"+oct, 1);
    synth.triggerAttackRelease("G"+oct, 1);
    image(pB, bPosX+360, bPosY, 72, 140);
  } else if ((keyCode == 78)||(pressed==6)) {
    sampler.triggerAttackRelease("A"+oct, 1);
    synth.triggerAttackRelease("A"+oct, 1);
    image(pB, bPosX+455, bPosY, 72, 140);
  } else if ((keyCode == 77)||(pressed==7)) {
    sampler.triggerAttackRelease("B"+oct, 1);
    synth.triggerAttackRelease("B"+oct, 1);
    image(pB, bPosX+544, bPosY, 72, 140);
  } else if ((keyCode == 188)||(pressed==8)) {
    sampler.triggerAttackRelease("C"+oct2, 1);
    synth.triggerAttackRelease("C"+oct2, 1);
    image(pB, bPosX+635, bPosY, 72, 140);
  } else if ((keyCode == 190)||(pressed==9)) {
    sampler.triggerAttackRelease("D"+oct2, 1);
    synth.triggerAttackRelease("D"+oct2, 1); 
    image(pB, bPosX+728, bPosY, 72, 140);
  }else if ((keyCode == 189)||(pressed==10)) {
    sampler.triggerAttackRelease("E"+oct2, 1);
    synth.triggerAttackRelease("E"+oct2, 1);
    image(pB, bPosX+818, bPosY, 72, 140);
  }
  else if ((keyCode == 81)||(pressed==11)) {
    sampler.triggerAttackRelease("F"+oct2, 1);
    synth.triggerAttackRelease("F"+oct2, 1);
    image(pB, bPosX+908, bPosY, 72, 140);
  }
  else if ((keyCode == 87)||(pressed==12)) {
    sampler.triggerAttackRelease("G"+oct2, 1);
    synth.triggerAttackRelease("G"+oct2, 1);
    image(pB, bPosX+1000, bPosY, 72, 140);
  }
  else if ((keyCode == 69)||(pressed==13)) {
    sampler.triggerAttackRelease("A"+oct2, 1);
    synth.triggerAttackRelease("A"+oct2, 1);
    image(pB, bPosX+1090, bPosY, 72, 140);
  }
  else if ((keyCode == 82)||(pressed==14)) {
    sampler.triggerAttackRelease("B"+oct2, 1);
    synth.triggerAttackRelease("B"+oct2, 1);
    image(pB, bPosX+1180, bPosY, 72, 140);
  }

  else if ((keyCode == 83)||(pressed==15)) {
    sampler.triggerAttackRelease("C#"+oct, 1);
    synth.triggerAttackRelease("C#"+oct, 1);
    image(pL, lPosX, lPosY, 72, 86);
  }else if ((keyCode == 68)||(pressed==16)) {
    sampler.triggerAttackRelease("D#"+oct, 1);
    synth.triggerAttackRelease("D#"+oct, 1);
    image(pL, lPosX+92, lPosY, 72, 86)
  }else if ((keyCode == 71)||(pressed==17)) {
    sampler.triggerAttackRelease("F#"+oct, 1);
    synth.triggerAttackRelease("F#"+oct, 1);
    image(pL, lPosX+274, lPosY, 72, 86);
  }else if ((keyCode == 72)||(pressed==18)) {
    sampler.triggerAttackRelease("G#"+oct, 1);
    synth.triggerAttackRelease("G#"+oct, 1);
    image(pL, lPosX+365, lPosY, 72, 86);
  }else if ((keyCode == 74)||(pressed==19)) {
    sampler.triggerAttackRelease("A#"+oct, 1);
    synth.triggerAttackRelease("A#"+oct, 1);
    image(pL, lPosX+455, lPosY, 72, 86);
  }else if( (keyCode == 76)||(pressed==20)) {
    sampler.triggerAttackRelease("C#"+oct2, 1);
    synth.triggerAttackRelease("C#"+oct2, 1);
    image(pL, lPosX+638, lPosY, 72, 86);
  
    
  }else if( (key == "ñ")||(pressed==21)) {
    sampler.triggerAttackRelease("D#"+oct2, 1);
    synth.triggerAttackRelease("D#"+oct2, 1);
    image(pL, lPosX+728, lPosY, 72, 86);
  }
  else if( (keyCode == 50)||(pressed==22)) {
    sampler.triggerAttackRelease("F#"+oct2, 1);
    synth.triggerAttackRelease("F#"+oct2, 1);
    image(pL, lPosX+898, lPosY, 72, 86);
  }
  else if( (keyCode == 51)||(pressed==23)) {
    sampler.triggerAttackRelease("G#"+oct2, 1);
    synth.triggerAttackRelease("G#"+oct2, 1);
    image(pL, lPosX+988, lPosY, 72, 86);
  }
  else if( (keyCode == 52)||(pressed==24)) {
    sampler.triggerAttackRelease("A#"+oct2, 1);
    synth.triggerAttackRelease("A#"+oct2, 1);
    image(pL, lPosX+1080, lPosY, 72, 86);
  }
  desactivarFuncion();
}
function desactivarFuncion() {
  // Desactivar la ejecución de la función temporalmente
  // ...

  // Reactivar la función después de un segundo
  setTimeout(function() {
    // Reactivar la ejecución de la función
    // ...
  }, 10000); // 1000 milisegundos (1 segundo)
  image(pL, lPosX+1080, lPosY+1000, 72, 86);
  image(pB, lPosX+1080, lPosY+1000, 72, 86);
}
function mousePressed() {
  showtext = false;
 /* 
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    var dx = mouseX - x;
    var dy = mouseY - y;
    offsetAngle = atan2(dy, dx) - angle;
  }*/if (dist(mouseX, mouseY, bPosX+90, 20+bPosY) < 80) {
    pressed=1;
}
if (dist(mouseX, mouseY, bPosX+150,20+ bPosY) < 80) {
  pressed=2;//
}
if (dist(mouseX, mouseY, bPosX+220, 20+bPosY) < 80) {
  pressed=3;//
}
if ((dist(mouseX, mouseY, bPosX+350, 20+bPosY) < 80)) {
  pressed=4;//  
}
if (dist(mouseX, mouseY, bPosX+400,20+ bPosY) < 80) {
  pressed=5;
}
if (dist(mouseX, mouseY, bPosX+520,20+ bPosY) < 80) {
  pressed=6;
}
if (dist(mouseX, mouseY, bPosX+550, 20+bPosY) < 80) {
  pressed=7;
}
if (dist(mouseX, mouseY, bPosX+650, 20+bPosY) < 80) {
  pressed=8;
}
if (dist(mouseX, mouseY, bPosX+750,20+ bPosY) < 80) {
  pressed=9;
}
if (dist(mouseX, mouseY, bPosX+850,20+ bPosY) < 80) {
  pressed=10;
}
if (dist(mouseX, mouseY, bPosX+950, 20+bPosY) < 80) {
  pressed=11;
}
if (dist(mouseX, mouseY, bPosX+1050, 20+bPosY) < 80) {
  pressed=12;
}
if (dist(mouseX, mouseY, bPosX+1150, 20+bPosY) < 80) {
  pressed=13;
}
if (dist(mouseX, mouseY, bPosX+1250, 20+bPosY) < 80) {
  pressed=14;
}
if (dist(mouseX, mouseY, bPosX+60, bPosY-40) < 40) {
  pressed=15;
}
if (dist(mouseX, mouseY, bPosX+150, bPosY-40) < 40) {
  pressed=16;
}
if (dist(mouseX, mouseY, bPosX+350, bPosY-40) < 40) {
  pressed=17;
}
if (dist(mouseX, mouseY, bPosX+440, bPosY-40) < 40) {
  pressed=18;
}
if (dist(mouseX, mouseY, bPosX+510, bPosY-40) < 40) {
  pressed=19;
}
if (dist(mouseX, mouseY, bPosX+710, bPosY-40) < 40) {
  pressed=20;
}
if (dist(mouseX, mouseY, bPosX+810, bPosY-40) < 40) {
  pressed=21;
}
if (dist(mouseX, mouseY, bPosX+1010, bPosY-40) < 40) {
  pressed=22;
}
if (dist(mouseX, mouseY, bPosX+1100, bPosY-40) < 40) {
  pressed=23;
}
if (dist(mouseX, mouseY, bPosX+1210, bPosY-40) < 40) {
  pressed=24;
}
}
function changeFilter(){
  /*synth.filter.Q=100;
  synth.filter.type="lowpass";
  synth.filter.rolloff=-48;*/
  distort.set({ distortion: filterButton.value() });
}

function changePiano(){
  synth.volume.value = -48;
  sampler.volume.value=0;
oscTypeText = "Piano";
/*if(piano==true){
  synth.volume.value = -48;
  piano=false;
  
  sampler.volume.value=0;

}else{synth.volume.value = 0;
  sampler.volume.value=-48;
  piano=true;
  changeSine();
}*/
}
function changeSine() {//función que cambia el oscilador por defecto
  synth.oscillator.type = "sine";//cambia a senoidal
  backColor = [227, 191, 129];//cambia el array que se usa para el color de fondo
  oscTypeText = "Sine";//cambia descripción
}

function changeSquare() {
  synth.volume.value = 0;
  sampler.volume.value=-48;
  synth.oscillator.type = "square";
  backColor = [177, 39, 55];
  oscTypeText = "Square";
}

function changeTri() {
  synth.volume.value = 0;
  sampler.volume.value=-48;
  synth.oscillator.type = "triangle";
  backColor = [252, 115, 53];
  oscTypeText = "Triangle";
}

function changeSaw() {
  synth.volume.value = 0;
  sampler.volume.value=-48;
  synth.oscillator.type = "sawtooth";
  backColor = [156, 188, 165];
  oscTypeText = "Sawtooth";
}


function mouseReleased() {
  // Stop dragging
  dragging = false;
  pressed=0;
  image(pL, lPosX+728, 10000, 72, 86);
  image(pB, lPosX+728, 10000, 72, 86);
}
function keyReleased(){
  pressed=0;

  keyCode=0;
  key=0;
  image(pL, lPosX+728, 10000, 72, 86);
  image(pB, lPosX+728, 10000, 72, 86);
}

function octP(){

  oct++;
  oct2++;
}
function octM(){

  oct--;
  oct2--;
}
function waveForm(){
  stroke(4);
  noFill()
  stroke('red');
  if(oscTypeText=="Sine"){
   
    
    translate(1060,160)
    beginShape()
     
     for(var i=0; i<359;i++){
       var x=map(i-40,0,100, 130, 50)
       var y = sin(i*1)*50
       vertex(x,y)
     }
     endShape()
     translate(-1060,-160)}

     if(oscTypeText=="Square"){
       translate(1000,120)
      beginShape()
      vertex(30, 75);
      vertex(30, 20);
      vertex(85, 20);  
      vertex(85, 75);
      vertex(135, 75);
      endShape()
      translate(-1000,-120)
    }

     //image(pB, 46, 615, 72, 140);
     if(oscTypeText=="Triangle"){
        translate(1000,120)
        beginShape()
        vertex(30, 75);
        vertex(85, 20);
        vertex(135, 75);
        endShape()
        translate(-1000,-120)
    
  }
     if(oscTypeText=="Sawtooth"){
    stroke('red');
    translate(1000,120)
    beginShape()
    vertex(30, 75);
    vertex(85, 20);
    vertex(85, 75);
    vertex(135, 20);
    vertex(135, 75);
    endShape()
    translate(-1000,-120)
    }
   if(oscTypeText=="Piano"){
      translate(1000,120)
     beginShape()
     vertex(0, 0);  
     vertex(0, 75);
     vertex(30, 75);
     vertex(30, 0);
     vertex(60, 0);  
     vertex(60, 75);
     vertex(90, 75);
     vertex(90, 0);
     vertex(0, 0);
     vertex(0, 75);
     vertex(90, 75);
     
     vertex(0 + 90, 75);
     vertex(30 + 90, 75);
     vertex(30 + 90, 0);
     vertex(60 + 90, 0);
     vertex(60 + 90, 75);
     vertex(90 + 90, 75);
     vertex(90 + 90, 0);
     vertex(0 + 90, 0);
     vertex(0 + 90, 75);
     vertex(90 + 90, 75);
     endShape()
    
     translate(-1000,-120)
     
   }
    stroke('black');
}


    
    /*
     image(pB, bPosX+728, bPosY, 72, 140);
    image(pB, bPosX+818, bPosY, 72, 140);
    image(pB, bPosX+908, bPosY, 72, 140);
    image(pB, bPosX+1000, bPosY, 72, 140);
    image(pB, bPosX+1090, bPosY, 72, 140);
    image(pB, bPosX+1180, bPosY, 72, 140);



    image(pL, lPosX+896, lPosY, 72, 86);
    image(pL, lPosX+990, lPosY, 72, 86);
    image(pL, lPosX+1080, lPosY, 72, 86);*/

/*
Tiny Language Model User Interface


MIT License

Copyright (c) 2023 Mayo-Smith & Parteners, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/



/*
=========================================================
Get Canvas
=========================================================
*/
const canvas = document.getElementById('canvas1');
const ctx = canvas1.getContext('2d');

/*
=========================================================
Load Images
=========================================================
*/

const imgK = new Image(); // Create a new image object
imgK.src = 'img/key.png'; // Set the source of the image
const imgGuessButtonUp = new Image(); // Create a new image object
imgGuessButtonUp.src = 'img/Guess-Next.png'; // Set the source of the image
const imgGuessButtonDown = new Image(); // Create a new image object
imgGuessButtonDown.src = 'img/Guess-Next-DownState.png'; // Set the source of the image
//const imgRBlank = new Image(); // Create a new image object
//imgRBlank.src = 'img/Radio-Button-Blank.png'; // Set the source of the image
const imgBack = new Image(); // Create a new image object
imgBack.src = 'img/background.png'; // Set the source of the image

/*
=========================================================
SPECIFY LAYOUT
=========================================================
*/

//radio buttons
const rb1=[243, 120];
const rb2=[428, 120];
const rb3=[470, 330];

//key location
const KEY_LOC_X = 280;
const KEY_LOC_Y = 470;

//guess button location
const guessLoc=[520,200];

//output text location
const OUT_LOC_X = 530;
const OUT_LOC_Y = 360;

//wait timer location
const WTIMER_LOC_X = 309;
const WTIMER_LOC_Y = 450;

//nnet weight lines
const X_OFFSET = 50; 

//neuron locations
const inputLayerX = 150;
const hiddenLayerX = 300;
const outputLayerX = 450;
const nSpaceX = 150;
const nSpaceY = 50;


//Input Layer Format
const ilFormat = [
    {
        color: '#734D5F',
        radius: 12,
        x: 205,
        y: 150,
    },
    {
        color: '#734D5F',
        radius: 12,
        x: 390,
        y: 150,
      }

  ];

//Hidden Layer Format
const hlFormat = [
    {
        color: '#734D5F',
        radius: 12,
        x: 220,
        y: 250,
    },
    {
        color: '#734D5F',
        radius: 12,
        x: 270,
        y: 250,
    },
    {
        color: '#734D5F',
        radius: 12,
        x: 320,
        y: 250,
    },
    {
        color: '#734D5F',
        radius: 12,
        x: 370,
        y: 250,
      }

  ];

//Output Layer Format
const olFormat = [
    {
        color: '#734D5F',
        radius: 12,
        x: 450,
        y: 350,
    }
];



//Radio Buttons (click on words to test model)
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    console.log('Mouse clicked at', x, y);
    
    if(radio1.isClicked(x,y)==true){
      radio1.toggleState()
      console.log(radio1.state);
      radio1.draw(ctx);  }
  
    if(radio2.isClicked(x,y)==true){
      radio2.toggleState()
      console.log(radio2.state);
      radio2.draw(ctx);  }
  
  });
  
  //Canvas Push Buttons
  canvas.addEventListener("mousedown", function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (guessButton.isClicked(x,y)==true) {
      guessButton.downState = true;
      guessButton.drawDown(ctx);
    }
  });
  
  canvas.addEventListener("mouseup", function(event) {
    if (guessButton) {
      if( guessButton.downState == true)
        testPenny();
  
      guessButton.downState = false;
      guessButton.drawUp(ctx);
  
    }
  });

  function getRadioStates() {

    return [radio1.state? 1 : 0, radio2.state? 1 : 0];

}

//function that calculates weight line color
function getColorGradient(weight) {


    nWeight = normalizeWeight(weight);
    const min = 0;
    const max = 1;
    const endColor = [97, 103, 140]; // #61678C in RGB format
    const startColor = [242, 158, 109]; // #F29E6D in RGB format
  
    // Calculate the percentage of the value relative to the range between min and max
    const percent = (nWeight - min) / (max - min);
  
    // Interpolate the RGB values between startColor and endColor based on the percentage
    const r = startColor[0] + Math.round((endColor[0] - startColor[0]) * percent);
    const g = startColor[1] + Math.round((endColor[1] - startColor[1]) * percent);
    const b = startColor[2] + Math.round((endColor[2] - startColor[2]) * percent);
  
    // Convert the RGB values to a hex color code
    const hexColor = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  
    return hexColor;
  }





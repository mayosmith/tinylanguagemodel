/*
Tiny Language Model Utilities


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

//code executed after page loads
window.onload = function() {
    console.log('Tiny Language Model has finished loading.');
    const aT = getVocab('adjective');
    const nT = getVocab('noun');
    const vT = getVocab('verb');
    
    
    
      radio1 = new RadioButton(aT[0], aT[1], rb1[0], rb1[1], 140, 45, false);
      radio2 = new RadioButton(nT[0], nT[1], rb2[0], rb2[1], 140, 45, false);
      guessButton = new PushButton(imgGuessButtonUp, imgGuessButtonDown, guessLoc[0], guessLoc[1], 100, 60);
      waitTimer = new WaitTimer(WTIMER_LOC_X, WTIMER_LOC_Y, 18, "#f2e0d5", TRAINING_RUNS);  
      trainingStatus = new TxtLabel("Model not trained", 354,460, 100, 30);
      trainingTracker = new TrainingTracker(0);
    
      redrawScreen();
    
    
};


 /*
 ================================================
CLASSES
 ================================================
 */


/*
--------------------------------------------
Class: PushButton
Description: everything push button
--------------------------------------------
*/  
class PushButton{
  constructor (imgDown, imgUp, x, y, width, height){
    this.imgDown = imgDown;
    this.imgUp = imgUp;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.downState = false;
  }
  drawDown(ctx){
    ctx.drawImage(this.imgDown, this.x, this.y, this.width, this.height);
  }
  drawUp(ctx){
    ctx.drawImage(this.imgUp, this.x, this.y, this.width, this.height);
  }

  isClicked(x, y) {
  
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }


}

/*
--------------------------------------------
Class: RadioButton
Description: everything radio button
--------------------------------------------
*/  

class RadioButton {
    constructor(textOff, textOn, x, y, width, height, initialState = false) {
      this.textOff = textOff;
      this.textOn = textOn;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.state = initialState;
    }
  
    draw(ctx) {
      const text = this.state ? this.textOn : this.textOff;
      ctx.clearRect(this.x, this.y-this.height, this.width, this.height + 10);
      ctx.font = "18px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(text, this.x, this.y);

    }
  
    toggleState() {
      this.state = !this.state;
    }
  
    isClicked(x, y) {

      return (
        x >= this.x &&
        x <= this.x + this.width &&
        y >= this.y - this.height&&
        y <= this.y
      );
    }
  }


/*
--------------------------------------------
Class: TrainingTracker
Description: keeps track of training runs
--------------------------------------------
*/  

class TrainingTracker{

  constructor (runs){
    this.runs = runs;
  }

  get(){
    return this.runs;
  }
  increment(n){
    this.runs += n;
  }
  clear(){
    this.runs=0;
  }

}



/*
--------------------------------------------
Class: TxtLabel
Description: handles labels
--------------------------------------------
*/

class TxtLabel{
      constructor(text, x, y, width, height){
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
      }

      draw(ctx) {
        ctx.clearRect(this.x, this.y-this.height, this.width, this.height);
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(this.text, this.x, this.y);
      }


}

/*
--------------------------------------------
Class: WaitTimer
Description: handles timer and timer display
--------------------------------------------
*/

  class WaitTimer{
      constructor(x,y, radius, color, range){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.range = range;
      }
      update(ctx, percent){
        percent = Math.max(0, Math.min(this.range, percent));
  
        // Calculate the angle of the pie slice based on the percentage
        var angle = (percent / this.range) * 360;
      
      
        // Calculate the starting and ending points of the pie slice
        var startX = this.x + Math.cos((angle - 90) * Math.PI / 180) * 25;
        var startY = this.y + Math.sin((angle - 90) * Math.PI / 180) * 25;
        var endX = this.x + Math.cos((-90) * Math.PI / 180) * 25;
        var endY = this.y + Math.sin((-90) * Math.PI / 180) * 25;
      
    
      
        // Draw the pie slice
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(startX, startY);
        ctx.arc(this.x, this.y, this.radius, (angle - 90) * Math.PI / 180, (-90) * Math.PI / 180, true);
        ctx.lineTo(this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      clear(ctx){
        ctx.clearRect(this.x-this.radius, this.y-this.radius, 2 * this.radius, 2 * this.radius);
      }

  }


 /*
 ================================================
FUNCTIONS
 ================================================
 */

  function getCorpus(){
    // Get the textarea element
    const textarea = document.getElementById("corpus");
    
    // Get the value of the textarea
    const text = textarea.value;
    
    // Split the text by lines
    const lines = text.split("\n");
    
    // Initialize an empty array
    const words = [];
    
    // Loop through each line and get the first three words
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const firstThreeWords = line.split(" ").slice(0, 2);
      words.push(firstThreeWords);
    }
    
    
    }

/*
--------------------------------------------
Function: getVocab
Description: Get Vocabulary Words

Parameters: 
type, type of word to retreive
--------------------------------------------
*/
  function getVocab(type){

    words = [];
   
    const adjInput = document.getElementById(type); // Replace 'inputElementId' with the actual ID of the input element
    const adjValue = adjInput.value.trim(); // Get the value of the input element
    words = adjValue.split(' '); // Split the value into words
    return words;
}


/*
--------------------------------------------
Function: createCorpus
Description: Creates corpus from vocabulary

Parameters: 
none
--------------------------------------------
*/

function createCorpus(){

const adjective = getVocab('adjective');
const noun = getVocab('noun');  
const verb = getVocab('verb');


//compose training text
textLine = adjective[0]+" " + noun[0] + " " + verb[1] + "\n";
textLine += adjective[1]+" " + noun[0] + " " + verb[0] + "\n";
textLine += adjective[0]+" " + noun[1] + " " + verb[0] + "\n";
textLine += adjective[1]+" " + noun[1] + " " + verb[1] + "\n";

const textarea = document.getElementById("corpus");
textarea.value = textLine;
}

/*
--------------------------------------------
Function: word2Val
Description: Converts word to 1 or 0

Parameters: 
word, word to convert
type, word embedding/word order
--------------------------------------------
*/


function word2Val(word,type){

    vocab = getVocab(type);

    if(word==vocab[0])
        return 0;
    if(word==vocab[1])
        return 1;

    return -1;   

}

/*
--------------------------------------------
Function: val2Word
Description: Converts 1 or 0 to word

Parameters: 
val, value to convert
type, word embedding/word order
--------------------------------------------
*/

function val2Word(val,type){

    vocab = getVocab(type);

    return vocab[val];

}  

/*
--------------------------------------------
Function: drawText
Description: Draws text

Parameters: 
text, text to draw
x, x location
y, y location
--------------------------------------------
*/
function drawText(text, x, y){

    ctx.fillStyle = "black";
    ctx.clearRect(x, y-40, 100 , 50);
  
    ctx.font = "18px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(text, x, y);
  
  
  }
  

// letters 
const letters = 'abcdefghijklmnopqrstuvwxyz';
// make array from letters 
let lettersArray = Array.from(letters); 
// select letters container 
let lettersContainer = document.querySelector('.the-letters');
lettersArray.forEach(letter => {
    let span = document.createElement('Span');
    let spanText =document.createTextNode(letter);
    span.appendChild(spanText);
    span.className = 'letter-box'
    lettersContainer.appendChild(span);
});
const words = {
    programming : ["PHP", "Javascript", "Go", "Scala", "fortran", "R", "Mysql", "Python"],
    movies : ["Prestige", "Inception", "Parasite", "Interstiller", "Wiplash", "Memento", "Up", "Prisoners"],
    people : ["Albert Einstein", "Karl Marx", "Guevara", "Cleopatra", "Ghandi"],
    countries : ["Syria", "Palastine", "Russia", "China", "Egypt", "Argentina"]
}
let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random()*allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValues = words[randomPropName];

let randomValueNumber = Math.floor(Math.random()*words[randomPropName].length);
let randomValueValue = randomPropValues[randomValueNumber];

let randomValueValueLength = 0;
let theChosenWord = Array.from(randomValueValue);
for (let i = 0; i < randomValueValue.length; i++) {
    if (theChosenWord[i] !== ' ') {
        randomValueValueLength++;
    }
}

document.querySelector('.game-info .category span').innerHTML = randomPropName;
// select letters guess element 
let lettersGuessContainer = document.querySelector('.letters-guess');
// convert chosen word to array 
let lettersAndSpace = Array.from(randomValueValue);

lettersAndSpace.forEach(letter => {
    let emptySpan = document.createElement('Span');
    if (letter === " ") {
        emptySpan.className = 'with-space';
    }
    lettersGuessContainer.appendChild(emptySpan);
});
let guessSpans = document.querySelectorAll(".letters-guess span");

let wrongAttempts = 0;
let correctAttempts = 0;
let theDraw = document.querySelector(".hangman-draw")

document.addEventListener("click", (e) => {
    let theStatus = false;
    if(e.target.className === 'letter-box') {
        e.target.classList.add("clicked");
    
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        theChosenWord.forEach((wordLetter, wordIndex) => {
        if(theClickedLetter == wordLetter) {
            theStatus = true;
            guessSpans.forEach((span, spanIndex) => {
                if (wordIndex === spanIndex) {
                    span.innerHTML = theClickedLetter;
                    correctAttempts++;
                }
            });  
            }
        });
        if (theStatus !== true){
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            document.getElementById("fail").play();
            if (wrongAttempts === 8) {
                endGame();
                lettersContainer.classList.add("finished");
            }
        } 
        else {
            document.getElementById("success").play();
            if (correctAttempts === randomValueValueLength) {
                winGame();
            }
        }
    }
});
function endGame(){
    let div = document.createElement('Div');
    let divText = document.createTextNode(`Game Over, the answer is : ${randomValueValue}`);
    div.appendChild(divText);
    div.className = 'popup';
    document.body.appendChild(div);
}
function winGame(){
    let div = document.createElement('Div');
    let divText = document.createTextNode(`Good Job, the answer is : ${randomValueValue}`);
    div.appendChild(divText);
    div.className = 'popup';
    document.body.appendChild(div);
}
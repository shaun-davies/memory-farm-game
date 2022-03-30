const infoButton = document.getElementById("info-button");
const startButton = document.getElementById("start-button");
const scoreCounter = document.getElementById("score");
const icons = ['chicken', 'cow', 'pig', 'sheep'];

let sequence = [];
let playerSequence = [];
let click = -1;
let score = 0;
let highScore = 0;

/*adds event listener to button to start the game*/
startButton.addEventListener('click', (e) => {
    scoreCounter.innerText = "0";
    sequence = [];
    playerSequence = [];
    if(score <= 0) {
    newSequence();
    }
});

/*This function generates a new icon and inserts it into the sequence, increments the score and plays a sound corresponding to the newIcon */
function newSequence() {
    score++;
    $("#score").text(score);

    let newIcon = icons[Math.floor(Math.random() * icons.length)];
    sequence.push(newIcon);
    playSound(newIcon);
    showSequence(newIcon);
};
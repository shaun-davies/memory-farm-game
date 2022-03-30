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

/*This function gets the element id corresponding to the randomly generated icon name 
and adds CSS styling to it*/
function showSequence(newIcon) {
    console.log(newIcon);
    document.getElementById(newIcon).classList.add("zoom");
    setTimeout(function () {
        document.getElementById(newIcon).classList.remove("zoom");
    }, 350);
};

/*Adds click listener and plays audio when clicked*/
$(".image").click(function(playerClicked) {
    click++;
    let icon = playerClicked.target.id;
    playSound(icon);
    checkSequence(icon);
});

/*plays audio to corresponding icon*/
function playSound(newIcon) {
    let sound = `assets/audio/${newIcon}.m4a`;
    let audio = new Audio(sound);
    audio.play();
} 

/*checks sequences for equality, ends game if false*/
function checkSequence(icon) {
    playerSequence.push(icon);
    if(icon == sequence[click]) {
        if(playerSequence.length == sequence.length) {
            setTimeout(function() {
                playerSequence = [];
                click = -1;
                newSequence();
            }, 1500); 
        }
    }else {
        alert("Game Over, click Start to try again.");
            playerSequence = [];
            sequence = [];
            if (score > highScore) {
                highScore = score;
                $("#high-score").text(score);
            }
            score = 0;
            click = -1;
    }
}

/*adds event listener to button to show information*/
infoButton.addEventListener('click', (e) => {
    alert("Test your memory skills by listening and watching, each round will add a new sound to the sequence. Repeat the sequence and try to beat your high score! Click Start to play.")
});

/* Adds event listener to images and stores chosen icon in an array */
function playerTurn() {
    for (let image of document.getElementsByClassName("image")) {
        let listener = image.addEventListener('click', (e) => {
            let playerClick = e.target.getAttribute("id");
            playerSequence.push(playerClick);
            console.log(playerSequence);
            sequenceTest();
        });
    };

};

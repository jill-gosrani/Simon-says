var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var gameStart = true;
var userClickedPattern =[];
var level = 0;
function nextSequence(){
    userClickedPattern = [];
    var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level = level + 1;
    $("h1").text("Level "+level);
}

$(".btn").on("click",function (event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
});

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass('pressed');
    }, 100);
}
$(document).keypress(function(){
    if(gameStart){
        nextSequence();
        gameStart = false;
    }
    $("h1").text("Level  "+level);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("sucess");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);   
          }
    }else{
        console.log("wrong");
        var wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
         setTimeout(function () {$("body").removeClass("game-over");}, 200);
         $("h1").text("Game Over, Press Any Key to Restart.");
         startOver();
    }
}
function startOver(){
    level = 0;
    gamePattern = [];
    gameStart = true;
}
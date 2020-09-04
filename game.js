var level = 0;
var started = false;
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["green", "red", "yellow", "blue"];

$(".btn").click(function(){
  //Button click is processed only when game is started
  if(started) {
    var userChosedColour = $(this).attr("id");
    userClickedPattern.push(userChosedColour);
    playSound(userChosedColour);
    animatePress(userChosedColour);
    checkAnswer(userClickedPattern.length -1);
  }
});

function checkAnswer(seq){
  if(userClickedPattern[seq] === gamePattern[seq]) {
    //matched the colour of that seq
    //Now check whether or not user clicked number of colours are equal to the colours in the game pattern
    if(userClickedPattern.length === gamePattern.length){
      //call nextSequence after 1000 milliseconds delay
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    console.log("gamePattern:        " + gamePattern);
    console.log("userClickedPattern: " + userClickedPattern);

    $("#level-title").text("Game Over, Press any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  started = false;
  gamePattern.splice(0, gamePattern.length);
}

function nextSequence(){
  //clear the userClickedPattern
  userClickedPattern.splice(0, userClickedPattern.length);
  level++;
  $("#level-title").text("Level " + level);
  var randomNum = Math.round(Math.random()*(buttonColours.length -1));
  var randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(btnColour) {
  var audio = new Audio("sounds/" + btnColour + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function(event) {
  //Key press is only processed when game is not started
  if(!started){
    nextSequence();
    started = true;
  }
});

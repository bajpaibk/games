var level = 0;
var started = false;
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["green", "red", "yellow", "blue"];

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if(isMobile.any()){
  $("#level-title").text("Press Start button to start the game");
} else {
  //Start button is not needed on the laptop screen
  $("#start").hide();
}

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

    showResult();

    if(isMobile.any()){
      $("#level-title").text("Game Over, Press Start button to Restart");
    } else {
      $("#level-title").text("Game Over, Press a Key to Restart");
    }

    startOver();
  }
}

function showResult(){
  var line1 = "Game got over at Level: " + level;
  var line2 = "Exptected:   " + gamePattern;
  var line3 = "You pressed: " + userClickedPattern;

  $("#result").html(line1 + "<br/>" + line2 + "<br/>" + line3).addClass("result");
}

function startOver(){
  level = 0;
  started = false;
  gamePattern.splice(0, gamePattern.length);
  if(isMobile.any()) {
    $("#start").removeClass("btn-disable");
  }
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
    if(isMobile.any()){
      $("#start").addClass("btn-disable");
    }
    $("#result").text(" ").removeClass("result");
  }
});

$("#start").click(function(event) {
  //Key press is only processed when game is not started
  if(!started){
    nextSequence();
    started = true;
    if(isMobile.any()) {
      $("#start").addClass("btn-disable");
    }
    $("#result").text(" ").removeClass("result");
  }
});

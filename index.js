// Required Variables
var highscore=0;
var clicker;
var level;
var move_number;
var moves=[];
var bts=["green","red","yellow","blue"];
var sounds=[new Audio("sounds/green.mp3"),new Audio("sounds/red.mp3"),new Audio("sounds/yellow.mp3"),new Audio("sounds/blue.mp3"),new Audio("sounds/wrong.mp3")];
start();

// Game resetter
function start(){
    $(".container").hide();
    $(".front").show();
    clicker=false;
    level=0;
    move_number=0;
    moves=[];

}

// Only allow key press when level is 0
$(".btn").on("click",function(){
    if(!level){
        $(".front").hide();
        $(".container").show();
        play();
    }
});

// Click listener for buttons
$("button").on("click",function(){
    if(clicker)
        check(this.id);
}); 

// Level up after every right pattern
function levelUp(){
    $("#level-text").text("Level: "+ (++level));
}

// Play computer pattern
function play(){
    $(".turn").text("Turn: Computer");
    levelUp();
    moves.push(Math.floor(Math.random()*4));
    for(var i=0;i<moves.length;i++)
        AnimC(i);  
}

// Computer Animation with delay between button presses
function AnimC(i){
    setTimeout(function(){
    sounds[i].play();
    $("#"+bts[moves[i]]).addClass("flash");
    setTimeout(function(){
        document.querySelector("#"+bts[moves[i]]).classList.remove("flash")},200);
        if(i==moves.length-1){               //Enable clicker after computer completes sequence
            clicker=true;
            setTimeout(function(){
                $(".turn").text("Turn: Player");
            },400)   
        }
    },400*i); 
}

// User button Animation with no delay between button presses
function AnimH(i){
    sounds[i].play();
    $("#"+bts[moves[i]]).addClass("flash");
    setTimeout(function(){
        document.querySelector("#"+bts[moves[i]]).classList.remove("flash")},50);
}

// Checks if user click is right
function check(id){
    if(bts[moves[move_number]]==id){
            AnimH(move_number++);           //Animate current press
            if(move_number==moves.length){  //If all buttons are pressed right
                if(level>highscore)         //Check for High Score
                    $("#highscore").text("Highscore: "+(++highscore));
                clicker=false;             //Disable clicker after sequence ends
                move_number=0;              //reset move index
                setTimeout(function(){      //Add delay between user move and next computer pattern
                    play();                 //Call play function for next sequence
                },900);
            }
        }
        else{                               //If any button is wrongly pressed, stop game.
            sounds[4].play();
            $("#msg").text("Game Over! Score: "+(level-1));
            start();
        }
}
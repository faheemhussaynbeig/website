// Required Variables
var highscore=0;
var clicker;
var level;
var move_number;
var moves=[];
var bts=["green","red","yellow","blue"];
start();

// Game resetter
function start(){
    clicker=false;
    level=0;
    move_number=0;
    moves=[];

}

// Only allow key press when level is 0
$(".btn").on("click",function(){
    if(!level){
        $(".front").hide();
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
    $("h1").text("Level "+ (++level));
}

// Play computer pattern
function play(){
    levelUp();
    moves.push(Math.floor(Math.random()*4));
    for(var i=0;i<moves.length;i++)
        AnimC(i);
    clicker=true;
       
}

// Computer Animation with delay between button presses
function AnimC(i){
    setTimeout(function(){
    (new Audio("sounds/"+bts[moves[i]]+".mp3")).play();
    $("#"+bts[moves[i]]).addClass("flash");
    setTimeout(function(){
        document.querySelector("#"+bts[moves[i]]).classList.remove("flash")},200);
    },400*i);
}

// User button Animation with no delay between button presses
function AnimH(i){
    (new Audio("sounds/"+bts[moves[i]]+".mp3")).play();
    $("#"+bts[moves[i]]).addClass("flash");
    setTimeout(function(){
        document.querySelector("#"+bts[moves[i]]).classList.remove("flash")},200);
}

// Checks if user click is right
function check(id){
    if(bts[moves[move_number]]==id){
            AnimH(move_number++);           //Animate current press
            if(move_number==moves.length){  //If all buttons are pressed right
                if(level>highscore)         //Check for High Score
                    $("#highscore").text("Highscore: "+(++highscore));
                clicker=false;             //Disable button after sequence ends
                move_number=0;              //reset move index
                setTimeout(function(){      //Add delay between user move and next computer pattern
                    play();                 //Call play function for next sequence
                },900);
            }
        }
        else{                               //If any button is wrongly pressed, stop game.
            (new Audio("sounds/wrong.mp3")).play();
            $("h1").text("Game Over! Press Start to play again. Highscore: "+(level-1));
            $(".front").show();
            start();
        }
}
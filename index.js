var level=0;
var move_number=0;
var moves=[];
var bts=["green","red","yellow","blue"];

start();

function start(){
level=0;
move_number=0;
moves=[];
bts=["green","red","yellow","blue"];
$(document).on("keypress",function(){
    $(document).unbind("keypress");
    play();
});
}

function levelUp(){
    $("h1").text("Level "+ (++level));
}

function play(){
    levelUp();
    moves.push(Math.floor(Math.random()*4));
    for(var i=0;i<moves.length;i++)
        AnimC(i);
    $("button").on("click",function(){
        check(this.id);
    });    
}

function AnimC(i){
    setTimeout(function(){
    (new Audio("sounds/"+bts[moves[i]]+".mp3")).play();
    $("#"+bts[moves[i]]).addClass("flash");
    setTimeout(function(){
        document.querySelector("#"+bts[moves[i]]).classList.remove("flash")},200);
    },400*i);
}

function AnimH(i){
    (new Audio("sounds/"+bts[moves[i]]+".mp3")).play();
    $("#"+bts[moves[i]]).addClass("flash");
    setTimeout(function(){
        document.querySelector("#"+bts[moves[i]]).classList.remove("flash")},200);
}

function check(id){
    if(bts[moves[move_number]]==id){
            AnimH(move_number++);
            if(move_number==moves.length){
                move_number=0;
                $("button").off("click");
                setTimeout(function(){
                    play();
                },900);
            }
        }
        else{
            (new Audio("sounds/wrong.mp3")).play();
            $("button").off("click");
            $("h1").text("Game Over! Press any key to restart.");
            start();
        }
}
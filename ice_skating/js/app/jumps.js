var imageFolder = 'res/img/jumps/';
var jumps = [
    {
        name : 'axel',
        count : 4,
    },
    {
        name : 'flip',
        count : 4,
    }, 
    {
        name : 'loop',
        count : 5,
    }, 
    {
        name : 'lutz',
        count : 4,
    }, 
    {
        name : 'salchow',
        count : 4,
    },
    {
        name : 'toeloop',
        count : 6,
    }
];
var allGifs = getAllGifs();
var currentGif;
var score = 0;

$(document).ready(function(){
    newGif();
    $(".button").click(function(e){
        var type_clicked = e.target.id;
        var type_actual = currentGif.type;
        if(type_clicked == type_actual){
            rightGuess(type_clicked);
        }else{
            wrongGuess(type_clicked);
        }
        $("#score").text(score);
    });
});


function wrongGuess(type){
    $('#rightOrWrong').text("WRONG (-1 point)").css("color","red");
    score--;
};

function rightGuess(type){
    $('#rightOrWrong').text("RIGHT (+1 point)").css("color","green");
    score++;
    newGif();
};

function newGif(){
    currentGif = selectRandomGif();
    var imageElement = document.createElement("img");
    imageElement.src = currentGif.url;
    $(imageElement).css("height", "400px");
    $("#currentGif").html(imageElement);
}

function selectRandomGif(){
    return allGifs[Math.floor(Math.random() * allGifs.length)];
}


function getAllGifs(){
    var allGifs = new Array();
    for(var i = 0; i < jumps.length ; i++){
        var jump = jumps[i];
        for(var j = 1 ; j <= jump.count ; j++){
            var gifURL = imageFolder + jump.name + '_' + j + '.gif';
            allGifs.push({
                'url' : gifURL,
                'type' : jump.name,
            });
        }
    }
    return allGifs;
}


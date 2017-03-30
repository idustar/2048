/**
 * Created by dustar on 2016/11/23.
 */

$(document).ready(function() {
    init()
    prepare(false)
    window.$$=window.Zepto = Zepto
})

function init(){
    highest = 0
    if(window.innerWidth > 625){
        gridContainerWidth = 500
        cellSpace = 20
        cellSideLength = 100
    } else {
        gridContainerWidth = window.innerWidth * 0.8
        cellSpace = gridContainerWidth * 0.04
        cellSideLength = gridContainerWidth * 0.2
    }

    $('#gamecontainer').css('width',gridContainerWidth-2*cellSpace)
    $('#gamecontainer').css('height',gridContainerWidth-2*cellSpace)
    $('#gamecontainer').css('padding',cellSpace)
    $('#gamecontainer').css('border-radius',0.02*gridContainerWidth)

    $('.cell').css('width',cellSideLength)
    $('.cell').css('height',cellSideLength)
    $('.cell').css('border-radius',0.1*cellSideLength)
    $('.number').css('width',cellSideLength)
    $('.number').css('height',cellSideLength)

    for (var i=0;i<4;i++)
        for (var j=0;j<4;j++) {
            var Cell = $("#cell-"+ i +"-" + j)
            Cell.css('top', cellSideLength*i+cellSpace*(i+1))
            Cell.css('left', cellSideLength*j+cellSpace*(j+1))
        }

    $('#b1').click(function () {
        restart()
    })

    $("#b1").on("tap",function(){
        restart()
    });

    $("#b2").on("tap",function(){
        highest=score;$('#highest').text(highest)
        new TipBox({type:'success',str:'和你辉煌的过去say goodbye吧！',hasBtn:false, setTime:1500});
    });
}

function prepare(restart) {
    score = 0
    board = new Array()
    eliminable = new Array()
    for(var i=0 ;i<4;i++) {
        board[i]=new Array()
        eliminable[i]=new Array()
        for (var j=0;j<4;j++) {
            board[i][j]=0
            eliminable[i][j]=true
        }
    }
    console.debug("hi, welcome!")
    if (restart || (!restart && !getGameCookie()))
    {
        produceNewNumber()
        produceNewNumber()
    }
    setTimeout("updateNum()",200)
    updateScore(0)
    $("#highest").text(highest)
}

function updateNum() {
    $(".number").remove();
    for(var i=0;i<4;i++) {
        for(var j=0;j<4;j++) {
            $("#gamecontainer").append('<div class="number" id="number-'+i+'-'+j+'"></div>')
            var theNumberCell = $("#number-"+ i +"-" + j)
            if(!(board[i][j]>1)){
                theNumberCell.css('width','0px')
                theNumberCell.css('height','0px')
                theNumberCell.css('top',getPosX(i,j)+cellSideLength*0.5)
                theNumberCell.css('left',getPosY(i,j)+cellSideLength*0.5)
                theNumberCell.text("")
            }else{
                theNumberCell.css('width',cellSideLength)
                theNumberCell.css('height',cellSideLength)
                theNumberCell.css('top',getPosX(i,j))
                theNumberCell.css('left',getPosY(i,j))
                theNumberCell.css('background-color',getNumberBackgroundcolor(board[i][j]))
                theNumberCell.css('border-radius',0.1*cellSideLength)
                theNumberCell.css('color',getNumberColor(board[i][j]))
                theNumberCell.text(board[i][j])
                theNumberCell.css('font-size',getNumberFontSize(board[i][j]))
            }
            eliminable[i][j]=true
            theNumberCell.css('line-height',cellSideLength+'px')

        }
    }
}

function updateScore(newScore) {
    score+=newScore
    $("#score").animate({opacity:'0.5'},100,function(){$("#score").text(""+score); updateHighest();})
    $("#score").animate({opacity:'1'},100)
}

function updateHighest() {
    console.debug("highest:"+highest+" score:"+score)
    if (score>highest) {
        highest = score;
        $("#highest").animate({opacity:'0.5'},100,function(){$("#highest").text(""+highest);})
        $("#highest").animate({opacity:'1'},100)
    }
}

function showMoveAnimation(x1,y1,x2,y2) {
    console.debug(x1+','+y1+'->'+x2+','+y2+' | '+board[x1][y1])
    var numberCell = $("#number-" + x1 + "-" + y1)
    numberCell.animate({top: getPosX(x2, y2), left: getPosY(x2, y2)}, 200, function () {
        console.debug("anim: "+x1+','+y1+'->'+x2+','+y2+' | '+board[x1][y1])
    })
}

$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37:
            event.preventDefault()
            if (move(board, "left"))
                setTimeout("produceNewNumber()", 220)
            break
        case 38:
            event.preventDefault()
            if (move(board, "up"))
                setTimeout("produceNewNumber()", 220)
            break
        case 39:
            event.preventDefault()
            if (move(board, "right"))
                setTimeout("produceNewNumber()", 220)
            break
        case 40:
            event.preventDefault();
            if (move(board, "down"))
                setTimeout("produceNewNumber()", 220);
            break
        default:
            break
    }
})
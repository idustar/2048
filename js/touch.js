/**
 * Created by dustar on 2016/11/25.
 */

documentWidth=window.screen.availWidth;


document.addEventListener('touchstart',function(event){
    event.preventDefault();
    event.stopPropagation();
    if(event.target.type == 'range') return;
    startx=event.touches[0].pageX;
    starty=event.touches[0].pageY;
    //if (startx > $("#b1").top && startx < $("#b1").bottom && starty > $("#b1").left && starty < $("#b1").right)
      //  restart()

});

document.addEventListener('touchmove'),function (event) {
    event.stopPropagation();
}

document.addEventListener('touchend',function(event){
    event.preventDefault();
    event.stopPropagation();
    if(event.target.type == 'range') return;
    endx=event.changedTouches[0].pageX;
    endy=event.changedTouches[0].pageY;

    var deltax=endx-startx;
    var deltay=endy-starty;
    if(Math.abs(deltax)<0.3*documentWidth&&Math.abs(deltay)<0.3*documentWidth){
        return;
    }
    if(Math.abs(deltax)>Math.abs(deltay)){
        if(deltax>0){
            if (move(board, "right"))
                setTimeout("produceNewNumber()", 220)

        }else{
            if (move(board, "left"))
                setTimeout("produceNewNumber()", 220)
        }
    }else{
        if(deltay>0){
            if (move(board, "down"))
                setTimeout("produceNewNumber()", 220)

        }else{

            if (move(board, "up"))
                setTimeout("produceNewNumber()", 220)

        }

    }
});

/**
 * Created by dustar on 2016/11/24.
 */

function gameover() {
    setTimeout("prepare(true)",1700);
    new TipBox({type:'error',str:score+'分！您已无路可退！',hasBtn:false, setTime:1500, callback: function() {
        //prepare(true);
    }})

}

function restart() {
    setTimeout("prepare(true);",3200);
   // myTips("请重新开始你的2048之旅","success")
    new TipBox({type:'load',str:"正在为您重新生成游戏..",setTime:1500,callBack:function(){
        new TipBox({type:'success',str:'请开启您的2048之旅！',hasBtn:false, setTime:1500,callback:function () {
            //prepare(true);
        }});
    }});

}
function produceNewNumber() {
    console.debug("ha1")
    if (isFull()) {
        return false
    }
    var x = Math.floor(Math.random()*4)
    var y = Math.floor(Math.random()*4)
    while (board[x][y]!=0) {
        x = Math.floor(Math.random()*4)
        y = Math.floor(Math.random()*4)
    }
    board[x][y] = getRamdom()
    showNewNumber(x,y)
    if (isFull()) {
        console.debug("full1")
        if (!moveable())
            setTimeout("gameover()",1000)
        return false
    }
    setGameCookie()

}

function showNewNumber(x,y) {
    numberCell = $("#number-" + x + "-" + y);
    numberCell.css('background-color', getNumberBackgroundcolor(board[x][y]))
    numberCell.css('color', getNumberColor(board[x][y]))
    numberCell.css('font-size', getNumberFontSize(board[x][y]))
    numberCell.css('border-radius', 0.02*gridContainerWidth)
    numberCell.css('top',cellSideLength/2+getPosX(x, y))
    numberCell.css('left',cellSideLength/2+getPosY(x, y))
    numberCell.text(board[x][y])
    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPosX(x, y),
        left: getPosY(x, y)
    }, 200)
}

function move(board, direction) {
    //print(direction)
    console.debug("move: "+direction)
    if (!moveable_d(direction)) {
        return false
    }
    switch (direction) {
        case 'left':
            for (var i = 0; i < 4; i++)
                for (var j = 1; j < 4; j++)
                    if (board[i][j] != 0)
                        for (var k = 0; k < j; k++) {
                            co = isConnected(i,j,k,direction)
                            console.debug("move-check "+direction+": "+i+','+j+','+k+' connect:'+co+' n1:'+board[i][j]+" n2:"+board[i][k]+" el:"+eliminable[i][k])
                            if (co && board[i][k]==0) {
                                showMoveAnimation(i, j, i, k)
                                board[i][k] = board[i][j]
                                board[i][j] = 0
                                break
                            }
                            else if (co && board[i][j]==board[i][k] && eliminable[i][k]) {//if(board[i][k]==board[i][j]&& noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k])
                                showMoveAnimation(i, j, i, k)
                                board[i][k] *= 2
                                board[i][j] = 0
                                eliminable[i][k] = false
                                updateScore(board[i][k])
                                break
                            }
                        }
            break
        case 'up':
            for (var i = 1; i < 4; i++)
                for (var j = 0; j < 4; j++)
                    if (board[i][j] != 0)
                        for (var k = 0; k < i; k++) {
                            co = isConnected(i,j,k,direction)
                            console.debug("move-check "+direction+": "+i+','+j+','+k+' connect:'+co+' n1:'+board[i][j]+" n2:"+board[i][k]+" el:"+eliminable[i][k])
                            if (co && board[k][j]==0) {
                                showMoveAnimation(i, j, k, j)
                                board[k][j] = board[i][j]
                                board[i][j] = 0
                                break
                            }
                            else if (co && board[i][j]==board[k][j] && eliminable[k][j]) {//if(board[i][k]==board[i][j]&& noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k])
                                showMoveAnimation(i, j, k, j)
                                board[k][j] *= 2
                                board[i][j] = 0
                                eliminable[k][j] = false
                                updateScore(board[k][j])
                                break
                            }
                        }
            break
        case 'right':
            for (var i = 0; i < 4; i++)
                for (var j = 2; j >=0; j--)
                    if (board[i][j] != 0)
                        for (var k = 3; k > j; k--) {
                            co = isConnected(i,j,k,direction)
                            console.debug("move-check "+direction+": "+i+','+j+','+k+' connect:'+co+' n1:'+board[i][j]+" n2:"+board[i][k]+" el:"+eliminable[i][k])
                            if (co && board[i][k]==0) {
                                showMoveAnimation(i, j, i, k)
                                board[i][k] = board[i][j]
                                board[i][j] = 0
                                break
                            }
                            else if (co && board[i][j]==board[i][k] && eliminable[i][k]) {//if(board[i][k]==board[i][j]&& noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k])
                                showMoveAnimation(i, j, i, k)
                                board[i][k] *= 2
                                board[i][j] = 0
                                eliminable[i][k] = false
                                updateScore(board[i][k])
                                break
                            }
                        }
            break
        case 'down':
            for (var i = 2; i >= 0; i--)
                for (var j = 0; j < 4; j++)
                    if (board[i][j] != 0)
                        for (var k = 3; k > i; k--) {
                            co = isConnected(i,j,k,direction)
                            console.debug("move-check "+direction+": "+i+','+j+','+k+' connect:'+co+' n1:'+board[i][j]+" n2:"+board[i][k]+" el:"+eliminable[i][k])
                            if (co && board[k][j]==0) {
                                showMoveAnimation(i, j, k, j)
                                board[k][j] = board[i][j]
                                board[i][j] = 0
                                break
                            }
                            else if (co && board[i][j]==board[k][j] && eliminable[k][j]) {//if(board[i][k]==board[i][j]&& noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k])
                                showMoveAnimation(i, j, k, j)
                                board[k][j] *= 2
                                board[i][j] = 0
                                eliminable[k][j] = false
                                updateScore(board[k][j])
                                break
                            }
                        }
            break
    }
    setTimeout("updateNum()",210)
    return true
}

function isConnected(x, y, z, direction) {
    switch (direction) {
        case 'left':
            for(var i=z+1;i<y;i++)
                if(board[x][i]!=0)
                    return false
            return true
            break
        case 'up':
            for(var i=z+1;i<x;i++)
                if(board[i][y]!=0)
                    return false
            return true
            break
        case 'right':
            for(var i=y+1;i<z;i++)
                if(board[x][i]!=0)
                    return false
            return true
            break
        case 'down':
            for(var i=x+1;i<z;i++)
                if(board[i][y]!=0)
                    return false
            return true
            break
    }
}


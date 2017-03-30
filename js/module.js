/**
 * Created by dustar on 2016/11/24.
 */

//获取随机数
function getRamdom() {
    if (Math.random() > 0.5)
        return 2
    else
        return 4
}

//返回方块对应的坐标
function getPosX(i,j) {
    return cellSideLength*i+cellSpace*(i+1)
}

function getPosY(i,j) {
    return cellSideLength*j+cellSpace*(j+1)
}

//获取不同数字对应的颜色和字号
function getNumberBackgroundcolor(num) {
    switch (num) {
        case 2048:
            return "#26d63b";
        case 2:
            return "#0cf1c4";
        case 4:
            return "#edf93e";
        case 8:
            return "#f97800";
        case 16:
            return "#ff8f9e";
        case 32:
            return "#54a4c7";
        case 64:
            return "#ff7dea";
        case 128:
            return "#a1d650";
        case 256:
            return "#c1bdb5";
        case 512:
            return "#ff3155";
        case 1024:
            return "#c5a8e3";
        case 16384:
            return "#0056ff";
        case 4096:
            return "#9c00ff";
        case 8192:
            return "#00b519";
        default:
            return "#494c4a";
    }
}

function getNumberColor(num) {
    switch (num) {
        case 2048:
            return "#0a8448";
        case 2:
            return "#02a295";
        case 4:
            return "#978900";
        case 8:
            return "#9a3504";
        case 16:
            return "#b43540";
        case 32:
            return "#1c517f";
        case 64:
            return "#bb09a5";
        case 128:
            return "#14b400";
        case 256:
            return "#3a3938";
        case 512:
            return "#810013";
        case 1024:
            return "#8c55a1";
        case 16384:
            return "#f3f3ff";
        case 4096:
            return "#fbf6ff";
        case 8192:
            return "#fbfbff";
        default:
            return "#fbfbff";
    }
}

function getNumberFontSize(num) {
    if (num<10)
        return cellSideLength*0.8 + 'px'
    else if (num<100)
        return cellSideLength*0.7 + 'px'
    else if (num<1000)
        return cellSideLength*0.5 + 'px'
    else if (num<10000)
        return cellSideLength*0.4 + 'px'
    else
        return cellSideLength*0.3 + 'px'
}

function isFull() {
    for(var i=0;i<4;i++)
        for (var j=0;j<4;j++)
            if(board[i][j]==0)
                return false;
    console.debug("fulll")
    return true;
}

function moveable_dxy(direction,x,y) {
    console.debug(direction+" moveable?"+x+","+y)
    switch (direction) {
        case 'up':
            if (x==0)
                return false
            else if (board[x][y]!=0 && (board[x-1][y]==0 || board[x-1][y]==board[x][y]))
                return true
            else
                return false
            break
        case 'down':
            if (x==3)
                return false
            else if (board[x][y]!=0 && (board[x+1][y]==0 || board[x+1][y]==board[x][y]))
                return true
            else
                return false
            break
        case 'left':
            if (y==0)
                return false;
            else if (board[x][y]!=0 && (board[x][y-1]==0 || board[x][y-1]==board[x][y]))
                return true
            else
                return false
            break
        case 'right':
            if (y==3)
                return false;
            else if (board[x][y]!=0 && (board[x][y+1]==0 || board[x][y+1]==board[x][y]))
                return true
            else
                return false
            break
        default:
            break
    }
    return false
}

function moveable_d(direction) {
    for (var i=0;i<4;i++)
        for (var j=0;j<4;j++)
            if (moveable_dxy(direction,i,j))
                return true
    return false
}

function moveable() {
    console.debug("momomo")
    for (var i=0;i<4;i++)
        for (var j=0;j<4;j++) {
            if (moveable_dxy("left", i, j) || moveable_dxy("up", i, j) || moveable_dxy("right", i, j) || moveable_dxy("down", i, j))
                return true
            console.debug("i"+","+"j"+" unmoveable")
        }
    return false
}
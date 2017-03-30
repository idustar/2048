/**
 * Created by dustar on 2016/11/24.
 */

/*
var Cookie = function(name, value, options) {
    // 如果第二个参数存在
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            // 设置失效时间
            options.expires = 30;
        }
        var expires = '';
        // 如果存在事件参数项，并且类型为 number，或者具体的时间，那么分别设置事件
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + options.path : '', // 设置路径
            domain = options.domain ? '; domain=' + options.domain : '', // 设置域
            secure = options.secure ? '; secure' : ''; // 设置安全措施，为 true 则直接设置，否则为空

        // 把所有字符串信息都存入数组，然后调用 join() 方法转换为字符串，并写入 Cookie 信息
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // 如果第二个参数不存在
        var CookieValue = null;
        if (document.cookie && document.cookie != '') {
            var Cookie = document.cookie.split(';');
            for (var i = 0; i < Cookie.length; i++) {
                var Cookie = (Cookie[i] || "").replace(/^\s+|\s+$/g, "");
                if (Cookie.substring(0, name.length + 1) == (name + '=')) {
                    CookieValue = decodeURIComponent(Cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return CookieValue;
    }
}
*/
function getGameCookie() {
    var bo = parseInt($.cookie('saved'))
    //alert(document.cookie)
    console.debug("getGameCookie saved:"+bo)
    if (bo!=null && bo=="1") {
        //alert("success!")
        for (var i=0;i<4; i++)
            for (var j=0;j<4;j++)
                board[i][j] = parseInt($.cookie("data-"+i+"-"+j))
        highest = parseInt($.cookie("highest"))
        //if (!(highest>=0)) highest = 0
        score = parseInt($.cookie("score"))
        return true
    }
    return false
}

function setGameCookie() {
    console.debug("setGameCookie "+score)
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            $.cookie("data-" + i + "-" + j, board[i][j], { expires: 7 });
    $.cookie("highest", highest,{ expires: 7 });
    $.cookie("score", score, { expires: 7 });
    $.cookie("saved", "1",{ expires: 7 });
    //alert(document.cookie)
}
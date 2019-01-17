/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-01-14 11:43:50 
 * @Last Modified by: Twinkleee
 * @Last Modified time: 2019-01-14 15:47:06
 */

 


 
//var token = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Imx1b2JpbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJsdW9iaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDb25zdW1lciIsImV4cCI6MTU0MTg0MTQ0NSwiaXNzIjoibmV3Ym94IiwiYXVkIjoibmV3Ym94LmF1ZGllbmNlIn0.MgBS87rtlucU-f1M5E03tDEhHZSrX_B0ocRImAnLzHQ";

function payment(json) {
    $.ajax({
        url: "/order/create",
        type: "post",
        contentType: "application/json; charset=utf-8",
        data: json, //,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        success: function (data) {
            window.location.href = "/order/index/" + data.id;
        },
        error: function (data) {
            if (data.status === 401) {
                alert("请登录");
            } else {
                alert("发生未知错误");
            }
        }
    });
}

(function () {
    var token = localStorage.getItem('token');
    if (token == null) {
        document.getElementById('login_states').innerHTML = '<li class="dl"><a href="/manage/#login"  title="登陆">登陆</a></li><li class="zc"> <a href="/manage/#register" title="注册">注册</a></li>'
    } else {
        if (token.length > 0) {
            if (timex() > 0) {
                document.getElementById('login_states').innerHTML = '<li class="dl"><a href="/manage/">进入管理中心</a></li>'
            }
            if (timex() <= 0) {
                refresh_token();
            }
        } else {
            document.getElementById('login_states').innerHTML = '<li class="dl"><a href="/manage/#login"  title="登陆">登陆</a></li><li class="zc"><a href="/manage/#register" title="注册">注册</a></li>'
        }
    }
})();


function timex() {
    var startTime = new Date();
    var endTime = localStorage.getItem('expires');
    if (endTime == null) {
        return false;
    } else {
        //console.log(new Date(endTime).getTime() - startTime.getTime());
        return new Date(endTime).getTime() - startTime.getTime();
    }
};

//刷新Token请求
function refresh_token(fn) {
    var that = this;
    if (localStorage.getItem('token') && localStorage.getItem('token').length > 0) {
        $.post("/api/token/refresh", {
            Token: localStorage.getItem('token')
        }, function (res) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('expires', res.data.expires);
            document.getElementById('login_states').innerHTML = '<li class="dl"><a href="/manage/">进入管理中心</a></li>'
        }).error(function () {
            document.getElementById('login_states').innerHTML = '<li class="dl"><a href="/manage/#login"  title="登陆">登陆</a></li><li class="zc"><a href="/manage/#register" title="注册">注册</a></li>'
        });
    } else {
        document.getElementById('login_states').innerHTML = '<li class="dl"><a href="/manage/#login"  title="登陆">登陆</a></li><li class="zc"><a href="/manage/#register" title="注册">注册</a></li>'
    }

};



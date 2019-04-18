function RSA(plaintext) {
    var before = new Date();
    var rsa = new RSAKey();
    var n = 'D1EC51E7CEA07CB3233ADA6009006EF3EBF89EFD5CF77AAD211051D008077DC7142872B8C36EE971D4B368C79C13A6BBCB89B551A8308C68F71764C1519DEAD90B560E126B365375700CC5A2E6CF81E2A0FEEA31B53C1F8D3F3AE522DF9AB19B5C0C391D997D6DE56807328B9BBD5F6D08EA47614060177E12F65BDB95D5D6E3';
    var e = '10001';
    rsa.setPublic(n, e);
    var currentTime = new Date()
    var timestamp = currentTime.getTime();
    var plain_dict = new Object();
    plain_dict['timestamp'] = parseInt(timestamp / 1000, 10);
    plain_dict['password'] = plaintext;
    var res = rsa.encrypt(JSON.stringify(plain_dict));
    return res;
}
window.fbAsyncInit = function() {
    FB.init({
        appId: '215774602705215',
        cookie: true,
        xfbml: true,
        version: 'v2.12'
    });

    FB.AppEvents.logPageView();

};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js#xfbml=1&version=v2.12&autoLogAppEvents=1";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



function loginWithFacebook(url = '') {
    FB.login(function(response) {
        if (response.status == "connected") {
            $.post('dang-nhap', {accessToken: response.authResponse.accessToken}, function() {
                if (!url)
                    window.location.reload();
                else 
                    window.location = url;
            });
        }
    });
}


$('button#charge').click(function() {
    let pin = $('#pin').val();
    let serial = $('#serial').val();
    let card_type = $('#card-type').val();
    if (card_type < 1) {
        swal('Có lỗi xảy ra', 'Bạn chưa chọn loại thẻ !', 'error');
    } else if (serial.length < 6) {
        swal('Có lỗi xảy ra', 'Số seri không hợp lệ !', 'error');
    } else if (pin.length < 6) {
        swal('Có lỗi xảy ra', 'Mã thẻ không hợp lệ !', 'error');
    } else {
        $(this).html('ĐANG NẠP THẺ...');
        $.post('/recharge/card_charging', {
            pin: pin,
            seri: serial,
            card_type: card_type
        }, function(data) {
            let sTitle = 'Nạp thẻ thành công';
            let sType = 'success';
            if (data.code == 1) {
                sTitle = 'Có lỗi xảy ra';
                sType = 'error';
            }

            swal({
                title: sTitle,
                type: sType,
                text: data.msg
            }, function() {
                if (data.isNotLogin) loginWithFacebook();
            });

            $('button#charge').html('NẠP THẺ');
        }, 'json');
    }
});


var fsBner = {
    init: function () {
        fsBner.events();
    },
    events: function () {
        $('.slhdbner').swiper({
            slidesPerView: 1,
            centeredSlides: true,
            paginationClickable: true,
            preventClicks: false,
            spaceBetween: 1,
            autoplay: 4000,
            autoplayDisableOnInteraction: false,
        });
    }
};
fsBner.init();

function showPopupAcc(acc) {
    swal({
        title: "Tài Khoản Số #" + acc,
        text: "Bạn có chắc chắn muốn giao dịch tài khoản này ?",
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function() {
        $.get('account/buy/' + acc, function(data) {
            if (data.status == 0) {
                $.post('api/check_login', {
                    user: data.user,
                    pass: data.pass,
                    rsapass: RSA(data.pass)
                }, function() {
                    swal({
                        title: 'Giao dịch hoàn tất',
                        type: 'success',
                        text: 'Mua thành công tài khoản #' + acc
                    }, function() {
                        if (data.redirect) window.location = data.redirect;
                        else window.location.reload();
                    });
                });
            } else {
                swal({
                    title: 'Có lỗi xảy ra',
                    type: 'error',
                    text: data.message
                }, function() {
                    if (data.isNotLogin) loginWithFacebook();
                    else if (data.redirect) window.location = data.redirect;
                    else window.location.reload();
                });
            }
        }, 'json');
    });
}

$('.sl-icmenu').click(function () {
    $('.sl-menu').toggleClass('slshowmn');
});

$('.slchgame').swiper({
    slidesPerView: 5,
    paginationClickable: true,
    preventClicks: false,
    spaceBetween: 20,
    scrollbarHide: false,
    scrollbarDraggable: true,
    scrollbar: '.slchgame .swiper-scrollbar',
    breakpointsInverse: true,
    breakpoints: {
        992: {
            slidesPerView: 3
        }
    }
});
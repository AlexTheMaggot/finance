$(window).on('load', function () {
    $('#auth_form').removeClass('auth_none')
    setTimeout(function () {
        $('#preloader').addClass('preloader_invisible');
        $('#auth_form').removeClass('auth_invisible')
    }, 2000);
    setTimeout(function () {
        $('#preloader').css('display', 'none');
    }, 2500);
})

$('#auth_form').submit(function (e) {
    e.preventDefault();
    $('#reason_field').html('')
    const response = fetch('/api/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            method: "Login",
            content: {
                username: $('#input_login').val(),
                password: $('#input_pass').val(),
            }
        }),
    }).then(function (data) {
        data.json().then(function (mydata) {
            if (mydata.result === 'success') {
                document.location.href = ('/')
            }
            else {
                if (mydata.reason === 'WrongUser') {
                    $('#reason_field').html('<p class="mt-2">Неправильный логин</p>')
                    $('#reason_field').removeClass('reason-field_closed')
                    setTimeout(function () {
                        $('#reason_field').addClass('reason-field_closed')
                    }, 2000)
                }
                else if (mydata.reason === 'WrongPassword') {
                    $('#reason_field').html('<p class="mt-2">Неправильный пароль</p>')
                    $('#reason_field').removeClass('reason-field_closed')
                    setTimeout(function () {
                        $('#reason_field').addClass('reason-field_closed')
                    }, 2000)
                }
            }
        });
    });
})
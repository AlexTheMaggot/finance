$(window).on('load', function () {
    $('#main').removeClass('auth_none')
    setTimeout(function () {
        $('#preloader').addClass('preloader_invisible');
        $('#main').removeClass('auth_invisible')
    }, 2000);
    setTimeout(function () {
        $('#preloader').css('display', 'none');
    }, 2500);
})
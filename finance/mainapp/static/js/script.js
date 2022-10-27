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
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => navigator.serviceWorker.ready.then((worker) => {
        worker.sync.register('syncdata');
      }))
      .catch((err) => console.log(err));
}
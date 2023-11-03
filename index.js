$(function () {
  $('.video, .upload').click(function () {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');

    if ($(this).hasClass('video')) {
      $('.video-content').removeClass('hidden');
      $('.upload-content').addClass('hidden');
    } else {
      $('.video-content').addClass('hidden');
      $('.upload-content').removeClass('hidden');
    }
  });

  var ws;

  //连接服务器
  $('#connect').click(function () {
    ws = new WebSocket($('#url').val());
    ws.onopen = function () {
      log('成功连接到' + $('#url').val());
    };
    ws.onmessage = function (e) {
      ws.onclose = function () {
        ws = null;
      };
      return false;
    };
  });
});

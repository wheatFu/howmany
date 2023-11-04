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

  $('#addFileBtn').click(function () { $('#fileUpload').click() })

  $('#image-holder').on('click','.remove-icon', function(el) {
    console.log('123123',$(el.currentTarget).parentsUntil('#image-holder'))
    $(el.currentTarget).parentsUntil('#image-holder').remove()
  })

  $('#fileUpload').on('change', function () {
    //获取上传文件的数量
    var countFiles = $(this)[0].files.length;
    console.log(countFiles)

    var imgPath = $(this)[0].value;
    var img = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
    var image_holder = $('#image-holder');
    image_holder.children().not(":first").remove();

    if (img == 'gif' || img == 'png' || img == 'jpg' || img == 'jpeg') {
      if (typeof FileReader != 'undefined') {
        for (var i = 0; i < countFiles; i++) {
          var reader = new FileReader();
          reader.onload = function (e) {
            $('<div>', { class: 'img-container'})
              .append($('<img />', {
                src: e.target.result,
                class: 'thumb-image',
              }))
              .append($('<img />', {src: './assets/delete_filled.png', class: 'remove-icon'}))
              .appendTo(image_holder);
          };

          image_holder.show();
          reader.readAsDataURL($(this)[0].files[i]);
        }
      } else {
        alert('你的浏览器不支持FileReader！');
      }
    } else {
      alert('请选择图像文件。');
    }
    $(this).val(null);
  });

  connectWs();
});

function connectWs() {
  var ws;
  ws = new WebSocket('ws://10.109.8.111:8000');
  ws.onopen = function () {
    console.log('成功连接到' + ws);
  };
  ws.onmessage = function (res) {
    console.log('res,' + res);
  };

  ws.onclose = function () {
    ws = null;
  };
}

$( document ).ready(function() {
  // UUID 생성 주소
  var url = 'test.do';

  // UUID 생성받아서 input에 넣기

  // $.ajax({
  //   type: "get",
  //   url: encodeURI(url),
  //   dataType: "json",
  //   async: false,
  //   error: function error(request, status, _error) {
  //     console.log("code: " + request.status);
  //     console.log("message: " + request.responseText);
  //     console.log("error: " + _error);
  //   },
  //   success: function success(result) {
  //     console.log(result);
  //     document.getElementById('uuid').value = result;
  //   },
  // });
  
	// QR코드 스캐너 활성화
	qrScannerOn();
	
});

function qrScannerOn() {
  var video = document.createElement("video");
  var canvasElement = document.getElementById("scanbox");
  var canvas = canvasElement.getContext("2d");
  var loadingMessage = document.getElementById("can_box");
  var outputContainer = document.getElementById("output");
  var outputMessage = document.getElementById("outputMessage");
  var outputData = document.getElementById("outputData");

  function drawLine(begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  // Use facingMode: environment to attemt to get the front camera on phones
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
    video.srcObject = stream;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.play();
    requestAnimationFrame(tick);
  });

  function tick() {
    // loadingMessage.innerText = "⌛ Loading video..."
    loadingMessage.style.background = 'none';
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      loadingMessage.hidden = true;
      canvasElement.hidden = false;
      outputContainer.hidden = false;

      canvasElement.height = video.videoHeight * 0.9;
      canvasElement.width = video.videoWidth * 0.9;
      console.log(canvasElement.height, canvasElement.width)
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

      var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
        drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
        drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
        drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
        outputMessage.hidden = true;
        outputData.parentElement.hidden = false;
        outputData.innerText = code.data;

        $('#kickId').val(code.data);
      // 읽으면 종료
        return;
      } else {
        outputMessage.hidden = false;
        outputData.parentElement.hidden = true;
      }
    }
    requestAnimationFrame(tick);
  }
}

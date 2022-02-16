"use stricrt"

var gElCanvas;
var gCtx;

function onInit() {
    gElCanvas = document.querySelector('.meme-canvas');
    gCtx = gElCanvas.getContext('2d')
    drawImg();
    onWriteText();
    renderGallery();
    // resizeCanvas();
}


function drawImg() {
    var img = new Image();
    img.src = 'images/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function onWriteText() {
    var elTextLine = document.querySelector('input[name="text-line"]');
    elTextLine.addEventListener('keyup', function () {
        gCtx.save();
        var textLine = elTextLine.value;
        gCtx.fillStyle = "#ffffff";
        gCtx.font = '2.8rem poppins';
        gCtx.fillText(textLine, 100, 50);
        gCtx.restore();
    })
}



// function resizeCanvas() {
//     var elContainer = document.querySelector('.canvas-container')
//     gElCanvas.width = elContainer.offsetWidth
//     gElCanvas.height = elContainer.offsetHeight
// }
"use stricrt"

var gElCanvas;
var gCtx;
var elTextLine = document.querySelector('input[name="text-line"]');
elTextLine.addEventListener('keyup', onChangeText);

function onInit() {
    gElCanvas = document.querySelector('.meme-canvas');
    gCtx = gElCanvas.getContext('2d')
    renderGallery();
    // resizeCanvas();
}

function onChangeText(){
    setLineText();
    renderMeme();
}

function renderMeme(){
    drawImg();
}

function drawImg() {
    var img = new Image();
    img.src = getImgSelectedUrl();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText();
    }
}

function getLineSettings(){

    var meme = getMeme();
    var color = meme.lines[meme.selectedLineIdx].color;
    var size = meme.lines[meme.selectedLineIdx].size;
    var font = meme.lines[meme.selectedLineIdx].font;
    var txt = meme.lines[meme.selectedLineIdx].txt;

    return{
        color,
        size,
        font,
        txt
    }
}

function drawText() {

    var meme = getLineSettings();
        gCtx.fillStyle = meme.color;
        gCtx.font = `${meme.size}px ${meme.font}`;
        gCtx.fillText(meme.txt.toUpperCase(), 100, 70);
        gCtx.strokeText(meme.txt.toUpperCase(), 100, 70);
}

function onIncrease(){
    increaseSize();
    renderMeme();
}

function onDecrease(){
    decreaseSize();
    renderMeme();
}







// function resizeCanvas() {
//     var elContainer = document.querySelector('.canvas-container')
//     gElCanvas.width = elContainer.offsetWidth
//     gElCanvas.height = elContainer.offsetHeight
// }
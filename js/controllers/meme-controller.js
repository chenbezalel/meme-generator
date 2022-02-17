"use stricrt"

var gElCanvas;
var gCtx;
var elTextLine = document.querySelector('input[name="text-line"]');
elTextLine.addEventListener('keyup', onChangeText);
var gPos;

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
    var meme = getMeme;
    var img = new Image();
    img.src = getImgSelectedUrl();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        renderText();
    }
}

function renderText(){
    var meme = getMeme();
    meme.lines.forEach((line, idx) => drawText(idx, line.txt, line.pos.x, line.pos.y))
}


// function getLinePos(){
//     var meme = getMeme();
//     if (meme.selectedLineIdx === 0) gPos = {x: 100, y:70}
//     if (meme.selectedLineIdx === 1) gPos = {x: 100, y: gElCanvas.width - 70}
//     return gPos;
// }

function getLineSettings(idx){
    var meme = getMeme();
    var color = meme.lines[meme.selectedLineIdx].color;
    var size = meme.lines[meme.selectedLineIdx].size;
    var font = meme.lines[meme.selectedLineIdx].font;
    var align = meme.lines[meme.selectedLineIdx].align;
    var stroke = meme.lines[meme.selectedLineIdx].stroke;
    var txt = meme.lines[meme.selectedLineIdx].txt;
    // var pos = getLinePos();

    return{
        color,
        size,
        font,
        align,
        txt
        // pos
    }
}

function drawText(idx, txt, x, y) {
    var meme = getLineSettings(idx);
    gCtx.fillStyle = meme.color;
    gCtx.font = `${meme.size}px ${meme.font}`;
    gCtx.fillText(txt.toUpperCase(), x, y);
    gCtx.strokeText(txt.toUpperCase(), x, y);
}

function onIncrease(){
    increaseSize();
    renderMeme();
}

function onDecrease(){
    decreaseSize();
    renderMeme();
}

// function onChangeAlign(dir){
//     changeAlign(dir);
//     renderMeme();
// }

function onAddLine(){
    var meme = getMeme();
    meme.selectedLineIdx++;
    document.querySelector('input[name="text-line"]').value = '';
    gCtx.save();
}


// function resizeCanvas() {
//     var elContainer = document.querySelector('.canvas-container')
//     gElCanvas.width = elContainer.offsetWidth
//     gElCanvas.height = elContainer.offsetHeight
// }
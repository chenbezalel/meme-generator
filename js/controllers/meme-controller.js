"use stricrt"

var gElCanvas;
var gCtx;
var gPos;


function onInit() {
    gElCanvas = document.querySelector('.meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    createImgs();
    createMeme();
    renderGallery();
    addListenes();
    getLinesPos();
    resizeCanvas();
}

function addListenes() {
    var elTextLine = document.querySelector('input[name="text-line"]');
    elTextLine.addEventListener('keyup', onChangeText);
}

function onSearch(){
    renderGallery();
}

function onChangeText() {
    setLineText();
    renderMeme();
}

function renderMeme() {
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

function renderText() {
    var meme = getMeme();
    meme.lines.forEach((line, idx) => drawText(idx, line.txt, line.pos.x, line.pos.y))
}

function getLineSettings(idx) {
    var meme = getMeme();
    var color = meme.lines[idx].color;
    var size = meme.lines[idx].size;
    var font = meme.lines[idx].font;
    var stroke = meme.lines[idx].stroke;
    var txt = meme.lines[idx].txt;
    // var pos = getLinePos();

    return {
        color,
        size,
        font,
        stroke,
        txt
        // pos
    }
}

function drawText(idx, txt, x, y) {
    var meme = getLineSettings(idx);
    gCtx.fillStyle = meme.color;
    gCtx.strokeStyle = meme.stroke;
    gCtx.font = `${meme.size}px ${meme.font}`;
    gCtx.fillText(txt.toUpperCase(), x, y);
    gCtx.strokeText(txt.toUpperCase(), x, y);
}

function onIncrease() {
    increaseSize();
    renderMeme();
}

function onDecrease() {
    decreaseSize();
    renderMeme();
}

function onChangeColor(elColor) {
    changeColor(elColor.value);
    renderMeme();
}

function onChangeStroke(elStroke) {
    changeStroke(elStroke.value);
    console.log(elStroke.value);
    renderMeme();
}


function onAddLine() {
    var meme = getMeme();
    meme.selectedLineIdx++;
    meme.lines.push(setDefultSettings());
    getLinesPos();
    document.querySelector('input[name="text-line"]').value = '';
    renderMeme();
}

function getLinesPos() {
    var meme = getMeme();
    var currIdx = meme.selectedLineIdx;
    var lines = meme.lines;
    lines[currIdx].pos.x = gElCanvas.width / 6;
    
    if (currIdx === 0) {
        lines[currIdx].pos.y = gElCanvas.height * 0.1;
    } else if (currIdx === 1) {
        lines[currIdx].pos.y = gElCanvas.height * 0.9;
    } else  {
        lines[currIdx].pos.y = gElCanvas.height / (getRandomInt(2, 7));
        console.log(lines[currIdx].pos.y);
    }
}

function onSwitch() {
    var meme = getMeme();
    if (meme.selectedLineIdx === meme.lines.length - 1) meme.selectedLineIdx = 0;
    else meme.selectedLineIdx += 1;
    var currMeme = meme.lines[meme.selectedLineIdx];
    document.querySelector('input[name="text-line"]').value = currMeme.txt;
}


function onDelete() {
    var meme = getMeme();
    meme.lines[meme.selectedLineIdx].txt = '';
    document.querySelector('input[name="text-line"]').value = '';
    renderMeme();
}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function toggleMenu(elBtn) {
    document.body.classList.toggle("menu-open");
    if (elBtn.innerText === '☰') elBtn.innerText = 'X';
    else if (elBtn.innerText === 'X') elBtn.innerText = '☰';
    // elBtn.innerText = '☰'? 'X': '☰';

}
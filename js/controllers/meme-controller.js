"use stricrt"

var gElCanvas;
var gCtx;
var gGrabbedTextIdx;
var gStartPos;
var gMarkedLineIdx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onInit() {
    gElCanvas = document.querySelector('.meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    gMarkedLineIdx = 0;
    createMeme();
    createImgs();
    renderGallery();
    addListeners();
    getLinesPos();
    resizeCanvas();
}

function addListeners() {
    addKeyUpListener();
    addMouseListeners();
    addTouchListeners();
}

function addKeyUpListener() {
    var elTextLine = document.querySelector('input[name="text-line"]');
    elTextLine.addEventListener('keyup', onChangeText);
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown);
    gElCanvas.addEventListener('touchmove', onMove);
    gElCanvas.addEventListener('touchend', onUp);
}

function onChangeText() {
    setLineText();
    renderMeme();
}

function onDown(ev) {
    const pos = getEvPos(ev)

    var meme = getMeme();

    var clicked = meme.lines.map((line, idx) => isTextClicked(pos, line.pos.x, line.pos.y, gCtx.measureText(line.txt).width, line.size, idx));

    var isClicked = clicked.filter(clicked => clicked.isDrug);

    console.log(isClicked.length);

    if (isClicked.length === 0) {
        if (gMarkedLineIdx >= 0) gMarkedLineIdx = -1;
        renderMeme();
        return;
    }


    gStartPos = pos;
    gGrabbedTextIdx = isClicked[0].idx;
    meme.selectedLineIdx = gGrabbedTextIdx;
    document.querySelector('input[name="text-line"]').value = meme.lines[gGrabbedTextIdx].txt;
    gMarkedLineIdx = gGrabbedTextIdx;
    document.body.style.cursor = 'grabbing';
    renderMeme();
}

function onMove(ev) {
    const meme = getMeme();
    if (gGrabbedTextIdx >= 0) {
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;
        moveText(dx, dy, gGrabbedTextIdx)
        gStartPos = pos;
        renderMeme()
    }
}

function moveText(dx, dy, gGrabbedTextIdx) {
    var meme = getMeme();
    meme.lines[gGrabbedTextIdx].pos.x += dx;
    meme.lines[gGrabbedTextIdx].pos.y += dy;
}

function onUp() {
    // console.log('onUp()');
    gGrabbedTextIdx = -1;
    document.body.style.cursor = 'auto';
}


function renderMeme() {
    drawImg();
}

function drawImg() {
    var img = new Image();
    img.src = getImgSelectedUrl();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        renderContent();
    }
}

function renderContent() {
    var meme = getMeme();
    meme.lines.forEach((line, idx) => drawText(idx, line.txt, line.pos.x, line.pos.y));
    // meme.lines.filter((line) => line.txt === '').forEach(drawRect);
    if (gMarkedLineIdx >= 0) meme.lines.filter((line, idx) => idx === meme.selectedLineIdx).forEach(drawRect);
    // gMarkedLineIdx = -1;
}

function getRectSettings() {
    var meme = getMeme();
    var selectedLine = meme.lines[meme.selectedLineIdx];
    var x = selectedLine.pos.x;
    var y = selectedLine.pos.y - selectedLine.size;;
    var height = selectedLine.size + 10;
    if (document.querySelector('input[name="text-line"]').value === '') {
        var width = gElCanvas.width * 0.8;
    } else {
        var width = gCtx.measureText(selectedLine.txt).width + 35;
    }

    return {
        x,
        y,
        width,
        height
    }
}

function drawText(idx, txt, x, y) {
    var meme = getLineSettings(idx);
    // gCtx.beginPath();
    gCtx.lineWidth = 1;
    gCtx.fillStyle = meme.color;
    gCtx.strokeStyle = meme.stroke;
    gCtx.font = `${meme.size}px ${meme.font}`;
    gCtx.fillText(txt.toUpperCase(), x, y);
    gCtx.strokeText(txt.toUpperCase(), x, y);
    // gCtx.stroke()
}

function drawEmoji(txt, x, y, size) {
    // var meme = getLineSettings(idx);
    // gCtx.beginPath();
    gCtx.lineWidth = 1;
    // gCtx.fillStyle = meme.color;
    // gCtx.strokeStyle = meme.stroke;
    gCtx.font = `${size}px impact`;
    gCtx.fillText(txt.toUpperCase(), x, y);
    // gCtx.strokeText(txt.toUpperCase(), x, y);
    // gCtx.stroke()
}

function drawMeme() {

}

function drawRect() {
    var rect = getRectSettings();
    gCtx.beginPath();
    gCtx.rect(rect.x, rect.y, rect.width, rect.height);
    gCtx.lineWidth = 3;
    gCtx.strokeStyle = '#f68699';
    gCtx.stroke();
}


function onSearch() {
    renderGallery();
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
    renderMeme();
}

function onChanfeFont(elFont) {
    changeFont(elFont.value);
    renderMeme();
}


function onAddLine() {
    var meme = getMeme();
    meme.selectedLineIdx++;
    gMarkedLineIdx = meme.selectedLineIdx;
    meme.lines.push(setDefultSettings());
    getLinesPos();
    document.querySelector('input[name="text-line"]').value = '';
    renderMeme();
}

function onAddEmoji(emoji) {
    var meme = getMeme();
    meme.selectedLineIdx++;
    gMarkedLineIdx = meme.selectedLineIdx;
    meme.lines.push(setDefultSettings());
    meme.lines[meme.selectedLineIdx].txt = emoji;
    getLinesPos();
    document.querySelector('input[name="text-line"]').value = '';
    renderMeme();
}

function getLinesPos() {
    var meme = getMeme();
    var currIdx = meme.selectedLineIdx;
    var lines = meme.lines;
    lines[currIdx].pos.x += 25;

    if (currIdx === 0) {
        lines[currIdx].pos.y += gElCanvas.height * 0.1;
    } else if (currIdx === 1) {
        lines[currIdx].pos.y = gElCanvas.height * 0.9;
    } else if (currIdx === 2) {
        lines[currIdx].pos.y = gElCanvas.height * 0.5;
    } else if (currIdx === 3) {
        lines[currIdx].pos.y = gElCanvas.height * 0.3;
    } else if (currIdx === 4) {
        lines[currIdx].pos.y = gElCanvas.height * 0.7;
    } else {
        lines[currIdx].pos.y = (gElCanvas.height * getRandomInt(3, 7)) / 10;
        // console.log(lines[currIdx].pos.y);
    }
}


function onSwitch() {
    var meme = getMeme();
    if (meme.selectedLineIdx === meme.lines.length - 1) meme.selectedLineIdx = 0;
    else meme.selectedLineIdx += 1;
    var currMeme = meme.lines[meme.selectedLineIdx];
    document.querySelector('input[name="text-line"]').value = currMeme.txt;
    // console.log(meme.selectedLineIdx);
    gMarkedLineIdx = meme.selectedLineIdx;
    renderMeme();
    // meme.lines.filter((line => line === currMeme)).forEach(drawRect);
}


function onDelete() {
    var meme = getMeme();
    var lineSettings = setDefultSettings()
    var selectedLine = meme.lines[meme.selectedLineIdx]
    selectedLine.txt = '';
    selectedLine.size = lineSettings.size;
    selectedLine.color = lineSettings.color;
    selectedLine.stroke = lineSettings.stroke;
    selectedLine.font = lineSettings.font;
    document.querySelector('input[name="text-line"]').value = '';
    renderMeme();
}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function toggleMenu(elBtn) {
    document.body.classList.toggle("menu-open");
    if (elBtn.innerText === '☰') elBtn.innerText = 'X';
    else if (elBtn.innerText === 'X') elBtn.innerText = '☰';
    // elBtn.innerText = '☰'? 'X': '☰';
}

function download() {
    const data = gElCanvas.toDataURL("data/png");
    var link = document.createElement('a');
    link.download = "my-meme.png";
    link.href = data;
    link.click();
}
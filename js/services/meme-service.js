"use stricrt"

var gKeywordSearchCountMap = {};
var gImgs;
var gMeme;

function createMeme() {
    gMeme = {
        selectedImgId: null,
        selectedLineIdx: 0,

        lines: [
            {
                txt: '',
                size: 45,
                align: 'left',
                color: 'white',
                stroke: 'black',
                font: 'impact',
                pos: { x: 0, y: 0 },
                isDrag: false
            }
        ]
    }
}

function getLineSettings(idx) {
    // var meme = getMeme();
    var color = gMeme.lines[idx].color;
    var size = gMeme.lines[idx].size;
    var font = gMeme.lines[idx].font;
    var stroke = gMeme.lines[idx].stroke;
    var txt = gMeme.lines[idx].txt;

    return {
        color,
        size,
        font,
        stroke,
        txt
    }
}



function createImgs() {
    gImgs = [
        _createImg('images/1.jpg', ['funny', 'politics']),
        _createImg('images/2.jpg', ['cute', 'pets', 'dog', 'love']),
        _createImg('images/3.jpg', ['cute', 'pets', 'baby', 'sleep', 'child', 'dog']),
        _createImg('images/4.jpg', ['cat', 'sleep', 'funny']),
        _createImg('images/5.jpg', ['funny', 'strong', 'child']),
        _createImg('images/6.jpg', ['funny', 'smart']),
        _createImg('images/7.jpg', ['funny', 'baby', 'child', 'surprise']),
        _createImg('images/8.jpg', ['funny', 'listening'])
    ]
}

function setDefultSettings() {
    return {
        txt: '',
        size: 45,
        align: 'left',
        color: 'white',
        stroke: 'black',
        font: 'impact',
        pos: { x: 0, y: 0 },
        isDrag: false
    }

}

function getImgsForDisplay() {
    searchValue = document.querySelector('input[name="search"]').value;
    if (searchValue === '') return gImgs;
    else {
        console.log(searchValue);
        return gImgs.filter(img => img.keyWords.find(key => key === searchValue));
    }
}

function isTextClicked(pos, x, y, width, height, idx) {
    return {
        isDrug: (pos.x >= x && pos.x <= x + width && pos.y >= y - height && pos.y <= y),
        idx
    };

    // return (gMeme.selectedLineIdx === 0);
}


function getMeme() {
    return gMeme;
}

function getImages() {
    return gImgs;
}

function getImgSelectedUrl() {
    var selectedImg = gImgs.find(img => img.id === gMeme.selectedImgId);
    return selectedImg.url;
}

function setLineText() {
    var elTextLine = document.querySelector('input[name="text-line"]');
    var textLine = elTextLine.value;
    var meme = getMeme();
    meme.lines[meme.selectedLineIdx].txt = textLine;
}

function _createImg(url, keyWords) {
    var img = {
        id: makeId(),
        url,
        keyWords
    }

    return img;
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function increaseSize() {
    gMeme.lines[gMeme.selectedLineIdx].size++;
}

function decreaseSize() {
    gMeme.lines[gMeme.selectedLineIdx].size--;
}

function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function changeStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = color;
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

// function changeAlign(dir) {
//     gMeme.lines[gMeme.selectedLineIdx].align = dir;
// }


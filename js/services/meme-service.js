"use stricrt"

var gKeywordSearchCountMap = {};
var gImgs;
var gMeme;

// function createMeme(){
//     gMeme = 
// }

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
            font: 'impact'
        }
    ]
}

gImgs = [
    _createImg('images/1.jpg', ['funny', 'politics']),
    _createImg('images/2.jpg', ['cute', 'pets', 'dog', 'love']),
    _createImg('images/3.jpg', ['cute', 'pets', 'baby', 'sleep', 'child', 'dog']),
    _createImg('images/4.jpg', ['cat', 'sleep', 'funny', 'keyboard']),
    _createImg('images/5.jpg', ['funny', 'strong', 'child']),
    _createImg('images/6.jpg', ['funny', 'smart']),
    _createImg('images/7.jpg', ['funny', 'baby', 'child', 'surprise']),
    _createImg('images/8.jpg', ['funny', 'listening'])
]

function getMeme() {
    return gMeme;
}

function getImages() {
    return gImgs;
}

function getImgSelectedUrl(){
    var selectedImg = gImgs.find(img => img.id === gMeme.selectedImgId);
    return selectedImg.url;
}

function setLineText(){
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

function setImg(imgId){
    gMeme.selectedImgId = imgId;
}

function increaseSize(){
    gMeme.lines[gMeme.selectedLineIdx].size++;
}

function decreaseSize(){
    gMeme.lines[gMeme.selectedLineIdx].size--;
}


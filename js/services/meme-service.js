"use stricrt"

var gKeywordSearchCountMap = {};
var gImgs;
var gMeme;

// function createMeme(){
//     gMeme = 
// }

gMeme = {
    selectedImgId: null,
    selectedLineIdx: null,

    lines: [
        {
            txt: '',
            size: 20,
            align: 'left',
            color: 'red'
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


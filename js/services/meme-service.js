"use stricrt"

var gKeywordSearchCountMap = {};
var gImgs;
var gMeme;

// function createMeme(){
//     gMeme = 
// }

gMeme = {
    selectedImgId,
    selectedLineIdx,

    lines: [
        {
            txt: '',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

function createImgs(){
    gImgs = [
     _createImg('img/1.jpg', ['funny', 'politics']),
     _createImg('img/2.jpg', ['cute', 'pets', 'dog', 'love']),
     _createImg('img/3.jpg', ['cute', 'pets', 'baby', 'sleep', 'child', 'dog']),
     _createImg('img/4.jpg', ['cat', 'sleep', 'funny', 'keyboard']),
     _createImg('img/5.jpg', ['funny', 'strong', 'child']),
     _createImg('img/6.jpg', ['funny', 'smart']),
     _createImg('img/7.jpg', ['funny', 'baby', 'child', 'surprise']),
     _createImg('img/8.jpg', ['funny', 'listening'])
 ]
}

function _createImg(url, keyWords){
    var img = {
        id: makeId(),
        url,
        keyWords
    }

    return img;
}


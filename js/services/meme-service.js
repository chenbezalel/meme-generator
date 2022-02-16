"use stricrt"

var gKeywordSearchCountMap = {};
var gImgs;
var gMeme;

// function createMeme(){
//     gMeme = 
// }

function createImgs(){
    gImgs = [
     _createImg('img/1.jpg', ['funny, politics']),
     _createImg('img/2.jpg', ['cute, pets, dog, love'])
 ]
}

function _createImg(url, keyWords){
    return {
        id = makeId(),
        url,
        keyWords
    }
}


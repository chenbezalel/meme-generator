"use strict"

function renderGallery() {
    var imgs = getImgsForDisplay();

    var strHtml = imgs.map(img =>
        `<img src="${img.url}" onclick="onImegeSelect('${img.id}')" alt="">`
    )

    var a = document.querySelector('.gallery-container').innerHTML = strHtml.join("");
}

function onImegeSelect(imgId){
    document.querySelector('.editor').style.visibility = "visible";
    document.querySelector('.gallery').style.display = "none";
    setImg(imgId);
    renderMeme();
}
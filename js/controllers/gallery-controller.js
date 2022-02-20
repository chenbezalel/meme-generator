"use strict"

function renderGallery() {
    var imgs = getImgsForDisplay();

    var strHtml = imgs.map(img =>
        `<img src="${img.url}" onclick="onImgSelected('${img.id}', this)" alt="">`
    )

    document.querySelector('.gallery-container').innerHTML = strHtml.join("");
}

function onImgSelected(imgId, elImg){
    document.querySelector('.editor').style.visibility = "visible";
    document.querySelector('.gallery').style.display = "none";
    document.querySelector('input[name="search"]').value = '';
    cleanCanvas()
    setImg(imgId);
    renderMeme();
}

function onGalleryClicked(){
    document.querySelector('.editor').style.visibility = "hidden";
    document.querySelector('.gallery').style.display = "block";
    renderGallery();
}

function onShowGallery(){
    document.querySelector('.editor').style.visibility = "hidden";
    document.querySelector('.gallery').style.display = "block";
    renderGallery();
}
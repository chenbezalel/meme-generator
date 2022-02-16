"use strict"

function renderGallery() {
    var imgs = getImages();

    var strHtml = imgs.map(img =>
        `<img src="${img.url}" alt="">`
    )

    var a = document.querySelector('.gallery-container').innerHTML = strHtml.join("");
}
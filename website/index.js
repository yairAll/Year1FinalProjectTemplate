/** @type {HTMLDivElement} */
let previewsContainer = document.getElementById("previewsContainer");

/**
 * @typedef Preview 
 * @property {number} id
 * @property {string} title
 * @property {string} imageSource
 * 
 * */

/** @type {Preview[]} */
let previews = await send("/getPreviews");

for(let i = 0 ;i <previews.length;i++) {
    let previewA = createPreviewA(previews[i]);
    previewsContainer.appendChild(previewA);
}

/**
 * @param {Preview} preview
 * @returns {HTMLAnchorElement}
 */

function createPreviewA(preview){
    let a = document.createElement("a");
    a.classList.add("preview")
    a.href =  "car.html?CarId=" + preview.id;

    let img = document.createElement("img");
    img.classList.add("carimage");
    img.src = preview.classList;
    a.appendChild(img)
    
    
    let titleDiv = document.createElement("div");
    titleDiv.innerText = preview.Carid;
    a.appendChild(titleDiv);

    return a;
}
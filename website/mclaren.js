import { send } from "./_utils";
import Cookies from "./_cookies";



let mclaren0Button = document.getElementById("mclaren0Button");
let mclaren1Button = document.getElementById("mclaren1Button");
let mclaren2Button = document.getElementById("mclaren2Button");
let mclaren3Button = document.getElementById("mclaren3Button");
let mclaren4Button = document.getElementById("mclaren4Button");
let mclaren5Button = document.getElementById("mclaren5Button");

async function favorite(carId) {
    console.log(carId, Cookies.get("id"));
    let allfavcars = await send("/addcartodb", {
        cardId: carId,
        userId: Cookies.get("id"),
    });
    addcarstodiv(allfavcars)
}

mclaren0Button.onclick = () => favorite(18,"images/F1.jpg");// mclaren f1
mclaren1Button.onclick = () => favorite(19,"images/P1.webp");//mclaren p1
mclaren2Button.onclick = () => favorite(20,"images/720.webp");//mclaren 720
mclaren3Button.onclick = () => favorite(21,"images/senna.jpg");//mclaren senna
mclaren4Button.onclick = () => favorite(22,"images/speedtail.webp");//mclaren speedtail
mclaren5Button.onclick = () => favorite(23,"images/12c.avif");//mclaren mp4 12c



function addcarstodiv(allfavcars) {
    let allfav = document.getElementById("allfav");
    for (let index = 0; index < allfavcars.length; index++) {

        allfav.appendChild(allfavcars[index]);

    }
}
addcarstodiv();
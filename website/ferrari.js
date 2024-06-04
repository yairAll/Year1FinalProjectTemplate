import { send } from "./_utils";
import Cookies from "./_cookies";



let Ferrari0Button = document.getElementById("Ferrari0Button");
let Ferrari1Button = document.getElementById("Ferrari1Button");
let Ferrari2Button = document.getElementById("Ferrari2Button");
let Ferrari3Button = document.getElementById("Ferrari3Button");
let Ferrari4Button = document.getElementById("Ferrari4Button");
let Ferrari5Button = document.getElementById("Ferrari5Button");

async function favorite(carId) {
    console.log(carId, Cookies.get("id"));
    let allfavcars = await send("/addcartodb", {
        cardId: carId,
        userId: Cookies.get("id"),
    });
    addcarstodiv(allfavcars)
}

Ferrari0Button.onclick = () => favorite(12,"images/LAFERRARI.jpg");//ferrari la Ferrari
Ferrari1Button.onclick = () => favorite(13,"images/enzo.jpg");//ferrari enzo
Ferrari2Button.onclick = () => favorite(14,"images/f40.webp");//Ferrari f40
Ferrari3Button.onclick = () => favorite(15,"images/250Gto.png");//Ferrari 250gto
Ferrari4Button.onclick = () => favorite(16,"images/488pista.jpg");//Ferrari 488 pista
Ferrari5Button.onclick = () => favorite(17,"images/812.jpg");//Ferrari 812 competizione



function addcarstodiv(allfavcars) {
    let allfav = document.getElementById("allfav");
    for (let index = 0; index < allfavcars.length; index++) {

        allfav.appendChild(allfavcars[index]);

    }
}
addcarstodiv();
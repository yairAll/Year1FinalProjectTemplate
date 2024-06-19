import { send } from "./_utils";
import Cookies from "./_cookies";



let Ferrari0Button = document.getElementById("Ferrari0Button");
let Ferrari1Button = document.getElementById("Ferrari1Button");
let Ferrari2Button = document.getElementById("Ferrari2Button");
let Ferrari3Button = document.getElementById("Ferrari3Button");
let Ferrari4Button = document.getElementById("Ferrari4Button");
let Ferrari5Button = document.getElementById("Ferrari5Button");

async function favorite(carId) {
    let allfavcars = await send("/addcartodb", {
        carId:carId,
        userId: Cookies.get("id"),
    });
    console.log(allfavcars,Cookies.get("id"));
   
}

Ferrari0Button.onclick = () => favorite(12);//ferrari la Ferrari
Ferrari1Button.onclick = () => favorite(13);//ferrari enzo
Ferrari2Button.onclick = () => favorite(14);//Ferrari f40
Ferrari3Button.onclick = () => favorite(15);//Ferrari 250gto
Ferrari4Button.onclick = () => favorite(16);//Ferrari 488 pista
Ferrari5Button.onclick = () => favorite(17);//Ferrari 812 competizione




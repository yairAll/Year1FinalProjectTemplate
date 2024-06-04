import { send } from "./_utils";
import Cookies from "./_cookies";

let Lamborghini0Button = document.getElementById("Lamborghini0Button");
let Lamborghini1Button = document.getElementById("Lamborghini1Button");
let Lamborghini2Button = document.getElementById("Lamborghini2Button");
let Lamborghini3Button = document.getElementById("Lamborghini3Button");
let Lamborghini4Button = document.getElementById("Lamborghini4Button");
let Lamborghini5Button = document.getElementById("Lamborghini5Button");

async function favorite(carId) {
    console.log(carId, Cookies.get("id"));
    let allfavcars = await send("/addcartodb", {
        cardId: carId,
        userId: Cookies.get("id"),
    });
    addcarstodiv(allfavcars)
}


Lamborghini0Button.onclick = () => favorite(6,"images/countach.jpg");// lamborghini countach
Lamborghini1Button.onclick = () => favorite(7,"images/veneno.jpg");// lamborghini veneno
Lamborghini2Button.onclick = () => favorite(8,"images/diablo.jpg");// lamborghini diablo
Lamborghini3Button.onclick = () => favorite(9,"images/centenario.jpg");// lamborghini centenario
Lamborghini4Button.onclick = () => favorite(10,"images/sto.jpg");// lamborghini huracan sto
Lamborghini5Button.onclick = () => favorite(11,"images/svj.jpg");// lamborghini aventador svj

function addcarstodiv(allfavcars) {
    let allfav = document.getElementById("allfav");
    for (let index = 0; index < allfavcars.length; index++) {

        allfav.appendChild(allfavcars[index]);

    }
}
addcarstodiv();
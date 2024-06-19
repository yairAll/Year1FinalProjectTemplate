import { send } from "./_utils";
import Cookies from "./_cookies";

let Lamborghini0Button = document.getElementById("Lamborghini0Button");
let Lamborghini1Button = document.getElementById("Lamborghini1Button");
let Lamborghini2Button = document.getElementById("Lamborghini2Button");
let Lamborghini3Button = document.getElementById("Lamborghini3Button");
let Lamborghini4Button = document.getElementById("Lamborghini4Button");
let Lamborghini5Button = document.getElementById("Lamborghini5Button");

async function favorite(carId) {
    let allfavcars = await send("/addcartodb", {
        carId:carId,
        userId: Cookies.get("id"),
    });
    console.log(allfavcars,Cookies.get("id"));
   
}


Lamborghini0Button.onclick = () => favorite(6);// lamborghini countach
Lamborghini1Button.onclick = () => favorite(7);// lamborghini veneno
Lamborghini2Button.onclick = () => favorite(8);// lamborghini diablo
Lamborghini3Button.onclick = () => favorite(9);// lamborghini centenario
Lamborghini4Button.onclick = () => favorite(10);// lamborghini huracan sto
Lamborghini5Button.onclick = () => favorite(11);// lamborghini aventador svj

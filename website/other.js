import { send } from "./_utils";
import Cookies from "./_cookies";



let other0Button = document.getElementById("other0Button");
let other1Button = document.getElementById("other1Button");
let other2Button = document.getElementById("other2Button");
let other3Button = document.getElementById("other3Button");


async function favorite(carId) {
    console.log(carId, Cookies.get("id"));
    let allfavcars = await send("/addcartodb", {
        cardId: carId,
        userId: Cookies.get("id"),
    });
    addcarstodiv(allfavcars)
}

other0Button.onclick = () => favorite(30,"images/bat.jpg");//Ido's Batmobile
other1Button.onclick = () => favorite(31,"images/topg.avif");//Top G Bugatti
other2Button.onclick = () => favorite(32,"images/eitan.jpeg");//Eitan's Bimba
other3Button.onclick = () => favorite(33,"images/dream.jpg");//My Dream Car - McLaren 765 




function addcarstodiv(allfavcars) {
    let allfav = document.getElementById("allfav");
    for (let index = 0; index < allfavcars.length; index++) {

        allfav.appendChild(allfavcars[index]);

    }
}
addcarstodiv();
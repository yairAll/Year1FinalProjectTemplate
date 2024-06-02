import { send } from "./_utils";
import Cookies from "./_cookies";

let bugatti4Button = document.getElementById("bugatti4Button");
let bugatti5Button = document.getElementById("bugatti5Button");




async function favorite(carId) {
    let allfavcars = await send("/addcartodb", carId, Cookies.get("id"));
    addcarstodiv(allfavcars)
}

bugatti4Button.onclick = () => favorite(4);
bugatti5Button.onclick = () => favorite(5);



function addcarstodiv(allfavcars) {
    let allfav = document.getElementById("allfav");
    for (let index = 0; index < allfavcars.length; index++) {
        allfav.appendChild(allfavcars[index]);
    }
}
addcarstodiv();
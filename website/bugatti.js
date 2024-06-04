import { send } from "./_utils";
import Cookies from "./_cookies";



let bugatti0Button = document.getElementById("bugatti0Button");
let bugatti1Button = document.getElementById("bugatti1Button");
let bugatti2Button = document.getElementById("bugatti2Button");
let bugatti3Button = document.getElementById("bugatti3Button");
let bugatti4Button = document.getElementById("bugatti4Button");
let bugatti5Button = document.getElementById("bugatti5Button");

async function favorite(carId) {
    console.log(carId, Cookies.get("id"));
    let allfavcars = await send("/addcartodb", {
        cardId: carId,
        userId: Cookies.get("id"),
    });
    addcarstodiv(allfavcars)
}

bugatti0Button.onclick = () => favorite(0,"images/chiron.webp");//bugatti chiron
bugatti1Button.onclick = () => favorite(1,"images/veyron.jpg");//bugatti veyron
bugatti2Button.onclick = () => favorite(2,"images/divo.jpg");//bugatti divo
bugatti3Button.onclick = () => favorite(3,"images/bolide.jpg");//bugatti bolide
bugatti4Button.onclick = () => favorite(4,"images/eb110.jpg");//bugatti eb110
bugatti5Button.onclick = () => favorite(5,"images/lavoiture.jpg");//bugatti la voi



function addcarstodiv(allfavcars) {
    let allfav = document.getElementById("allfav");
    for (let index = 0; index < allfavcars.length; index++) {

        allfav.appendChild(allfavcars[index]);

    }
}
addcarstodiv();
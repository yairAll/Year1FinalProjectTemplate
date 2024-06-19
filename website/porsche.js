import { send } from "./_utils";
import Cookies from "./_cookies";



let porsche0Button = document.getElementById("porsche0Button");
let porsche1Button = document.getElementById("porsche1Button");
let porsche2Button = document.getElementById("porsche2Button");
let porsche3Button = document.getElementById("porsche3Button");
let porsche4Button = document.getElementById("porsche4Button");
let porsche5Button = document.getElementById("porsche5Button");

async function favorite(carId) {
    let allfavcars = await send("/addcartodb", {
        carId:carId,
        userId: Cookies.get("id"),
    });
    console.log(allfavcars,Cookies.get("id"));
   
}

porsche0Button.onclick = () => favorite(24);//porsche 918 spyder
porsche1Button.onclick = () => favorite(25);//porsche 911 gt3
porsche2Button.onclick = () => favorite(26);//porsche 911 carrera rs
porsche3Button.onclick = () => favorite(27);//porsche carrera Gt
porsche4Button.onclick = () => favorite(28);//porsche 944 turbo
porsche5Button.onclick = () => favorite(29);//porsche 935




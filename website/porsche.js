import { send } from "./_utils";
import Cookies from "./_cookies";



let porsche0Button = document.getElementById("porsche0Button");
let porsche1Button = document.getElementById("porsche1Button");
let porsche2Button = document.getElementById("porsche2Button");
let porsche3Button = document.getElementById("porsche3Button");
let porsche4Button = document.getElementById("porsche4Button");
let porsche5Button = document.getElementById("porsche5Button");

async function favorite(carId,carimage) {
    console.log(carId, Cookies.get("id","image"));
    let allfavcars = await send("/addcartodb", {
        carId: carId,
        carimage:carimage,
        userId: Cookies.get("id" ,"image"),
    });
    addcarstodiv(allfavcars)
}

porsche0Button.onclick = () => favorite(24,"images/918.webp");//porsche 918 spyder
porsche1Button.onclick = () => favorite(25,"images/911GT3RS.jpg");//porsche 911 gt3
porsche2Button.onclick = () => favorite(26,"images/911CarreraRs.avif");//porsche 911 carrera rs
porsche3Button.onclick = () => favorite(27,"images/careraGt.jpg");//porsche carrera Gt
porsche4Button.onclick = () => favorite(28,"images/944.jpg");//porsche 944 turbo
porsche5Button.onclick = () => favorite(29,"images/935.jpg");//porsche 935



function addcarstodiv(allfavcars) {
    let allfav = document.getElementById("allfav");
    for (let index = 0; index < allfavcars.length; index++) {

        allfav.appendChild(allfavcars[index]);

    }
}
addcarstodiv();
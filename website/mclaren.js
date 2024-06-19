import { send } from "./_utils";
import Cookies from "./_cookies";



let mclaren0Button = document.getElementById("mclaren0Button");
let mclaren1Button = document.getElementById("mclaren1Button");
let mclaren2Button = document.getElementById("mclaren2Button");
let mclaren3Button = document.getElementById("mclaren3Button");
let mclaren4Button = document.getElementById("mclaren4Button");
let mclaren5Button = document.getElementById("mclaren5Button");

async function favorite(carId) {
    let allfavcars = await send("/addcartodb", {
        carId:carId,
        userId: Cookies.get("id"),
    });
    console.log(allfavcars,Cookies.get("id"));
   
}

mclaren0Button.onclick = () => favorite(18);// mclaren f1
mclaren1Button.onclick = () => favorite(19);//mclaren p1
mclaren2Button.onclick = () => favorite(20);//mclaren 720
mclaren3Button.onclick = () => favorite(21);//mclaren senna
mclaren4Button.onclick = () => favorite(22);//mclaren speedtail
mclaren5Button.onclick = () => favorite(23);//mclaren mp4 12c



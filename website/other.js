import { send } from "./_utils";
import Cookies from "./_cookies";



let other0Button = document.getElementById("other0Button");
let other1Button = document.getElementById("other1Button");
let other2Button = document.getElementById("other2Button");
let other3Button = document.getElementById("other3Button");

async function favorite(carId) {
    let allfavcars = await send("/addcartodb", {
        carId:carId,
        userId: Cookies.get("id"),
    });
    console.log(allfavcars,Cookies.get("id"));
   
}

other0Button.onclick = () => favorite(30);//Ido's Batmobile
other1Button.onclick = () => favorite(31);//Top G Bugatti
other2Button.onclick = () => favorite(32,);//Eitan's Bimba
other3Button.onclick = () => favorite(33);//My Dream Car - McLaren 765 





import { send } from "./_utils";
import Cookies from "./_cookies";






async function favorite(carId) {
    let allfavcars = await send("/addcartodb", carId, Cookies.get("id"));
    addcarstodiv(allfavcars)
} 





function addcarstodiv(allfavcars) {
    let allfav = document.getElementById("allfav");
    for (let index = 0; index < allfavcars.length; index++) {
        allfav.appendChild(allfavcars[index]);
    }
}
addcarstodiv();

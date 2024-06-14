import { send } from "./_utils";
import Cookies from "./_cookies";





let id = Cookies.get("id");
let Username = Cookies.get("Username");

async function favorite(carId) {
    let allfavcars = await send("/addcartodb", carId, Cookies.get("id"));
    addcarstodiv(allfavcars)
}

// function addcarstodiv(allfavcars) {
//     let allfav = document.getElementById("allfav");
//     for (let index = 0; index < allfavcars.length; index++) {
//         allfav.appendChild(allfavcars[index]);
//     }
// }
// addcarstodiv();
async function getUsername() {
    if (id == undefined) {
        loggedInDiv.classList.add("hidden");
        loggedinDiv2.classList.add("hidden");
        Cookies.remove("id");
        return;
    }

    /**@type {username | null} */
    let username = await send("/getUsername", id);

    if (username == null) {
        loggedInDiv.classList.add("hidden");
        
        Cookies.remove("id");
        console.log("test");
        return;
    }

    loggedOutDiv.classList.add("hidden");
    
    greetingDiv.innerText = "Welcome " + username + "! we are happy to see you";
}
getUsername();
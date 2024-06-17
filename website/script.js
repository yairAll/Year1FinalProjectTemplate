import { send } from "./_utils";
import Cookies from "./_cookies";





let id = Cookies.get("id");
let Username = Cookies.get("Username");

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
        return;
    }

    loggedOutDiv.classList.add("hidden");
    
    greetingDiv.innerText = "Welcome " + username + "! we are happy to see you";
}
getUsername();
import Cookies from "./_cookies";
import { send } from "./_utils";

let favorite = await send("/getFavorite", Cookies.get("id"));

console.log(favorite);







let asfs = document.getElementById("print");
asfs.innerText = favorite.Name;

let as = document.getElementById("Image");
console.log(as);

as.src = favorite.Image;











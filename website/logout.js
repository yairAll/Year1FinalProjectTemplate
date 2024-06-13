import Cookies from "./_cookies";

let logoutbutton = document.getElementById("logOut");
logoutbutton.href = "index.html";

console.log(logoutbutton);

logoutbutton.onclick = function () {
     Cookies.remove("id");
}
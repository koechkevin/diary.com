let route = "http://127.0.0.1:5013/api/v2";

document.addEventListener("DOMContentLoaded", ()=>{
    fetch(route+"/", {
        method:"GET",
        headers:{"Content-Type":"application/json"}})
        .then((response) => response.json())
        .then((data)=>{
            document.getElementById("output").innerHTML = data["message"];
        })
        .catch((err) => console.log(err))
}, false);


document.getElementById("logo").addEventListener("click",
function home(){
    window.location.reload();
});
let route = "https://kibitok.herokuapp.com/api/v2";
let token = document.cookie.split(';')[0];

function fetchAccount(){
    if(!token){
        window.location.replace("login.html");
    }
    //preventDefault()
    const url = route+"/users/register";
    fetch(url, {
        method:"GET",
        headers: {"Content-Type":"application/json", "x-access-token":token}})
        .then((resp)=>resp.json())
        .then((data) =>{
            if (data["message"] == "you are out of session"
            || data["message"] == "your token expired please login again"
            || data["message"] == "invalid token please login to get a new token") {
                window.location.replace('login.html');
            } else{
                let output = `
                <h3>USER ID : </h3>${data["ID"]}<br><br>
                <h3>NAME : </h3>${data["name"]}<br><br>
                <h3>USERNAME : </h3>${data["username"]}<br><br>
                <h3>EMAIL : </h3>${data["email"]}<br><br>
                `;
                document.getElementById("tableform").innerHTML = output;
            }
        })
        .catch(error => console.log('error:',error));
    }

document.getElementById("logo").addEventListener("click",
function home(){
    window.location.replace("../index.html")
});

document.getElementById("logout").addEventListener("click",
function logout(event){
    event.preventDefault()
    let url = route+"/users/logout";
    fetch(url, {
        method:"GET",
        headers: {"Content-Type":"application/json", "x-access-token":token}
    })
    .then((response)=>response.json())
    .then((data)=>{
        let date = new Date();
        date.setTime(date.getTime()-(1));
        document.cookie = token+"; expires="+date.toGMTString();
        window.location.replace("login.html");
    })
   .catch((error)=>console.error(error))
});
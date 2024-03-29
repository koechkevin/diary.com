let route = "https://kibitok.herokuapp.com/api/v2";

document.getElementById("regform").addEventListener("submit",
function fetchLogin(event){
    event.preventDefault();
    let user = document.forms["login"]["username"].value;
    let pass = document.forms["login"]["password"].value;
    if (user == "") {
        alert("username cannot be empty");
        document.login.username.focus() ;
        return false
    }
    else if (pass == "") {
        alert("password cannot be empty");
        document.login.password.focus() ;
        return false
    }
    else {
        let url = route+"/users/login";
        let data = {username:user, password:pass};
        fetch(url, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        })
        .then((res)=>res.json())
        .then((data) => {
            if (data["token"]){
                localStorage.setItem("token", JSON.stringify(data["token"]));
                window.location.assign("entries.html");
            }
            else {
                document.getElementById("regstatus").innerText = data["message"];
                console.log(data["message"]);
            }
        })
        .catch(error => console.log('error:',error));
    }
});

document.getElementById("logo").addEventListener("click",
function home(){
    window.location.replace("../index.html")
});
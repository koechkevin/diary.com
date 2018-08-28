let route = "https://kibitok.herokuapp.com/api/v2";
token = document.cookie.split(';')[0];

function onload(){
    const url = route+"/users/register"
    fetch(url, {method:"GET",
headers: {"Content-Type":"application/json", 'x-access-token':token}})
.then((resp)=>resp.json())
.then((data) =>{
    if (data["message"] == "you are out of session" || data["message"] == "your token expired please login again"
|| data["message"] == "invalid token please login to get a new token") {
window.location.replace('login.html');
} else{console.log("Welcome "+data["name"]);}
})
.catch(error =>{ window.location.replace('login.html');});
}

function fetchAccount(){
    //event.preventDefault()
    const url = route+"/users/register";
    fetch(url, {method:"GET",
headers: {"Content-Type":"application/json", 'x-access-token':token}})
.then((resp)=>resp.json())
.then((data) =>{
    if (data["message"] == "you are out of session" || data["message"] == "your token expired please login again"
|| data["message"] == "invalid token please login to get a new token") {
window.location.replace('login.html');
} else{console.log(data);}
})
.catch(error => console.log('error:',error));
}

document.getElementById("submit").addEventListener("click",
function fetchNewEntry(event){
    event.preventDefault()
    let url = route+"/entries";
    let titl = document.forms["create"]["title"].value;
    let entr = document.forms["create"]["entry"].value;
    let data = {title:titl, entry:entr}
    fetch(url, {method:"POST",
    headers: {"Content-Type":"application/json", 'x-access-token':token},
    body:JSON.stringify(data)
}).then((response) => response.json())
.then((output)=>{
    if (output["message"] == "entry was successfully saved"){
        document.getElementById("success").innerText = output["message"];
        document.getElementById("entryForm").innerHTML = `<textarea maxlength="20" rows ="1" cols = "33" name ="title" placeholder="Title" ></textarea><br>
        <textarea rows ="10" cols = "33" name ="entry" placeholder="Type an entry" ></textarea><br><br>
        <button name="save" >Save </button><br>`;
        document.getElementById("regstatus").innerText = "";
        window.location.replace('entries.html');
    }
    else{
        document.getElementById("regstatus").innerText = output["message"];
        document.getElementById("success").innerText = "";
        console.log(output["message"])
    }
})
.catch((err)=>console.log(err))
});

document.getElementById("logo").addEventListener("click",
function home(){
    window.location.replace("../index.html")
});
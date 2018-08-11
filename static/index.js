function fetchIndex(){
fetch("https://kibitok.herokuapp.com/api/v2/", {method:"GET", 
headers:{"Content-Type":"application/json"}})
.then((response) => response.json())
.then((data)=>{
    document.getElementById("output").innerHTML = data["message"]
})
.catch((err) => console.log(err))
}
token = document.cookie.split(';')[0];
function fetchRegister(){
    event.preventDefault()
    let url = "https://kibitok.herokuapp.com/api/v2/users/register"
    let firstname = document.forms["register"]["fname"].value;
    let lastname = document.forms["register"]["lname"].value;
    let name = document.forms["register"]["username"].value;
    let emailaddress = document.forms["register"]["email"].value;
    let pasword = document.forms["register"]["password"].value;
    let confirmpassword = document.forms["register"]["cpassword"].value;
    var atIndex=emailaddress.indexOf("@");
    var dotIndex=emailaddress.lastIndexOf(".");
    if (firstname == ""||lastname == ""||name == ""||pasword.length < 8||confirmpassword == "") {
        alert("All fields must be filled out and password should be 8 characters long");
        return false;
    }
    else if (atIndex<1 || dotIndex-atIndex < 2) {
        alert("invalid email");
        return false;
    }
    else if(pasword != confirmpassword){
        alert("password and confirm password should be equal");
        return false; 
    }
    let data = {fname:firstname, lname:lastname, username:name, email:emailaddress,password:pasword, cpassword:confirmpassword};                    
    fetch(url, {method:"POST", 
    headers:{
        "Content-Type":"application/json"
}, 
body:JSON.stringify(data)
    })
    .then((res)=>res.json())
    .then((data) => {
        if (data["message"] == "You registered succesfully"){
            window.location.replace("login.html") 
        }
        else {
            window.location.replace("register.html")
            console.log(data["message"])
        }
    })
    .catch(error => console.log('error:',error));
    
        }
    
function fetchAccount(){
    event.preventDefault()
    const url = "https://kibitok.herokuapp.com/api/v2/users/register"
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
function onload(){
    const url = "https://kibitok.herokuapp.com/api/v2/users/register"
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
function fetchLogin(){
    event.preventDefault()
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
    
    let url = "https://kibitok.herokuapp.com/api/v2/users/login"
    
    let data = {username:user, password:pass};
    fetch(url, {method:"POST", 
    headers:{
        "Content-Type":"application/json"
}, 
body:JSON.stringify(data)
    })
    .then((res)=>res.json())
    .then((data) => {
        if (data["token"]){
            let date = new Date();
            date.setTime(date.getTime()+(1000*60*60*30));
            document.cookie = data["token"]+"; expires="+date.toGMTString();
            window.location.replace("myHome.html");
        }
        else {
            console.log(data["message"]);
        }
    })
    .catch(error => console.log('error:',error));
}
}

function fetchNewEntry(){
    event.preventDefault()
    let url = "https://kibitok.herokuapp.com/api/v2/entries"
    let titl = document.forms["create"]["title"].value;
    let entr = document.forms["create"]["entry"].value;
    let data = {title:titl, entry:entr}
    fetch(url, {method:"POST",
    headers: {"Content-Type":"application/json", 'x-access-token':token},
    body:JSON.stringify(data)
}).then((response) => response.json())
.then((output)=>{
    if (output["message"] == "entry was successfully saved"){
        window.location.replace("myHome.html");
    }
    else{
        console.log(output["message"]);
    }
})
.catch((err)=>console.log(err))
}

function fetchEntries(){
    if (!token){
        window.location.replace('login.html')
    }
    else{
    let url = "https://kibitok.herokuapp.com/api/v2/entries";
    fetch(url, {method:"GET", 
    headers: {"Content-Type":"application/json", 'x-access-token':token}
    
    })
    .then((response) => response.json())
    .then((data) => 
    {
         if (data["message"] == "you are out of session" || data["message"] == "your token expired please login again"
 || data["message"] == "invalid token please login to get a new token") {
    window.location.replace('login.html');
 }
 else{
        
        let output =`<div style="overflow-x:auto;"><table><tr>
        <th>Entry ID</th>
        <th>Created At</th>
        <th>Entry Title</th>
        <th>Action</th>
    </tr>`;
        Object.keys(data["message"]).forEach(function(ent){
            
            output += `
              
            <tr>
                        <td>${data["message"][ent]["ID"]}</td>
                        <td>${data["message"][ent]["date created"]}</td>
                        <td><div id="myBtn"class="view", onclick="viewSingle(${data["message"][ent]["ID"]})">
                        ${data["message"][ent]["title"]}</td>
                        <td> <div id="Btn" class="view", onclick="edit(${data["message"][ent]["ID"]},'${data["message"][ent]["title"]}','${data["message"][ent]["entry"]}')">
                        edit</div>  <div class="view" onclick="deletes(${data["message"][ent]["ID"]})">delete</div></td>
                    </tr>         
            `;
        });
        
        document.getElementById("tableform").innerHTML = output + `</table></div>`;
        document.getElementById("total").innerHTML = "Total entries : " +Object.keys(data["message"]).length.toString();
    }
    })
    .catch((error) => console.log(error))

}
       
}

function viewSingle(id){
    let url = "https://kibitok.herokuapp.com/api/v2/entries/"+id;
    fetch(url, {
        method : "GET", headers : {"Content-Type":"application/json", 'x-access-token':token}
    }).then((response)=>response.json())
    .then((data)=>{
        document.getElementById("single").innerHTML = data["message"][2];
        document.getElementById("editor").innerHTML = '';
        modal.style.display ="block";
    })
    .catch((error) =>console.log(error))
}

let editId;
function edit(id,title, entry){
editId = id;       
modal.style.display="block";
document.getElementById("single").innerHTML = entry;
document.getElementById("editor").innerHTML = `
<form name="modify" onsubmit="modifyEntry()"><p id="id"></p><br>
<textarea rows ="1" cols = "33" name ="title">${title}</textarea><br>
<textarea rows ="10" cols = "33" name ="entry">${entry}</textarea><br><br>
<button name="save" >Edit </button><br></form>`;
}

function modifyEntry(){
    event.preventDefault();
    let url = "https://kibitok.herokuapp.com/api/v2/entries/"+editId;
   let titl = document.forms["modify"]["title"].value;
   let entr = document.forms["modify"]["entry"].value;
   let data = {title:titl, entry:entr}
   // console.log(url);
    fetch(url, {
        method:"PUT", headers: {"Content-Type":"application/json", 'x-access-token':token},
        body:JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then((output)=>{
        window.location.replace("entries.html")
        console.log(output);})
    .catch((error)=>console.log(error))
    modal.style.display = "none";
}

function deletes(id){
    let url = "https://kibitok.herokuapp.com/api/v2/entries/"+id;
    if(window.confirm("Are you sure you want to delete?")){
    fetch(url, {
        method:"DELETE",
        headers: {"Content-Type":"application/json", 'x-access-token':token}
    })
    .then((res) =>res.json())
    .then((data) => {
        console.log(data["message"]);
        window.location.replace("entries.html");
    })
    }
    else{
        window.location.replace("entries.html");
    }
    }
function logout(){
    event.preventDefault()
    let url = "https://kibitok.herokuapp.com/api/v2/users/logout";
    fetch(url, {
        method:"GET",
        headers: {"Content-Type":"application/json", 'x-access-token':token}
    })
    .then((response)=>response.json())
    .then((data)=>{
        let date = new Date();
        date.setTime(date.getTime()-(1));
        document.cookie = token+"; expires="+date.toGMTString();
       console.log(data["message"])
       window.location.replace("login.html");
   })
   .catch((error)=>console.error(error))
}
let modal = document.getElementById('myModal');
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

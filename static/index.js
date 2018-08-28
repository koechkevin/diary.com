let route = "https://kibitok.herokuapp.com/api/v2";

function fetchIndex(){
fetch(route+"/", {method:"GET", 
headers:{"Content-Type":"application/json"}})
.then((response) => response.json())
.then((data)=>{
    document.getElementById("output").innerHTML = data["message"]
})
.catch((err) => console.log(err))
}
token = document.cookie.split(';')[0];

document.getElementById("account").addEventListener("click",
function fetchAccount(event){
    event.preventDefault()
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
});

function fetchEntries(){
    if (!token){
        window.location.replace('login.html')
    }
    else{
    let url = route+"/entries";
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
            let entry = "`"+data["message"][ent]["entry"]+"`";
            let title = "`"+data["message"][ent]["title"]+"`";
            output += `
              
            <tr>
                        <td>${data["message"][ent]["ID"]}</td>
                        <td>${data["message"][ent]["date created"]}</td>
                        <td><div id="myBtn"class="view", onclick="viewSingle(${data["message"][ent]["ID"]})">
                        ${data["message"][ent]["title"]}</td>
                        <td> <div id="Btn" class="view", onclick="edit(${data["message"][ent]["ID"]},${title},${entry})">
                        edit</div>  <div class="view" onclick="deletes(${data["message"][ent]["ID"]})">delete</div></td>
                    </tr>         
            `;
        });
        
        document.getElementById("tableform").innerHTML = output + `</table></div>`;
        document.getElementById("total").innerHTML = "Total entries : " +Object.keys(data["message"]).length.toString();
    }
    })
    .catch((error) => console.error(error))

}
       
}

function viewSingle(id){
    let url = route+"/entries/"+id;
    fetch(url, {
        method : "GET", headers : {"Content-Type":"application/json", 'x-access-token':token}
    }).then((response)=>response.json())
    .then((data)=>{
        document.getElementById("single").innerText = data["message"][2];
        document.getElementById("editor").innerHTML = '';
        modal.style.display ="block";
    })
    .catch((error) =>console.log(error))
}

let editId;
function edit(id,title, entry){
editId = id;       
modal.style.display="block";
document.getElementById("single").innerText = "";
document.getElementById("editor").innerHTML = `
<form name="modify"><br><p id="id"></p><br>
<textarea maxlength="20" rows ="1" cols = "33" name ="title">${title}</textarea><br>
<textarea rows ="10" cols = "33" name ="entry">${entry}</textarea><br><br>
<button class="view" name="save" id = "submit">Edit </button><br></form>`;
document.getElementById("submit").addEventListener("click",
function modifyEntry(event){
    event.preventDefault();
    let url = route+"/entries/"+editId;
    let titl = document.forms["modify"]["title"].value;
    let entr = document.forms["modify"]["entry"].value;
   let data = {title:titl, entry:entr}
    fetch(url, {
        method:"PUT", headers: {"Content-Type":"application/json", 'x-access-token':token},
        body:JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then((output)=>{
        if (output["message"] == "Edited successfully")
        {
        window.location.replace("entries.html")
        console.log(output);
    } else{
        document.getElementById("id").innerHTML = output["message"];
    }
    })
    .catch((error)=>console.log(error))
}
);
}

function deletes(id){
    let url = route+"/entries/"+id;
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
document.getElementById("logout").addEventListener("click",    
function logout(event){
    event.preventDefault()
    let url = route+"/users/logout";
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
});
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
document.getElementById("logo").addEventListener("click",
function home(){
    window.location.replace("../index.html")
});
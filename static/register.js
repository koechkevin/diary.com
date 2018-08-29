let route = "https://kibitok.herokuapp.com/api/v2";

document.getElementById("submit").addEventListener("click",
function fetchRegister(event){
    event.preventDefault();
    let url = route+"/users/register"
    let firstname = document.forms["register"]["fname"].value;
    let lastname = document.forms["register"]["lname"].value;
    let name = document.forms["register"]["username"].value;
    let emailaddress = document.forms["register"]["email"].value;
    let pasword = document.forms["register"]["password"].value;
    let confirmpassword = document.forms["register"]["cpassword"].value;
    var atIndex=emailaddress.indexOf("@");
    var dotIndex=emailaddress.lastIndexOf(".");
    if (firstname == ""||lastname == ""||name == ""||pasword.length < 8||confirmpassword == "") {
        alert("please fill all the fields and ensure password is atleast 8 characters long");
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
    fetch(url, {
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    })
    .then((res)=>res.json())
    .then((data) => {
        if (data["message"] == "You registered succesfully"){
            window.location.replace("login.html") 
        }
        else if (data["message"] == "A conflict happened while processing the request.  The resource might have been modified while the request was being processed."){
            document.getElementById("regstatus").innerText = "Username already taken or Email exists. Try again!!";
            console.log(data["message"])
        }
        else{
            document.getElementById("regstatus").innerText = data["message"];
            console.log(data["message"])
        }
    })
    .catch(error => console.log('error:',error));
    return false;
});

document.getElementById("logo").addEventListener("click",
function home(){
    window.location.replace("../index.html");
});
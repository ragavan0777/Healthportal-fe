

// REGISTERATION



// USER RSGISTER
function registerUser(){

fetch(`http://localhost:2000/api/auth/register`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name:document.getElementById("name").value,
email:document.getElementById("email").value,
password:document.getElementById("password").value,
})
})
.then(res => {
    if(!res.ok){
        throw new Error("User Registration failed"); 
    }
    return res.text();
})
.then(data=>{
showToast("USER register successfull","success");

window.location.href = "login.html";
})
.catch(err=>{
console.error(err);
showToast("failed in User registration","Error");
});

}



// DOCTOR REGISTER
function registerDoctor(){

fetch(`http://localhost:2000/api/auth/register-doctor`,{
method:"POST",
headers:{
    "Content-Type":"application/json"
},
body:JSON.stringify({
    name:document.getElementById("dname").value,
    email:document.getElementById("demail").value,
    password:document.getElementById("dpassword").value,
    specialty:document.getElementById("specialty").value,
    experience:document.getElementById("experience").value,
})
})
.then(res=>{
    if(!res.ok){
        throw new Error("Doctor Registration failed");
    }
    return res.text();
})
.then(()=>{
    showToast("DOCTOR Registered Successfully","success");
    window.location.href="login.html";
})
.catch(err=>{
    console.error(err);
    showToast("failed in DOCTOR registration","Error");
});
}



// LOGIN FUNCTION
function login(){

    localStorage.clear();
fetch(`http://localhost:2000/api/auth/login`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email:document.getElementById("email").value,
password:document.getElementById("password").value
})
})
.then(res=>res.text())
.then(token=>{

localStorage.setItem("token",token);

const payload = parseJwt(token);

console.log("Login successfull---");
console.log("ROLE:", payload.role);

// SAVE DATA
localStorage.setItem("userId", payload.userId);
localStorage.setItem("role", payload.role);

showToast("Login Success");

if(payload.role === "DOCTOR"){
    window.location.href = "doctor.html";  
        console.log("doctor login successfull...");
}else{
    window.location.href = "patient.html";
    console.log("patient login successfull...");

}

})
.catch(err=>console.error(err));

}
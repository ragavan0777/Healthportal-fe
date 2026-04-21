

// REGISTERATION

var BASE_URL ="https://healthportal-be-1.onrender.com";
// USER RSGISTER
function registerUser(){

fetch(`${BASE_URL}/api/auth/register`,{
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

fetch(`${BASE_URL}/api/auth/register-doctor`,{
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

    fetch(`${BASE_URL}/api/auth/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:document.getElementById("email").value,
            password:document.getElementById("password").value
        })
    })

    .then(res => {
        if(!res.ok){
            throw new Error("Invalid credentials or server error");
        }
        return res.text();
    })

    .then(token => {

        if(!token || token.length < 10){
            throw new Error("Invalid token received");
        }

        localStorage.setItem("token", token);

        const payload = parseJwt(token);

        if(!payload){
            throw new Error("Token parsing failed");
        }

        console.log("Login successful");
        console.log("ROLE:", payload.role);

        localStorage.setItem("userId", payload.userId);
        localStorage.setItem("role", payload.role);

        showToast("Login Success", "success");

       
        if(payload.role === "DOCTOR"){
            window.location.href = "doctor.html";  
        } else {
            window.location.href = "patient.html";
        }

    })

    .catch(err => {
        console.error(err);
        showToast("Login failed. Check credentials or server.", "error");
    });
}
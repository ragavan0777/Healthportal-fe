function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = atob(base64Url);
        return JSON.parse(base64);
    } catch (e) {
        console.error("Invalid token");
        return null;
    }
}

// CHECK LOGIN
function checkAuth(){

  const token = localStorage.getItem("token");

    if(!token){
        window.location.href = "login.html";
    }
}

// ROLE CHECK
function checkRole(requiredRole){

    const role = localStorage.getItem("role");

    if(role !== requiredRole){
        showToast("Access Denied","Error");
        window.location.href = "login.html";
    }
}

//logout function
function logout(){
    localStorage.clear();
    window.location.href = "login.html";
}


// Clear All views
function clearAllViews(){
    document.getElementById("appointments").innerHTML = "";
    document.getElementById("doctorList").innerHTML = "";
}

// AVATAR GENERATION (GLOBAL)
function getAvatar(name){

    if(!name) return "https://api.dicebear.com/7.x/avataaars/svg?seed=default";

    let lastChar = name.toLowerCase().slice(-1);

    if(lastChar === "a" || lastChar === "i"){
        return "https://api.dicebear.com/7.x/avataaars/svg?seed=female";
    }else{
        return "https://api.dicebear.com/7.x/avataaars/svg?seed=male";
    }
}

// Toast message 
function showToast(message, type = "info") {

    const toast = document.getElementById("toast");

    toast.innerText = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}
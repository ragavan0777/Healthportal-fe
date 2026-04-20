const BASE_URL ="https://healthportal-be-1.onrender.com";
// DOCTOR APPOINTMENTS

// ENTER KEY SEARCH
document.addEventListener("DOMContentLoaded", function(){

    const searchInput = document.getElementById("searchName");

    if(searchInput){
        searchInput.addEventListener("keypress", function(e){
            if(e.key === "Enter"){
                searchDoctors();
            }
        });
    }

});


document.getElementById("specialtyDropdown").addEventListener("change", function () {
    document.getElementById("searchName").value = "";
    searchDoctors();
});



// SEARCH BAR
function searchDoctors(){

let name = document.getElementById("searchName").value.trim();
let specialty = document.getElementById("specialtyDropdown").value.trim();

if(specialty !== ""){
    name = "";
}

console.log("Searching:", name, specialty);


fetch(`${BASE_URL}/api/doctor/search?name=${name}&specialty=${specialty}`,{
    headers:{
        "Authorization":"Bearer "+localStorage.getItem("token")
    }
})
.then(res=>{if(!res.ok)
{
 throw new Error ("Search Failed...");
}
return res.json();


})

.then(data=>{
    console.log("Search results fetched",data);

    if(data.length === 0){
        document.getElementById("doctorList").innerHTML = "<p>No doctors found</p>";
        return;
    }
    displayDoctors(data);
})
.catch(err => console.log(err));
}



//GET ALL DOCTORS (DROPDOWN)
function loadDoctors(){
    
    document.getElementById("appointments").innerHTML = "";
    document.getElementById("doctorList").innerHTML = "";

    

fetch(`${BASE_URL}/api/doctor/getall`,{
    headers:{
        "Authorization":"Bearer "+localStorage.getItem("token"),
        "Content-Type":"application/json"
    }
})
.then(res=>{
    if(!res.ok){
        throw new Error("Failed to Load DDoctors!");
    }
    return res.json()
})
.then(data=>{

console.log("Doctors fetched successfully");

let specialties = new Set();


// collect specialities
data.forEach(doc=>{
    if(doc.specialty){
    specialties.add(doc.specialty);
    }
});

let dropdown = document.getElementById("specialtyDropdown");
if(dropdown){
    dropdown.innerHTML = `<option value="">All Specialties</option>`;
}else{
    console.error("Specialty dropdown not found");
}

specialties.forEach(spec=>{

    let option = document.createElement("option");
    option.value = spec;
    option.text = spec;
    dropdown.appendChild(option);
    
});

displayDoctors(data);

});
}

// GET ALL DOCTORS
function displayDoctors(data){

let html="";

data.forEach(doc => {

html += `
<div class="card">

<img src="${getAvatar(doc.name)}" width="80">

<h3>${doc.name}</h3>
<p>Specialty: ${doc.specialty}</p>
<p>Experience: ${doc.experience}</p>

<select onchange="loadSlots(${doc.id}, this.value)">
<option value="">Select Date</option>
${getDateOptions().map(d => `<option value="${d}">${d}</option>`).join("")}
</select>

<button onclick="toggleInfo(${doc.id})">View Info</button>

<div id="info-${doc.id}" class="info-box"></div>

<div id="slots-${doc.id}"></div>

</div>
`;

});

document.getElementById("doctorList").innerHTML = html;

data.forEach(doc => {
    generateCalendar(doc.id);
});   

}

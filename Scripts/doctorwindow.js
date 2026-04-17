// DOCTOR APPOINTMENTS

const doctorId = localStorage.getItem("userId");
console.log("Doctor ID:", doctorId);


// FIX: doctorId not needed anymore
function loadDoctorAppointments(){

fetch(`http://localhost:2000/api/doctor/${doctorId}`,{ // FIX: dummy id
headers:{
"Authorization":"Bearer "+localStorage.getItem("token")
}
})

.then(res=>{
    if(!res.ok){
        throw new Error("Failed to fetch doctor appointments");
    }
    return res.json();
})
.then(data=>{

    if(data.length ===0)
    {
        let html = "";
      html += `
    <div style="text-align:center; margin-top:20px;">
        <p>No appointments found!</p>
    </div>
    `;
    document.getElementById("appointments").innerHTML = html;
    return;
    }

console.log("Doctor appointments loaded"); 

let html = "<h3>Doctor Appointments</h3>";

data.forEach(app => {

html += `
<div class="card">
<p>Patient ID: ${app.patient.id}</p>
<p>Date: ${app.date}</p>
<p>Time: ${app.time}</p>
<p>Status: ${app.status}</p>

<button ${app.status !== 'PENDING' ? app.status == 'COMPLETED' ? 'disabled': 'enabled':'enabled'}
onclick="approve(${app.id})">Approve</button>
<button ${app.status !== 'PENDING' ? app.status == 'COMPLETED' ? 'disabled':'enabled':'enabled'} 
onclick="reject(${app.id})">Reject</button>
<button ${app.status !== 'APPROVED' ? 'disabled':''}
 onclick="complete(${app.id})">Complete</button>
</div>
`;
});

document.getElementById("appointments").innerHTML = html;

})
.catch(err=>console.error(err));
}


// approve

function approve(id){
fetch(`http://localhost:2000/api/appointments/approve/${id}`,{
method:"PUT",
headers:{
"Authorization":"Bearer "+localStorage.getItem("token")
}
})
.then(()=>{
console.log("Appointment APPROVED:", id); // FIX
loadDoctorAppointments();
});
}

function reject(id){
fetch(`http://localhost:2000/api/appointments/reject/${id}`,{
method:"PUT",
headers:{
"Authorization":"Bearer "+localStorage.getItem("token")
}
})
.then(()=>{
console.log("Appointment REJECTED:", id); // FIX
loadDoctorAppointments();
});
}

function complete(id){
fetch(`http://localhost:2000/api/appointments/completed/${id}`,{
method:"PUT",
headers:{
"Authorization":"Bearer "+localStorage.getItem("token")
}
})
.then(()=>{
console.log("Appointment COMPLETED:", id);
loadDoctorAppointments();
});
}
// BOOKING AN APPOINTMENT
function bookAppointment(slotId, selectedDate){

    const btn = document.getElementById(`btn-${slotId}`);

    if(btn){
        btn.innerText = "Booked...";
        btn.disabled = true;
    }

    fetch(`http://localhost:2000/api/appointments/book-slot?slotId=${slotId}&date=${selectedDate}`,{
        method:"POST",
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
    })
    .then(res => {
        if(!res.ok){
            throw new Error("Booking failed");
        }
        return res.json();
    })
    .then(data=>{
        showToast("Appointment booked successfully","success");

        if(btn){
            btn.innerText = "Booked";
        }

        console.log("Booking success:", data);
    })
    .catch(err => {
        console.error(err);

        showToast("Failed to book slot","error");

        if(btn){
            btn.disabled = false;
            btn.innerText = "Book";
        }
    });
}

// APPOINTMENT STATUS & HISTORY
function loadMyAppointments(){

    function clearAllViews(){
    document.getElementById("appointments").innerHTML = "";
    document.getElementById("doctorList").innerHTML = "";
}

//  clear doctor list

document.getElementById("doctorList").innerHTML = "";  

const container = document.getElementById("appointments");

if(!container){
    console.error("appointments div not found");
    return;
}

const patientId = localStorage.getItem("userId");


fetch(`http://localhost:2000/api/patient/appointments/${patientId}`,{
headers:{
"Authorization":"Bearer "+localStorage.getItem("token")
}
})
.then(res=>{
    if(!res.ok){
        throw new Error("Failed to fetch appointments");
    }
    return res.json();
})
.then(data=>{

let html = "<h3>My Appointments</h3>";

data.forEach(app => {

html += `
<div class="card">
<p><b>Doctor:</b> ${app.doctor.name}</p>
<p><b>Date:</b> ${app.date}</p>
<p><b>Time:</b> ${app.time}</p>
<p><b>Status:</b> ${app.status}</p>
</div>
`;
});

document.getElementById("appointments").innerHTML = html;

})
.catch(err=>console.error(err));
}


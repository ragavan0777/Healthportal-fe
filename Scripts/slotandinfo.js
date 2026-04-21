var BASE_URL ="https://healthportal-be-1.onrender.com";
function getDateOptions(){
    let dates = [];
    let today = new Date();

    for(let i=0;i<7;i++){
        let d = new Date();
        d.setDate(today.getDate() + i);

       
        let formatted = d.getFullYear() + "-" +
            String(d.getMonth()+1).padStart(2,'0') + "-" +
            String(d.getDate()).padStart(2,'0');

        dates.push(formatted);
    }

    return dates;
}



function getTimeSlots(){
return [
"10:00","10:30","11:00","11:30",
"12:00","12:30","13:00",
"14:00","14:30","15:00","15:30"
];
}

function generateNext7Days(doctorId){

    const dropdown = document.getElementById(`date-${doctorId}`);
    dropdown.innerHTML = `<option value="">Select Date</option>`;

    const today = new Date();

    for(let i=0; i<7; i++){
        const d = new Date();
        d.setDate(today.getDate() + i);

        const formatted = d.toISOString().split("T")[0];

        const option = document.createElement("option");
        option.value = formatted;
        option.text = d.toDateString();

        dropdown.appendChild(option);
    }
}


function loadSlots(doctorId, selectedDate){

if(!selectedDate) return;

fetch(`${BASE_URL}/api/slots/${doctorId}/${selectedDate}`,{
headers:{
"Authorization":"Bearer "+localStorage.getItem("token")
}
})
.then(res => {
    if(!res.ok){
        throw new Error("Failed to fetch slots");
    }
    return res.json();
})
.then(slots => {

let container = document.getElementById(`slots-${doctorId}`);

if(!container){
    document.getElementById("doctorList").innerHTML += 
        `<div id="slots-${doctorId}"></div>`;
    container = document.getElementById(`slots-${doctorId}`);
}

// SORT TIME (IMPORTANT)
slots.sort((a,b) => a.time.localeCompare(b.time));

let html = "<div style='display:flex;flex-wrap:wrap;gap:10px;'>";

slots.forEach(slot => {
html += `
<div class="slot-card">
<p>${slot.time}</p>
<button id="btn-${slot.id}" onclick="bookAppointment(${slot.id})">Book</button>
</div>
`;
});

html += "</div>";

container.innerHTML = html;

})
.catch(err   => console.error(err));
}



// VIEW INFO
function toggleInfo(doctorId){

const div = document.getElementById(`info-${doctorId}`);

// TOGGLE CLOSE
if(div.style.display === "block"){
    div.style.display = "none";
    return;
}

// FETCH DOCTOR INFO
fetch(`${BASE_URL}/api/doctor/public/${doctorId}`,{
headers:{
"Authorization":"Bearer "+localStorage.getItem("token")
}
})
.then(res=>{
    if(!res.ok){
        throw new Error("Failed to fetch doctor info");
    }
    return res.json();
})
.then(doc=>{

div.innerHTML = `
<div class="card">
<img src="${getAvatar(doc.name)}" width="80">

<p><b>Name:</b> ${doc.name}</p>
<p><b>Specialty:</b> ${doc.specialty}</p>
<p><b>Experience:</b> ${doc.experience} years</p>

<p>Highly experienced doctor providing quality care.</p>
</div>
`;

div.style.display = "block";

})
.catch(err=>{
    console.error(err);
    div.innerHTML = "<p>Error loading doctor info</p>";
    div.style.display = "block";
});

}

// GENERATE CALENDAR
function generateCalendar(doctorId){

    const calendarDiv = document.getElementById(`calendar-${doctorId}`);

    if(!calendarDiv) return;

    let html = "";

    const today = new Date();

    for(let i=0; i<7; i++){

        let d = new Date();
        d.setDate(today.getDate() + i);

        let formatted = d.toISOString().split("T")[0];

        html += `
        <button class="date-btn" onclick="loadSlots(${doctorId}, '${formatted}')">
            ${d.getDate()}/${d.getMonth()+1}
        </button>
        `;
    }

    calendarDiv.innerHTML = html;
}



// CALENDAR DATE OPTIONS
function renderCalendar(doctorId){

let container = document.getElementById(`calendar-${doctorId}`);
let html = "";

for(let i=0;i<7;i++){
    let d = new Date();
    d.setDate(d.getDate()+i);

    let date = d.toISOString().split("T")[0];

    html += `
    <button class="date-btn" 
    onclick="loadSlots(${doctorId}, '${date}')">
    ${d.toDateString().slice(0,10)}
    </button>`;
}

container.innerHTML = html;
}
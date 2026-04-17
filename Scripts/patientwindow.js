// function getDateOptions(){
//     let dates = [];
//     let today = new Date();

//     for(let i=0;i<7;i++){
//         let d = new Date();
//         d.setDate(today.getDate() + i);

//         let formatted = d.toISOString().split("T")[0];
//         dates.push(formatted);
//     }

//     return dates;
// }


// // ENTER KEY SEARCH
// document.getElementById("searchName").addEventListener("keypress", function(e){
//     if(e.key === "Enter"){
//         searchDoctors();
//     }
// });



// document.getElementById("specialtyDropdown").addEventListener("change", function () {
//     document.getElementById("searchName").value = "";
//     searchDoctors();
// });



// // SEARCH BAR
// function searchDoctors(){

// let name = document.getElementById("searchName").value.trim();
// let specialty = document.getElementById("specialtyDropdown").value.trim();

// if(specialty !== ""){
//     name = "";
// }

// console.log("Searching:", name, specialty);


// fetch(`http://localhost:2000/api/doctor/search?name=${name}&specialty=${specialty}`,{
//     headers:{
//         "Authorization":"Bearer "+localStorage.getItem("token")
//     }
// })
// .then(res=>{if(!res.ok)
// {
//  throw new Error ("Search Failed...");
// }
// return res.json();


// })

// .then(data=>{
//     console.log("Search results fetched",data);

//     if(data.length === 0){
//         document.getElementById("doctorList").innerHTML = "<p>No doctors found</p>";
//         return;
//     }
//     displayDoctors(data);
// })
// .catch(err => console.log(err));
// }




// //GET ALL DOCTORS (DROPDOWN)
// function loadDoctors(){
    
//     document.getElementById("appointments").innerHTML = "";
//     document.getElementById("doctorList").innerHTML = "";

    

// fetch("http://localhost:2000/api/doctor/getall",{
//     headers:{
//         "Authorization":"Bearer "+localStorage.getItem("token"),
//         "Content-Type":"application/json"
//     }
// })
// .then(res=>{
//     if(!res.ok){
//         throw new Error("Failed to Load DDoctors!");
//     }
//     return res.json()
// })
// .then(data=>{

// console.log("Doctors fetched successfully");

// let specialties = new Set();


// // collect specialities
// data.forEach(doc=>{
//     if(doc.specialty){
//     specialties.add(doc.specialty);
//     }
// });

// let dropdown = document.getElementById("specialtyDropdown");
// dropdown.innerHTML = `<option value="">All Specialties</option>`;

// specialties.forEach(spec=>{

//     let option = document.createElement("option");
//     option.value = spec;
//     option.text = spec;
//     dropdown.appendChild(option);
    
// });

// displayDoctors(data);

// });
// }

// // GET ALL DOCTORS
// function displayDoctors(data){

// let html="";

// data.forEach(doc => {

// html += `
// <div class="card">

// <img src="${getAvatar(doc.name)}" width="80">

// <h3>${doc.name}</h3>
// <p>Specialty: ${doc.specialty}</p>
// <p>Experience: ${doc.experience}</p>

// <select onchange="loadSlotsByDate(${doc.id}, this.value)">
// <option value="">Select Date</option>
// ${getDateOptions().map(d => `<option value="${d}">${d}</option>`).join("")}
// </select>

// <button onclick="toggleInfo(${doc.id})">View Info</button>

// <div id="info-${doc.id}" class="info-box"></div>

// <div id="slots-${doc.id}"></div>

// </div>
// `;

// });

// document.getElementById("doctorList").innerHTML = html;
// }


//SLOT GENERATION 

// function getTimeSlots(){
// return [
// "10:00","10:30","11:00","11:30",
// "12:00","12:30","13:00",
// "14:00","14:30","15:00","15:30"
// ];
// }

// function generateNext7Days(doctorId){

//     const dropdown = document.getElementById(`date-${doctorId}`);
//     dropdown.innerHTML = `<option value="">Select Date</option>`;

//     const today = new Date();

//     for(let i=0; i<7; i++){
//         const d = new Date();
//         d.setDate(today.getDate() + i);

//         const formatted = d.toISOString().split("T")[0];

//         const option = document.createElement("option");
//         option.value = formatted;
//         option.text = d.toDateString();

//         dropdown.appendChild(option);
//     }
// }


// // VIEW INFO
// function toggleInfo(doctorId){

// const div = document.getElementById(`info-${doctorId}`);

// // TOGGLE CLOSE
// if(div.style.display === "block"){
//     div.style.display = "none";
//     return;
// }

// // FETCH DOCTOR INFO
// fetch(`http://localhost:2000/api/doctor/public/${doctorId}`,{
// headers:{
// "Authorization":"Bearer "+localStorage.getItem("token")
// }
// })
// .then(res=>{
//     if(!res.ok){
//         throw new Error("Failed to fetch doctor info");
//     }
//     return res.json();
// })
// .then(doc=>{

// div.innerHTML = `
// <div class="card">
// <img src="${getAvatar(doc.name)}" width="80">

// <p><b>Name:</b> ${doc.name}</p>
// <p><b>Specialty:</b> ${doc.specialty}</p>
// <p><b>Experience:</b> ${doc.experience} years</p>

// <p>Highly experienced doctor providing quality care.</p>
// </div>
// `;

// div.style.display = "block";

// })
// .catch(err=>{
//     console.error(err);
//     div.innerHTML = "<p>Error loading doctor info</p>";
//     div.style.display = "block";
// });

// }





// // SLOT MODEL CREATE
// function openSlotModal(slots, date){

// const modal = document.getElementById("slotModal");
// const container = document.getElementById("modalSlots");

// document.getElementById("modalDate").innerText = "Slots for " + date;

// if(slots.length === 0){
// container.innerHTML = "<p>No slots available</p>";
// }else{

// let html = "";

// slots.forEach(slot=>{
// html += `
// <div class="card">
// <p>${slot.time}</p>
// <button id="btn-${slot.id}" onclick="bookAppointment(${slot.id}, '${date}')">
//     Book
// </button>
// </div>
// `;
// });

// container.innerHTML = html;
// }

// modal.style.display = "flex";
// }

// function closeModal(){
// document.getElementById("slotModal").style.display = "none";
// }


// //View avialable slots
// function loadSlotsByDate(doctorId, selectedDate){

//     if(!selectedDate) return;

//     fetch(`http://localhost:2000/api/patient/slots/${doctorId}`,{
//         headers:{
//             "Authorization":"Bearer "+localStorage.getItem("token")
//         }
//     })
//     .then(res=>res.json())
//     .then(slots=>{


//         let filtered = slots.filter(s => s.date === selectedDate);

//         openSlotModal(filtered, selectedDate);

//     })
//     .catch(err=>console.error(err));
// }
// // BOOKING AN APPOINTMENT
// function bookAppointment(slotId, selectedDate){

//     const btn = document.getElementById(`btn-${slotId}`);

//     if(btn){
//         btn.disabled = true;
//         btn.innerText = "Booking...";
//     }

//     fetch(`http://localhost:2000/api/appointments/book-slot?slotId=${slotId}&date=${selectedDate}`,{
//         method:"POST",
//         headers:{
//             "Authorization":"Bearer "+localStorage.getItem("token")
//         }
//     })
//     .then(res => {
//         if(!res.ok){
//             throw new Error("Booking failed");
//         }
//         return res.json();
//     })
//     .then(data=>{
//         showToast("Appointment booked successfully","success");

//         if(btn){
//             btn.innerText = "Booked";
//         }

//         console.log("Booking success:", data);
//     })
//     .catch(err => {
//         console.error(err);

//         showToast("Failed to book slot","error");

//         if(btn){
//             btn.disabled = false;
//             btn.innerText = "Book";
//         }
//     });
// }

// // APPOINTMENT STATUS & HISTORY
// function loadMyAppointments(){

//     function clearAllViews(){
//     document.getElementById("appointments").innerHTML = "";
//     document.getElementById("doctorList").innerHTML = "";
// }

// //  clear doctor list

// document.getElementById("doctorList").innerHTML = "";  

// const container = document.getElementById("appointments");

// if(!container){
//     console.error("appointments div not found");
//     return;
// }

// fetch(`http://localhost:2000/api/patient/appointments/${patientId}`,{
// headers:{
// "Authorization":"Bearer "+localStorage.getItem("token")
// }
// })
// .then(res=>{
//     if(!res.ok){
//         throw new Error("Failed to fetch appointments");
//     }
//     return res.json();
// })
// .then(data=>{

// let html = "<h3>My Appointments</h3>";

// data.forEach(app => {

// html += `
// <div class="card">
// <p><b>Doctor:</b> ${app.doctor.name}</p>
// <p><b>Date:</b> ${app.date}</p>
// <p><b>Time:</b> ${app.time}</p>
// <p><b>Status:</b> ${app.status}</p>
// </div>
// `;
// });

// document.getElementById("appointments").innerHTML = html;

// })
// .catch(err=>console.error(err));
// }


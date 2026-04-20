# 🏥 CareSync Health Portal – Frontend

## 📌 Overview

This is the frontend of the **CareSync Health Portal**, a responsive web application that allows patients to:

* 🔍 Search doctors by name and specialty
* 📅 View available appointment slots
* 📌 Book appointments
* 📋 View their appointments

Built using **HTML, CSS, and JavaScript**, with a focus on responsive and modern UI.

---

## 🧰 Tech Stack

* HTML5
* CSS3 (Custom responsive design + CSS variables)
* JavaScript (Vanilla JS)

---

## 📁 Folder Structure

```
frontend/
│── index.html
│── login.html
│── register.html
│── patient.html
│
├── Styles/
│   ├── style.css
│   └── dashboard.css
│
├── Scripts/
│   ├── auth.js
│   ├── utils.js
│   ├── search.js
│   ├── slotandinfo.js
│   ├── appointment.js
│   └── patientwindow.js
```

---

## 🚀 Features

### 🔐 Authentication

* Login / Register
* JWT stored in localStorage

### 👨‍⚕️ Doctor Management

* View all doctors
* Search by name & specialty

### 📅 Slot Booking

* Dynamic date dropdown / calendar
* Real-time slot loading
* Prevents double booking

### 📱 Responsive UI

* Mobile-first design
* Grid-based layout
* Clean color palette (dark + neon theme)

---

## ⚙️ Setup Instructions

1. Clone the repository

```
git clone <your-repo-link>
```

2. Open project folder

3. Run using Live Server (VS Code recommended)

4. Make sure backend is running at:

```
http://localhost:2000
```

---

## 🔗 API Configuration

Update backend URL inside JS files if deployed:

```js
const BASE_URL = "http://localhost:2000/api";
```

---

## 🎨 UI Design System

* Dark theme background
* Neon accent colors (#00ffd5, #0ef)
* Glassmorphism navbar
* Responsive card layout

---

## ⚠️ Common Issues

### ❌ CORS Error

Ensure backend allows:

```
http://127.0.0.1:5500 / 5501
```

### ❌ Slots not loading

* Check API response in console
* Ensure backend is running

---

## 📌 Future Improvements

* Calendar UI instead of dropdown
* Notifications system
* Doctor profile page
* UI animations

---

## 👨‍💻 Author

Ragavan R

---


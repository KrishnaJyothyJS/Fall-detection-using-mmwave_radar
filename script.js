// ====================================
// DEMONSTRATION DATA
// ====================================


// RESIDENTS

const residents = [

    {
        id: "R-001",
        name: "John Mathew",
        age: 72,
        room: "Room 101",
        device: "LD2420-001",
        activity: "Walking",
        status: "Normal",
        falls: 0,
        lastSeen: "2 minutes ago"
    },

    {
        id: "R-002",
        name: "Mary Thomas",
        age: 68,
        room: "Room 102",
        device: "LD2420-002",
        activity: "Sitting",
        status: "Normal",
        falls: 1,
        lastSeen: "1 minute ago"
    },

    {
        id: "R-003",
        name: "Joseph George",
        age: 81,
        room: "Room 103",
        device: "LD2420-003",
        activity: "Possible Fall",
        status: "Critical",
        falls: 2,
        lastSeen: "Just now"
    },

    {
        id: "R-004",
        name: "Elizabeth Paul",
        age: 75,
        room: "Room 104",
        device: "LD2420-004",
        activity: "No Movement",
        status: "Warning",
        falls: 0,
        lastSeen: "5 minutes ago"
    }

];


// EMERGENCY ALERTS

let alerts = [

    {
        id: 1,
        resident: "Joseph George",
        residentId: "R-003",
        event: "Fall Detected",
        location: "Room 103",
        time: "07:42 PM",
        confidence: "94%",
        priority: "Critical",
        status: "Pending"
    },

    {
        id: 2,
        resident: "Elizabeth Paul",
        residentId: "R-004",
        event: "Prolonged Inactivity",
        location: "Room 104",
        time: "07:30 PM",
        confidence: "N/A",
        priority: "Warning",
        status: "Pending"
    }

];


// ACTIVITY TIMELINE

let activities = [

    {
        resident: "John Mathew",
        event: "Walking detected",
        description: "Normal movement detected by radar sensor.",
        time: "07:35 PM",
        type: "normal"
    },

    {
        resident: "Mary Thomas",
        event: "Sitting detected",
        description: "Resident activity classified as sitting.",
        time: "07:20 PM",
        type: "normal"
    },

    {
        resident: "Elizabeth Paul",
        event: "Prolonged inactivity",
        description: "Movement has not been detected for the configured monitoring interval.",
        time: "07:30 PM",
        type: "warning"
    },

    {
        resident: "Joseph George",
        event: "Fall detected",
        description: "Potential fall event detected by the AI classification model.",
        time: "07:42 PM",
        type: "critical"
    },

    {
        resident: "John Mathew",
        event: "Standing detected",
        description: "Normal activity classification.",
        time: "06:45 PM",
        type: "normal"
    },

    {
        resident: "Mary Thomas",
        event: "Walking detected",
        description: "Normal movement detected.",
        time: "06:15 PM",
        type: "normal"
    }

];


// ====================================
// DATE AND TIME
// ====================================

function updateDate() {

    const date = new Date();

    document.getElementById("currentDate").textContent =
        date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

}

updateDate();


// ====================================
// ALERT MANAGEMENT
// ====================================

function renderAlerts() {

    const container = document.getElementById("alertsContainer");

    container.innerHTML = "";

    alerts.forEach(alert => {

        const isWarning = alert.priority === "Warning";

        const card = document.createElement("div");

        card.className = `alert-card ${isWarning ? "warning" : ""}`;

        const icon = isWarning
            ? "fa-clock"
            : "fa-triangle-exclamation";

        let actions = "";

        if (alert.status === "Pending") {

            actions = `
                <div class="alert-actions">

                    <button class="btn btn-primary"
                    onclick="acknowledgeAlert(${alert.id})">

                        <i class="fa-solid fa-check"></i>
                        Acknowledge

                    </button>

                    <button class="btn btn-secondary"
                    onclick="resolveAlert(${alert.id})">

                        Resolve

                    </button>

                </div>
            `;

        } else if (alert.status === "Acknowledged") {

            actions = `
                <div class="alert-actions">

                    <span class="resolved-label">
                        <i class="fa-solid fa-check-circle"></i>
                        Acknowledged
                    </span>

                    <button class="btn btn-secondary"
                    onclick="resolveAlert(${alert.id})">

                        Mark Resolved

                    </button>

                </div>
            `;

        } else {

            actions = `
                <span class="resolved-label">
                    <i class="fa-solid fa-circle-check"></i>
                    Resolved
                </span>
            `;

        }


        card.innerHTML = `

            <div class="alert-top">

                <div class="alert-type">

                    <i class="fa-solid ${icon}"></i>

                    ${alert.event}

                </div>

                <span class="priority">

                    ${alert.priority}

                </span>

            </div>


            <div class="alert-info">

                <div>Resident: <strong>${alert.resident}</strong></div>

                <div>Resident ID: <strong>${alert.residentId}</strong></div>

                <div>Location: <strong>${alert.location}</strong></div>

                <div>Time: <strong>${alert.time}</strong></div>

                <div>AI Confidence: <strong>${alert.confidence}</strong></div>

                <div>Status: <strong>${alert.status}</strong></div>

            </div>


            ${actions}

        `;

        container.appendChild(card);

    });


    updateStatistics();

}


// ACKNOWLEDGE ALERT

function acknowledgeAlert(id) {

    const alert = alerts.find(item => item.id === id);

    if (alert && alert.status === "Pending") {

        alert.status = "Acknowledged";

        renderAlerts();

        showToast("Alert acknowledged successfully.");

    }

}


// RESOLVE ALERT

function resolveAlert(id) {

    const alert = alerts.find(item => item.id === id);

    if (alert) {

        alert.status = "Resolved";

        renderAlerts();

        showToast("Emergency alert marked as resolved.");

    }

}


// ====================================
// RESIDENT MONITORING
// ====================================

function renderResidents(search = "") {

    const container = document.getElementById("residentGrid");

    container.innerHTML = "";

    const filteredResidents = residents.filter(resident =>

        resident.name.toLowerCase().includes(search.toLowerCase()) ||

        resident.id.toLowerCase().includes(search.toLowerCase())

    );


    filteredResidents.forEach(resident => {

        const card = document.createElement("div");

        card.className = "resident-card";

        const warningClass = resident.status === "Normal"
            ? ""
            : "warning-status";

        card.innerHTML = `

            <div class="resident-top">

                <div class="resident-avatar">

                    ${resident.name.charAt(0)}

                </div>

                <div>

                    <h3>${resident.name}</h3>

                    <p>${resident.id} · Age ${resident.age}</p>

                </div>

                <span class="resident-status ${warningClass}">

                    ${resident.status}

                </span>

            </div>


            <div class="resident-details">

                <div class="detail-item">

                    <span>ROOM NUMBER</span>

                    <strong>${resident.room}</strong>

                </div>

                <div class="detail-item">

                    <span>CURRENT ACTIVITY</span>

                    <strong>${resident.activity}</strong>

                </div>

                <div class="detail-item">

                    <span>RADAR DEVICE</span>

                    <strong>${resident.device}</strong>

                </div>

                <div class="detail-item">

                    <span>FALL HISTORY</span>

                    <strong>${resident.falls} incidents</strong>

                </div>

            </div>


            <button class="view-profile"
            onclick="viewResident('${resident.id}')">

                View Full Profile

                <i class="fa-solid fa-arrow-right"></i>

            </button>

        `;

        container.appendChild(card);

    });

}


// SEARCH RESIDENTS

document.getElementById("residentSearch")
.addEventListener("input", function() {

    renderResidents(this.value);

});


// VIEW RESIDENT PROFILE

function viewResident(id) {

    const resident = residents.find(item => item.id === id);

    if (!resident) return;

    const details = document.getElementById("residentDetails");

    details.innerHTML = `

        <span class="section-label">RESIDENT PROFILE</span>

        <h2>${resident.name}</h2>

        <p>

            <strong>Resident ID:</strong> ${resident.id}<br>

            <strong>Age:</strong> ${resident.age}<br>

            <strong>Room:</strong> ${resident.room}<br>

            <strong>Radar Device:</strong> ${resident.device}<br>

            <strong>Current Activity:</strong> ${resident.activity}<br>

            <strong>Monitoring Status:</strong> ${resident.status}<br>

            <strong>Fall History:</strong> ${resident.falls} incidents<br>

            <strong>Last Activity:</strong> ${resident.lastSeen}

        </p>

        <br>

        <span class="section-label">
            MONITORING INFORMATION
        </span>

        <p>

            This resident is registered in the demonstration
            monitoring system. Sensor readings and AI
            classification results will be displayed here
            after hardware integration.

        </p>

    `;

    document.getElementById("residentModal")
    .classList.add("show");

}


// CLOSE PROFILE

document.getElementById("closeModal")
.addEventListener("click", function() {

    document.getElementById("residentModal")
    .classList.remove("show");

});

document.getElementById("residentModal")
.addEventListener("click", function(event) {

    if (event.target === this) {

        this.classList.remove("show");

    }

});


// ====================================
// ACTIVITY TIMELINE
// ====================================

function renderTimeline(filter = "all") {

    const container = document.getElementById("timelineList");

    container.innerHTML = "";

    const filteredActivities = activities.filter(activity =>

        filter === "all" || activity.type === filter

    );


    filteredActivities.forEach(activity => {

        const item = document.createElement("div");

        item.className = `timeline-item ${activity.type}`;

        item.innerHTML = `

            <div class="timeline-dot"></div>

            <div class="timeline-time">

                ${activity.time}

            </div>

            <h4>${activity.event}</h4>

            <p>

                Resident: <strong>${activity.resident}</strong><br>

                ${activity.description}

            </p>

        `;

        container.appendChild(item);

    });

    if (filteredActivities.length === 0) {

        container.innerHTML = "<p>No activities found.</p>";

    }

}


// TIMELINE FILTER

document.getElementById("timelineFilter")
.addEventListener("change", function() {

    renderTimeline(this.value);

});


// ====================================
// STATISTICS
// ====================================

function updateStatistics() {

    const pending = alerts.filter(alert =>

        alert.status !== "Resolved"

    ).length;


    document.getElementById("activeAlerts").textContent =
        String(pending).padStart(2, "0");


    document.getElementById("sidebarAlertCount").textContent =
        pending;

    document.getElementById("totalResidents").textContent =
        String(residents.length).padStart(2, "0");

    document.getElementById("activityCount").textContent =
        String(activities.length).padStart(2, "0");

}


// ====================================
// NOTIFICATION TOAST
// ====================================

let toastTimer;

function showToast(message) {

    const toast = document.getElementById("toast");

    document.getElementById("toastMessage").textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


// ====================================
// NOTIFICATION BUTTON
// ====================================

document.getElementById("notificationButton")
.addEventListener("click", function() {

    const pending = alerts.filter(alert =>

        alert.status !== "Resolved"

    ).length;

    showToast(`${pending} unresolved alerts require attention.`);

});


// ====================================
// SIDEBAR NAVIGATION
// ====================================

document.querySelectorAll(".nav-item").forEach(link => {

    link.addEventListener("click", function() {

        document.querySelectorAll(".nav-item")
        .forEach(item => item.classList.remove("active"));

        this.classList.add("active");

    });

});


// ====================================
// INITIALIZE DASHBOARD
// ====================================

renderAlerts();

renderResidents();

renderTimeline();

updateStatistics();

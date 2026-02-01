// SIMPLE CALENDAR DISPLAY SYSTEM

// When page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Website loaded successfully");
    
    // Load any saved calendar
    loadSavedCalendar();
    
    // Setup the Load Calendar button
    document.getElementById('load-calendar').addEventListener('click', loadCalendar);
    
    // Setup booking form
    document.getElementById('bookingForm').addEventListener('submit', bookAppointment);
    
    // Setup smooth scrolling for nav links
    setupSmoothScroll();
});

// ====================
// MAIN CALENDAR FUNCTIONS
// ====================

function loadSavedCalendar() {
    // Check if user saved a calendar URL before
    const savedUrl = localStorage.getItem('myCalendarUrl');
    
    if (savedUrl) {
        console.log("📁 Found saved calendar URL:", savedUrl);
        document.getElementById('calendar-url').value = savedUrl;
        showCalendar(savedUrl);
    } else {
        console.log("ℹ️ No saved calendar found");
    }
}

function loadCalendar() {
    // Get the URL from the input box
    const urlInput = document.getElementById('calendar-url');
    const calendarUrl = urlInput.value.trim();
    
    console.log("🔄 Loading calendar with URL:", calendarUrl);
    
    // Check if URL is empty
    if (!calendarUrl) {
        alert("❌ Please paste a Google Calendar URL first");
        urlInput.focus();
        return;
    }
    
    // Check if it's a Google Calendar URL
    if (!calendarUrl.includes('calendar.google.com')) {
        alert("⚠️ This doesn't look like a Google Calendar URL.\n\nMake sure it starts with: https://calendar.google.com/calendar/embed?...");
        return;
    }
    
    // Save to browser storage
    localStorage.setItem('myCalendarUrl', calendarUrl);
    console.log("💾 URL saved to browser storage");
    
    // Display the calendar
    showCalendar(calendarUrl);
    
    alert("✅ Calendar loaded successfully!\n\nIt will automatically appear next time you visit.");
}

function showCalendar(calendarUrl) {
    const calendarDiv = document.getElementById('google-calendar');
    
    console.log("🎨 Creating calendar iframe...");
    
    // Create the iframe to show Google Calendar
    calendarDiv.innerHTML = `
        <div class="calendar-container">
            <iframe 
                src="${calendarUrl}"
                style="width: 100%; height: 600px; border: none; border-radius: 5px;"
                frameborder="0"
                scrolling="no">
            </iframe>
            <div class="calendar-links">
                <a href="${calendarUrl}" target="_blank" class="open-tab">📖 Open in Full Tab</a>
                <button onclick="changeCalendar()" class="change-btn">🔄 Change Calendar</button>
                <button onclick="clearCalendar()" class="clear-btn">🗑️ Clear Calendar</button>
            </div>
        </div>
    `;
}

// Helper function to paste a test URL
function pasteTestUrl() {
    const testUrl = "https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FNew_York";
    document.getElementById('calendar-url').value = testUrl;
    console.log("🧪 Test URL pasted");
    alert("Test calendar URL pasted! Now click 'Load Calendar' to see it.");
}

function changeCalendar() {
    document.getElementById('calendar-url').value = '';
    document.getElementById('calendar-url').focus();
    alert("Enter a new Google Calendar URL above");
}

function clearCalendar() {
    localStorage.removeItem('myCalendarUrl');
    document.getElementById('calendar-url').value = '';
    document.getElementById('google-calendar').innerHTML = `
        <div class="placeholder">
            <p>📆 Calendar cleared. Paste a new URL above.</p>
        </div>
    `;
    alert("Calendar cleared!");
}

// ====================
// BOOKING FUNCTIONS
// ====================

function bookAppointment(event) {
    event.preventDefault(); // Stop form from refreshing page
    
    const date = document.getElementById('appointment-date').value;
    const time = document.getElementById('appointment-time').value;
    const name = document.querySelector('#bookingForm input[type="text"]').value;
    
    if (!date || !time || !name) {
        alert("Please fill in all fields: Name, Date, and Time");
        return;
    }
    
    // Get the current calendar URL
    const calendarUrl = localStorage.getItem('myCalendarUrl');
    
    if (!calendarUrl) {
        alert("Please load a calendar first before booking");
        return;
    }
    
    // Create Google Calendar event
    const startTime = `${date}T${time}:00`;
    const endTime = `${date}T${addOneHour(time)}:00`;
    
    const googleEventUrl = 
        `https://calendar.google.com/calendar/render?action=TEMPLATE` +
        `&text=Appointment with ${encodeURIComponent(name)}` +
        `&dates=${startTime}/${endTime}` +
        `&details=Booked via website&location=Online&sf=true`;
    
    // Open in new tab
    window.open(googleEventUrl, '_blank');
    
    // Show confirmation
    alert(`✅ Appointment booked for ${date} at ${time}\n\nA Google Calendar event has been opened. Click "Save" to confirm.`);
    
    // Reset form
    document.getElementById('bookingForm').reset();
}

function addOneHour(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const newHour = (hours + 1) % 24;
    return `${newHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// ====================
// NAVIGATION
// ====================

function setupSmoothScroll() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====================
// ADD STYLES FOR CALENDAR LINKS
// ====================
const style = document.createElement('style');
style.textContent = `
    .calendar-links {
        margin-top: 15px;
        display: flex;
        gap: 10px;
        justify-content: center;
    }
    
    .open-tab {
        background: #3498db;
        color: white;
        padding: 8px 15px;
        border-radius: 5px;
        text-decoration: none;
        font-size: 14px;
    }
    
    .change-btn, .clear-btn {
        background: #95a5a6;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
    }
    
    .clear-btn {
        background: #e74c3c;
    }
    
    .calendar-container {
        text-align: center;
    }
`;
document.head.appendChild(style);
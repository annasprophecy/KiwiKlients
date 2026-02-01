// Wait until page fully loads, then run this code
document.addEventListener('DOMContentLoaded', function() {
    
    // *Google Calendar Integration*

    // Default Google Calendar embed code (replace with YOUR OWN CODE)
const DEFAULT_CALENDAR_URL = "https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FNew_York";
    // Load calendar when page loads
    loadSavedCalendar();

    // Load Calendar Button
    document.getElementById('load-calendar').addEventListener('click', function() {
        loadCustomCalendar();
    });
        
    // Booking Form Submission
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        bookAppointment();
    });

    // ====== CALENDAR FUNCTIONS ======

    // Load user's saved calendar or default
    function loadSavedCalendar() {
        // Check if user previously saved a calendar URL
        const savedUrl = localStorage.getItem('userCalendarUrl');
        const urlToLoad = savedUrl || DEFAULT_CALENDAR_URL;

        document.getElementById('calendar-url').value = savedUrl || '';
        displayCalendar(urlToLoad);
    }

    // Display calendar in iframe
    function displayCalendar(calendarUrl) {
        const calendarDiv = document.getElementById('google-calendar');
        
        // Create iframe for Google Calendar
        calendarDiv.innerHTML = `
            <iframe src="${calendarUrl}"
                    class="calendar-iframe"
                    frameborder="0"
                    scrolling="no">
            </iframe>
            <p><small>Can't see calendar? <a href="${calendarUrl}" target="_blank">Open in new tab</a></small></p>
        `;
    }

    // Load custom calendar from user input
    function loadCustomCalendar() {
        const calendarUrl = document.getElementById('calendar-url').value.trim();

        if(!calendarUrl) {
            alert('Please enter a calendar URL');
            return;
        }

        // Save to browser storage for future visits
        localStorage.setItem('userCalendarUrl', calendarUrl);

        // Display the calendar
        displayCalendar(calendarUrl);

        alert('Calendar saved! It will load automatically next time.');
    }

    // Handle booking appointment
    function bookAppointment() {
        const form = document.getElementById('bookingForm');
        const date = document.getElementById('appointment-date').value;
        const time = document.getElementById('appointment-time').value;

        // Get user's calendar URL
        const calendarUrl = localStorage.getItem('userCalendarUrl') || DEFAULT_CALENDAR_URL;

        if (!date || !time) {
            alert('Please select both date and time');
            return;
        }

        // Create google calendar event link
        const appointmentDateTime = `${date}T${time}:00`;
        const endDateTime = `${date}T${addOneHour(time)}:00`;

        // Google calendar event creation URL
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${appointmentDateTime}/${endDateTime}&details=Appointment booked via website&location=Online`;

        // Open in new tab
        window.open(googleCalendarUrl, '_blank');

        // Show confirmation
        alert(`Appointment booked for ${date} at ${time}. A Google Calendar event has been created.`);
        form.reset();
    }

    // Helper: Add 1 hour to time for end time
    function addOneHour(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const newHour = (hours + 1) % 24;
        return newHour.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    }

    // ====== PART 3: SMOOTH SCROLLING ======
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    // Add click event to each navigation link
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Prevent default jump-to-section behavior
            e.preventDefault();
            
            // Get the target section ID from href attribute
            const targetId = this.getAttribute('href');
            // Find that section on the page
            const targetSection = document.querySelector(targetId);
            
            // Scroll smoothly to that section
            window.scrollTo({
                top: targetSection.offsetTop - 20,  // Position minus 20px
                behavior: 'smooth'                  // Smooth animation
            });
            
            // Log which section was clicked
            console.log('Scrolling to:', targetId);
        });
    });
    
    // ====== PART 4: BONUS FEATURE - CHANGE HEADER COLOR ======
    // Add this if you want more interactivity
    const header = document.querySelector('header');
    let colors = ['#4a6fa5', '#2c3e50', '#27ae60', '#8e44ad'];
    let currentColor = 0;
    
    // Change header color every 5 seconds
    setInterval(function() {
        currentColor = (currentColor + 1) % colors.length;
        header.style.backgroundColor = colors[currentColor];
    }, 5000);  // 5000 milliseconds = 5 seconds
    
}); 
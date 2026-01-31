// Wait until page fully loads, then run this code
document.addEventListener('DOMContentLoaded', function() {
    
    // ====== PART 1: CLICK ME BUTTON ======
    // Get the button with ID "clickMe" from HTML
    const clickButton = document.getElementById('clickMe');
    
    // Add click event listener to the button
    clickButton.addEventListener('click', function() {
        // Show popup message when button is clicked
        alert('Hello! Thanks for visiting!');
        // Also log to browser console (press F12 to see)
        console.log('User clicked the "Click Me" button');
    });
    
    // ====== PART 2: FORM VALIDATION ======
    // Get the form with ID "contactForm" from HTML
    const contactForm = document.getElementById('contactForm');
    
    // Add submit event listener to the form
    contactForm.addEventListener('submit', function(e) {
        // Prevent form from submitting normally (page refresh)
        e.preventDefault();
        
        // Get all input fields inside the form
        const inputs = this.querySelectorAll('input, textarea');
        // Variable to track if all fields are filled
        let allFilled = true;
        
        // Loop through each input field
        inputs.forEach(input => {
            // Check if input is empty (trim removes whitespace)
            if (!input.value.trim()) {
                allFilled = false;  // Mark as not filled
                input.style.borderColor = 'red';  // Show red border
            } else {
                input.style.borderColor = '#ddd'; // Reset to gray
            }
        });
        
        // Check result of validation
        if (allFilled) {
            // Show success message
            alert('Message sent successfully! (This is a demo)');
            // Clear all form fields
            this.reset();
            // Log to console
            console.log('Form submitted successfully');
        } else {
            // Show error message
            alert('Please fill all fields');
            console.log('Form validation failed');
        }
    });
    
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
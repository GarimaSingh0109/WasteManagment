// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to check password strength
function checkPasswordStrength(password) {
    const strengthIndicator = document.getElementById('strengthIndicator');
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // At least 8 characters, one uppercase, one lowercase, one number

    if (strongPassword.test(password)) {
        strengthIndicator.textContent = 'Strong Password';
        strengthIndicator.style.color = 'green';
    } else if (password.length >= 6) {
        strengthIndicator.textContent = 'Moderate Password';
        strengthIndicator.style.color = 'orange';
    } else {
        strengthIndicator.textContent = 'Weak Password';
        strengthIndicator.style.color = 'red';
    }
}

// Event listener for form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const password = document.getElementById('password').value.trim();
    const interests = document.getElementById('interests').value.trim();

    // Validate form inputs
    if (!name || !email || !contact || !password || !interests) {
        alert('Please fill in all fields.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (contact.length < 10) {
        alert('Please enter a valid contact number.');
        return;
    }

    // Here you can add code to send data to your server (e.g., using fetch or axios)
    alert('Sign-up form submitted successfully!'); // Placeholder alert
});

// Event listener for password input to check strength
document.getElementById('password').addEventListener('input', function() {
    checkPasswordStrength(this.value);
});

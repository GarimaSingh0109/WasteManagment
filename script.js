const imageInput = document.getElementById('image-input');  
const uploadButton = document.getElementById('upload-button');  
const classificationResult = document.getElementById('classification-result');  
const disposalInformation = document.getElementById('disposal-information');  

uploadButton.addEventListener('click', () => {  
    const image = imageInput.files[0];  
    const formData = new FormData();  
    formData.append('image', image);  

    fetch('/classify', {  
        method: 'POST',  
        body: formData  
    })  
    .then(response => response.json())  
    .then(data => {  
        classificationResult.textContent = data.classification;  
        disposalInformation.textContent = data.disposalInformation;  
    })  
    .catch(error => console.error(error));  
});

// FAQ functionality
const faqItems = document.querySelectorAll('.faq-item h3');

faqItems.forEach(item => {
    item.addEventListener('click', function() {
        const parent = this.parentElement;
        parent.classList.toggle('active');
    });
});

// Optional: Check the initial mode on page load
if (localStorage.getItem('dark-mode') === 'enabled') {
    enableDarkMode();
}

// Feedback form validation
const feedbackForm = document.getElementById('feedback-form');
const feedbackName = feedbackForm.querySelector('input[type="text"]');
const feedbackEmail = feedbackForm.querySelector('input[type="email"]');
const feedbackMessage = feedbackForm.querySelector('textarea');

feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting

    const name = feedbackName.value.trim();
    const email = feedbackEmail.value.trim();
    const message = feedbackMessage.value.trim();
    let valid = true;

    // Clear previous error messages
    feedbackName.setCustomValidity('');
    feedbackEmail.setCustomValidity('');

    // Name validation
    if (name.length < 2) {
        feedbackName.setCustomValidity('Name must be at least 2 characters long.');
        valid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        feedbackEmail.setCustomValidity('Please enter a valid email address.');
        valid = false;
    }

    // Message validation
    if (message.length < 10) {
        alert('Message must be at least 10 characters long.');
        valid = false;
    }

    if (valid) {
        alert('Feedback submitted successfully!');
        feedbackForm.reset(); // Reset the form after successful submission
    } else {
        feedbackName.reportValidity();
        feedbackEmail.reportValidity();
    }
});

// Newsletter form validation
const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmail = newsletterForm.querySelector('input[type="email"]');
const newsletterErrorMessage = document.getElementById('newsletter-error-message');

newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting

    const email = newsletterEmail.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear previous error message
    newsletterErrorMessage.textContent = '';

    if (!emailPattern.test(email)) {
        newsletterErrorMessage.textContent = 'Please enter

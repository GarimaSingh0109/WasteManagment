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

 feature/your-new-feature


// Optional: Check the initial mode on page load
if (localStorage.getItem('dark-mode') === 'enabled') {
    enableDarkMode();
}
 main

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
        // If all fields are valid, you can proceed with form submission
        // Here you can implement your form submission logic, e.g., an AJAX request
        alert('Feedback submitted successfully!');
        feedbackForm.reset(); // Reset the form after successful submission
    } else {
        // If any field is invalid, show the validation message
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


 feature/your-new-feature
    if (!emailPattern.test(email)) {
        newsletterErrorMessage.textContent = 'Please enter a valid email address.';
    } else {
        // If valid, you can implement your form submission logic here
        alert('Subscribed to newsletter successfully!');
        newsletterForm.reset(); // Reset the form after successful submission
    }
});


 main

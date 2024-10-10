const imageInput = document.getElementById('image-input');
const uploadButton = document.getElementById('upload-button');
const classificationResult = document.getElementById('classification-result');
const disposalInformation = document.getElementById('disposal-information');

uploadButton.addEventListener('click', () => {
    const image = imageInput.files[0];
    if (!image) {
        alert("Please select an image to upload.");
        return;
    }

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
    .catch(error => console.error('Error:', error));
});

// FAQ toggle
const faqItems = document.querySelectorAll('.faq-item h3');
faqItems.forEach(item => {
    item.addEventListener('click', function() {
        const parent = this.parentElement;
        parent.classList.toggle('active');
    });
});

// Feedback form validation
const feedbackForm = document.getElementById('feedback-form');
feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = feedbackForm.querySelector('input[type="text"]').value.trim();
    const email = feedbackForm.querySelector('input[type="email"]').value.trim();
    const message = feedbackForm.querySelector('textarea').value.trim();

    const formErrorMessage = document.getElementById('form-error-message');
    formErrorMessage.textContent = ''; // Clear previous error messages

    if (name.length < 2) {
        formErrorMessage.textContent = 'Name must be at least 2 characters long.';
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formErrorMessage.textContent = 'Invalid email format.';
        return;
    }

    if (message.length < 10) {
        formErrorMessage.textContent = 'Message must be at least 10 characters long.';
        return;
    }

    alert('Feedback submitted successfully!');
    feedbackForm.reset();
});

// Newsletter form validation
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('newsletter-error-message').textContent = 'Please enter a valid email address.';
    } else {
        alert('Subscribed to newsletter successfully!');
        newsletterForm.reset();
    }
});

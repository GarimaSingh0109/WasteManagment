// Function For Smooth Scrolling
function smoothScrolling() {    
    const lenis = new Lenis();

    lenis.on('scroll', (e) => {
        console.log(e);
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

function validateForm(formType) {
    const form = document.getElementById(formType === 'signup' ? 'form1' : 'form2');
    const errorMessage = document.getElementById('error-message');
    const fields = Array.from(form.querySelectorAll('input'));
    
    errorMessage.innerText = '';

    if (fields.some(field => !field.value)) {
        errorMessage.innerText = 'Please fill all the details.';
        return false;
    }

    if (formType === 'signup') {
        const [password1, password2] = fields.slice(-2).map(field => field.value);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

        if (!passwordRegex.test(password1)) {
            errorMessage.innerText = 'Password must be at least 8 characters long, including uppercase, lowercase, and special characters.';
            return false;
        }

        if (password1 !== password2) {
            errorMessage.innerText = 'Passwords do not match.';
            return false;
        }
    }

    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const progressBar = document.getElementById('progress-bar');
    const imageInput = document.getElementById('image-input');
    const uploadButton = document.getElementById('upload-button');
    const classificationResult = document.getElementById('classification-result');
    const disposalInformation = document.getElementById('disposal-information');
    const feedbackForm = document.getElementById('feedback-form');
    const newsletterForm = document.getElementById('newsletter-form');
    const signupForm = document.getElementById('form1');
    const loginForm = document.getElementById('form2');

    // Menu toggle functionality
    menuToggle?.addEventListener('click', () => navMenu?.classList.toggle('show'));

    // Theme toggle functionality
    themeToggle?.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌓';
    });

    // FAQ toggle functionality
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        if (question && answer) {
            answer.style.display = 'none';
            question.addEventListener('click', () => {
                answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            });
        }
    });

    // Progress bar functionality
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${scrollPercentage}%`;
        });
    }

    // Image upload functionality
    uploadButton?.addEventListener('click', () => {
        const image = imageInput?.files[0];
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);

        fetch('/classify', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (classificationResult) classificationResult.textContent = data.classification;
            if (disposalInformation) disposalInformation.textContent = data.disposalInformation;
        })
        .catch(console.error);
    });

    // Feedback form validation
    feedbackForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const [name, email, message] = ['input[type="text"]', 'input[type="email"]', 'textarea']
            .map(selector => feedbackForm.querySelector(selector)?.value.trim());

        const nameValid = name?.length >= 2;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const messageValid = message?.length >= 10;

        if (nameValid && emailValid && messageValid) {
            alert('Feedback submitted successfully!');
            feedbackForm.reset();
        } else {
            if (!nameValid) feedbackForm.querySelector('input[type="text"]').setCustomValidity('Name must be at least 2 characters long.');
            if (!emailValid) feedbackForm.querySelector('input[type="email"]').setCustomValidity('Please enter a valid email address.');
            if (!messageValid) alert('Message must be at least 10 characters long.');
            feedbackForm.reportValidity();
        }
    });

    // Newsletter form validation
    newsletterForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]')?.value.trim();
        const errorMessage = document.getElementById('newsletter-error-message');

        if (errorMessage) errorMessage.textContent = '';

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Subscribed successfully!');
            newsletterForm.reset();
        } else if (errorMessage) {
            errorMessage.textContent = 'Please enter a valid email address.';
        }
    });

    // Attach form validation to respective forms
    signupForm?.addEventListener('submit', (event) => {
        if (!validateForm('signup')) event.preventDefault();
    });

    loginForm?.addEventListener('submit', (event) => {
        if (!validateForm('login')) event.preventDefault();
    });

    smoothScrolling();
});

// Ecotips.html
document.addEventListener('DOMContentLoaded', () => {
    const tipsSlider = document.querySelector('.eco-tips-content');
    const slides = document.querySelectorAll('.eco-tip');
    const prevSlide = document.getElementById('prev-slide');
    const nextSlide = document.getElementById('next-slide');
    let currentIndex = 0;

    const updateSlider = () => {
        const slideWidth = slides[0].clientWidth;
        tipsSlider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    tipsSlider.style.transition = 'transform 0.3s ease-in-out';

    nextSlide?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });

    prevSlide?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });

    window.addEventListener('resize', updateSlider);
    window.addEventListener('load', updateSlider);
});
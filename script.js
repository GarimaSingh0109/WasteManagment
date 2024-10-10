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


//  feature/your-new-feature
    if (!emailPattern.test(email)) {
        newsletterErrorMessage.textContent = 'Please enter a valid email address.';
    } else {
        // If valid, you can implement your form submission logic here
        alert('Subscribed to newsletter successfully!');
        newsletterForm.reset(); // Reset the form after successful submission
    }
});

/*FEATURES CARD SLIDER */
let currentSlide = 0;

    function moveSlider(direction) {
        const sliderWrapper = document.querySelector('.slider-wrapper');
        const totalSlides = document.querySelectorAll('.feature-card').length;
        currentSlide += direction;

        // Loop the slider
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        }

        // Move the slider
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    const tipsSlider = document.querySelector(".slider-wrapper");
      const slides = document.querySelectorAll(".feature-card");
      const prevSlide = document.getElementById("prev");
      const nextSlide = document.getElementById("next");
      let currentIndex = 0;

      const updateSlider = () => {
        const slideWidth = slides[0].clientWidth;
        tipsSlider.style.transform = `translateX(-${
          currentIndex * slideWidth
        }px)`;
      };

      tipsSlider.style.transition = "transform 0.3s ease-in-out";

      nextSlide.addEventListener("click", () => {
        if (currentIndex < slides.length - 1) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateSlider();
      });

      prevSlide.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = slides.length - 1;
        }
        updateSlider();
      });

      window.addEventListener("resize", updateSlider);

      window.addEventListener("load", updateSlider);





/* Scroll to Top Function */
const scrollToTopBtn = document.getElementById("BacktoTop");
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        scrollToTopBtn.style.visibility = 'visible';
        scrollToTopBtn.style.opacity = '1';
    } else {
        scrollToTopBtn.style.visibility = 'hidden';
        scrollToTopBtn.style.opacity = '0';
    }
}

scrollToTopBtn.addEventListener("click", function() {
    // Smooth scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



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



    // Attach form validation to respective forms
    const signupForm = document.getElementById('form1');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            if (!validateSignup()) {
                event.preventDefault(); // Prevent form submission
            }
        });

// Ecotips.html
document.addEventListener('DOMContentLoaded', () => {

    
    lenis.on('scroll', (e) => {
      console.log(e);
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    }
    smoothScrolling();
    function validateSignup() {
        const fullName = document.querySelector('input[name="fullName"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const password1 = document.querySelector('input[name="password1"]').value;
        const password2 = document.querySelector('input[name="password2"]').value;
        const errorMessage = document.getElementById('error-message');
    
        // Clear previous error message
        errorMessage.innerText = '';
    
        // Check if fields are empty
        if (!fullName || !email || !password1 || !password2) {
            errorMessage.innerText = 'Please fill all the details.';
            return false; // Prevent form submission
        }
    
        // Password validation: at least 8 characters, one uppercase, one lowercase, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password1)) {
            errorMessage.innerText = 'Password must be at least 8 characters long, including uppercase, lowercase, and special characters.';
            return false; // Prevent form submission
        }
    
        // Check if passwords match
        if (password1 !== password2) {
            errorMessage.innerText = 'Passwords do not match.';
            return false; // Prevent form submission
        }
    
        return true; // Allow form submission
    }
    
    function validateLogin() {
        const email = document.querySelector('input[name="email"]').value;
        const password1 = document.querySelector('input[name="password1"]').value;
        const errorMessage = document.getElementById('error-message');
    
        // Clear previous error message
        errorMessage.innerText = '';
    
        // Check if fields are empty
        if (!email || !password1) {
            errorMessage.innerText = 'Please fill all the details.';
            return false; // Prevent form submission
        }
    
        return true; // Allow form submission
    }
    
    document.addEventListener('DOMContentLoaded', (event) => {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
    
        // Menu toggle functionality
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('show');
            });
        }
    
        // Theme toggle functionality
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
                themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌓';
            });
        }
    
        // FAQ toggle functionality
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            const answer = item.querySelector('p');
    
            if (question && answer) {
                // Initially hide the answer
                answer.style.display = 'none';
    
                question.addEventListener('click', () => {
                    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
                });
            }
        });
    
        // Progress bar functionality
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
    
                progressBar.style.width = scrollPercentage + '%';
            });
        }
    
        // Image upload functionality
        const imageInput = document.getElementById('image-input');
        const uploadButton = document.getElementById('upload-button');
        const classificationResult = document.getElementById('classification-result');
        const disposalInformation = document.getElementById('disposal-information');
    
        if (uploadButton) {
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
        }
    
        // Feedback form validation
        const feedbackForm = document.getElementById('feedback-form');
        if (feedbackForm) {
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
        }
    
        // Newsletter form validation
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            const newsletterEmail = newsletterForm.querySelector('input[type="email"]');
            const newsletterErrorMessage = document.getElementById('newsletter-error-message');
    
            newsletterForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent the form from submitting
    
                const email = newsletterEmail.value.trim();
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
                // Clear previous error message
                newsletterErrorMessage.textContent = '';
    
                if (!emailPattern.test(email)) {
                    newsletterErrorMessage.textContent = 'Please enter a valid email address.';
                } else {
                    alert('Subscribed successfully!');
                    newsletterForm.reset();
                }
            });
        }
    
        // Attach form validation to respective forms
        const signupForm = document.getElementById('form1');
        if (signupForm) {
            signupForm.addEventListener('submit', (event) => {
                if (!validateSignup()) {
                    event.preventDefault(); // Prevent form submission
                }
            });
        }
    
        const loginForm = document.getElementById('form2');
        if (loginForm) {
            loginForm.addEventListener('submit', (event) => {
                if (!validateLogin()) {
                    event.preventDefault(); // Prevent form submission
                }
            });
        }
    });
    
    
    
    //Ecotips.html
    
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


    // Function to update the slider's position
    const updateSlider = () => {
      const slideWidth = slides[0].clientWidth; // Calculate the width of a single slide
      tipsSlider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };
    
    // Set the transition for smooth sliding
    tipsSlider.style.transition = 'transform 0.3s ease-in-out';
    
    // Handle next slide button click
    nextSlide.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; // Loop back to the first slide
      }
      updateSlider();
    });
    
    // Handle previous slide button click
    prevSlide.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = slides.length - 1; // Loop back to the last slide
      }
      updateSlider();
    });
    
    // Update slider position on window resize to ensure it adapts to the new slide width
    window.addEventListener('resize', () => {
      updateSlider();
    });
    
    // Make sure the slider position is correct when the page loads
    window.addEventListener('load', updateSlider);
    
    
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });
    
    
 

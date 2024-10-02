const themeSwitch = document.getElementById('theme-switch'); 
const body = document.body;
const header = document.querySelector('header');
const footer = document.querySelector('footer');

// Function to enable dark mode
function enableDarkMode() {
    body.classList.add('dark-mode');
    header.classList.add('dark-mode');
    footer.classList.add('dark-mode');
    themeSwitch.classList.add('dark-theme'); // Update the switch appearance
}

// Function to disable dark mode
function disableDarkMode() {
    body.classList.remove('dark-mode');
    header.classList.remove('dark-mode');
    footer.classList.remove('dark-mode');
    themeSwitch.classList.remove('dark-theme'); // Update the switch appearance
}

// Event listener for dark mode toggle button
themeSwitch.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        disableDarkMode(); // Switch to light mode
    } else {
        enableDarkMode(); // Switch to dark mode
    }
});

// Optional: Check the initial mode on page load
if (localStorage.getItem('dark-mode') === 'enabled') {
    enableDarkMode();
}

// Save the mode in local storage
themeSwitch.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.removeItem('dark-mode');
    }
});

// Function to update progress bar width based on scroll position
function updateProgressBar() {
    const scrollTop = window.scrollY; // How far you've scrolled
    const windowHeight = document.body.scrollHeight - window.innerHeight; // Total scrollable height
    const progressWidth = (scrollTop / windowHeight) * 100; // Calculate the progress as a percentage

    document.getElementById('progress-bar').style.width = progressWidth + '%'; // Update the width of the progress bar
}

// Attach the update function to the scroll event
window.addEventListener('scroll', updateProgressBar);
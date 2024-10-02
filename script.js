const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const icon = document.getElementById('icon');

// Function to enable dark mode
function enableDarkMode() {
    body.classList.add('dark-mode');
    header.classList.add('dark-mode');
    footer.classList.add('dark-mode');
    icon.textContent = '☀️'; // Change icon to sun
}

// Function to disable dark mode
function disableDarkMode() {
    body.classList.remove('dark-mode');
    header.classList.remove('dark-mode');
    footer.classList.remove('dark-mode');
    icon.textContent = '🌙'; // Change icon to moon
}

// Event listener for dark mode toggle button
darkModeToggle.addEventListener('click', () => {
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
darkModeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.removeItem('dark-mode');
    }
});

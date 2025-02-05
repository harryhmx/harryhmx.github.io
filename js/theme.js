document.addEventListener('DOMContentLoaded', function() {
    // Them
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    function setTheme(isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Check theme setting in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    }

    // Theme toggle button click event
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(!isDark);
    });

    // Navigation bar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });

    // Navigation bar hamburger menu icon
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        // Create HTML structure for three bars
        const togglerIcon = document.querySelector('.navbar-toggler-icon');
        togglerIcon.innerHTML = '<span class="middle-bar"></span>';
    }
}); 
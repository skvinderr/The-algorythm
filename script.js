document.addEventListener('DOMContentLoaded', function () {
    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            // Change icon
            const icon = darkModeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
  
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
  
    hamburger.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
    });
  
    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
  
    // Resource Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
  
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
  
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
  
    // Gallery Carousel
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;
    const slideCount = carouselSlides.length;
  
    // Create dots
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
  
    const dots = document.querySelectorAll('.carousel-dots .dot');
  
    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`; // Fixed template literal syntax
  
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
  
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
  
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }
  
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }
  
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
  
    // Auto-advance carousel
    let carouselInterval = setInterval(nextSlide, 5000);
  
    // Pause on hover
    const carousel = document.querySelector('.gallery-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
  
    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextSlide, 5000);
    });
  
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const testimonialDotsContainer = document.querySelector('.testimonial-dots');
    let testimonialIndex = 0;
    const testimonialCount = testimonials.length;
  
    // Create testimonial dots
    for (let i = 0; i < testimonialCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(i));
        testimonialDotsContainer.appendChild(dot);
    }
  
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
  
    function updateTestimonial() {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.toggle('active', index === testimonialIndex);
        });
  
        testimonialDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === testimonialIndex);
        });
    }
  
    function goToTestimonial(index) {
        testimonialIndex = index;
        updateTestimonial();
    }
  
    function nextTestimonial() {
        testimonialIndex = (testimonialIndex + 1) % testimonialCount;
        updateTestimonial();
    }
  
    function prevTestimonial() {
        testimonialIndex = (testimonialIndex - 1 + testimonialCount) % testimonialCount;
        updateTestimonial();
    }
  
    testimonialNext.addEventListener('click', nextTestimonial);
    testimonialPrev.addEventListener('click', prevTestimonial);
  
    // Auto-advance testimonials
    setInterval(nextTestimonial, 8000);
  
    // Countdown Timer
    function updateCountdown() {
        const nextEventDate = new Date('2023-11-12T16:00:00');
        const now = new Date();
        const diff = nextEventDate - now;
  
        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
  
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
  
    updateCountdown();
    setInterval(updateCountdown, 1000);
  
    // Form Validation
    const joinForm = document.getElementById('joinForm');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
  
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
  
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        input.style.borderColor = '#e74c3c';
    }
  
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
        input.style.borderColor = '#ddd';
    }
  
    // Join Form Validation
    if (joinForm) {
        joinForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;
  
            const nameInput = document.getElementById('fullName');
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else {
                clearError(nameInput);
            }
  
            const emailInput = document.getElementById('email');
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                clearError(emailInput);
            }
  
            const universityInput = document.getElementById('university');
            if (universityInput.value.trim() === '') {
                showError(universityInput, 'University is required');
                isValid = false;
            } else {
                clearError(universityInput);
            }
  
            const experienceInput = document.getElementById('experience');
            if (experienceInput.value === '') {
                showError(experienceInput, 'Please select your experience level');
                isValid = false;
            } else {
                clearError(experienceInput);
            }
  
            const whyJoinInput = document.getElementById('whyJoin');
            if (whyJoinInput.value.trim() === '') {
                showError(whyJoinInput, 'This field is required');
                isValid = false;
            } else if (whyJoinInput.value.trim().split(' ').length < 10) {
                showError(whyJoinInput, 'Please write at least 10 words');
                isValid = false;
            } else {
                clearError(whyJoinInput);
            }
  
            if (isValid) {
                alert('Application submitted successfully! We will contact you soon.');
                joinForm.reset();
            }
        });
    }
  
    // Contact Form Validation
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;
  
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else {
                clearError(nameInput);
            }
  
            const emailInput = document.getElementById('contactEmail');
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                clearError(emailInput);
            }
  
            const subjectInput = document.getElementById('subject');
            if (subjectInput.value.trim() === '') {
                showError(subjectInput, 'Subject is required');
                isValid = false;
            } else {
                clearError(subjectInput);
            }
  
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            } else {
                clearError(messageInput);
            }
  
            if (isValid) {
                alert('Message sent successfully! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
  
    // Newsletter Form Validation
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput.value.trim() === '') {
                alert('Email is required');
            } else if (!validateEmail(emailInput.value.trim())) {
                alert('Please enter a valid email');
            } else {
                alert('Subscribed successfully!');
                newsletterForm.reset();
            }
        });
    }
  });
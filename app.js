// Language switching functionality for B2B consulting website
let currentLang = 'ru'; // Start with Russian as default

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация приложения...');
    initLanguageSwitcher();
    initContactForm();
    initSmoothScrolling();
    initScrollEffects();
    initScrollAnimations();
});

// Language Switcher
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Set initial active state
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
    
    langButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.dataset.lang;
            if (lang !== currentLang) {
                switchLanguage(lang);
            }
        });
    });
    
    console.log('Переключатель языков инициализирован');
}

function switchLanguage(lang) {
    currentLang = lang;
    
    console.log(`Переключение языка на: ${lang}`);
    
    // Update active button
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update all elements with language data
    const elements = document.querySelectorAll('[data-en][data-ru]');
    elements.forEach(element => {
        const text = element.dataset[lang];
        if (text) {
            // Handle different element types
            if (element.tagName === 'INPUT') {
                if (element.type === 'submit' || element.type === 'button') {
                    element.value = text;
                } else {
                    element.placeholder = text;
                }
            } else if (element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else if (element.tagName === 'BUTTON') {
                element.textContent = text;
            } else {
                // For all other elements, update text content
                element.textContent = text;
            }
        }
    });
    
    // Update document language and title
    document.documentElement.lang = lang;
    if (lang === 'ru') {
        document.title = 'Роман Гузиков - Консалтинг B2B продаж';
    } else {
        document.title = 'Roman Guzikov - B2B Sales Consulting';
    }
    
    console.log(`Язык успешно переключен на: ${lang}`);
}

// Contact Form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) {
        console.error('Форма контактов не найдена');
        return;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Отправка формы...');
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    console.log('Форма контактов инициализирована');
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    
    // Reset previous error states
    clearFormErrors();
    
    let isValid = true;
    
    // Validate name
    if (!name) {
        showFieldError('name', currentLang === 'en' ? 'Name is required' : 'Имя обязательно');
        isValid = false;
    } else if (name.length < 2) {
        showFieldError('name', currentLang === 'en' ? 'Name must be at least 2 characters' : 'Имя должно содержать минимум 2 символа');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        showFieldError('email', currentLang === 'en' ? 'Email is required' : 'Email обязателен');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', currentLang === 'en' ? 'Please enter a valid email address' : 'Пожалуйста, введите корректный email адрес');
        isValid = false;
    }
    
    // Validate message
    if (!message) {
        showFieldError('message', currentLang === 'en' ? 'Message is required' : 'Сообщение обязательно');
        isValid = false;
    } else if (message.length < 10) {
        showFieldError('message', currentLang === 'en' ? 'Message must be at least 10 characters' : 'Сообщение должно содержать минимум 10 символов');
        isValid = false;
    }
    
    console.log(`Результат валидации формы: ${isValid}`);
    return isValid;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (!field) return;
    
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    // Add error class to field
    field.classList.add('form-control--error');
    
    // Create or update error message
    let errorElement = formGroup.querySelector('.form-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
    
    console.log(`Показана ошибка для поля ${fieldName}: ${message}`);
}

function clearFormErrors() {
    const errorFields = document.querySelectorAll('.form-control--error');
    const errorMessages = document.querySelectorAll('.form-error');
    
    errorFields.forEach(field => field.classList.remove('form-control--error'));
    errorMessages.forEach(msg => msg.remove());
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitForm() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    
    console.log('Отправка формы...');
    
    // Add loading state
    form.classList.add('form-loading');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = currentLang === 'en' ? 'Sending...' : 'Отправляется...';
    
    // Simulate form submission (in real scenario, this would be an API call)
    setTimeout(() => {
        // Remove loading state
        form.classList.remove('form-loading');
        submitButton.textContent = originalButtonText;
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        form.reset();
        clearFormErrors();
        
        console.log('Форма успешно отправлена');
    }, 1500);
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (!modal) {
        console.error('Модальное окно успеха не найдено');
        return;
    }
    
    console.log('Показ модального окна успеха');
    modal.classList.remove('hidden');
    
    // Update modal content based on current language
    const modalElements = modal.querySelectorAll('[data-en][data-ru]');
    modalElements.forEach(element => {
        const text = element.dataset[currentLang];
        if (text) {
            if (element.tagName === 'BUTTON') {
                element.textContent = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Close modal when clicking on overlay
    const overlay = modal.querySelector('.modal__overlay');
    if (overlay) {
        const overlayClickHandler = function(e) {
            if (e.target === overlay) {
                closeModal();
                overlay.removeEventListener('click', overlayClickHandler);
            }
        };
        overlay.addEventListener('click', overlayClickHandler);
    }
    
    // Close modal with Escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden');
        console.log('Модальное окно закрыто');
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            let targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                console.log(`Прокрутка к секции ${targetId} на позицию ${targetPosition}`);
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.error(`Целевой элемент не найден: ${targetId}`);
            }
        });
    });
    
    console.log('Плавная прокрутка инициализирована');
}

// Add scroll effect to header
function initScrollEffects() {
    let ticking = false;
    
    function updateHeader() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
    
    console.log('Эффекты прокрутки инициализированы');
}

// Initialize animations on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.service-card, .value-prop, .highlight');
    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    console.log('Анимации прокрутки инициализированы');
}

// Form field focus enhancement
function enhanceFormFields() {
    const formFields = document.querySelectorAll('.form-control');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('form-group--focused');
        });
        
        field.addEventListener('blur', function() {
            this.closest('.form-group').classList.remove('form-group--focused');
        });
    });
}

// Initialize form enhancements after DOM load
document.addEventListener('DOMContentLoaded', function() {
    enhanceFormFields();
});

// Export functions for global access
window.closeModal = closeModal;
window.switchLanguage = switchLanguage;

// Analytics and performance monitoring
function trackFormSubmission() {
    console.log('Отслеживание отправки формы');
    // Here you could add analytics tracking
}

function trackLanguageSwitch(lang) {
    console.log(`Отслеживание переключения языка на: ${lang}`);
    // Here you could add analytics tracking
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Mobile menu enhancement for small screens
function initMobileMenu() {
    const navMenu = document.querySelector('.nav__menu');
    if (window.innerWidth <= 480 && navMenu) {
        navMenu.style.opacity = '0';
        navMenu.style.transform = 'translateY(-10px)';
        navMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            navMenu.style.opacity = '1';
            navMenu.style.transform = 'translateY(0)';
        }, 200);
    }
}

// Initialize mobile enhancements
window.addEventListener('resize', debounce(initMobileMenu, 250));
document.addEventListener('DOMContentLoaded', initMobileMenu);

console.log('JavaScript для B2B консалтингового сайта загружен и готов к работе');
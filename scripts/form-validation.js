// Form validation functionality
// Функциональность валидации форм

document.addEventListener('DOMContentLoaded', function() {
    console.log('Модуль валидации форм инициализирован');
    
    // Валидация контактной формы
    setupContactFormValidation();
    
    // Валидация формы дневника
    setupDiaryFormValidation();
});

/**
 * Настройка валидации контактной формы
 */
function setupContactFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Валидация контактной формы...');
            
            if (validateContactForm()) {
                // Имитация отправки формы
                showNotification('Сообщение отправлено успешно! Спасибо за ваше обращение.', 'success');
                this.reset();
                console.log('Контактная форма валидна и отправлена');
            } else {
                console.warn('Контактная форма содержит ошибки');
            }
        });
        
        // Реальная валидация при вводе для лучшего UX
        setupRealTimeValidation();
    }
}

/**
 * Валидация контактной формы
 * @returns {boolean} - true если форма валидна
 */
function validateContactForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Сбрасываем предыдущие ошибки
    clearErrors();

    // Валидация имени
    if (!name.value.trim()) {
        showError('nameError', 'Введите ваше имя');
        isValid = false;
        name.setAttribute('aria-invalid', 'true');
    } else {
        name.setAttribute('aria-invalid', 'false');
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError('emailError', 'Введите email адрес');
        isValid = false;
        email.setAttribute('aria-invalid', 'true');
    } else if (!emailRegex.test(email.value)) {
        showError('emailError', 'Введите корректный email адрес');
        isValid = false;
        email.setAttribute('aria-invalid', 'true');
    } else {
        email.setAttribute('aria-invalid', 'false');
    }

    // Валидация сообщения
    if (!message.value.trim()) {
        showError('messageError', 'Введите сообщение');
        isValid = false;
        message.setAttribute('aria-invalid', 'true');
    } else if (message.value.trim().length < 10) {
        showError('messageError', 'Сообщение должно содержать минимум 10 символов');
        isValid = false;
        message.setAttribute('aria-invalid', 'true');
    } else {
        message.setAttribute('aria-invalid', 'false');
    }

    return isValid;
}

/**
 * Настройка валидации формы дневника
 */
function setupDiaryFormValidation() {
    const diaryForm = document.getElementById('diaryForm');
    if (diaryForm) {
        diaryForm.addEventListener('submit', function(e) {
            // Валидация выполняется в main.js
            // Здесь можно добавить дополнительную валидацию если нужно
        });
    }
}

/**
 * Настройка валидации в реальном времени
 */
function setupRealTimeValidation() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (name) {
        name.addEventListener('blur', function() {
            if (!this.value.trim()) {
                showError('nameError', 'Введите ваше имя');
                this.setAttribute('aria-invalid', 'true');
            } else {
                clearError('nameError');
                this.setAttribute('aria-invalid', 'false');
            }
        });
    }

    if (email) {
        email.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.value.trim()) {
                showError('emailError', 'Введите email адрес');
                this.setAttribute('aria-invalid', 'true');
            } else if (!emailRegex.test(this.value)) {
                showError('emailError', 'Введите корректный email адрес');
                this.setAttribute('aria-invalid', 'true');
            } else {
                clearError('emailError');
                this.setAttribute('aria-invalid', 'false');
            }
        });
    }

    if (message) {
        message.addEventListener('blur', function() {
            if (!this.value.trim()) {
                showError('messageError', 'Введите сообщение');
                this.setAttribute('aria-invalid', 'true');
            } else if (this.value.trim().length < 10) {
                showError('messageError', 'Сообщение должно содержать минимум 10 символов');
                this.setAttribute('aria-invalid', 'true');
            } else {
                clearError('messageError');
                this.setAttribute('aria-invalid', 'false');
            }
        });
    }
}

/**
 * Показать сообщение об ошибке
 * @param {string} elementId - ID элемента для отображения ошибки
 * @param {string} message - Текст сообщения об ошибке
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        console.log(`Ошибка валидации (${elementId}): ${message}`);
    }
}

/**
 * Очистить конкретное сообщение об ошибке
 * @param {string} elementId - ID элемента ошибки
 */
function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

/**
 * Очистить все сообщения об ошибках
 */
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    console.log('Все ошибки валидации очищены');
}

/**
 * Показать уведомление (дублируется из main.js для независимости модуля)
 * @param {string} message - Текст сообщения
 * @param {string} type - Тип уведомления (success/error)
 */
function showNotification(message, type) {
    // Проверяем, не существует ли уже уведомление
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 5px;
        z-index: 1001;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(notification);
    console.log(`Показано уведомление валидации: ${message}`);

    // Автоматическое скрытие
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Добавляем CSS для анимаций если его еще нет
if (!document.querySelector('style[data-module="form-validation"]')) {
    const style = document.createElement('style');
    style.setAttribute('data-module', 'form-validation');
    style.textContent = `
        .error-message {
            color: #ff3333;
            font-size: 0.8rem;
            margin-top: 0.25rem;
            display: none;
        }
        
        input[aria-invalid="true"],
        textarea[aria-invalid="true"],
        select[aria-invalid="true"] {
            border-color: #ff3333 !important;
            box-shadow: 0 0 0 2px rgba(255, 51, 51, 0.2) !important;
        }
        
        input[aria-invalid="false"],
        textarea[aria-invalid="false"],
        select[aria-invalid="false"] {
            border-color: #00ff00 !important;
        }
        
        @keyframes slideIn {
            from { 
                transform: translateX(100%); 
                opacity: 0; 
            }
            to { 
                transform: translateX(0); 
                opacity: 1; 
            }
        }
        
        @keyframes slideOut {
            from { 
                transform: translateX(0); 
                opacity: 1; 
            }
            to { 
                transform: translateX(100%); 
                opacity: 0; 
            }
        }
        
        /* Уважение к настройкам reduced-motion */
        @media (prefers-reduced-motion: reduce) {
            .notification {
                animation: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Экспортируем функции для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateContactForm,
        showError,
        clearErrors,
        showNotification
    };
}
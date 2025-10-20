// Main JavaScript functionality
// Основной функционал JavaScript для сайта

document.addEventListener('DOMContentLoaded', function() {
    console.log('Документ загружен, инициализация компонентов...');
    
    // Анимация прогресс-баров при загрузке страницы
    animateProgressBars();
    
    // Плавная прокрутка для якорных ссылок
    setupSmoothScrolling();
    
    // Анимация загрузки изображений
    setupImageLoading();
    
    // Наблюдатель для повторной анимации при появлении в viewport
    setupIntersectionObserver();
    
    // Функциональность формы дневника
    setupDiaryForm();
    
    // Предзагрузка критичных изображений
    preloadCriticalImages();
});

/**
 * Анимация прогресс-баров навыков и курсов
 */
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress, .course-progress');
    
    console.log(`Найдено прогресс-баров: ${progressBars.length}`);
    
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            // Сначала сбрасываем ширину до 0
            bar.style.width = '0%';
            
            // Анимируем до целевой ширины с задержкой
            setTimeout(() => {
                bar.style.width = width + '%';
                console.log(`Анимирован прогресс-бар до ${width}%`);
            }, 100);
        }
    });
}

/**
 * Настройка плавной прокрутки для якорных ссылок
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                console.log(`Плавная прокрутка к элементу: ${targetId}`);
            }
        });
    });
}

/**
 * Настройка анимации загрузки изображений
 */
function setupImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Проверяем, загружено ли изображение
        if (img.complete) {
            // Если уже загружено, сразу показываем
            img.style.opacity = '1';
        } else {
            // Если еще загружается, ждем события load
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                console.log('Изображение загружено:', this.alt);
            });
            img.style.opacity = '0';
        }
        img.style.transition = 'opacity 0.3s ease';
    });
}

/**
 * Настройка наблюдателя за пересечением элементов
 */
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Элемент появился в viewport:', entry.target.className);
                animateProgressBars();
            }
        });
    });

    // Наблюдаем за секциями навыков и курсов
    const skillsSection = document.querySelector('.skills-section');
    const coursesSection = document.querySelector('.courses-section');
    
    if (skillsSection) {
        observer.observe(skillsSection);
        console.log('Наблюдатель подключен к секции навыков');
    }
    if (coursesSection) {
        observer.observe(coursesSection);
        console.log('Наблюдатель подключен к секции курсов');
    }
}

/**
 * Настройка функциональности формы дневника
 */
function setupDiaryForm() {
    const diaryForm = document.getElementById('diaryForm');
    if (diaryForm) {
        diaryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Отправка формы дневника...');
            
            // Получаем значения полей формы
            const date = document.getElementById('entryDate').value;
            const title = document.getElementById('entryTitle').value;
            const description = document.getElementById('entryDescription').value;
            const status = document.getElementById('entryStatus').value;
            
            // Валидация полей формы
            if (date && title && description) {
                // В реальном приложении здесь была бы отправка на сервер
                showNotification('Запись успешно добавлена в дневник!', 'success');
                console.log('Новая запись дневника:', { date, title, status });
                
                // Сброс формы после успешной отправки
                this.reset();
            } else {
                showNotification('Пожалуйста, заполните все обязательные поля', 'error');
                console.warn('Не все поля формы заполнены');
            }
        });
        
        console.log('Форма дневника инициализирована');
    }
}

/**
 * Показать уведомление пользователю
 * @param {string} message - Текст сообщения
 * @param {string} type - Тип уведомления (success/error)
 */
function showNotification(message, type) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    // Стили для уведомления
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

    // Добавляем уведомление в DOM
    document.body.appendChild(notification);
    console.log(`Показано уведомление: ${message}`);

    // Автоматическое скрытие через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/**
 * Предзагрузка критичных изображений
 */
function preloadCriticalImages() {
    const criticalImages = document.querySelectorAll('.hero__photo, .project-image img');
    
    criticalImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
    });
    
    console.log(`Предзагружено ${criticalImages.length} критичных изображений`);
}

// Добавляем CSS для анимаций уведомлений
const style = document.createElement('style');
style.textContent = `
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

// Экспортируем функции для использования в других модулях (если нужно)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateProgressBars,
        setupSmoothScrolling,
        showNotification
    };
}
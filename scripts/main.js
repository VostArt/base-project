// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Animate progress bars on page load
    animateProgressBars();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to images - ИСПРАВЛЕННАЯ ВЕРСИЯ
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
            });
            img.style.opacity = '0';
        }
        img.style.transition = 'opacity 0.3s ease';
    });

    // Re-animate progress bars when they become visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
            }
        });
    });

    // Observe skills and courses sections
    const skillsSection = document.querySelector('.skills-section');
    const coursesSection = document.querySelector('.courses-section');
    
    if (skillsSection) observer.observe(skillsSection);
    if (coursesSection) observer.observe(coursesSection);

    // Diary form functionality
    setupDiaryForm();
});

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress, .course-progress');
    
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            // Reset width to 0 first
            bar.style.width = '0%';
            
            // Animate to target width
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        }
    });
}

function setupDiaryForm() {
    const diaryForm = document.getElementById('diaryForm');
    if (diaryForm) {
        diaryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const date = document.getElementById('entryDate').value;
            const title = document.getElementById('entryTitle').value;
            const description = document.getElementById('entryDescription').value;
            const status = document.getElementById('entryStatus').value;
            
            if (date && title && description) {
                alert('Запись успешно добавлена!');
                this.reset();
            } else {
                alert('Пожалуйста, заполните все поля');
            }
        });
    }
}
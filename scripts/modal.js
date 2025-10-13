// Modal window functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.modal-close');

    // Project data for modal
    const projectData = {
        'project1': {
            title: 'Личный сайт',
            description: 'Полностью адаптивный личный сайт-портфолио с современным дизайном.',
            technologies: ['HTML5', 'CSS3', 'JavaScript'],
            features: ['Адаптивный дизайн', 'Кроссбраузерная верстка', 'Оптимизация производительности'],
            demoLink: '#',
            codeLink: '#'
        },
        'project2': {
            title: 'Todo приложение',
            description: 'Интерактивное приложение для управления задачами.',
            technologies: ['JavaScript', 'LocalStorage', 'CSS3'],
            features: ['Добавление/удаление задач', 'Локальное сохранение', 'Фильтрация задач'],
            demoLink: '#',
            codeLink: '#'
        }
        // Add more projects as needed
    };

    // Open modal when project links are clicked
    document.querySelectorAll('.demo-link, .code-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectCard = this.closest('.project-card-full');
            const projectId = projectCard.getAttribute('data-category') + projectCard.querySelector('.project-title').textContent.toLowerCase().replace(/\s+/g, '');
            
            openModal(projectId);
        });
    });

    function openModal(projectId) {
        const project = projectData[projectId] || {
            title: 'Проект',
            description: 'Информация о проекте',
            technologies: ['Технологии'],
            features: ['Функциональность'],
            demoLink: '#',
            codeLink: '#'
        };

        modalTitle.textContent = project.title;
        modalContent.innerHTML = `
            <p>${project.description}</p>
            <div class="modal-tech">
                <strong>Технологии:</strong>
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="modal-features">
                <strong>Функциональность:</strong>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-links">
                <a href="${project.demoLink}" class="btn-primary">Демо</a>
                <a href="${project.codeLink}" class="btn-secondary">Исходный код</a>
            </div>
        `;

        modal.style.display = 'block';
    }

    // Close modal
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
    }
});
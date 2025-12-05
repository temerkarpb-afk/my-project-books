// Получение элементов модального окна и кнопки
const loginModal = document.getElementById('loginModal');
const loginBtn = document.querySelector('.btn-login');
const closeBtn = document.querySelector('.close-btn');
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Учетные данные для примера (только для клиентской демонстрации!)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '123'; 

// Переменная состояния для отслеживания входа
let isLoggedIn = false;

// --- НОВАЯ ЛОГИКА ДЛЯ ОТОБРАЖЕНИЯ УЧЕБНИКОВ ---

// 1. Получаем ссылки на элементы для отображения учебника
const bookDisplay = document.getElementById('book-display');
const bookImage = document.getElementById('book-image');
const classTitle = document.getElementById('current-class-title');
const subjectsSection = document.querySelector('.subjects');


const bookMap = {

    'math-1': 'img3.webp',
    'math-2': 'img4.webp',
    'math-3': 'img5.webp',
    'math-4': 'img6.webp',
    'math-5': 'img7.webp',
    'math-6': 'img8.webp',
    'math-7': 'img9.webp',
    'math-8': 'img10.webp',
    'math-9': 'img11.webp',
    'math-10': 'img12.webp',
    'math-11': 'img13.webp',


    'rus-1': 'img14.webp',
    'rus-2': 'img15.webp',
    'rus-3': 'img16.webp',
    'rus-4': 'img17.webp',
    'rus-5': 'img18.webp',
    'rus-6': 'img19.webp',
    'rus-7': 'img20.webp',
    'rus-8': 'img21.webp',
    'rus-9': 'img22.webp',
    'rus-10': 'img23.webp',
    'rus-11': 'img24.webp',

    'eng-1': 'img25.webp',
    'eng-2': 'img26.webp',
    'eng-3': 'img27.webp',
    'eng-4': 'img28.webp',
    'eng-5': 'img29.webp',
    'eng-6': 'img30.webp',
    'eng-7': 'img31.webp',
    'eng-8': 'img32.webp',
    'eng-9': 'img33.webp',
    'eng-10': 'img34.webp',
    'eng-11': 'img35.webp',
};

/**
 * Обрабатывает клик по кнопке класса, отображая соответствующий учебник.
 */
function handleClassButtonClick(event) {
    if (event.target.tagName === 'BUTTON') {
        const buttonId = event.target.id;
        const className = event.target.dataset.class; 

        if (bookMap[buttonId]) {
            const imagePath = bookMap[buttonId];

            bookImage.src = imagePath;
            bookImage.alt = `Учебник для ${className}`;
            classTitle.textContent = className;
            bookDisplay.style.display = 'block';

            bookDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } else {
            bookDisplay.style.display = 'none';
            alert(`Учебник для ${className} пока не загружен.`);
        }
    }
}


// --- ФУНКЦИИ УПРАВЛЕНИЯ UI ---

/**
 * Обновляет текст и поведение кнопки входа/выхода.
 */
function updateLoginButton() {
    if (isLoggedIn) {
        loginBtn.textContent = `Привет, ${ADMIN_USERNAME} (Выход)`;
        loginBtn.classList.add('btn-username');
        loginBtn.removeEventListener('click', openLoginModal);
        loginBtn.addEventListener('click', handleLogout);
    } else {
        loginBtn.textContent = 'Войти';
        loginBtn.classList.remove('btn-username');
        loginBtn.removeEventListener('click', handleLogout);
        loginBtn.addEventListener('click', openLoginModal);
    }
}

/**
 * Открывает модальное окно.
 */
function openLoginModal(e) {
    e.preventDefault();
    loginModal.style.display = 'flex';
    errorMessage.textContent = ''; 
    loginForm.reset();
}

/**
 * Закрывает модальное окно.
 */
function closeLoginModal() {
    loginModal.style.display = 'none';
}


// --- ЛОГИКА АУТЕНТИФИКАЦИИ ---

/**
 * Обрабатывает отправку формы входа.
 */
function handleLogin(e) {
    e.preventDefault(); 
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        
        isLoggedIn = true;
        closeLoginModal();
        updateLoginButton();
        
        console.log('Пользователь успешно вошел в систему.');
        
    } else {
        errorMessage.textContent = 'Неверный логин или пароль. Попробуйте снова.';
        document.getElementById('password').value = '';
    }
}

/**
 * Обрабатывает выход из системы.
 */
function handleLogout(e) {
    e.preventDefault();
    
    if (isLoggedIn) {
        isLoggedIn = false;
        updateLoginButton();
        console.log('Пользователь вышел из системы.');
    }
}

// --- НАСТРОЙКА СЛУШАТЕЛЕЙ СОБЫТИЙ ---

// 1. Слушатель для кнопки "Войти" теперь устанавливается внутри updateLoginButton()
// 2. Закрытие модального окна
closeBtn.addEventListener('click', closeLoginModal);

// 3. Закрытие окна при клике вне его
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeLoginModal();
    }
});

// 4. Обработка отправки формы
loginForm.addEventListener('submit', handleLogin);

// 5. НОВЫЙ СЛУШАТЕЛЬ: Делегирование события клика на секцию предметов
subjectsSection.addEventListener('click', handleClassButtonClick);

// Инициализация кнопки при загрузке страницы. 
document.addEventListener('DOMContentLoaded', updateLoginButton);
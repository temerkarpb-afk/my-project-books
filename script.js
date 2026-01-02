// 1. БАЗА ДАННЫХ УЧЕБНИКОВ
// Просто добавляй сюда новые объекты. Не нужно плодить ID в HTML.
const bookData = [
    { subject: 'Математика', class: 1, img: 'img3.webp' },
    { subject: 'Математика', class: 2, img: 'img4.webp' },
    { subject: 'Математика', class: 9, img: 'img11.webp' },
    { subject: 'Русский язык', class: 1, img: 'img14.webp' },
    { subject: 'Английский язык', class: 1, img: 'img25.webp' },
    // Сюда можно добавлять еще сотни учебников
];

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '123';
let isLoggedIn = false;

// Элементы UI
const loginModal = document.getElementById('loginModal');
const loginBtn = document.querySelector('.btn-login');
const subjectsContainer = document.getElementById('subjects-container');
const bookDisplay = document.getElementById('book-display');
const resultsGrid = document.getElementById('books-results-grid');
const searchInput = document.getElementById('searchInput');

// 2. ГЕНЕРАЦИЯ КНОПОК ПРЕДМЕТОВ
function initApp() {
    const subjects = ['Математика', 'Русский язык', 'Английский язык'];
    
    subjectsContainer.innerHTML = subjects.map(name => `
        <div class="subject">
            <h3>${name}</h3>
            <div class="buttons">
                ${Array.from({length: 11}, (_, i) => i + 1).map(num => `
                    <button onclick="showBook('${name}', ${num})">${num} класс</button>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 3. ОТОБРАЖЕНИЕ УЧЕБНИКА
function showBook(subject, classNum) {
    const found = bookData.filter(b => b.subject === subject && b.class === classNum);
    
    bookDisplay.style.display = 'block';
    document.getElementById('current-class-title').textContent = `${subject} - ${classNum} класс`;
    
    if (found.length > 0) {
        resultsGrid.innerHTML = found.map(b => `
            <div class="book-item">
                <img src="${b.img}" alt="Учебник">
                <p>${b.subject}</p>
            </div>
        `).join('');
    } else {
        resultsGrid.innerHTML = `<p style="padding: 20px; color: #666;">Учебник для ${classNum} класса по предмету ${subject} пока не загружен.</p>`;
    }
    
    bookDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 4. ПОИСК
function handleSearch() {
    const query = searchInput.value.toLowerCase();
    if (!query) return;

    const filtered = bookData.filter(b => b.subject.toLowerCase().includes(query));
    
    bookDisplay.style.display = 'block';
    document.getElementById('current-class-title').textContent = `Результаты поиска: ${query}`;
    
    if (filtered.length > 0) {
        resultsGrid.innerHTML = filtered.map(b => `
            <div class="book-item">
                <img src="${b.img}" alt="Учебник">
                <p>${b.subject} (${b.class} класс)</p>
            </div>
        `).join('');
    } else {
        resultsGrid.innerHTML = '<p>Ничего не найдено :(</p>';
    }
}

document.getElementById('searchBtn').onclick = handleSearch;
searchInput.onkeypress = (e) => { if(e.key === 'Enter') handleSearch(); };

// 5. ЛОГИКА ВХОДА (Твоя оригинальная)
function updateUI() {
    if (isLoggedIn) {
        loginBtn.textContent = `Выход (Админ)`;
        loginBtn.style.background = '#059669';
        document.getElementById('admin-panel-ui').style.display = 'block';
    } else {
        loginBtn.textContent = 'Войти';
        loginBtn.style.background = '#2563eb';
        document.getElementById('admin-panel-ui').style.display = 'none';
    }
}

loginBtn.onclick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
        isLoggedIn = false;
        updateUI();
    } else {
        loginModal.style.display = 'flex';
    }
};

document.querySelector('.close-btn').onclick = () => loginModal.style.display = 'none';

document.getElementById('loginForm').onsubmit = (e) => {
    e.preventDefault();
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    
    if (u === ADMIN_USERNAME && p === ADMIN_PASSWORD) {
        isLoggedIn = true;
        loginModal.style.display = 'none';
        updateUI();
    } else {
        document.getElementById('errorMessage').textContent = 'Неверные данные!';
    }
};

// 6. ГЕНЕРАТОР КОДА ДЛЯ АДМИНА
function generateAdminCode() {
    const t = document.getElementById('admTitle').value;
    const c = document.getElementById('admClass').value;
    const i = document.getElementById('admImg').value;
    if(!t || !c || !i) return alert("Заполни все!");
    
    const code = `{ subject: '${t}', class: ${c}, img: '${i}' },`;
    document.getElementById('admResultCode').value = code;
}

// Запуск
initApp();
                                                                                 

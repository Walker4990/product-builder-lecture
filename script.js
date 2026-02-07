let currentLanguage = 'ko';

function setLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll('[data-i18n-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n-key');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    // Update game labels that are already on the page
    const labels = document.querySelectorAll('.game-label');
    labels.forEach((label, i) => {
        label.innerText = translations[currentLanguage].gameLabel + ' ' + (i + 1);
    });
}

function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    if (body.getAttribute('data-theme') === 'light') {
        body.setAttribute('data-theme', 'dark');
        icon.innerText = '☀️';
    } else {
        body.setAttribute('data-theme', 'light');
        icon.innerText = '🌙';
    }
}

function getBallColor(n) {
    if (n <= 10) return 'n1';
    if (n <= 20) return 'n11';
    if (n <= 30) return 'n21';
    if (n <= 40) return 'n31';
    return 'n41';
}

function generateAll() { // The button click should always regenerate
    const board = document.getElementById('lotto-board');
    board.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const row = document.createElement('div');
        row.className = 'game-row';
        
        const label = document.createElement('div');
        label.className = 'game-label';
        label.innerText = translations[currentLanguage].gameLabel + ' ' + i;
        
        const ballsContainer = document.createElement('div');
        ballsContainer.className = 'balls';

        let nums = [];
        while(nums.length < 6) {
            let n = Math.floor(Math.random() * 45) + 1;
            if(!nums.includes(n)) nums.push(n);
        }
        nums.sort((a, b) => a - b);

        nums.forEach((n, idx) => {
            const ball = document.createElement('div');
            ball.className = `ball ${getBallColor(n)}`;
            ball.innerText = n;
            ball.style.animationDelay = (idx * 0.05) + (i * 0.1) + 's';
            ballsContainer.appendChild(ball);
        });

        row.appendChild(label);
        row.appendChild(ballsContainer);
        board.appendChild(row);
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    generateAll(); // 1. Create the lotto board first
    setLanguage('ko'); // 2. Then set the default language
});
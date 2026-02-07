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

    function generateAll() {
        const board = document.getElementById('lotto-board');
        board.innerHTML = '';

        for (let i = 1; i <= 5; i++) {
            const row = document.createElement('div');
            row.className = 'game-row';
            
            const label = document.createElement('div');
            label.className = 'game-label';
            label.innerText = 'GAME ' + i;
            
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

    // 첫 실행
    generateAll();
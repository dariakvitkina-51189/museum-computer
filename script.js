// ==========================================================================
// 1. КАСТОМНЫЙ КУРСОР
// ==========================================================================
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

const bindCursorHover = () => {
    const interactiveElements = document.querySelectorAll('a, button, img, .hall, input');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
};
bindCursorHover();

// ==========================================================================
// 2. ПЛАВНАЯ ПРОКРУТКА
// ==========================================================================
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// ==========================================================================
// 3. PROGRESS BAR
// ==========================================================================
const progressBar = document.createElement('div');
progressBar.classList.add('progress-bar');
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// ==========================================================================
// 4. SCROLL REVEAL
// ==========================================================================
const revealOnScroll = () => {
    const halls = document.querySelectorAll('.hall');
    const triggerBottom = window.innerHeight * 0.85;

    halls.forEach(hall => {
        const hallTop = hall.getBoundingClientRect().top;
        if (hallTop < triggerBottom) {
            hall.classList.add('reveal-active');
        }
    });
};

document.querySelectorAll('.hall').forEach(hall => hall.classList.add('reveal-item'));
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ==========================================================================
// 5. LIGHTBOX (ПРОСМОТР КАРТИНОК)
// ==========================================================================
const modal = document.createElement('div');
modal.classList.add('modal-lightbox');
modal.innerHTML = `
    <span class="modal-close">&times;</span>
    <img class="modal-content" id="modal-img" alt="Enlarged exhibit">
    <div class="modal-caption" id="modal-caption"></div>
`;
document.body.appendChild(modal);

const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');

document.querySelectorAll('.image-container img').forEach(img => {
    img.addEventListener('click', function () {
        modal.style.display = 'flex';
        modalImg.src = this.src;
        const captionText = this.nextElementSibling ? this.nextElementSibling.innerText : '';
        modalCaption.innerText = captionText;
    });
});

modal.addEventListener('click', (e) => {
    if (e.target !== modalImg) {
        modal.style.display = 'none';
    }
});

// ==========================================================================
// 6. КНОПКА "НАВЕРХ"
// ==========================================================================
const backToTopBtn = document.createElement('button');
backToTopBtn.classList.add('back-to-top');
backToTopBtn.innerHTML = '&#8593;';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================================================
// 7. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
// ==========================================================================
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('amber-theme');
    if (document.body.classList.contains('amber-theme')) {
        themeBtn.innerText = '⚪ Classic Monochrome';
    } else {
        themeBtn.innerText = '⚡ Amber Accent';
    }
});

// ==========================================================================
// 8. ПОИСК ПО МУЗЕЮ
// ==========================================================================
const searchInput = document.getElementById('museum-search');
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const halls = document.querySelectorAll('.hall');

    halls.forEach(hall => {
        const text = hall.innerText.toLowerCase();
        if (text.includes(query)) {
            hall.style.display = 'block';
        } else {
            hall.style.display = 'none';
        }
    });
});

// ==========================================================================
// 9. СЛУЧАЙНЫЙ ЭКСПОНАТ
// ==========================================================================
const randomBtn = document.getElementById('random-exhibit');
randomBtn.addEventListener('click', () => {
    const exhibits = document.querySelectorAll('.exhibit');
    const randomExhibit = exhibits[Math.floor(Math.random() * exhibits.length)];
    
    exhibits.forEach(ex => ex.classList.remove('highlight-exhibit'));
    
    randomExhibit.scrollIntoView({ behavior: 'smooth', block: 'center' });
    randomExhibit.classList.add('highlight-exhibit');
    
    setTimeout(() => {
        randomExhibit.classList.remove('highlight-exhibit');
    }, 3000);
});

// ==========================================================================
// 10. 3D TILT ЭФФЕКТ
// ==========================================================================
document.querySelectorAll('.exhibit').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// ==========================================================================
// 11. НОВАЯ ПЛЮШКА: АНИМАЦИЯ СЧЕТЧИКОВ СТАТИСТИКИ
// ==========================================================================
const animateCounters = () => {
    const statNums = document.querySelectorAll('.stat-num');
    statNums.forEach(num => {
        const target = +num.getAttribute('data-target');
        let count = 0;
        const speed = target / 30;
        
        const updateCount = () => {
            count += speed;
            if (count < target) {
                num.innerText = Math.ceil(count);
                setTimeout(updateCount, 40);
            } else {
                num.innerText = target;
            }
        };
        updateCount();
    });
};
animateCounters();

// ==========================================================================
// 12. НОВАЯ ПЛЮШКА: AMBIENT ВАЙБ (СИНТЕЗ ЗВУКА ПРОЦЕССОРА)
// ==========================================================================
let audioCtx = null;
let oscillator = null;
let isAudioPlaying = false;

const audioBtn = document.getElementById('audio-toggle');
audioBtn.addEventListener('click', () => {
    if (!isAudioPlaying) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(60, audioCtx.currentTime); // Низкий гул
        gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime); // Мягкая громкость
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        isAudioPlaying = true;
        audioBtn.innerText = '🔇 Stop Vibe';
    } else {
        if (oscillator) oscillator.stop();
        isAudioPlaying = false;
        audioBtn.innerText = '🔊 Ambient Vibe';
    }
});

// ==========================================================================
// 13. НОВАЯ ПЛЮШКА: ИЗБРАННЫЕ ЭКСПОНАТЫ (BOOKMARKS)
// ==========================================================================
document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        this.classList.toggle('active');
    });
});

// ==========================================================================
// 14. НОВАЯ ПЛЮШКА: ИНТЕРАКТИВНЫЙ КВИЗ
// ==========================================================================
const quizData = [
    {
        question: "Which computer weighed 30 tons and used vacuum tubes?",
        options: ["Apple II", "ENIAC", "IBM System/360", "IBM 7090"],
        correct: 1
    },
    {
        question: "What main technology characterized the 2nd generation of computers?",
        options: ["Vacuum Tubes", "Integrated Circuits", "Transistors", "AI Processors"],
        correct: 2
    },
    {
        question: "Where did the term 'debugging' originate from?",
        options: ["A software virus", "A physical moth in a relay", "A broken silicon chip", "A mouse eating cables"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('quiz-question');
const optionsEl = document.getElementById('quiz-options');
const nextBtn = document.getElementById('quiz-next');
const resultEl = document.getElementById('quiz-result');

function loadQuiz() {
    const q = quizData[currentQuestion];
    questionEl.innerText = `${currentQuestion + 1}. ${q.question}`;
    optionsEl.innerHTML = '';
    nextBtn.style.display = 'none';

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.classList.add('quiz-option-btn');
        btn.innerText = opt;
        btn.addEventListener('click', () => selectAnswer(btn, idx, q.correct));
        optionsEl.appendChild(btn);
    });
    bindCursorHover();
}

function selectAnswer(btn, selectedIndex, correctIndex) {
    const buttons = optionsEl.querySelectorAll('.quiz-option-btn');
    buttons.forEach(b => b.disabled = true);

    if (selectedIndex === correctIndex) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        buttons[correctIndex].classList.add('correct');
    }

    if (currentQuestion < quizData.length - 1) {
        nextBtn.style.display = 'block';
    } else {
        resultEl.innerText = `Quiz Complete! Your Score: ${score} / ${quizData.length}`;
    }
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    loadQuiz();
});

loadQuiz();
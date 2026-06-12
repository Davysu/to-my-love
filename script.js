/* --- DADOS DOS SLIDES (Troque os textos e os nomes dos arquivos de imagem aqui!) --- */
const slidesData = [
    {
        image: "images/foto1.jpg", 
        phrase: "Quem diria que um simples 'oi' se transformaria no amor da minha vida? Desde aquele primeiro dia, tudo ficou mais bonito."
    },
    {
        image: "images/foto2.png", 
        phrase: "Seja rindo das maiores bobeiras ou curtindo a calmaria de não fazer nada... O melhor lugar do mundo é sempre onde você está."
    },
    {
        image: "images/foto3.jpeg", 
        phrase: "Seu sorriso tem o poder incrível de acalmar qualquer dia ruim e transformar meus momentos comuns em memórias perfeitas."
    },
    {
        image: "images/foto4.jpeg", 
        phrase: "Tenho certeza de que ainda temos infinitos capítulos para escrever juntos. Mas, por enquanto..."
    }
];

/* --- CONTROLE DE ELEMENTOS E FLUXO --- */
const screenWelcome = document.getElementById('screenWelcome');
const screenSlides = document.getElementById('screenSlides');
const screenLetter = document.getElementById('screenLetter');

const btnStart = document.getElementById('btnStart');
const startHeart = document.getElementById('startHeart');
const btnNext = document.getElementById('btnNext');

const polaroidFrame = document.getElementById('polaroidFrame');
const slidePhrase = document.getElementById('slidePhrase');
const dotsContainer = document.getElementById('dotsContainer');

const envelopeWrapper = document.getElementById('envelopeWrapper');
const letterContent = document.getElementById('letterContent');
const btnNo = document.getElementById('btnNo');
const btnYes = document.getElementById('btnYes');

let currentSlide = 0;
let slideImages = [];

// 1. Efeito Global de Cliques com Corações Mágicos
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-decision')) return;

    const heart = document.createElement('div');
    heart.classList.add('click-heart');
    
    const heartIcons = ['❤️', '💖', '💕', '💗'];
    const colors = ['#ff477e', '#ff0a54', '#ff85a1', '#ffb3c6'];
    
    heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.fontSize = (Math.random() * 20 + 45) + 'px';
    
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
});

// 2. Montagem e Pré-carregamento do Cross-fade
function prepareSlides() {
    polaroidFrame.innerHTML = '';
    slideImages = [];
    slidesData.forEach((data, index) => {
        const img = document.createElement('img');
        img.src = data.image;
        img.alt = `Foto ${index + 1}`;
        img.classList.add('polaroid-img');
        if (index === 0) img.classList.add('active');
        polaroidFrame.appendChild(img);
        slideImages.push(img);
    });
}

function renderSlideSmooth() {
    const data = slidesData[currentSlide];
    
    slideImages.forEach((img, index) => {
        if (index === currentSlide) {
            img.classList.add('active');
        } else {
            img.classList.remove('active');
        }
    });

    slidePhrase.style.opacity = 0;
    setTimeout(() => {
        slidePhrase.textContent = data.phrase;
        slidePhrase.style.opacity = 1;
    }, 250);

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 3. Navegação entre as Telas
function startJourney() {
    screenWelcome.classList.remove('active');
    setTimeout(() => {
        screenSlides.classList.add('active');
        prepareSlides();
        renderSlideSmooth();
        createProgressDots();
    }, 100);
}

btnStart.addEventListener('click', startJourney);
startHeart.addEventListener('click', startJourney);

function createProgressDots() {
    dotsContainer.innerHTML = '';
    slidesData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
}

btnNext.addEventListener('click', () => {
    if (currentSlide < slidesData.length - 1) {
        currentSlide++;
        renderSlideSmooth();
        if (currentSlide === slidesData.length - 1) {
            btnNext.innerHTML = 'Ver Cartinha... 💌';
        }
    } else {
        screenSlides.classList.remove('active');
        setTimeout(() => {
            screenLetter.classList.add('active');
        }, 100);
    }
});

// 4. Lógica do Envelope
envelopeWrapper.addEventListener('click', function(e) {
    if (!e.target.classList.contains('btn-decision')) {
        this.classList.add('open');
    }
});

// 5. Função de Fuga Segura e Dinâmica do Botão Não
function escapeButton(e) {
    if (e) e.preventDefault();

    // Limites de fuga calibrados para não saírem do cartão branco da carta
    const maxX = 65; 
    const minX = -65;
    const maxY = 30;
    const minY = -100;

    const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

    // Só aplica o posicionamento absoluto no momento em que ela tenta tocar/passar o mouse
    btnNo.style.position = 'absolute';
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
}

btnNo.addEventListener('mouseover', escapeButton);
btnNo.addEventListener('touchstart', escapeButton);

// 6. Resposta ao Clicar em "Sim" (Chuva de Corações)
btnYes.addEventListener('click', () => {
    letterContent.innerHTML = `
        <h2>Ebaaa! 😍❤️</h2>
        <p style="font-size: 1rem; color: #ff477e; font-weight: bold; margin-bottom: 10px;">Eu já sabia!</p>
        <p>TE AMO! TE AMO! TE AMO!. Vai ser perfeito!</p>
        <p style="font-weight: bold; color: #ff0a54;">Te amo daqui até o infinito! ✨</p>
    `;
    
    for (let i = 0; i < 60; i++) {
        setTimeout(dropFinalHeart, i * 90);
    }
});

function dropFinalHeart() {
    const heart = document.createElement('div');
    heart.style.animation = 'fall linear forwards';
    heart.style.position = 'absolute';
    
    const heartIcons = ['❤️', '💖', '💕', '💗', '🌸'];
    heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '-20px';
    heart.style.animationDuration = (Math.random() * 2 + 2) + 's'; 
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    heart.style.zIndex = '999';
    
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Inserindo a animação de queda no CSS dinamicamente
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
    }
`, styleSheet.cssRules.length);

// 7. Geração Correta de Corações Fixos de Fundo (Transparentes)
function createAmbientHearts() {
    const bgHeartsContainer = document.getElementById('bgHearts');
    bgHeartsContainer.innerHTML = ''; 
    
    for(let i = 0; i < 22; i++) {
        const h = document.createElement('div');
        h.classList.add('ambient-heart');
        h.innerText = '❤️';
        h.style.left = Math.random() * 100 + '%';
        h.style.top = Math.random() * 100 + '%';
        h.style.fontSize = (Math.random() * 22 + 12) + 'px'; 
        h.style.transform = `rotate(${Math.random() * 360}deg)`;
        bgHeartsContainer.appendChild(h);
    }
}

// Dispara a criação do fundo assim que o DOM estiver pronto
window.addEventListener('DOMContentLoaded', createAmbientHearts);
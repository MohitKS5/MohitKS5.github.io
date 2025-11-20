// Main script for the proposal website

// Global state for quotes navigation
let currentQuoteIndex = 0;
let quotesData = [];

// Global state for poetry line-by-line reveal
let currentPoetryLine = 0;
let poetryTapHintTimeout = null;

document.addEventListener('DOMContentLoaded', function() {
    // Apply theme colors from config
    applyThemeColors();

    // Create floating hearts
    createFloatingHearts();

    // Initialize sections
    initializeSections();

    // Setup event listeners
    setupEventListeners();
});

// Apply theme colors from config
function applyThemeColors() {
    const root = document.documentElement;
    root.style.setProperty('--primary', CONFIG.colors.primary);
    root.style.setProperty('--secondary', CONFIG.colors.secondary);
    root.style.setProperty('--accent', CONFIG.colors.accent);
    root.style.setProperty('--dark', CONFIG.colors.dark);
    root.style.setProperty('--light', CONFIG.colors.light);
}

// Create floating hearts and roses animation
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '🌹', '🌺', '💐'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';

        container.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 600);
}

// Initialize sections with data from config
function initializeSections() {
    // Update hero title
    const heroTitle = document.getElementById('heroTitle');
    if (CONFIG.herName !== "Your Name") {
        heroTitle.textContent = `Hey ${CONFIG.herName}!`;
    }

    // Prepare quotes data
    quotesData = [...CONFIG.quotesWithPhotos].sort((a, b) => a.order - b.order);

    // Initialize progress dots
    initializeQuoteProgress();

    // Load first quote
    showQuote(0);

    // Load poetry
    loadPoetry();

    // Update final message
    document.getElementById('finalMessage').textContent = CONFIG.finalMessage;
    document.getElementById('recitalPrompt').textContent = CONFIG.recitalPrompt;
}

// Initialize progress dots
function initializeQuoteProgress() {
    const progressContainer = document.getElementById('quoteProgress');
    progressContainer.innerHTML = '';

    quotesData.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'progress-dot';
        if (index === 0) dot.classList.add('active');
        progressContainer.appendChild(dot);
    });
}

// Show specific quote by index
function showQuote(index) {
    const container = document.getElementById('singleQuoteContainer');
    const nextBtn = document.getElementById('nextQuoteBtn');
    const continueBtn = document.getElementById('continueToPoetry');
    const item = quotesData[index];

    // Clear container
    container.innerHTML = '';

    // Create card
    const card = document.createElement('div');
    card.className = 'quote-photo-card full-screen-quote';

    // Create blurred background layer
    const blurLayer = document.createElement('div');
    blurLayer.className = 'blur-layer';
    blurLayer.style.backgroundImage = `url(${item.image})`;
    card.appendChild(blurLayer);

    // Image
    const img = document.createElement('img');
    img.className = 'quote-photo-image';
    img.src = item.image;
    img.alt = item.caption || 'Memory';

    // Add click event for zoom
    img.addEventListener('click', () => openImageZoom(item.image));

    // Quote text
    const quoteText = document.createElement('p');
    quoteText.className = 'quote-photo-text';
    quoteText.textContent = item.text;

    card.appendChild(img);
    card.appendChild(quoteText);

    // Caption (optional)
    if (item.caption) {
        const caption = document.createElement('div');
        caption.className = 'quote-photo-caption';
        caption.textContent = item.caption;
        card.appendChild(caption);
    }

    container.appendChild(card);

    // Update progress dots
    updateProgressDots(index);

    // Show appropriate button with custom text
    if (index < quotesData.length - 1) {
        nextBtn.textContent = item.buttonText || 'Show me more ✨';
        nextBtn.style.display = 'block';
        continueBtn.style.display = 'none';
    } else {
        continueBtn.textContent = item.buttonText || 'Take me ahead 💖';
        nextBtn.style.display = 'none';
        continueBtn.style.display = 'block';
    }

    currentQuoteIndex = index;
    scrollToTop();
}

// Update progress dots
function updateProgressDots(activeIndex) {
    const dots = document.querySelectorAll('.progress-dot');
    dots.forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Load poetry from config
function loadPoetry() {
    const container = document.getElementById('poetryContainer');

    // Check if poetry exists and has lines
    if (!CONFIG.poetry || !CONFIG.poetry.lines || CONFIG.poetry.lines.length === 0) {
        return;
    }

    const card = document.createElement('div');
    card.className = 'poetry-card';

    // Add preface if provided
    if (CONFIG.poetry.preface) {
        const preface = document.createElement('p');
        preface.className = 'poetry-preface';
        preface.textContent = CONFIG.poetry.preface;
        card.appendChild(preface);
    }

    // Create verses container
    const versesContainer = document.createElement('div');
    versesContainer.className = 'poetry-verses';
    versesContainer.id = 'poetryVersesContainer';

    // Pre-create all line elements (hidden initially)
    CONFIG.poetry.lines.forEach((line, index) => {
        const verseLine = document.createElement('p');
        verseLine.className = 'poetry-verse-line';
        // Add special class for last line
        if (index === CONFIG.poetry.lines.length - 1) {
            verseLine.classList.add('poetry-verse-last');
        }
        verseLine.textContent = line;
        verseLine.style.display = 'none';
        verseLine.setAttribute('data-line-index', index);
        versesContainer.appendChild(verseLine);
    });

    card.appendChild(versesContainer);

    // Add tap hint
    const tapHint = document.createElement('div');
    tapHint.className = 'poetry-tap-hint';
    tapHint.id = 'poetryTapHint';
    tapHint.innerHTML = '👆 Tap to continue';
    card.appendChild(tapHint);

    container.appendChild(card);

    // Reset state
    currentPoetryLine = 0;

    // Make the entire poetry section clickable to reveal lines
    const poetrySection = document.getElementById('poetrySection');
    poetrySection.addEventListener('click', revealNextPoetryLine);

    // Start the hint timeout
    showPoetryTapHint();
}

// Reveal next poetry line on tap
function revealNextPoetryLine(event) {
    const lines = document.querySelectorAll('.poetry-verse-line');
    const nextBtn = document.getElementById('nextToProposal');
    const tapHint = document.getElementById('poetryTapHint');

    // Hide tap hint on first tap
    if (currentPoetryLine === 0 && tapHint) {
        tapHint.style.display = 'none';
    }

    if (currentPoetryLine < lines.length) {
        // Remove highlight from previous line
        if (currentPoetryLine > 0) {
            lines[currentPoetryLine - 1].classList.remove('poetry-line-highlight');
        }

        const line = lines[currentPoetryLine];
        line.style.display = 'block';
        line.style.animation = 'fadeInUp 0.6s ease-out';

        // Add highlight class to newly revealed line
        line.classList.add('poetry-line-highlight');

        currentPoetryLine++;

        // Auto-scroll the card to bottom to show newly revealed line
        const poetryCard = document.querySelector('.poetry-card');
        if (poetryCard) {
            setTimeout(() => {
                poetryCard.scrollTo({
                    top: poetryCard.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
        }

        // Clear existing timeout
        if (poetryTapHintTimeout) {
            clearTimeout(poetryTapHintTimeout);
        }

        // Set new timeout to show hint again if user is stuck
        if (currentPoetryLine < lines.length) {
            poetryTapHintTimeout = setTimeout(() => {
                if (tapHint && currentPoetryLine < lines.length) {
                    tapHint.style.display = 'block';
                }
            }, 4000); // Show hint after 4 seconds of inactivity
        }

        // Show button when all lines are revealed
        if (currentPoetryLine === lines.length) {
            // Remove highlight from last line
            setTimeout(() => {
                lines[currentPoetryLine - 1].classList.remove('poetry-line-highlight');
            }, 1500);

            setTimeout(() => {
                nextBtn.style.display = 'block';
                nextBtn.style.animation = 'fadeInUp 0.6s ease-out';
                if (tapHint) {
                    tapHint.style.display = 'none';
                }
            }, 500);
        }
    }
}

// Show poetry tap hint initially
function showPoetryTapHint() {
    const tapHint = document.getElementById('poetryTapHint');
    if (tapHint) {
        setTimeout(() => {
            tapHint.style.display = 'block';
        }, 1000); // Show after 1 second
    }
}

// Setup event listeners
function setupEventListeners() {
    const startBtn = document.getElementById('startBtn');
    const nextQuoteBtn = document.getElementById('nextQuoteBtn');
    const continueToPoetry = document.getElementById('continueToPoetry');
    const nextToProposal = document.getElementById('nextToProposal');
    const closeZoom = document.getElementById('closeZoom');
    const overlay = document.getElementById('imageZoomOverlay');

    // Start button - show quotes section
    startBtn.addEventListener('click', () => {
        hideSection('heroSection');
        showSection('quotesSection');
        scrollToTop();
    });

    // Next quote button
    nextQuoteBtn.addEventListener('click', () => {
        if (currentQuoteIndex < quotesData.length - 1) {
            showQuote(currentQuoteIndex + 1);
        }
    });

    // Continue to poetry (or skip to proposal if no poetry)
    continueToPoetry.addEventListener('click', () => {
        hideSection('quotesSection');
        // Check if poetry exists
        if (CONFIG.poetry && CONFIG.poetry.lines && CONFIG.poetry.lines.length > 0) {
            showSection('poetrySection');
        } else {
            showSection('proposalSection');
        }
        scrollToTop();
    });

    // Next to proposal
    nextToProposal.addEventListener('click', () => {
        hideSection('poetrySection');
        showSection('proposalSection');
        scrollToTop();
    });

    // Close zoom modal
    closeZoom.addEventListener('click', closeImageZoom);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeImageZoom();
        }
    });
}

// Image zoom functions
function openImageZoom(imageSrc) {
    const overlay = document.getElementById('imageZoomOverlay');
    const zoomedImage = document.getElementById('zoomedImage');

    zoomedImage.src = imageSrc;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageZoom() {
    const overlay = document.getElementById('imageZoomOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Helper functions
function hideSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.add('hidden');
}

function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.remove('hidden');
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Background music (if enabled)
if (CONFIG.backgroundMusic.enabled && CONFIG.backgroundMusic.src) {
    const audio = new Audio(CONFIG.backgroundMusic.src);
    audio.loop = true;
    audio.volume = 0.3;

    // Play on first user interaction
    document.addEventListener('click', function playAudio() {
        audio.play().catch(e => console.log('Audio play failed:', e));
        document.removeEventListener('click', playAudio);
    }, { once: true });
}

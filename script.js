let currentSlideIndex = 1;
const totalSlides = 6;
let musicPlaying = false;

// Password verification
function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    const passwordScreen = document.getElementById('passwordScreen');
    const mainContent = document.getElementById('mainContent');
    const errorMessage = document.getElementById('errorMessage');
    
    if (input === '080825') {
        // Clear any error message
        errorMessage.textContent = '';
        
        // Smooth transition to main content
        passwordScreen.style.opacity = '0';
        passwordScreen.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            passwordScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            // Update slide counter
            updateSlideCounter();
            
            // Start typewriter effect
            setTimeout(() => {
                startTypewriterEffect();
            }, 500);
            
            // Try to start music (user interaction required)
            setTimeout(() => {
                playMusic();
            }, 1000);
            
            // Show success animation
            showSuccessAnimation();
            
        }, 300);
        
    } else {
        errorMessage.textContent = input.length === 0 ? 'Masukkan kode terlebih dahulu!' : 'Kode salah! Coba lagi 💕';
        document.getElementById('passwordInput').value = '';
        
        // Shake animation for wrong password
        const container = document.querySelector('.password-container');
        container.style.animation = 'shake 0.6s ease-in-out';
        setTimeout(() => {
            container.style.animation = '';
        }, 600);
    }
}

// Add shake animation CSS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) scale(0.9); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px) scale(0.95); }
        20%, 40%, 60%, 80% { transform: translateX(10px) scale(0.95); }
    }
`;
document.head.appendChild(shakeStyle);

// Enhanced Enter key support
document.getElementById('passwordInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
});

// Auto-clear error message when typing
document.getElementById('passwordInput').addEventListener('input', function() {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage.textContent) {
        errorMessage.textContent = '';
    }
    
    // Auto-submit when 6 digits are entered
    if (this.value.length === 6) {
        setTimeout(() => {
            checkPassword();
        }, 500);
    }
});

// Slide Navigation Functions
function nextSlide() {
    if (currentSlideIndex < totalSlides) {
        goToSlide(currentSlideIndex + 1);
    }
}

function previousSlide() {
    if (currentSlideIndex > 1) {
        goToSlide(currentSlideIndex - 1);
    }
}

function goToSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > totalSlides) return;
    
    // Hide current slide
    document.getElementById(`slide${currentSlideIndex}`).classList.remove('active');
    
    // Show new slide
    document.getElementById(`slide${slideNumber}`).classList.add('active');
    
    // Update current slide index
    currentSlideIndex = slideNumber;
    
    // Update navigation
    updateNavigation();
    updateSlideCounter();
    
    // Trigger slide-specific animations
    triggerSlideAnimations(slideNumber);
}

function updateNavigation() {
    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentSlideIndex === 1;
    nextBtn.disabled = currentSlideIndex === totalSlides;
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index + 1 === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function updateSlideCounter() {
    document.getElementById('currentSlide').textContent = currentSlideIndex;
    document.getElementById('totalSlides').textContent = totalSlides;
}

function triggerSlideAnimations(slideNumber) {
    switch(slideNumber) {
        case 1:
            // Restart typewriter if back to slide 1
            setTimeout(() => {
                startTypewriterEffect();
            }, 300);
            break;
        case 4:
            // Animate compatibility calculation
            setTimeout(() => {
                animateCompatibilityCalculation();
            }, 500);
            break;
        case 5:
            // Animate zodiac score
            setTimeout(() => {
                animateZodiacScore();
            }, 500);
            break;
    }
}

// Music Functions (Fixed)
function playMusic() {
    const music = document.getElementById('backgroundMusic');
    const musicIcon = document.getElementById('musicIcon');
    
    // First try to play with sound
    music.muted = false;
    music.play().then(() => {
        musicPlaying = true;
        musicIcon.textContent = '🎵';
    }).catch(() => {
        // If fails, try muted autoplay
        music.muted = true;
        music.play().then(() => {
            musicPlaying = true;
            musicIcon.textContent = '🔇';
        }).catch(e => {
            console.log('Music autoplay failed:', e);
            musicIcon.textContent = '🔇';
        });
    });
}

function toggleMusic() {
    const music = document.getElementById('backgroundMusic');
    const musicIcon = document.getElementById('musicIcon');
    
    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
        musicIcon.textContent = '🔇';
    } else {
        music.muted = false; // Unmute when user manually plays
        music.play().then(() => {
            musicPlaying = true;
            musicIcon.textContent = '🎵';
        }).catch(e => {
            console.log('Music play failed:', e);
            // Try muted playback
            music.muted = true;
            music.play().then(() => {
                musicPlaying = true;
                musicIcon.textContent = '🔇';
            }).catch(err => {
                console.log('Muted music play failed:', err);
            });
        });
    }
}

// Enhanced typewriter effect
function startTypewriterEffect() {
    const text = "Aku gatau harus membuat kata-kata manis seperti apa, semua kata-kata menawan sudah tergambar dikamu, jadi yang kutau, aku hanya mencintaimu, SEKALI LAGI , HANYA ITU .";
    const element = document.getElementById('typewriter');
    
    if (!element) return;
    
    element.textContent = '';
    element.style.borderRight = '2px solid #e91e63';
    
    let i = 0;
    const typeSpeed = 60;
    
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 2000);
        }
    }, typeSpeed);
}

// Compatibility calculation animation
function animateCompatibilityCalculation() {
    const bigNumber = document.querySelector('.big-number');
    if (bigNumber) {
        bigNumber.style.transform = 'scale(0)';
        setTimeout(() => {
            bigNumber.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            bigNumber.style.transform = 'scale(1)';
        }, 200);
    }
}

// Zodiac score animation
function animateZodiacScore() {
    const scoreCircle = document.querySelector('.score-circle');
    if (scoreCircle) {
        // Reset and restart animation
        const pseudo = scoreCircle.querySelector('::before');
        if (pseudo) {
            scoreCircle.style.animation = 'none';
            setTimeout(() => {
                scoreCircle.style.animation = '';
            }, 100);
        }
    }
}

// Enhanced success animation
function showSuccessAnimation() {
    // Create floating hearts
    createFloatingHearts();
    
    // Create sparkle effects
    createSparkleEffect();
    
    // Create confetti
    createConfetti();
}

// Enhanced floating hearts
function createFloatingHearts() {
    const container = document.body;
    const heartSymbols = ['❤️', '💕', '💖', '💝', '💗'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.fontSize = (20 + Math.random() * 20) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10000';
            heart.style.animation = `floatUpHeart ${3 + Math.random() * 2}s ease-out forwards`;
            
            container.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 150);
    }
}

// Enhanced float up animation
const floatUpStyle = document.createElement('style');
floatUpStyle.textContent = `
    @keyframes floatUpHeart {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatUpStyle);

// Enhanced sparkle effect
function createSparkleEffect() {
    const sparkles = ['✨', '💫', '⭐', '🌟', '💥'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'fixed';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = (15 + Math.random() * 15) + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '10000';
            sparkle.style.animation = `sparkleEnhanced ${1.5 + Math.random()}s ease-out forwards`;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2500);
        }, i * 80);
    }
}

// Enhanced sparkle animation
const sparkleEnhancedStyle = document.createElement('style');
sparkleEnhancedStyle.textContent = `
    @keyframes sparkleEnhanced {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
        }
        25% {
            transform: scale(1) rotate(90deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        75% {
            transform: scale(1.2) rotate(270deg);
            opacity: 0.6;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleEnhancedStyle);

// Confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = (5 + Math.random() * 10) + 'px';
            confetti.style.height = (5 + Math.random() * 10) + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '10000';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s ease-out forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// Confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-10px) rotateZ(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    // Only handle keyboard navigation when main content is visible
    if (document.getElementById('mainContent').classList.contains('hidden')) return;
    
    switch(event.key) {
        case 'ArrowRight':
        case ' ': // Spacebar
            event.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
            event.preventDefault();
            previousSlide();
            break;
        case 'Home':
            event.preventDefault();
            goToSlide(1);
            break;
        case 'End':
            event.preventDefault();
            goToSlide(totalSlides);
            break;
    }
});

// Enhanced DOM ready functions
document.addEventListener('DOMContentLoaded', function() {
    // Focus on password input
    const passwordInput = document.getElementById('passwordInput');
    setTimeout(() => {
        passwordInput.focus();
    }, 500);
    
    // Initialize navigation
    updateNavigation();
    updateSlideCounter();
    
    // Add touch/swipe support for mobile
    let touchStartX = null;
    let touchStartY = null;
    
    document.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(event) {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = event.changedTouches[0].screenX;
        const touchEndY = event.changedTouches[0].screenY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only handle horizontal swipes (not vertical scrolls)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                previousSlide();
            }
        }
        
        touchStartX = null;
        touchStartY = null;
    });
    
    // Add click effects for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Easter egg: Triple click on title for surprise
let titleClickCount = 0;
let titleClickTimer = null;

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('main-title')) {
        titleClickCount++;
        
        if (titleClickTimer) clearTimeout(titleClickTimer);
        
        titleClickTimer = setTimeout(() => {
            if (titleClickCount >= 3) {
                createHeartExplosion();
            }
            titleClickCount = 0;
        }, 500);
    }
});

// Enhanced heart explosion
function createHeartExplosion() {
    const hearts = ['💖', '💕', '💗', '💝', '❤️', '💓', '💟'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '10%';
            heart.style.fontSize = (20 + Math.random() * 20) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10001';
            
            const angle = (i * 12) * (Math.PI / 180);
            const distance = 150 + Math.random() * 100;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            heart.style.animation = `heartExplosionEnhanced 2.5s ease-out forwards`;
            heart.style.setProperty('--endX', endX + 'px');
            heart.style.setProperty('--endY', endY + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2500);
        }, i * 30);
    }
}

// Enhanced heart explosion animation
const explosionEnhancedStyle = document.createElement('style');
explosionEnhancedStyle.textContent = `
    @keyframes heartExplosionEnhanced {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        20% {
            transform: translate(-50%, -50%) scale(1.2) rotate(72deg);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--endX)), calc(-50% + var(--endY))) scale(0) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(explosionEnhancedStyle);

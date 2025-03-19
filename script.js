// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Special Message Reveal
    const revealBtn = document.getElementById('reveal-btn');
    const specialMessage = document.getElementById('special-message');
    
    if (revealBtn && specialMessage) {
        revealBtn.addEventListener('click', function() {
            specialMessage.classList.add('reveal');
            revealBtn.style.display = 'none';
            
            // Create heart particles for special effect when message is revealed
            createHeartParticles();
        });
    }
    
    // Music Player Controls
    const playBtn = document.getElementById('play-btn');
    const songElement = document.getElementById('song');
    const progressBar = document.querySelector('.progress-bar');
    
    if (playBtn && songElement) {
        let isPlaying = false;
        
        playBtn.addEventListener('click', function() {
            if (isPlaying) {
                songElement.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                songElement.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        });
        
        // Update progress bar as song plays
        if (songElement && progressBar) {
            songElement.addEventListener('timeupdate', function() {
                const progress = (songElement.currentTime / songElement.duration) * 100;
                progressBar.style.width = `${progress}%`;
                
                // Reset when song ends
                if (songElement.ended) {
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                    isPlaying = false;
                    progressBar.style.width = '0%';
                }
            });
        }
    }
    
    // Creating floating hearts in the background
    createRandomHearts();
    
    // Animation on scroll for sections
    animateOnScroll();
    
    // Preload images for gallery
    preloadGalleryImages();
});

// Function to create heart particles when special message is revealed
function createHeartParticles() {
    const messageContainer = document.querySelector('.message-container');
    
    if (!messageContainer) return;
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('span');
        heart.classList.add('heart-particle');
        heart.innerHTML = getRandomHeartEmoji();
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 2 + 2}s`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        heart.style.opacity = Math.random() + 0.5;
        heart.style.fontSize = `${Math.random() * 1.5 + 0.5}rem`;
        heart.style.transform = `rotate(${Math.random() * 360}deg)`;
        messageContainer.appendChild(heart);
        
        // Remove hearts after animation completes
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
}

// Function to create random heart emojis floating in the background
function createRandomHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    
    if (!heartsContainer) return;
    
    // Clear existing hearts
    heartsContainer.innerHTML = '';
    
    // Add random hearts
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('span');
        heart.textContent = getRandomHeartEmoji();
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heartsContainer.appendChild(heart);
    }
}

// Helper function to get random heart emoji
function getRandomHeartEmoji() {
    const hearts = ['❤️', '💖', '💕', '💓', '💗', '💘', '💝', '💞', '🧡', '💛', '💚', '💙', '💜'];
    return hearts[Math.floor(Math.random() * hearts.length)];
}

// Animation on scroll for sections
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    
    const fadeInElements = function() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Check positions on scroll
    window.addEventListener('scroll', fadeInElements);
    
    // Initial check for elements in view
    fadeInElements();
}

// Preloading gallery images
function preloadGalleryImages() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        const src = img.getAttribute('src');
        
        // Create a fallback image in case the path doesn't exist
        img.onerror = function() {
            // Use a placeholder image if the original image fails to load
            const fallbackImages = [
                'https://images.unsplash.com/photo-1518199266791-5375a83190b7',
                'https://images.unsplash.com/photo-1545389307-cf67a5cd9d35',
                'https://images.unsplash.com/photo-1494774157365-9e04c6720e47',
                'https://images.unsplash.com/photo-1522511465415-f9e788547b32'
            ];
            
            // Find the index of this image in the gallery to use the matching fallback
            const allImages = Array.from(galleryImages);
            const index = allImages.indexOf(img);
            
            // Set fallback image
            img.src = fallbackImages[index % fallbackImages.length] + '?w=500&q=80';
        };
    });
}

// Create image directory structure if it doesn't exist
// Note: This is a client-side script and can't create directories on the server
// This is just a placeholder for documentation purposes
function setupRequiredFolders() {
    console.log("Required folders for this website:");
    console.log("- images/ (for storing couple photos)");
    console.log("- music/ (for storing 'our-song.mp3')");
}

// Show a personalized message based on the time of day
function getTimeBasedGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }
    
    return `${greeting}, Anushka! You are the sunshine of my life.`;
}

// Display time-based greeting when the page loads
window.addEventListener('load', function() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const greetingElement = document.createElement('p');
        greetingElement.classList.add('time-greeting');
        greetingElement.textContent = getTimeBasedGreeting();
        greetingElement.style.opacity = '0';
        hero.appendChild(greetingElement);
        
        // Fade in the greeting
        setTimeout(() => {
            greetingElement.style.transition = 'opacity 1s ease';
            greetingElement.style.opacity = '1';
        }, 1000);
    }
}); 
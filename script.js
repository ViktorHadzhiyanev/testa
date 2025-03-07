// Casino locations data
const casinoLocations = [
    {
        city: 'София',
        address: 'ул. "Цар Борис III" 88',
        coordinates: { lat: 42.6977, lng: 23.3219 }
    },
    {
        city: 'Пловдив',
        address: 'ул. "Георги Бенковски" 12',
        coordinates: { lat: 42.1354, lng: 24.7453 }
    },
    {
        city: 'Варна',
        address: 'ул. "Княз Борис I" 45',
        coordinates: { lat: 43.2141, lng: 27.9147 }
    }
];

// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function toRad(degrees) {
    return degrees * (Math.PI/180);
}

// Function to find nearest casino
function findNearestCasino() {
    const locationInput = document.getElementById('location-input').value;
    
    // In a real application, you would use a geocoding service to convert the city name to coordinates
    // For this demo, we'll use a simple city name comparison
    const userCity = locationInput.toLowerCase();
    
    let nearestCasino = null;
    let shortestDistance = Infinity;
    
    casinoLocations.forEach(casino => {
        if (casino.city.toLowerCase() === userCity) {
            nearestCasino = casino;
            shortestDistance = 0;
        }
    });
    
    if (nearestCasino) {
        showNearestCasino(nearestCasino);
    } else {
        alert('Извиняваме се, не намерихме казино в този град. Моля, опитайте с друг град или проверете нашите локации.');
    }
}

// Function to display nearest casino information
function showNearestCasino(casino) {
    const message = `Най-близкото казино LARJ е в ${casino.city} на адрес: ${casino.address}`;
    alert(message);
}

// Function to update jackpot amounts randomly (for demo purposes)
function updateJackpots() {
    const jackpotAmounts = document.querySelectorAll('.jackpot-card .amount');
    jackpotAmounts.forEach(amount => {
        const currentValue = parseInt(amount.textContent.replace(/[^0-9]/g, ''));
        const randomIncrease = Math.floor(Math.random() * 1000);
        const newValue = currentValue + randomIncrease;
        amount.textContent = newValue.toLocaleString() + ' лв.';
    });
}

// Update jackpots every 5 seconds
setInterval(updateJackpots, 5000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to cards on scroll
const cards = document.querySelectorAll('.location-card, .bonus-card, .jackpot-card, .contact-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Age Verification Modal
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already verified their age
    if (!localStorage.getItem('ageVerified')) {
        showAgeVerificationModal();
    }
});

function showAgeVerificationModal() {
    const modal = document.getElementById('ageVerificationModal');
    const mainContent = document.querySelector('.main-content');
    modal.style.display = 'flex';
    mainContent.classList.add('blur');
    document.body.style.overflow = 'hidden';
}

function confirmAge() {
    localStorage.setItem('ageVerified', 'true');
    const modal = document.getElementById('ageVerificationModal');
    const mainContent = document.querySelector('.main-content');
    
    // Add fade out animation to modal
    modal.classList.add('fade-out');
    
    // Remove blur effect after a delay
    setTimeout(() => {
        modal.style.display = 'none';
        mainContent.classList.remove('blur');
        document.body.style.overflow = '';
    }, 500);
}

function declineAge() {
    window.location.href = 'https://www.google.com';
}

// Subscription Form Handling
document.getElementById('subscriptionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    
    // Here you would typically send this data to your server
    // For demo purposes, we'll just show a success message
    alert(`Благодарим за абонирането, ${firstName}! Ще получите ексклузивни оферти на ${email}`);
    
    // Reset form
    this.reset();
    
    // Add success animation to button
    const button = this.querySelector('.subscribe-btn');
    button.textContent = 'Успешно!';
    button.style.backgroundColor = '#00ff00';
    
    setTimeout(() => {
        button.textContent = 'Абонирай се';
        button.style.backgroundColor = '';
    }, 2000);
});

// Map marker interaction
document.querySelector('.map-marker').addEventListener('click', function() {
    const info = 'LARJ Casino - Бургас\nбл. zh.k. Lazur 160, 8000 Burgas\nПонеделник - Неделя: 24/7';
    alert(info);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Add active class to current page link
const currentLocation = location.href;
const menuItems = document.querySelectorAll('nav ul li a');
menuItems.forEach(link => {
    if(link.href === currentLocation) {
        link.classList.add('active');
    }
}); 
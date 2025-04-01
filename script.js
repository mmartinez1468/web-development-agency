///////////////// PRE LOADER /////////////////
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  
  loader.classList.add('loaderHidden');

  loader.addEventListener('transitioned', () => {
    document.body.removeChild('loader');
  })
})


///////////////// REPLAYS ANIMATION WHEN BACK IN VIEWPORT /////////////////
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible'); // Remove to re-trigger animation
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.animated').forEach(element => {
  observer.observe(element);
});


///////////////// OPENS MENU /////////////////
const showMenu = (toggleId, navId) =>{
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

  toggle.addEventListener('click', () =>{
      // Add show-menu class to nav menu
      nav.classList.toggle('show-menu')

      // Add show-icon to show and hide the menu icon
      toggle.classList.toggle('show-icon')
  })
}
showMenu('nav-toggle','nav-menu')


///////////////// NUMBER INCREASE ANIMATION /////////////////
// Select all elements with the class 'statNum'
const valueDisplays = document.querySelectorAll('.statNum');
const statsSection = document.querySelector('#stats');
let animationStarted = false;

// Create a new Intersection Observer
const observerStats = new IntersectionObserver((entries) => {
  // Check if stats section is in viewport
  entries.forEach(entry => {
      if (entry.isIntersecting && !animationStarted) {
          // Start animation only if it hasn't been started before
          animationStarted = true;
          startCountAnimation();
      }
  });
}, {
  // Options for the observer
  root: null, // Use the viewport as the root
  threshold: 0.3 // Trigger when at least 30% of the element is visible
});

// Start observing the stats section
if (statsSection) {
  observerStats.observe(statsSection);
}

// Function to start the counting animation
function startCountAnimation() {
  let interval = 4000;

  valueDisplays.forEach((valueDisplay) => {
      let startValue = 0;
      let endValue = parseInt(valueDisplay.getAttribute('data-val'));
      let increment = 1;
      let duration = Math.floor(interval / (endValue / increment));

      let counter = setInterval(function () {
          startValue += increment;
          valueDisplay.textContent = Math.round(startValue) + "%";
          if (startValue >= endValue) {
              clearInterval(counter);
              valueDisplay.textContent = endValue + "%";
          }
      }, duration);
  });
}


///////////////// PRICING CONTAINER SLIDER /////////////////
document.addEventListener('DOMContentLoaded', function() {
// Get the pricing packages container
const priceExplain = document.querySelector('.priceExplain');
if (!priceExplain) return; // Safety check if element doesn't exist

// Get all pricing packages
const packages = document.querySelectorAll('.priceExplain > li');
if (packages.length === 0) return; // Safety check

// Create navigation elements
const navContainer = document.createElement('div');
navContainer.className = 'package-nav-container';

const prevBtn = document.createElement('button');
prevBtn.className = 'package-nav-btn prev';
prevBtn.innerHTML = '&laquo; Previous';

const nextBtn = document.createElement('button');
nextBtn.className = 'package-nav-btn next';
nextBtn.innerHTML = 'Next &raquo;';

const dotsContainer = document.createElement('div');
dotsContainer.className = 'package-dots-container';

// Add navigation to the page
navContainer.appendChild(prevBtn);
navContainer.appendChild(dotsContainer);
navContainer.appendChild(nextBtn);

// Insert navigation after the priceExplain element
priceExplain.parentNode.insertBefore(navContainer, priceExplain.nextSibling);

// Create dots for each package
packages.forEach((pkg, index) => {
  const dot = document.createElement('span');
  dot.className = 'package-dot';
  dot.setAttribute('data-index', index);
  dotsContainer.appendChild(dot);
  
  // Add click event to each dot
  dot.addEventListener('click', function() {
    showPackage(index);
  });
});

// Wrap the priceExplain in a carousel container
const carouselWrapper = document.createElement('div');
carouselWrapper.className = 'package-carousel-wrapper';
priceExplain.parentNode.insertBefore(carouselWrapper, priceExplain);
carouselWrapper.appendChild(priceExplain);

// Current active package index
let currentPackageIndex = 0; // Start with the first package (Basic)

// Function to initialize the carousel
function initializeCarousel() {
  // Set initial styles for the packages
  packages.forEach((pkg, index) => {
    pkg.style.transition = 'all 0.5s ease';
    
    if (window.innerWidth < 768) {
      // Add classes for positioning
      pkg.classList.add('package-item');
      
      // Make all packages visible initially with proper styling
      if (index === currentPackageIndex) {
        pkg.classList.add('active');
        pkg.style.transform = 'translateX(0) scale(1)';
        pkg.style.zIndex = '3';
        pkg.style.opacity = '1';
        pkg.style.filter = 'none';
      } else if (index === currentPackageIndex - 1 || 
                (currentPackageIndex === 0 && index === packages.length - 1)) {
        // Left item (or wrap around if first item is active)
        pkg.style.transform = 'translateX(-75%) scale(0.85)';
        pkg.style.zIndex = '2';
        pkg.style.opacity = '0.7';
        pkg.style.filter = 'blur(2px)';
      } else if (index === currentPackageIndex + 1 || 
                (currentPackageIndex === packages.length - 1 && index === 0)) {
        // Right item (or wrap around if last item is active)
        pkg.style.transform = 'translateX(75%) scale(0.85)';
        pkg.style.zIndex = '2';
        pkg.style.opacity = '0.7';
        pkg.style.filter = 'blur(2px)';
      } else {
        // Hidden items
        pkg.style.transform = 'translateX(0) scale(0.7)';
        pkg.style.zIndex = '1';
        pkg.style.opacity = '0';
      }
    } else {
      // Reset for desktop view
      pkg.classList.remove('package-item', 'active');
      pkg.style.transform = '';
      pkg.style.opacity = '1';
      pkg.style.filter = 'none';
    }
  });
  
  updateActiveDot(currentPackageIndex);
}

// Function to show a specific package
function showPackage(index) {
  if (window.innerWidth >= 768) return; // Only apply on mobile
  
  currentPackageIndex = index;
  updateCarousel();
  updateActiveDot(index);
}

// Update the carousel positions
function updateCarousel() {
  if (window.innerWidth >= 768) {
    navContainer.style.display = 'none';
    return;
  }
  
  navContainer.style.display = 'flex';
  
  packages.forEach((pkg, index) => {
    // Remove active class from all
    pkg.classList.remove('active');
    
    // Calculate position relative to active item
    const position = index - currentPackageIndex;
    
    if (position === 0) {
      // Active item
      pkg.classList.add('active');
      pkg.style.transform = 'translateX(0) scale(1)';
      pkg.style.zIndex = '3';
      pkg.style.opacity = '1';
      pkg.style.filter = 'none';
    } else if (position === -1 || (position === packages.length - 1 && currentPackageIndex === 0)) {
      // Left item (with wrap-around support)
      pkg.style.transform = 'translateX(-75%) scale(0.85)';
      pkg.style.zIndex = '2';
      pkg.style.opacity = '0.7';
      pkg.style.filter = 'blur(2px)';
    } else if (position === 1 || (position === -(packages.length - 1) && currentPackageIndex === packages.length - 1)) {
      // Right item (with wrap-around support)
      pkg.style.transform = 'translateX(75%) scale(0.85)';
      pkg.style.zIndex = '2';
      pkg.style.opacity = '0.7';
      pkg.style.filter = 'blur(2px)';
    } else {
      // Further away items
      pkg.style.transform = position < 0 ? 'translateX(-150%) scale(0.7)' : 'translateX(150%) scale(0.7)';
      pkg.style.zIndex = '1';
      pkg.style.opacity = '0.4';
      pkg.style.filter = 'blur(4px)';
    }
  });
}

// Update the active dot
function updateActiveDot(index) {
  const dots = document.querySelectorAll('.package-dot');
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Event listeners for navigation buttons
prevBtn.addEventListener('click', function() {
  if (window.innerWidth >= 768) return; // Only apply on mobile
  
  let newIndex = currentPackageIndex - 1;
  if (newIndex < 0) {
    newIndex = packages.length - 1;
  }
  showPackage(newIndex);
});

nextBtn.addEventListener('click', function() {
  if (window.innerWidth >= 768) return; // Only apply on mobile
  
  let newIndex = currentPackageIndex + 1;
  if (newIndex >= packages.length) {
    newIndex = 0;
  }
  showPackage(newIndex);
});

// Add touch swipe functionality
let touchStartX = 0;
let touchEndX = 0;

priceExplain.addEventListener('touchstart', function(e) {
  touchStartX = e.changedTouches[0].screenX;
}, false);

priceExplain.addEventListener('touchend', function(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, false);

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    // Swipe left - go to next
    nextBtn.click();
  }
  
  if (touchEndX > touchStartX + 50) {
    // Swipe right - go to previous
    prevBtn.click();
  }
}

// Handle window resize
window.addEventListener('resize', function() {
  initializeCarousel();
});


// Allow clicking on visible but non-active packages to make them active
packages.forEach((pkg, index) => {
  pkg.addEventListener('click', function() {
    if (window.innerWidth < 768 && index !== currentPackageIndex) {
      showPackage(index);
    }
  });
});

// Initialize the carousel
initializeCarousel();
updateCarousel(); // Ensure proper initial positioning
updateActiveDot(currentPackageIndex);
});


///////////////// IMAGE SLIDER IN PRICING SECTION /////////////////
document.addEventListener('DOMContentLoaded', function() {
const sliderContainer = document.querySelector('.pricing-slider-container');
if (!sliderContainer) return; // Safety check if element doesn't exist

const sliderDots = document.querySelectorAll('.slider-dot');
const prevButton = document.querySelector('.slider-arrow.prev');
const nextButton = document.querySelector('.slider-arrow.next');
const slides = document.querySelectorAll('.pricing-slide');
let currentIndex = 0;

// Function to update slider position
function updateSlider() {
  sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  
  // Update active dot
  sliderDots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Event listeners for dots
sliderDots.forEach(dot => {
  dot.addEventListener('click', function() {
    currentIndex = parseInt(this.getAttribute('data-index'));
    updateSlider();
  });
});

// Event listeners for arrow buttons
if (prevButton) {
  prevButton.addEventListener('click', function() {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    updateSlider();
  });
}

if (nextButton) {
  nextButton.addEventListener('click', function() {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    updateSlider();
  });
}

// Auto-slide functionality
let slideInterval = setInterval(function() {
  currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
  updateSlider();
}, 5000);

// Pause auto-slide on hover
sliderContainer.addEventListener('mouseenter', function() {
  clearInterval(slideInterval);
});

// Resume auto-slide on mouse leave
sliderContainer.addEventListener('mouseleave', function() {
  slideInterval = setInterval(function() {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    updateSlider();
  }, 5000);
});
});


///////////////// OPENS UP FAQ CONTENT /////////////////
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      this.parentElement.classList.toggle("active");

      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
          panel.style.display = "none";
      } else {
          panel.style.display = "block";
      }
  });
}










// Updated JavaScript with more specific identifiers
document.addEventListener('DOMContentLoaded', function() {
  const consultationBtn = document.getElementById('consultationToggleBtn');
  const consultationPanel = document.getElementById('consultationPanel');
  const consultationForm = document.getElementById('consultationRequestForm');
  
  // Toggle sliding panel
  consultationBtn.addEventListener('click', function() {
      if (consultationPanel.classList.contains('open')) {
          consultationPanel.classList.remove('open');
          consultationBtn.textContent = 'Contact Us';
      } else {
          consultationPanel.classList.add('open');
          consultationBtn.textContent = 'Close';
      }
  });
  
  // Form submission handler
  if (consultationForm) {
      consultationForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form data with updated IDs
          const consultName = document.getElementById('consultation-name').value;
          const consultEmail = document.getElementById('consultation-email').value;
          const consultWebsite = document.getElementById('consultation-website').value;
          const consultMessage = document.getElementById('consultation-message').value;
          
          // Prepare data object
          const consultationData = {
              name: consultName,
              email: consultEmail,
              website: consultWebsite,
              message: consultMessage
          };
          
          // Log data to console (for development)
          console.log('Consultation request submitted:', consultationData);
          
          // You could send data to your server here
          // sendConsultationRequest(consultationData);
          
          // Show success message
          alert('Thank you for your message! We will contact you soon.');
          
          // Reset the form
          consultationForm.reset();
          
          // Close the panel after submission
          consultationPanel.classList.remove('open');
          consultationBtn.textContent = 'Contact Us';
      });
  }
  
  // Example function for sending data to server (commented out)
  /*
  function sendConsultationRequest(data) {
      fetch('your-endpoint/submit-consultation', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
          console.log('Success:', result);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
  */
});














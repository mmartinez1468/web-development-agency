///////////////// PRE LOADER /////////////////
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  
  loader.classList.add('loaderHidden');

  loader.addEventListener('transitioned', () => {
    document.body.removeChild('loader');
  })
})


///////////////// COOKIE CONSENT FORM /////////////////
document.addEventListener('DOMContentLoaded', function() {
  const cookieBanner = document.getElementById('cookieConsent');
  const preferencesModal = document.getElementById('cookieModal');
  const acceptAllBtn = document.getElementById('acceptAllBtn');
  const declineBtn = document.getElementById('declineBtn');
  const customizeBtn = document.getElementById('customizeBtn');
  const closeModalBtn = document.getElementById('closeModal');
  const savePreferencesBtn = document.getElementById('savePreferencesBtn');
  const analyticalCookies = document.getElementById('analyticalCookies');
  const marketingCookies = document.getElementById('marketingCookies');
  
  // Check if consent was already given
  const storedConsentSettings = getConsentSettings();
  
  if (!storedConsentSettings.hasConsented) {
      // Show the cookie banner with a slight delay for better UX
      setTimeout(() => {
          cookieBanner.classList.add('active');
      }, 1000);
  }
  
  // Accept all cookies
  acceptAllBtn.addEventListener('click', function() {
      saveConsentSettings({
          hasConsented: true,
          analytical: true,
          marketing: true,
          timestamp: new Date().getTime()
      });
      
      cookieBanner.classList.remove('active');
  });
  
  // Decline all cookies
  declineBtn.addEventListener('click', function() {
      saveConsentSettings({
          hasConsented: true,
          analytical: false,
          marketing: false,
          timestamp: new Date().getTime()
      });
      
      cookieBanner.classList.remove('active');
  });
  
  // Open customize modal
  customizeBtn.addEventListener('click', function() {
      const currentSettings = getConsentSettings();
      
      analyticalCookies.checked = currentSettings.analytical;
      marketingCookies.checked = currentSettings.marketing;
      
      preferencesModal.classList.add('active');
  });
  
  // Close modal
  closeModalBtn.addEventListener('click', function() {
      preferencesModal.classList.remove('active');
  });
  
  // Save preferences
  savePreferencesBtn.addEventListener('click', function() {
      saveConsentSettings({
          hasConsented: true,
          analytical: analyticalCookies.checked,
          marketing: marketingCookies.checked,
          timestamp: new Date().getTime()
      });
      
      preferencesModal.classList.remove('active');
      cookieBanner.classList.remove('active');
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
      if (event.target === preferencesModal) {
          preferencesModal.classList.remove('active');
      }
  });
  
  // Get cookie consent settings
  function getConsentSettings() {
      const defaultSettings = {
          hasConsented: false,
          analytical: false,
          marketing: false,
          timestamp: null
      };
      
      const storedSettings = localStorage.getItem('gdprConsentSettings');
      
      if (!storedSettings) {
          return defaultSettings;
      }
      
      try {
          return JSON.parse(storedSettings);
      } catch (e) {
          return defaultSettings;
      }
  }
  
  // Save cookie consent settings
  function saveConsentSettings(settings) {
      localStorage.setItem('gdprConsentSettings', JSON.stringify(settings));
      
      // This is where you would add code to actually set or remove cookies
      // based on the user's preferences.
      applyConsentSettings(settings);
  }
  
  // Apply the user's consent preferences
  function applyConsentSettings(settings) {
      console.log('Applying cookie settings:', settings);
      
      // Example: If analytical cookies are allowed
      if (settings.analytical) {
          // Enable analytics (e.g., Google Analytics)
          enableAnalyticsTracking();
      } else {
          // Disable analytics
          disableAnalyticsTracking();
      }
      
      // Example: If marketing cookies are allowed
      if (settings.marketing) {
          // Enable marketing cookies (e.g., Facebook Pixel)
          enableMarketingTrackers();
      } else {
          // Disable marketing cookies
          disableMarketingTrackers();
      }
  }
  
  // These are placeholder functions you would implement based on your analytics and marketing tools
  function enableAnalyticsTracking() {
      // Example: Initialize Google Analytics
      console.log('Analytics cookies enabled');
  }
  
  function disableAnalyticsTracking() {
      // Example: Remove Google Analytics cookies
      console.log('Analytics cookies disabled');
  }
  
  function enableMarketingTrackers() {
      // Example: Initialize Facebook Pixel
      console.log('Marketing cookies enabled');
  }
  
  function disableMarketingTrackers() {
      // Example: Remove marketing cookies
      console.log('Marketing cookies disabled');
  }
});

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
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

  toggle.addEventListener('click', () => {
      // Add show-menu class to nav menu
      nav.classList.toggle('show-menu')

      // Add show-icon to show and hide the menu icon
      toggle.classList.toggle('show-icon')
  })
}
showMenu('nav-toggle', 'nav-menu')

///////////////// MOBILE DROPDOWN HANDLING /////////////////
document.addEventListener('DOMContentLoaded', function() {
  // Get all dropdown items
  const dropdownItems = document.querySelectorAll('.dropdown__item');
  
  // Check if we're on mobile
  const isMobile = () => window.innerWidth <= 1118;
  
  // Function to handle dropdown clicks on mobile
  const handleDropdownClick = function(e) {
    if (!isMobile()) return; // Only apply on mobile
    
    // Prevent the click from bubbling up
    e.stopPropagation();
    
    // Toggle dropdown menu visibility with a class
    const dropdownMenu = this.querySelector('.dropdown__menu');
    
    // Check if this dropdown is already open
    const isOpen = dropdownMenu.classList.contains('dropdown-active');
    
    // First close all open dropdowns
    document.querySelectorAll('.dropdown-active').forEach(menu => {
      menu.classList.remove('dropdown-active');
      menu.style.maxHeight = '0px';
    });
    
    // Toggle the clicked dropdown
    if (!isOpen) {
      dropdownMenu.classList.add('dropdown-active');
      dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
    }
  };
  
  // Function to handle subdropdown clicks on mobile
  const handleSubdropdownClick = function(e) {
    if (!isMobile()) return; // Only apply on mobile
    
    // Prevent the click from bubbling up
    e.stopPropagation();
    
    // Toggle subdropdown menu visibility
    const subdropdownMenu = this.querySelector('.dropdown__submenu');
    
    // Check if this subdropdown is already open
    const isSubOpen = subdropdownMenu.classList.contains('dropdown-active');
    
    // Toggle the clicked subdropdown
    if (!isSubOpen) {
      subdropdownMenu.classList.add('dropdown-active');
      subdropdownMenu.style.maxHeight = subdropdownMenu.scrollHeight + 'px';
    } else {
      subdropdownMenu.classList.remove('dropdown-active');
      subdropdownMenu.style.maxHeight = '0px';
    }
  };
  
  // Add click event listeners to dropdown items
  dropdownItems.forEach(item => {
    const dropdownLink = item.querySelector('.nav__link');
    if (dropdownLink) {
      dropdownLink.addEventListener('click', handleDropdownClick.bind(item));
    }
    
    // Handle subitem clicks
    const subItems = item.querySelectorAll('.dropdown__subitem');
    subItems.forEach(subItem => {
      const subLink = subItem.querySelector('.dropdown__link');
      if (subLink) {
        subLink.addEventListener('click', handleSubdropdownClick.bind(subItem));
      }
    });
  });
  
  // Reset mobile-specific styles when resizing to desktop
  window.addEventListener('resize', function() {
    if (!isMobile()) {
      document.querySelectorAll('.dropdown-active').forEach(menu => {
        menu.classList.remove('dropdown-active');
        menu.style.maxHeight = '';
      });
    }
  });
});


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
prevBtn.innerHTML = '&laquo;';

const nextBtn = document.createElement('button');
nextBtn.className = 'package-nav-btn next';
nextBtn.innerHTML = '&raquo;';

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
















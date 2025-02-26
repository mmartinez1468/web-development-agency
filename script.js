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


  /*=============== SHOW MENU ===============*/
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
let valueDisplays = document.querySelectorAll('.statNum');
let interval = 4000;

valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute('data-val'));
    let increment = 1;  // Slower increment
    let duration = Math.floor(interval / (endValue / increment));

    let counter = setInterval(function () {
        startValue += increment;
        valueDisplay.textContent = Math.round(startValue) + "%"; 
        if (startValue >= endValue) {
            clearInterval(counter);
            valueDisplay.textContent = endValue + "%";  // Ensure it ends exactly at 100%
        }
    }, duration);
});
console.log(document.querySelectorAll('.statNum'));


///////////////// IMAGE SLIDER IN PRICING SECTION /////////////////
document.addEventListener('DOMContentLoaded', function() {
  const sliderContainer = document.querySelector('.pricing-slider-container');
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
  prevButton.addEventListener('click', function() {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    updateSlider();
  });

  nextButton.addEventListener('click', function() {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    updateSlider();
  });

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







  























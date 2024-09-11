document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.getElementById('deal-coupon-slider');
  
    // Fetch data from the API
    fetch('https://voucherssavvy.vercel.app/api/v1/sliders/get-all-sliders')
      .then(response => response.json())
      .then(data => {
        // Filter enabled sliders
        const enabledSliders = data.filter(slider => slider.status === 'enable');
  
        // Clear existing items in case the carousel reinitializes
        sliderContainer.innerHTML = '';
  
        // Create and append slider items dynamically
        enabledSliders.forEach(slider => {
          const slideItem = document.createElement('div');
          slideItem.classList.add('item');
  
          slideItem.innerHTML = `
            <a href="${slider.slideUrl}" target="_blank">
              <div class="hero-area bg--img lozad" 
                   style="background-image: url('${slider.photo}'); background-size: 100% 85%;">
              </div>
            </a>
          `;
  
          sliderContainer.appendChild(slideItem);
        });
  
        // Initialize Owl Carousel after content is dynamically added
        initializeCouponsCarousel(enabledSliders.length);
      })
      .catch(error => console.error('Error fetching sliders:', error));
  
    function initializeCouponsCarousel(sliderCount) {
      const carousel = $("#deal-coupon-slider");
  
      // Destroy the carousel if it was already initialized
      if (carousel.hasClass('owl-loaded')) {
        carousel.trigger('destroy.owl.carousel');
        carousel.removeClass('owl-loaded');
        carousel.find('.owl-stage-outer').children().unwrap();
      }
  
      // Initialize Owl Carousel
      carousel.owlCarousel({
        loop: false,             // Disable loop entirely to prevent blank slides
        items: 1,                // Show only 1 item at a time
        autoplay: true,          // Enable autoplay
        autoplayTimeout: 3000,   // Set the time between slides in milliseconds
        autoplayHoverPause: true, // Pause autoplay on hover
        dots: true,              // Show dots for navigation
        nav: false,              // Hide navigation arrows
      });
  
      // Manually set loop behavior if exactly two images are present to cycle correctly
      if (sliderCount === 2) {
        carousel.trigger('refresh.owl.carousel');
      }
    }
  });
  
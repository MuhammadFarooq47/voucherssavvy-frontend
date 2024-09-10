// Define the API URL
const apiUrl = 'https://voucherssavvy.vercel.app/api/v1/stores/get-all-stores';

// Function to fetch all stores
function getAllStores() {
  fetch(apiUrl)
    .then(response => {
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the JSON response
      return response.json();
    })
    .then(data => {
      // Handle the data received
      populateStores(data);
      initializeCarousel(); // Initialize carousel after populating items
    })
    .catch(error => {
      // Handle any errors
      console.error('Error fetching stores:', error);
    });
}

// Function to populate stores in the UI
function populateStores(stores) {
  const storeContainer = document.getElementById('store-carousel'); // Carousel container

  // Clear existing items
  storeContainer.innerHTML = '';

  stores.forEach(store => {
    // Check if the storeType is 'Top' and add special content
    const topBadge = store.storeType === 'Top' ? `<div class="top-badge">Top Store</div>` : '';

    // Create HTML for each store card
    const storeHTML = `
      <div class="item deal-item">
        <div class="deal-thumb">
          <img src="${store.thumbnail}" alt="${store.storeName}" class="img-responsive lozad" />
        </div>
        <div style="text-align:center !important;">
          <img src="${store.logo}" class="lozad" alt="${store.storeName}"
               style="width:100px; height:100px; margin-left:33%; border-radius:50%; border:solid 1px #eee; margin-top:-50px; z-index:99; position:relative;" />
        </div>
        <div style="height:140px" class="deal-content">
          ${topBadge} <!-- Conditionally add badge for Top stores -->
          <h6 style="text-align:center;"><b>${store.storeName}</b></h6>
          <div style="text-align:center; margin-top:5px;">
            <a href="${store.trackingLink}" class="btn btn-dark" target="_blank">View Store</a>
          </div>
          <br>
        </div>
      </div>
    `;

    // Append the store HTML to the container
    storeContainer.innerHTML += storeHTML;
  });
}

// Function to initialize Owl Carousel
function initializeCarousel() {
    $("#store-carousel").owlCarousel({
        loop: true,
        items: 4,
        autoplay: true,
        margin: 20,
        dots: false,
        nav: true,
        autoPlay: 4000,
        navText: ["<div class='lnr lnr-arrow-left'></div>", "<div class='lnr lnr-arrow-right'></div>"],
        responsiveClass: true,
        responsive: {
           0: {
              items: 1
           },
           480: {
              items: 2
           },
           600: {
              items: 3
           },
           1000: {
              items: 4
           }
        }
     });
     //Popular Deal Carousel End


     //Carousel Deal Carousel End
     $("#store_large").owlCarousel({
        loop: true,
        items: 5,
        autoplay: true,
        margin: 20,
        dots: false,
        nav: true,
        autoPlay: 1000,
        navText: ["<div class='lnr lnr-arrow-left'></div>", "<div class='lnr lnr-arrow-right'></div>"],
        responsiveClass: true,
        responsive: {
           0: {
              items: 1
           },
           480: {
              items: 2
           },
           600: {
              items: 3
           },
           1000: {
              items: 5
           }
        }
     });
}

// Call the function to fetch the stores data
getAllStores();

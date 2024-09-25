 // Function to truncate description to 67 characters and add ellipsis if needed
 function truncateDescription(description, maxLength = 67) {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  }

  // Function to fetch categories data
  async function fetchCategories() {
    try {
      // Fetch data from the API
      const response = await fetch('https://voucherssavvy.vercel.app/api/v1/categories/get-all-categories');
      const categories = await response.json();

      // Select the container where the cards will be inserted
      const container = document.getElementById('categories-container');

      // Iterate over each category and create the card
      categories.forEach(category => {
        // Create a new card div
        const card = document.createElement('div');
        card.className = 'col-md-3 col-sm-6 col-xs-12';

        // Card inner HTML
        card.innerHTML = `
          <!-- Deal Single Item Start -->
          <div class="item deal-item">
            <div class="deal-thumb">
              <img src="${category.image}" alt="${category.categoryName}" class="img-responsive" />
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <div class="deal-content">
              <h6 style="text-align:center">
                <a href="#" class="category-link" data-id="${category._id}">${category.categoryName}</a>
              </h6>
              <p>${truncateDescription(category.description)}</p>
            </div>
          </div>
          <!-- Deal Single Item End -->
        `;

        // Append the card to the container
        container.appendChild(card);
      });

      // Add click event listeners to each category link
      document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent default anchor behavior
          const categoryId = this.getAttribute('data-id'); // Get the category ID
          window.location.href = `store-cat.html?id=${categoryId}`; // Redirect with category ID as query parameter
        });
      });

    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  // Call the function to fetch and display categories
  fetchCategories();
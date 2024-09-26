function truncateDescription(description, maxLength = 150) {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  }
   // Fetch Parent Category and Display in Parent Section
   async function fetchParentCategory(categoryId) {
     try {
       console.log(`Fetching stores for category ID: ${categoryId}`); // Debugging log
       const response = await fetch(`https://voucherssavvy.vercel.app/api/v1/stores/get-stores-by-category/${categoryId}`);
       if (!response.ok) {
         throw new Error(`Failed to fetch stores: ${response.statusText}`);
       }
       const stores = await response.json();
 
       if (stores.length > 0) {
         const parentCategory = stores[0].parentCategory[0]; // Assuming all stores belong to the same parent category
         document.getElementById('isActive').innerHTML = parentCategory.categoryName
         // Update Parent Category Section
         const parentSection = document.getElementById('parent-category-section');
         parentSection.innerHTML = `
           <li>
             <h4 class="section-heading">${parentCategory.categoryName}</h4>
             <img style="height:160px;margin-top:-50px" src="${parentCategory.image}" alt="${parentCategory.categoryName}" class="" />
             <p>${parentCategory.description}</p>
           </li>
         `;
 
         // Populate Stores Data
         const storesContainer = document.getElementById('stores-container');
         storesContainer.innerHTML = ''; // Clear previous stores
         stores.forEach(store => {
           storesContainer.innerHTML += `
             <div class="col-md-4 col-sm-6 col-xs-12">
               <div class="item deal-item">
                 <div class="deal-thumb">
                   <img src="${store.thumbnail}" alt="${store.storeName}" class="img-responsive" />
                   <div class="progress">
                     <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                   </div>
                 </div>
                 <div style="height:200px" class="deal-content">
                   <h6 style="text-align:center"><a href="https://google.com">${store.storeName}</a></h6>
                   <p>${truncateDescription(store.storeDescription)}</p>
                   <div style="margin-right:70px;margin-left:20px" class="deal-content-bottom">
                     <a style="background-color:#704b97;border:none;height:40px;width:90px;padding:6px;font-size:16px" href="https://google.com" class="btn btn-sm">View</a>
                   </div>
                 </div>
               </div>
             </div>
           `;
         });
       } else {
         console.warn('No stores found for the selected category.');
         document.getElementById('stores-container').innerHTML = '<p>No stores available for this category.</p>';
       }
     } catch (error) {
       console.error('Error fetching parent category:', error);
       document.getElementById('stores-container').innerHTML = `<p>Error loading stores: ${error.message}</p>`;
     }
   }


 
   // Fetch Categories and Display in Sidebar
   async function fetchCategories() {
     try {
       const response = await fetch('https://voucherssavvy.vercel.app/api/v1/categories/get-all-categories');
       if (!response.ok) {
         throw new Error(`Failed to fetch categories: ${response.statusText}`);
       }
       const categories = await response.json();
 
       // Select the categories list container
       const categoriesList = document.getElementById('categories-list');
 
       categories.forEach(category => {
        
         if (category.status.toLowerCase() === 'enable') {
           // Append category to the sidebar
           categoriesList.innerHTML += `
             <div>
               <ul>
                 <li>
                   <a href="#" class="category-link" data-id="${category._id}">
                     <div class="category-thumb">
                       <img src="${category.image}" alt="${category.categoryName}" class="" />
                     </div>
                     <span>${category.categoryName}</span>
                   </a>
                 </li>
               </ul>
             </div>
           `;
         }
       });

       document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent default anchor behavior
          const categoryId = this.getAttribute('data-id'); // Get the category ID
          window.location.href = `store-cat.html?id=${categoryId}`; // Redirect with category ID as query parameter
        });
      });
     } catch (error) {
       console.error('Error fetching categories:', error);
       document.getElementById('categories-list').innerHTML = `<p>Error loading categories: ${error.message}</p>`;
     }
   }
 
   // Event Delegation for Handling Clicks on Category Links
   document.addEventListener('click', function (event) {
     const link = event.target.closest('.category-link');
     if (link) {
       event.preventDefault();
       const categoryId = link.getAttribute('id');
       console.log("Category clicked:", categoryId); // Debugging log
      //  fetchParentCategory(categoryId);
     }
   });
 
   // Initialize the data fetching
   fetchCategories();

   const urlParams = new URLSearchParams(window.location.search);
    
    // Extract the 'id' parameter
    const categoryId = urlParams.get('id');
    fetchParentCategory(categoryId);

    // Log the extracted 'id' to the console
    console.log("Extracted Category ID:", categoryId);
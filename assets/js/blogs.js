 // Function to fetch and render blogs
 async function fetchBlogs() {
    try {
        const response = await fetch('https://voucherssavvy.vercel.app/api/v1/blogs/get-all-blogs');
        const blogs = await response.json();

        // Get the blog list container
        const blogList = document.getElementById('blog-list');

        // Clear any existing content
        blogList.innerHTML = '';

        // Function to truncate text to a specified length
function truncateText(text, maxLength) {
    // Check if the text length is greater than the maximum allowed length
    if (text.length > maxLength) {
      // Truncate and append ellipsis
      return text.substring(0, maxLength) + '...';
    }
    // Return the original text if it's within the limit
    return text;
  }
  

        // Iterate over each blog and render the HTML
        blogs.forEach(blog => {
            const blogHTML = `
                <div class="col-md-4 col-sm-6">
                    <div class="single-blog-item" style="margin-bottom: 30px;">
                        <div class="blog-thumb" style="box-shadow: rgba(71, 102, 225, 0.2) 0px 8px 24px !important;">
                            <a href="blog-detail.html?id=${encodeURIComponent(blog._id)}">
                                <img style="height:250px" src="${blog.blogCoverImage}" 
                                    alt="${blog.imageAltDescription}" class="img-responsive lozad img-rounded" />
                            </a>
                        </div>
                        <div class="blog-content">
                            <h4>
                                <a href="blog-detail.html?id=${encodeURIComponent(blog._id)}">  ${truncateText(blog.blogTitle, 26)} </a>
                            </h4>
                            <div class="blog-tags">
                                <ul>
                                    <li class="blog-author">
                                        <a href="#"><i class="fa fa-user" aria-hidden="true"></i> Alpha Coupons Lab</a>
                                    </li>
                                    <li class="blog-date">
                                        <a href="#"><i class="fa fa-clock-o" aria-hidden="true"></i> 
                                            ${new Date(blog.blogUploadDate).toLocaleDateString()}</a>
                                    </li>
                                </ul>
                            </div>
                            <a class="btn btn-brand readmore" 
                                href="blog-detail.html?id=${encodeURIComponent(blog._id)}">Read More</a>
                        </div>
                    </div>
                </div>
            `;
            // Append each blog item to the blog list container
            blogList.insertAdjacentHTML('beforeend', blogHTML);
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
}

// Call the function to fetch and render blogs
fetchBlogs();
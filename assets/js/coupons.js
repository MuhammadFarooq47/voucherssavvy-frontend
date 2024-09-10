    // Define the API URL
    // const couponApiUrl = 'http://192.168.100.114:5050/api/v1/coupons/coupons';
    const couponApiUrl = 'https://voucherssavvy.vercel.app/api/v1/coupons/coupons';
         
    // Function to fetch all coupons
    function getAllCoupons() {
      fetch(couponApiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          populateCoupons(data);
          initializeCouponsCarousel(); // Initialize after all items are populated
        })
        .catch(error => {
          console.error('Error fetching coupons:', error);
        });
    }
    
    // Function to populate coupons in the UI
    function populateCoupons(coupons) {
      const couponContainer = document.getElementById('new-deal-carousel');
    
      // Clear existing items
      couponContainer.innerHTML = '';
    
      coupons.forEach(coupon => {
        const couponHTML = `
          <div class="item deal-item">
            <div class="deal-thumb">
              <img src="${coupon?.storeName.logo}" alt="${coupon?.storeName?.storeName} coupon" class="img-responsive lozad" />
              <div class="progress">
                <div class="progress-bar" style="background-color: #4766FF;" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <div style="height:140px" class="deal-content">
              <h6 style="text-align:center;">${coupon?.couponTitle}</h6>
              <div style="text-align:center; margin-top:5px;">
                <a rel="nofollow" class="btn btn-dark" data-backdrop="false"
                   onclick="openCouponModal('${coupon?._id}')" target="_blank" href="${coupon?.trackingLink}">Get Code</a>
              </div>
              <br>
            </div>
          </div>
        `;
        couponContainer.innerHTML += couponHTML;
        createCouponModal(coupon);
      });
    }
    
    // Function to create and append a modal for each coupon
    function createCouponModal(coupon) {
      const modalHTML = `
        <div id="myModal${coupon?._id}" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">${coupon?.couponTitle}</h4>
              </div>
              <div class="modal-body">
                <div class="coupon-modal-content">
                  <div class="row">
                    <div class="col-md-5 col-sm-5 col-xs-12">
                      <div class="single-coupon-thumb">
                        <img src="${coupon?.storeName.logo}" alt="${coupon?.storeName.storeName}" class="img-thumbnail img-responsive lozad" style="width:100% !important;">
                      </div>
                    </div>
                    <div class="col-md-7 col-sm-7 col-xs-12">
                      <p>COPY THIS CODE AND USE AT CHECKOUT</p>
                      <div class="input-group" style="display:${coupon?.couponCode ? 'block' : 'none'}">
                        <input style="width:130px" type="text" class="form-control" autocomplete="off" readonly value="${coupon?.couponCode || ''}">
                        <div class="input-group-btn">
                          <button class="clipboard btn btn-default" data-clipboard-text="${coupon?.couponCode || ''}"><i class="fa fa-clipboard" aria-hidden="true"></i> Copy to Clipboard</button>
                        </div>
                      </div>
                      <a rel="nofollow" class="btn btn-brand pull-right" href="${coupon?.trackingLink}" target="_blank">Go To Store</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // Function to open the modal for the specific coupon
    function openCouponModal(couponId) {
      $(`#myModal${couponId}`).modal('show');
    }
    
    // Function to initialize Owl Carousel
    function initializeCouponsCarousel() {
      const carousel = $("#new-deal-carousel");
    
      // Destroy the carousel if it was already initialized
      if (carousel.hasClass('owl-loaded')) {
        carousel.trigger('destroy.owl.carousel');
        carousel.removeClass('owl-loaded');
        carousel.find('.owl-stage-outer').children().unwrap();
      }
    
      // Initialize Owl Carousel
      carousel.owlCarousel({
        loop: true,
        items: 4,
        autoplay: false,
        margin: 20,
        dots: false,
        nav: true,
        navText: ["<div class='lnr lnr-arrow-left'></div>", "<div class='lnr lnr-arrow-right'></div>"],
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
    }
    
    // Call the function to fetch the coupons data
    getAllCoupons();
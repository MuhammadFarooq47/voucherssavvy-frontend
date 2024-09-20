// Function to fetch coupons by store name
function fetchCouponsByStoreName() {
    // Get the store name from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const storeName = urlParams.get('storeName');
    console.log("🚀 ~ fetchCouponsByStoreName ~ storeName:", storeName)

    // Set the store name in the title sections
    // document.getElementById('store-name-title').innerText = storeName;
    document.getElementById('store-name-title-footer').innerText = storeName;
    document.getElementById('isActive').innerText = storeName
    document.getElementById('dealsisActive').innerText = storeName

    // Replace with your actual API endpoint
    const apiUrl = `https://voucherssavvy.vercel.app/api/v1/coupons/get-coupons-by-storeName/${encodeURIComponent(storeName)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                displayStoreData(data[0].storeName);
                displayCoupons(data);
            } else {
                console.log('No coupons found for this store.');
            }
        })
        .catch(error => {
            console.log('Error fetching coupons:', error);
            const couponsContainer = document.querySelector('.col-md-9 .row .flex-wrap');
            couponsContainer.innerHTML = '<p style="text-align:center; font-size:18px; color:red;">Data not found</p>';
        });
}

// Function to display store information
function displayStoreData(store) {
    console.log("🚀 ~ displayStoreData ~ store:", store)
    document.querySelector('.box_img').src = store.thumbnail;
  document.querySelector('.store_name').innerText = store.storeName;
  document.querySelector('.store_details').innerText = store.storeDescription;
}

// Function to display coupons
function displayCoupons(coupons) {
    console.log('coupons', coupons);
    const couponsContainer = document.querySelector('.col-md-9 .row .flex-wrap');
    
    // Clear the container before displaying new data
    couponsContainer.innerHTML = '';

    // Check if there are any coupons to display
    if (coupons.length > 0) {
        coupons.forEach(coupon => {
            const couponHTML = `
            <div class="col-md-4 col-sm-6 col-xs-12" style="margin-bottom: 30px;">
                <div class="deal-item" style="height: 100%;">
                    <div class="deal-thumb">
                        <img src="${coupon.storeName.thumbnail}" alt="" class="img-responsive"/>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div style="">
                        <div style="padding:0px 10px;">
                            <h6 style="text-align:center; font-size:18px; font-weight:bold;">${coupon.couponTitle}</h6>
                            <p style="text-align:center">${coupon.couponDescription}</p>
                        </div>
                        <div style="padding:15px;">
                            <button class="getcode ch_t_S" target="_blank" data-backdrop="false" onclick="window.open('${coupon.trackingLink}')" target="_blank" data-toggle='modal' data-target="#myModal${coupon._id}" style="background-color:#704b97; border:none; width:130px; padding:6px; font-size:16px; color:white; position: absolute; left:30%; bottom:20px;">
                                COPY CODE
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div id="myModal${coupon._id}" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">${coupon.couponTitle}</h4>
                        </div>
                        <div class="modal-body">
                            <div class="coupon-modal-content">
                                <div class="row">
                                    <div class="col-md-5 col-sm-5 col-xs-12">
                                        <div class="single-coupon-thumb">
                                            <img src="${coupon.storeName.thumbnail}" alt="Coupon" class="img-thumbnail img-responsive" style="width:100% !important;">
                                        </div>
                                    </div>
                                    <div class="col-md-7 col-sm-7 col-xs-12">
                                        <p>COPY THIS CODE AND USE AT CHECKOUT</p>
                                        <div class="input-group" style="display:block">
                                            <input type="text" class="form-control" autocomplete="off" readonly="" value="${coupon.couponCode}">
                                            <div class="input-group-btn">
                                                <button class="clipboard btn btn-default" data-clipboard-text="${coupon.couponCode}"><i class="fa fa-clipboard" aria-hidden="true"></i> Copy to Clipboard</button>
                                            </div>
                                        </div>
                                        <a class="btn btn-brand pull-right" href="${coupon.trackingLink}" target="_blank">Go To Store</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

            // Append coupon HTML to the container
            couponsContainer.insertAdjacentHTML('beforeend', couponHTML);
        });
    } else {
        // Show 'Data not found' message if no coupons are available
        couponsContainer.innerHTML = '<p style="text-align:center; font-size:18px; color:red;">Data not found</p>';
    }
}

// Call the function to fetch coupons
fetchCouponsByStoreName();
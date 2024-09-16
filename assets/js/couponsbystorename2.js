// Function to fetch coupons by store name
function fetchCouponsByStoreName() {
    // Get the store name from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const storeName = urlParams.get('storeName');
    console.log("🚀 ~ fetchCouponsByStoreName ~ storeName:", storeName);

    // Set the store name in the title sections
    document.getElementById('store-name-title-footer').innerText = storeName;

    // Replace with your actual API endpoint
    const apiUrl = `http://192.168.100.114:5050/api/v1/coupons/get-coupons-by-storeName/${encodeURIComponent(storeName)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Check if the response contains a message indicating no coupons
            if (data.message === 'No coupons found for this store' && data.data) {
                // Display the store data even if no coupons are available
                displayStoreData(data.data);
                displayNoCouponsMessage();
            } else if (Array.isArray(data) && data.length > 0) {
                // If coupons are available, display them along with the store data
                displayStoreData(data[0].storeName);
                displayCoupons(data);
            } else {
                console.error('Unexpected data format:', data);
            }
        })
        console.log("🚀 ~ fetchCouponsByStoreName ~ data:", data)
        .catch(error => {
            console.error('Error fetching coupons:', error);
        });
}

// Function to display store information
function displayStoreData(store) {
    document.querySelector('.box_img').src = store.thumbnail;
    document.querySelector('.store_name').innerText = store.storeName;
    document.querySelector('.store_details').innerText = store.storeDescription;
}

// Function to display a message when no coupons are found
function displayNoCouponsMessage() {
    const couponsContainer = document.querySelector('.col-md-9 .row .flex-wrap');
    couponsContainer.innerHTML = `
        <div class="no-coupons-message" style="text-align: center; width: 100%; padding: 20px; background-color: #f8f8f8; border: 1px solid #ddd; border-radius: 5px;">
            <h4>No coupons created for this store.</h4>
        </div>
    `;
}

// Function to display coupons
function displayCoupons(coupons) {
    const couponsContainer = document.querySelector('.col-md-9 .row .flex-wrap');

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
}

// Call the function to fetch coupons
fetchCouponsByStoreName();

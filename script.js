// Simple script for minor interaction

document.addEventListener('DOMContentLoaded', () => {


    // Add simple fade-in intersection observer for cards
    const cards = document.querySelectorAll('.service-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return; // Skip if it's just a top-level '#' link for modals
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Close modals when clicking outside the content
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });

    // Show Flash News Modal on load
    setTimeout(() => {
        const flashModal = document.getElementById('flash-news-modal');
        if (flashModal && !sessionStorage.getItem('flashNewsSeen')) {
            openModal('flash-news-modal');
            sessionStorage.setItem('flashNewsSeen', 'true');
        }
    }, 1000); // 1 second delay
});

window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Setup close button if this is a dynamic news modal
        if (modalId === 'news-detail-modal') {
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.onclick = function () {
                    closeModal('news-detail-modal');
                }
            }
        }
    }
};

window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Add News Modal HTML to the body if it doesn't exist
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('news-detail-modal')) {
        const modalHTML = `
            <div id="news-detail-modal" class="modal-overlay">
                <div class="modal-content" style="max-width: 800px;">
                    <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
                    <div id="news-modal-image" style="width: 100%; height: 250px; background-size: cover; background-position: center; border-radius: var(--border-radius) var(--border-radius) 0 0; margin: -2rem -2rem 1.5rem -2rem; width: calc(100% + 4rem);"></div>
                    <div style="padding: 0 1rem;">
                        <span id="news-modal-date" style="color: var(--primary); font-size: 0.9rem; font-weight: bold; margin-bottom: 0.5rem; display: block; font-family: var(--font-en); direction: ltr; text-align: left;"></span>
                        <h3 id="news-modal-title" style="margin-bottom: 1rem; color: var(--bg-dark); font-size: 1.5rem; line-height: 1.6;"></h3>
                        <div id="news-modal-body" style="color: var(--text-main); line-height: 1.8; font-size: 1.05rem;"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add event listener to the newly created modal's overlay to close it when clicking outside
        const newsModalOverlay = document.getElementById('news-detail-modal');
        newsModalOverlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal('news-detail-modal');
            }
        });
    }

    // Setup click handlers for all news items
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        // Change cursor to indicate clickability
        item.style.cursor = 'pointer';

        // Also handle the "Read More" link specifically to prevent double-firing
        const readMoreLink = item.querySelector('.read-more');
        if (readMoreLink) {
            readMoreLink.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent standard link behavior
            });
        }

        item.addEventListener('click', (e) => {
            // Prevent default if it's a link click
            if (e.target.tagName.toLowerCase() === 'a') {
                e.preventDefault();
            }

            // Extract data from the clicked item
            const titleEl = item.querySelector('h3') || item.querySelector('h4');
            const targetTitle = titleEl ? titleEl.textContent : '';

            const dateEl = item.querySelector('.news-date');
            const targetDate = dateEl ? dateEl.textContent : '';

            // For the body, we ideally want full text, but use whatever is there for now
            const fullContentEl = item.querySelector('.full-content');
            let bodyHTML = '';

            if (fullContentEl) {
                // If we have hidden full content provided in the HTML, use it
                bodyHTML = fullContentEl.innerHTML;
            } else {
                // Otherwise fallback to the summary paragraph
                const pEl = item.querySelector('p:not(.news-date)');
                const fullText = pEl ? pEl.textContent.replace('...', '') : 'تفصیلی معلومات جلد فراہم کر دی جائیں گی۔ (Detailed information will be provided soon.)';
                bodyHTML = `
                    <p style="margin-bottom: 1.5rem;">${fullText}</p>
                `;
            }

            // Extract image URL from the background-image if it exists, or the class if it's set via CSS
            const imageEl = item.querySelector('.news-image');
            let bgImageStyle = '';
            if (imageEl) {
                const computedStyle = window.getComputedStyle(imageEl);
                if (computedStyle.backgroundImage && computedStyle.backgroundImage !== 'none') {
                    bgImageStyle = computedStyle.backgroundImage;
                }
            }

            // Populate Modal
            document.getElementById('news-modal-title').textContent = targetTitle;
            document.getElementById('news-modal-date').textContent = targetDate;

            // Create a nicely formatted body
            bodyHTML += `
                <div style="background-color: var(--bg-main); padding: 1.5rem; border-radius: var(--border-radius); border-right: 4px solid var(--primary); margin-top: 2rem;">
                    <h4 style="margin-bottom: 0.5rem; color: var(--primary-dark);">مزید معلومات کے لیے ہم سے رابطہ کریں:</h4>
                    <p style="margin-bottom: 0; font-family: var(--font-en); direction: ltr; text-align: left;">
                        <i class="fa-brands fa-whatsapp" style="margin-right: 0.5rem;"></i> <a href="https://wa.me/923046994699" target="_blank" style="color: inherit; text-decoration: none;">03046994699</a><br>
                        <i class="fa-solid fa-envelope" style="margin-right: 0.5rem;"></i> <a href="mailto:timesaveservices@outlook.com" style="color: inherit; text-decoration: none;">timesaveservices@outlook.com</a>
                    </p>
                </div>
            `;
            document.getElementById('news-modal-body').innerHTML = bodyHTML;

            // Set Image
            const modalImage = document.getElementById('news-modal-image');
            if (bgImageStyle) {
                modalImage.style.backgroundImage = bgImageStyle;
                modalImage.style.display = 'block';
            } else {
                modalImage.style.display = 'none'; // Hide image area if no image
            }

            // Open Modal
            openModal('news-detail-modal');
        });
    });
});

// Load More News feature
document.addEventListener('DOMContentLoaded', () => {
    const newsItems = document.querySelectorAll('.news-item');
    const newsGrid = document.querySelector('.news-grid');

    if (newsItems.length > 8 && newsGrid) {
        // Hide items beyond the 8th
        for (let i = 8; i < newsItems.length; i++) {
            newsItems[i].style.display = 'none';
            newsItems[i].classList.add('hidden-news-item');
        }

        // Create Load More Button container
        const btnContainer = document.createElement('div');
        btnContainer.style.gridColumn = '1 / -1';
        btnContainer.style.textAlign = 'center';
        btnContainer.style.marginTop = '1rem';

        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'btn btn-outline qs-blue';
        loadMoreBtn.innerHTML = 'مزید پوسٹس دیکھیں <i class="fa-solid fa-chevron-down"></i>';

        loadMoreBtn.addEventListener('click', () => {
            const hiddenItems = document.querySelectorAll('.hidden-news-item');
            hiddenItems.forEach(item => {
                // Restoring original flex display
                item.style.display = 'flex';
                item.classList.remove('hidden-news-item');
            });
            btnContainer.style.display = 'none';
        });

        btnContainer.appendChild(loadMoreBtn);
        newsGrid.appendChild(btnContainer);
    }
});

// Registry Fee Calculator Logic
document.addEventListener('DOMContentLoaded', () => {
    const calcBtn = document.getElementById('calculate_registry_btn');
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            // Get percentage inputs
            const stampDutyPct = parseFloat(document.getElementById('tax_stamp_duty').value) || 0;
            const regPct = parseFloat(document.getElementById('tax_registration').value) || 0;
            const tmaPct = parseFloat(document.getElementById('tax_tma').value) || 0;
            const plraPct = parseFloat(document.getElementById('tax_plra').value) || 0;
            const waseeqaCharges = parseFloat(document.getElementById('waseeqa_charges').value) || 0;

            const buyerStatus = document.getElementById('buyer_status').value; // active, late, non
            const sellerStatus = document.getElementById('seller_status').value; // active, late, non

            const buyerPct = parseFloat(document.getElementById(`tax_buyer_${buyerStatus}`).value) || 0;
            const sellerPct = parseFloat(document.getElementById(`tax_seller_${sellerStatus}`).value) || 0;

            // Get property variables
            const kanal = parseFloat(document.getElementById('area_kanal').value) || 0;
            const marla = parseFloat(document.getElementById('area_marla').value) || 0;
            const sqft = parseFloat(document.getElementById('area_sqft').value) || 0;

            const marlaSize = parseFloat(document.getElementById('marla_size').value) || 272;
            const constructionCost = parseFloat(document.getElementById('construction_cost').value) || 0;
            const dcValue = parseFloat(document.getElementById('dc_value').value) || 0;
            const dcPerUnit = document.getElementById('dc_per_unit').value; // Acre, Kanal, Marla, Sq.ft

            // Calculate total area
            const totalSqFt = (kanal * 20 * marlaSize) + (marla * marlaSize) + sqft;
            const totalMarla = totalSqFt / marlaSize;
            const totalKanal = totalMarla / 20;
            const totalAcre = totalKanal / 8;

            let propValue = 0;
            if (dcPerUnit === 'Acre') propValue = dcValue * totalAcre;
            else if (dcPerUnit === 'Kanal') propValue = dcValue * totalKanal;
            else if (dcPerUnit === 'Marla') propValue = dcValue * totalMarla;
            else if (dcPerUnit === 'Sq.ft') propValue = dcValue * totalSqFt;

            const totalSalePrice = propValue + constructionCost;
            document.getElementById('total_sale_price').value = Math.round(totalSalePrice).toLocaleString('en-US');

            // Compute fees
            const stampDuty = totalSalePrice * (stampDutyPct / 100);
            const registration = totalSalePrice * (regPct / 100);
            const tmaFee = totalSalePrice * (tmaPct / 100);
            const buyerTax = totalSalePrice * (buyerPct / 100);
            const sellerTax = totalSalePrice * (sellerPct / 100);
            const plraTax = totalSalePrice * (plraPct / 100);

            const grandTotal = stampDuty + registration + tmaFee + buyerTax + sellerTax + plraTax + waseeqaCharges;

            // Populate results grid
            const resultsGrid = document.getElementById('results-grid');
            resultsGrid.innerHTML = `
                <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="color: #64748b; font-size: 0.8rem; text-transform: uppercase; font-weight: bold; margin-bottom: 0.3rem;">Stamp Duty (${stampDutyPct}%)</div>
                    <div style="color: #1a2238; font-size: 1.1rem; font-weight: bold;">${Math.round(stampDuty).toLocaleString('en-US')} Rs</div>
                </div>
                <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="color: #64748b; font-size: 0.8rem; text-transform: uppercase; font-weight: bold; margin-bottom: 0.3rem;">Registration (${regPct}%)</div>
                    <div style="color: #1a2238; font-size: 1.1rem; font-weight: bold;">${Math.round(registration).toLocaleString('en-US')} Rs</div>
                </div>
                <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="color: #64748b; font-size: 0.8rem; text-transform: uppercase; font-weight: bold; margin-bottom: 0.3rem;">TMA Fee (${tmaPct}%)</div>
                    <div style="color: #1a2238; font-size: 1.1rem; font-weight: bold;">${Math.round(tmaFee).toLocaleString('en-US')} Rs</div>
                </div>
                <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="color: #64748b; font-size: 0.8rem; text-transform: uppercase; font-weight: bold; margin-bottom: 0.3rem;">Buyer Tax (${buyerPct}%)</div>
                    <div style="color: #1a2238; font-size: 1.1rem; font-weight: bold;">${Math.round(buyerTax).toLocaleString('en-US')} Rs</div>
                </div>
                <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="color: #64748b; font-size: 0.8rem; text-transform: uppercase; font-weight: bold; margin-bottom: 0.3rem;">Seller Tax (${sellerPct}%)</div>
                    <div style="color: #1a2238; font-size: 1.1rem; font-weight: bold;">${Math.round(sellerTax).toLocaleString('en-US')} Rs</div>
                </div>
                <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="color: #64748b; font-size: 0.8rem; text-transform: uppercase; font-weight: bold; margin-bottom: 0.3rem;">PLRA Tax (${plraPct}%)</div>
                    <div style="color: #1a2238; font-size: 1.1rem; font-weight: bold;">${Math.round(plraTax).toLocaleString('en-US')} Rs</div>
                </div>
                <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); grid-column: span 2;">
                    <div style="color: #64748b; font-size: 0.8rem; text-transform: uppercase; font-weight: bold; margin-bottom: 0.3rem;">Waseeqa Service</div>
                    <div style="color: #1a2238; font-size: 1.1rem; font-weight: bold;">${Math.round(waseeqaCharges).toLocaleString('en-US')} Rs</div>
                </div>
            `;

            document.getElementById('grand_total_fee').textContent = Math.round(grandTotal).toLocaleString('en-US') + ' Rs';
            document.getElementById('calc-results-container').style.display = 'block';
        });

        // Dynamic update of select labels based on input percentages
        const updateSelectOptions = () => {
            const pActiveBuyer = document.getElementById('tax_buyer_active').value;
            const pLateBuyer = document.getElementById('tax_buyer_late').value;
            const pNonBuyer = document.getElementById('tax_buyer_non').value;

            const buyerSelect = document.getElementById('buyer_status');
            if (buyerSelect && buyerSelect.options.length >= 3) {
                buyerSelect.options[0].text = `Active Filer (${pActiveBuyer}%)`;
                buyerSelect.options[1].text = `Late Filer (${pLateBuyer}%)`;
                buyerSelect.options[2].text = `Non-Filer (${pNonBuyer}%)`;
            }

            const pActiveSeller = document.getElementById('tax_seller_active').value;
            const pLateSeller = document.getElementById('tax_seller_late').value;
            const pNonSeller = document.getElementById('tax_seller_non').value;

            const sellerSelect = document.getElementById('seller_status');
            if (sellerSelect && sellerSelect.options.length >= 3) {
                sellerSelect.options[0].text = `Active Filer (${pActiveSeller}%)`;
                sellerSelect.options[1].text = `Late Filer (${pLateSeller}%)`;
                sellerSelect.options[2].text = `Non-Filer (${pNonSeller}%)`;
            }
        };

        const taxInputs = document.querySelectorAll('.tax-group input');
        taxInputs.forEach(input => {
            input.addEventListener('input', updateSelectOptions);
        });
    }
});

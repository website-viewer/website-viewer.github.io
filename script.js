/* ============================================
   Header Component
   ============================================ */
function renderHeader() {
    const headerHTML = `
        <div class="header-content">
            <a href="./" class="logo">
                <span class="logo-icon">📱</span>
                <span>Website Viewer</span>
            </a>
            <nav>
                <ul class="nav-menu">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#viewer">Viewer</a></li>
                    <li><a href="#footer-component">Contact</a></li>
                </ul>
            </nav>
        </div>
    `;
    
    const headerComponent = document.getElementById('header-component');
    if (headerComponent) {
        headerComponent.innerHTML = headerHTML;
    }
}

/* ============================================
   Footer Component
   ============================================ */
function renderFooter() {
    const currentYear = new Date().getFullYear();
    const footerHTML = `
        <div class="footer-content">
            <div class="footer-grid">
                <div class="footer-section">
                    <h4>About</h4>
                    <p>Website Viewer is a free tool to check how your website looks on mobile, tablet, and desktop devices.</p>
                </div>
                <div class="footer-section">
                    <h4>Features</h4>
                    <ul>
                        <li><a href="#viewer">Website Preview</a></li>
                        <li><a href="#features">Device Previews</a></li>
                        <li><a href="#viewer">Real-time Rendering</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="./">Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="https://github.com/website-viewer" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Connect</h4>
                    <div class="footer-socials">
                        <a href="https://github.com/website-viewer" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
                            <span>🐙</span>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter" aria-label="Twitter">
                            <span>𝕏</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${currentYear} Website Viewer. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
            </div>
        </div>
    `;
    
    const footerComponent = document.getElementById('footer-component');
    if (footerComponent) {
        footerComponent.innerHTML = footerHTML;
    }
}

<script>
(function() {
    function initToolsFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const categories = document.querySelectorAll('.tool-category');

        if (!filterBtns.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const filter = this.dataset.filter;

                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Show/hide categories
                categories.forEach(cat => {
                    if (filter === 'all' || cat.dataset.category === filter) {
                        cat.classList.remove('hidden');
                    } else {
                        cat.classList.add('hidden');
                    }
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initToolsFilter);
    } else {
        initToolsFilter();
    }
})();
</script>

/* ============================================
   Website Viewer Functionality
   ============================================ */
let currentDevice = 'mobile';
let currentURL = '';

function switchDevice(device) {
    currentDevice = device;
    
    // Update active button
    document.querySelectorAll('.device-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-device="${device}"]`).closest('.device-btn').classList.add('active');
    
    // Update device frame
    const deviceFrame = document.getElementById('deviceFrame');
    deviceFrame.setAttribute('data-device', device);
    
    // Reload iframe if URL exists
    if (currentURL) {
        loadWebsite();
    }
}

function loadWebsite() {
    const urlInput = document.getElementById('urlInput');
    let url = urlInput.value.trim();
    const previewStatus = document.getElementById('previewStatus');
    
    // Validate URL
    if (!url) {
        previewStatus.textContent = '❌ Please enter a valid URL';
        previewStatus.style.color = 'var(--color-error)';
        return;
    }
    
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    // Validate URL format
    try {
        new URL(url);
    } catch (error) {
        previewStatus.textContent = '❌ Invalid URL format. Please enter a valid website URL';
        previewStatus.style.color = 'var(--color-error)';
        return;
    }
    
    currentURL = url;
    const previewFrame = document.getElementById('previewFrame');
    
    // Update status
    previewStatus.textContent = '⏳ Loading website...';
    previewStatus.style.color = 'var(--color-text-muted)';
    
    // Use CORS proxy for cross-origin requests
    const corsProxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
    
    // Try to load the website
    previewFrame.src = url;
    
    // Handle iframe load events
    previewFrame.onload = function() {
        previewStatus.textContent = `✅ Preview loaded - ${currentDevice.charAt(0).toUpperCase() + currentDevice.slice(1)} view`;
        previewStatus.style.color = 'var(--color-success)';
    };
    
    previewFrame.onerror = function() {
        previewStatus.textContent = '⚠️ Website loaded but may have CORS restrictions. Try the direct link if available.';
        previewStatus.style.color = 'var(--color-info)';
    };
    
    // Set timeout for slow loading
    setTimeout(() => {
        if (previewStatus.textContent === '⏳ Loading website...') {
            previewStatus.textContent = '⏳ Still loading... (Some websites may take longer)';
        }
    }, 5000);
}

/* ============================================
   Smooth Scroll Navigation
   ============================================ */
function scrollToViewer() {
    const viewerSection = document.getElementById('viewer');
    viewerSection.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('urlInput').focus();
}

function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    featuresSection.scrollIntoView({ behavior: 'smooth' });
}

/* ============================================
   Keyboard Shortcuts
   ============================================ */
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + Enter to preview
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        if (document.activeElement.id === 'urlInput') {
            loadWebsite();
        }
    }
    
    // M for mobile, T for tablet, D for desktop
    if (event.target.id !== 'urlInput') {
        if (event.key === 'm' || event.key === 'M') {
            switchDevice('mobile');
        } else if (event.key === 't' || event.key === 'T') {
            switchDevice('tablet');
        } else if (event.key === 'd' || event.key === 'D') {
            switchDevice('desktop');
        }
    }
});

/* ============================================
   Enter key to load website
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('urlInput');
    
    urlInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            loadWebsite();
        }
    });
    
    // Render components
    renderHeader();
    renderFooter();
    
    // Load previously entered URL from session storage
    const savedURL = sessionStorage.getItem('lastViewedURL');
    if (savedURL) {
        urlInput.value = savedURL;
    }
});

/* ============================================
   Save URL to session storage
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('urlInput');
    
    urlInput.addEventListener('change', function() {
        sessionStorage.setItem('lastViewedURL', this.value);
    });
});

/* ============================================
   Analytics & SEO Tracking
   ============================================ */
function trackEvent(eventName, eventData) {
    // This function can be extended for analytics
    console.log(`Event: ${eventName}`, eventData);
}

// Track when users load a website
const originalLoadWebsite = loadWebsite;
loadWebsite = function() {
    const url = document.getElementById('urlInput').value;
    trackEvent('website_preview_loaded', { 
        url: url,
        device: currentDevice,
        timestamp: new Date().toISOString()
    });
    originalLoadWebsite.call(this);
};

/* ============================================
   Service Worker for PWA Support
   ============================================ */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(error => {
        console.log('Service Worker registration failed:', error);
    });
}

/* ============================================
   Dynamic Meta Tags for Social Sharing
   ============================================ */
function updateMetaTags(url) {
    const domain = new URL(url).hostname;
    
    // Update Open Graph tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', `Preview: ${domain} | Website Viewer`);
    document.querySelector('meta[property="og:description"]').setAttribute('content', `Check how ${domain} looks on mobile, tablet, and desktop`);
}

/* ============================================
   Accessibility Improvements
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    // Set ARIA labels for interactive elements
    const deviceButtons = document.querySelectorAll('.device-btn');
    deviceButtons.forEach(btn => {
        const device = btn.getAttribute('data-device');
        btn.setAttribute('aria-label', `Switch to ${device} preview`);
    });
    
    const previewButton = document.querySelector('.viewer-controls .btn-primary');
    if (previewButton) {
        previewButton.setAttribute('aria-label', 'Load and preview the website');
    }
    
    const urlInput = document.getElementById('urlInput');
    urlInput.setAttribute('aria-label', 'Enter website URL to preview');
});

/* ============================================
   Performance Optimization
   ============================================ */
// Debounce function for resize events
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
    const deviceFrame = document.getElementById('deviceFrame');
    if (deviceFrame) {
        // Adjust frame size on resize
        const previewArea = deviceFrame.parentElement;
        if (previewArea.offsetWidth < 400 && currentDevice !== 'mobile') {
            switchDevice('mobile');
        }
    }
}, 250));

/* ============================================
   Example URLs for Quick Testing
   ============================================ */
function setExampleURL(url) {
    document.getElementById('urlInput').value = url;
    loadWebsite();
}

// Export functions for global access
window.switchDevice = switchDevice;
window.loadWebsite = loadWebsite;
window.scrollToViewer = scrollToViewer;
window.scrollToFeatures = scrollToFeatures;
window.setExampleURL = setExampleURL;

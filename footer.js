/* Schema: {
  "component": "Footer",
  "description": "Dynamic footer rendering with site info, links, and social icons",
  "dependencies": ["DOM"]
}
*/

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
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        <li><a href="/terms-of-use">Terms of Use</a></li>
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
                <p>&copy; ${currentYear} Website Viewer. All rights reserved.</p>
            </div>
        </div>
    `;
    
    const footerComponent = document.getElementById('footer-component');
    if (footerComponent) {
        footerComponent.innerHTML = footerHTML;
    }
}

// Ensure the footer renders when the DOM is ready
document.addEventListener('DOMContentLoaded', renderFooter);

// Export for global access if needed
window.renderFooter = renderFooter;

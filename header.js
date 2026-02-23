/* Schema: {
  "component": "Header",
  "description": "Dynamic header rendering with navigation and logo",
  "dependencies": ["DOM"]
}
*/

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

// Ensure the header renders when the DOM is ready
document.addEventListener('DOMContentLoaded', renderHeader);

// Export for global access if needed
window.renderHeader = renderHeader;

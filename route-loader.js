// main.js

// Load each route file dynamically
async function loadHTML(file, elementId) {
    try {
      console.log(`Attempting to load ${file}`);
      const response = await fetch(file);
      if (!response.ok) {
        console.error(`HTTP error loading ${file}: ${response.status} ${response.statusText}`);
        throw new Error(`Failed to load ${file}: ${response.status}`);
      }
      const content = await response.text();
      console.log(`Successfully loaded ${file}`);
      
      // Ensure the element exists before modifying
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`Element with id ${elementId} not found in DOM`);
      }
      
      // Clear any existing content
      element.innerHTML = '';
      
      // Parse the HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      
      // Get the root div from the partial HTML
      const rootDiv = doc.querySelector('div');
      if (!rootDiv) {
        throw new Error('No root div found in partial HTML');
      }
      
      // Append the content to the target element
      element.appendChild(rootDiv);
      
      // Add error handling for iframes
      const iframes = element.getElementsByTagName('iframe');
      Array.from(iframes).forEach(iframe => {
        iframe.onerror = function() {
          console.error(`Iframe failed to load: ${iframe.src}`);
          const errorDiv = document.createElement('div');
          errorDiv.className = 'iframe-error';
          errorDiv.style.cssText = `
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 4px;
          `;
          errorDiv.innerHTML = `
            <strong>Widget Error:</strong> Failed to load ${iframe.title}<br>
            <small>Please try refreshing the page or check back later.</small>
          `;
          iframe.parentNode.insertBefore(errorDiv, iframe);
          iframe.style.display = 'none';
        };
      });
    } catch (error) {
      console.error("Error loading HTML file:", {
        file,
        elementId,
        error: error.message,
        stack: error.stack
      });
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = `Failed to load content. Please try again later. Error: ${error.message}`;
      }
    }
  }
  
  // Route loading functionality is currently disabled
  /*
  const routes = {
    'AnaheimCoves': './hikes/AnaheimCoves.html',
    'Descanso': './hikes/descanso-cherry.html',
    'Sturtevant': './hikes/sturtevant.html',
    'Chantry': './hikes/2025-04-19-Chantry-Wilson.html'
  };

  document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const routeName = urlParams.get('route');
    const filePath = routes[routeName];
    
    if (filePath) {
      loadHTML(filePath, 'route1Content');
    } else {
      console.error(`Route ${routeName} not found`);
    }
  });
  */
  
// main.js

// Load each route file dynamically
async function loadHTML(file, elementId) {
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Failed to load ${file}: ${response.status}`);
      const content = await response.text();
      document.getElementById(elementId).innerHTML = content;
    } catch (error) {
      console.error("Error loading HTML file:", error);
      document.getElementById(elementId).innerHTML = "<p>Failed to load content. Please try again later.</p>";
    }
  }
  
  // List of route files to load
  const routes = [
    { file: './hikes/AnaheimCoves.html', elementId: 'route1Content' },
    // { file: 'route2.html', elementId: 'route2Content' }, // use as template
    // { file: 'route3.html', elementId: 'route3Content' }, // use as template
  ];
  
  // Load each route on page load
  routes.forEach(route => loadHTML(route.file, route.elementId));
  
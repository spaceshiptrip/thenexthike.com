
// Function to toggle between placeholder text and name
function toggleCard(cardElement) {
  // Get the elements to modify
  const textElement = cardElement.querySelector('.card-text');
  const imgElement = cardElement.querySelector('img');
  
  // Retrieve the names and image sources from data attributes
  const hiddenText = 'Click to unhide name';
  const name = cardElement.getAttribute('data-name');
  const babyImage = cardElement.getAttribute('data-baby-img');
  const currentImage = cardElement.getAttribute('data-current-img');

  // Check current state and toggle
  if (textElement.textContent === hiddenText) {
    // Reveal current picture and name
    textElement.textContent = name;
    imgElement.src = currentImage;
  } else {
    // Revert to baby picture and hidden text
    textElement.textContent = hiddenText;
    imgElement.src = babyImage;
  }
}


// JavaScript to make the collapsible work
var coll = document.getElementsByClassName("collapsible");
for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

// Function to toggle the visibility of the menu in small screens
function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('show');
}

// Function to open a modal by ID
function openModal(modalId) {
  $('#' + modalId).modal('show');
}

// GPX download handler
function forceDownload(event) {
  event.preventDefault();
  const link = event.currentTarget;
  const url = link.getAttribute("href");
  const fileName = url.split('/').pop();

  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", fileName);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Attach GPX download handler after DOM loads
document.addEventListener("DOMContentLoaded", function () {
  // Attach to all links with class .gpx-download
  document.querySelectorAll('.gpx-download').forEach(link => {
    link.addEventListener('click', forceDownload);
  });
});
//For the hamburger
document.getElementById("menuToggle").addEventListener("click", function() {
  const sideMenu = document.getElementById("sideMenu");
  sideMenu.classList.toggle("open"); // Toggle the 'open' class to show/hide menu
});


const stars = document.querySelectorAll('.star');
const ratingInput = document.getElementById('ratingInput');
const ratingDisplay = document.getElementById('rating-value');

stars.forEach((star) => {
    // Highlight stars on hover
    star.addEventListener('mouseover', () => {
        resetStars();
        highlightStars(star.getAttribute('data-value'));
    });

    // Reset stars on mouse leave
    star.addEventListener('mouseleave', resetStars);

    // Set the rating on click
    star.addEventListener('click', () => {
        const rating = star.getAttribute('data-value');
        ratingInput.value = rating; // Set hidden input value
        ratingDisplay.textContent = `Rating: ${rating}`; // Update display
        highlightStars(rating); // Highlight selected stars
    });
});

// Reset star highlights
function resetStars() {
    stars.forEach((star) => star.classList.remove('active'));
}

// Highlight stars up to selected rating
function highlightStars(rating) {
    stars.forEach((star) => {
        if (star.getAttribute('data-value') <= rating) {
            star.classList.add('active');
        }
    });
}







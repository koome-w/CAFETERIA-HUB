//For the hamburger
document.getElementById("menuToggle").addEventListener("click", function() {
  const sideMenu = document.getElementById("sideMenu");
  sideMenu.classList.toggle("open"); // Toggle the 'open' class to show/hide menu
});

const stars = document.querySelectorAll('.star');
const ratingDisplay = document.getElementById('rating-value');
let selectedRating = 0;

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
    selectedRating = star.getAttribute('data-value');
    ratingDisplay.innerText = `Rating: ${selectedRating}`;
    highlightStars(selectedRating);
  });
});

// Helper: Reset star colors
function resetStars() {
  stars.forEach((star) => star.classList.remove('active'));
}

// Helper: Highlight stars up to the hovered or selected one
function highlightStars(rating) {
  stars.forEach((star) => {
    if (star.getAttribute('data-value') <= rating) {
      star.classList.add('active');
    }
  });
}

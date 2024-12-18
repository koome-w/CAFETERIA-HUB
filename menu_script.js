//For the hamburger
document.getElementById("menuToggle").addEventListener("click", function() {
  const sideMenu = document.getElementById("sideMenu");
  sideMenu.classList.toggle("open"); // Toggle the 'open' class to show/hide menu
});

//for quantity buttons
function increment(id) {
    const qtyInput = document.getElementById(id);
    qtyInput.value = parseInt(qtyInput.value) + 1;
  }
  
  function decrement(id) {
    const qtyInput = document.getElementById(id);
    if (parseInt(qtyInput.value) > 0) {
      qtyInput.value = parseInt(qtyInput.value) - 1;
    }
  }
  
// Function to add an item to the order and store it in localStorage
function addToOrder(id, name, price) {
  // Get existing orders from localStorage or initialize an empty array
  let orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];

  // Check if the item already exists in the order
  const existingItem = orderItems.find(item => item.id === id);

  if (existingItem) {
      // If the item exists, increment the quantity
      existingItem.quantity += 1;
  } else {
      // If not, add the item to the order with quantity 1
      orderItems.push({ id, name, price, quantity: 1 });
  }

  // Save the updated orderItems array to localStorage
  localStorage.setItem('orderItems', JSON.stringify(orderItems));

  // Optionally alert the user that the item has been added
  alert(`${name} has been added to your order list!`);
}

 // Function to fetch menu items from the database
function fetchMenuItems() {
  fetch("fetch_menu.php")
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          if (data.success) {
              const menuContainer = document.getElementById("menuItemsContainer");
              menuContainer.innerHTML = ""; // Clear the container
              
              data.menu_items.forEach(item => {
                  const itemDiv = document.createElement("div");
                  itemDiv.className = "menu-item";

                  itemDiv.innerHTML = `
                      <h3>${item.item_name}</h3>
                      <p>Category: ${item.item_category}</p>
                      <p>Price: KES ${parseFloat(item.item_price).toFixed(2)}</p>
                  `;

                  menuContainer.appendChild(itemDiv);
              });
          } else {
              alert("Error fetching menu items: " + data.message);
          }
      })
      .catch(error => console.error("Error fetching menu items:", error));
}

// Fetch the menu items when the page loads
document.addEventListener("DOMContentLoaded", fetchMenuItems);
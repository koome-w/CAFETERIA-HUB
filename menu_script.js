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
  
  //Function to add an item to the order and store it in localStorage
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

    // Alert the user that the item has been added
    alert(`${name} has been added to your order list!`);
}
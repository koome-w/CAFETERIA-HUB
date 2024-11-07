//For the hamburger
document.getElementById("menuToggle").addEventListener("click", function() {
  const sideMenu = document.getElementById("sideMenu");
  sideMenu.classList.toggle("open"); // Toggle the 'open' class to show/hide menu
});



  let orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];

  // Function to render the order summary
  function renderOrderSummary() {
      const orderTableBody = document.getElementById("orderTableBody");
      orderTableBody.innerHTML = ''; // Clear existing rows

      let total = 0;

      orderItems.forEach((item) => {
          const subtotal = item.price * item.quantity;
          total += subtotal;

          // Create a row for each item
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${item.name}</td>
              <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)"></td>
              <td>${item.price.toFixed(2)}</td>
              <td>${subtotal.toFixed(2)}</td>
              <td><button onclick="removeItem(${item.id})">Remove</button></td>
          `;
          orderTableBody.appendChild(row);
      });

      // Update total price in payment summary
      document.getElementById("totalPrice").textContent = total.toFixed(2);
  }

  // Function to update quantity in localStorage and re-render the table
  function updateQuantity(id, newQuantity) {
      const item = orderItems.find((item) => item.id === id);
      if (item) {
          item.quantity = parseInt(newQuantity);
          localStorage.setItem('orderItems', JSON.stringify(orderItems));
          renderOrderSummary(); // Re-render the table
      }
  };

  // Function to remove an item from the order
  function removeItem(id) {
    //console.log("Removing item with ID:", id);
    //console.log("Before deletion", orderItems);

      orderItems = orderItems.filter((item) => item.id !== id);
      //console.log("After deletion:", orderItems);

      renderOrderSummary(); // Re-render the table
      alert("Item removed from the order.");
  };

// Function to handle payment using MPESA API
function payNow() {
    const totalAmount = document.getElementById("totalPrice").textContent;
  
    // Example MPESA API integration code (pseudocode)
    alert(`Initiating payment of ${totalAmount} KES using MPESA API...`);
    
    // Here, you would add code to initiate a payment request using MPESA API.
    // It typically involves sending the total amount, user phone number, and other required data to the MPESA API.
    // Example pseudocode:
    // fetch("MPESA_API_URL", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     amount: totalAmount,
    //     phoneNumber: "userPhoneNumber",
    //     // other necessary data
    //   }),
    // }).then(response => response.json())
    //   .then(data => {
    //     if (data.success) {
    //       alert("Payment successful!");
    //     } else {
    //       alert("Payment failed, please try again.");
    //     }
    //   }).catch(error => console.error("Error:", error));
  }
  
  // Initial render
renderOrderSummary();

// Sample data
let menuItems = [];
let orders = [];
let users = [];
let feedbacks = [];
let payments = [];

// Function to show the selected section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
    if (sectionId === 'dashboard') {
        updateDashboardStats();
    } else if (sectionId === 'orderManagement') {
        displayOrders();
    } else if (sectionId === 'userManagement') {
        displayUsers();
    } else if (sectionId === 'feedbackManagement') {
        displayFeedbacks();
    } else if (sectionId === 'paymentManagement') {
        displayPayments();
    } else if (sectionId === 'reportManagement') {
        // Report section does not need to display anything by default
    }
}

// Function to log out
function logout() {
    window.location.href = 'home.html'; // Redirect to dashboard or home page
}

// Dashboard Initialization
function updateDashboardStats() {
    document.getElementById('totalOrders').innerText = orders.length;
    document.getElementById('totalRevenue').innerText = calculateTotalRevenue();
    document.getElementById('totalUsers').innerText = users.length;
    document.getElementById('totalFeedback').innerText = feedbacks.length;
}

// Calculate total revenue from orders
function calculateTotalRevenue() {
    return orders.reduce((total, order) => total + order.totalAmount, 0);
}

// Function to add a new menu item
function addMenuItem() {
    const name = document.getElementById('menuItemName').value;
    const price = parseFloat(document.getElementById('menuItemPrice').value);
    const description = document.getElementById('menuItemDescription').value;

    if (name && !isNaN(price) && description) {
        const menuItem = { name, price, description };
        menuItems.push(menuItem);
        displayMenuItems();
        clearMenuInputFields();
    } else {
        alert("Please fill out all fields correctly.");
    }
}

// Remove an existing menu item from the database
function removeMenuItem(itemName) {
    fetch("remove_item.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `item_name=${encodeURIComponent(itemName)}`,
    })
        .then(response => response.text())
        .then(data => {
            alert(data); // Display success or error message
            fetchMenuItems(); // Refresh the menu items on the UI
        })
        .catch(error => console.error("Error:", error));
}

// Display menu items
/*
function displayMenuItems() {
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = '';
    menuItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerText = `${item.name} - ${item.price} KES - ${item.description}`;
        menuList.appendChild(li);
    });
}
*/

// Clear menu input fields
/*
function clearMenuInputFields() {
    document.getElementById('menuItemName').value = '';
    document.getElementById('menuItemPrice').value = '';
    document.getElementById('menuItemDescription').value = '';
}
*/

// Add a user
/*
function addUser() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;

    if (name && email) {
        const user = { name, email };
        users.push(user);
        displayUsers();
        clearUserInputFields();
    } else {
        alert("Please fill out all fields correctly.");
    }
}
*/

// Display users
/*
function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.innerText = `${user.name} - ${user.email}`;
        userList.appendChild(li);
    });
}
*/

// Clear user input fields
/*
function clearUserInputFields() {
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
}
*/


function fetchFeedbackData() {
    fetch('fetch_feedback.php') // Path to your PHP script
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(feedbacks => {
            const feedbackTableBody = document.getElementById('feedbackTableBody');
            feedbackTableBody.innerHTML = ''; // Clear the table before adding new rows

            feedbacks.forEach((feedback, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${feedback.user_id}</td>
                    <td>${feedback.feedback}</td>
                    <td>${feedback.rating}</td>
                    <td>${feedback.created_at}</td>
                `;
                feedbackTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching feedback:', error);
            alert('Failed to fetch feedback data. Please try again.');
        });
}



// Add an order
/*
function addOrder() {
    const user = document.getElementById('orderUser').value;
    const amount = parseFloat(document.getElementById('orderAmount').value);

    if (user && !isNaN(amount)) {
        const order = { user, totalAmount: amount };
        orders.push(order);
        displayOrders();
        clearOrderInputFields();
    } else {
        alert("Please fill out all fields correctly.");
    }
}
*/

// Display orders
/*
function displayOrders() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';
    orders.forEach((order, index) => {
        const li = document.createElement('li');
        li.innerText = `${order.user} - Amount: ${order.totalAmount} KES`;
        orderList.appendChild(li);
    });
}
*/

// Clear order input fields
/*
function clearOrderInputFields() {
    document.getElementById('orderUser').value = '';
    document.getElementById('orderAmount').value = '';
}
*/

// Generate report
function generateReport() {
        fetch('generate_report.php')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const orders = data.orders;
                    let report = `
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>User</th>                                    
                                    <th>Total Amount (KES)</th>
                                    <th>TimeOfOrder</th>
                                </tr>
                            </thead>
                            <tbody>
                    `;
    
                    orders.forEach((item) => {
                        const totalAmount = parseFloat(item.total_amount) || 0; // Fallback to 0
    
                        report += `
                            <tr>
                                <td>${item.order_id}</td>
                                <td>${item.username}</td>                
                                <td>${totalAmount.toFixed(2)} KES</td>
                                <td>${item.order_date}</td>
                            </tr>
                        `;
                    });
    
                    report += `
                            </tbody>
                        </table>
                    `;
    
                    document.getElementById('reportContainer').innerHTML = report;
                } else {
                    alert('Failed to fetch report.');
                }
            })
            .catch((error) => {
                console.error('Error fetching report:', error);
            });
    }

// Initialize dashboard on page load
window.onload = function() {
    showSection('dashboard'); // Show dashboard by default
    updateDashboardStats();   // Update stats on load
};

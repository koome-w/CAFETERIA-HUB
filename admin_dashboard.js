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

// Display menu items
function displayMenuItems() {
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = '';
    menuItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerText = `${item.name} - ${item.price} KES - ${item.description}`;
        menuList.appendChild(li);
    });
}

// Clear menu input fields
function clearMenuInputFields() {
    document.getElementById('menuItemName').value = '';
    document.getElementById('menuItemPrice').value = '';
    document.getElementById('menuItemDescription').value = '';
}

// Add a user
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

// Display users
function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.innerText = `${user.name} - ${user.email}`;
        userList.appendChild(li);
    });
}

// Clear user input fields
function clearUserInputFields() {
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
}

// Add feedback
function addFeedback() {
    const user = document.getElementById('feedbackUser').value;
    const message = document.getElementById('feedbackMessage').value;

    if (user && message) {
        const feedback = { user, message };
        feedbacks.push(feedback);
        displayFeedbacks();
        clearFeedbackInputFields();
    } else {
        alert("Please fill out all fields correctly.");
    }
}

// Display feedbacks
function displayFeedbacks() {
    const feedbackList = document.getElementById('feedbackList');
    feedbackList.innerHTML = '';
    feedbacks.forEach((feedback, index) => {
        const li = document.createElement('li');
        li.innerText = `${feedback.user}: ${feedback.message}`;
        feedbackList.appendChild(li);
    });
}

// Clear feedback input fields
function clearFeedbackInputFields() {
    document.getElementById('feedbackUser').value = '';
    document.getElementById('feedbackMessage').value = '';
}

// Add an order
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

// Display orders
function displayOrders() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';
    orders.forEach((order, index) => {
        const li = document.createElement('li');
        li.innerText = `${order.user} - Amount: ${order.totalAmount} KES`;
        orderList.appendChild(li);
    });
}

// Clear order input fields
function clearOrderInputFields() {
    document.getElementById('orderUser').value = '';
    document.getElementById('orderAmount').value = '';
}

// Add a payment
function addPayment() {
    const user = document.getElementById('paymentOrderUser').value;
    const amount = parseFloat(document.getElementById('paymentAmount').value);

    if (user && !isNaN(amount)) {
        const payment = { user, amount };
        payments.push(payment);
        displayPayments();
        clearPaymentInputFields();
    } else {
        alert("Please fill out all fields correctly.");
    }
}

// Display payments
function displayPayments() {
    const paymentList = document.getElementById('paymentList');
    paymentList.innerHTML = '';
    payments.forEach((payment, index) => {
        const li = document.createElement('li');
        li.innerText = `${payment.user} - Amount: ${payment.amount} KES`;
        paymentList.appendChild(li);
    });
}

// Clear payment input fields
function clearPaymentInputFields() {
    document.getElementById('paymentOrderUser').value = '';
    document.getElementById('paymentAmount').value = '';
}

// Generate report
function generateReport() {
    let report = "Cafeteria Hub Report\n\n";
    report += "Total Orders: " + orders.length + "\n";
    report += "Total Revenue: " + calculateTotalRevenue() + " KES\n";
    report += "Total Users: " + users.length + "\n";
    report += "Total Feedback: " + feedbacks.length + "\n";
    report += "Total Payments: " + payments.length + "\n";
    report += "\nOrder Details:\n";
    
    orders.forEach((order, index) => {
        report += `${index + 1}. User: ${order.user}, Amount: ${order.totalAmount} KES\n`;
    });

    report += "\nPayment Details:\n";
    payments.forEach((payment, index) => {
        report += `${index + 1}. User: ${payment.user}, Amount: ${payment.amount} KES\n`;
    });

    document.getElementById('reportOutput').innerText = report;
}

// Initialize dashboard on page load
window.onload = function() {
    showSection('dashboard'); // Show dashboard by default
    updateDashboardStats();   // Update stats on load
};

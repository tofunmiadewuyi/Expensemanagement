const homeButton = document.getElementById("home-btn");

homeButton.addEventListener("click", () => {
   window.location.href = "dashboard.html";
});

// Retrieve the expenses data from local storage
const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

//re-arrange the expensese from last to first
const reversedExpenses = storedExpenses.slice().reverse();

// Loop through the stored expenses and create elements to display them
reversedExpenses.forEach((expense) => {
  // Create elements and display the expense data on the page
  displayExpense(expense.amount, expense.category, expense.date);
});

function displayExpense(amount, category, date) {
  const expenseList = document.querySelector(".expense-list");

  // Create a new expense item div
  const expenseItem = document.createElement("div");
  expenseItem.classList.add("expense");

  // Create the HTML structure for the new expense item
  expenseItem.innerHTML = `
    <div class="expense-info">
      <div class="expense-icon">
        <img src="svgs/${category}.svg" alt="${category}" class="${category}-img">
      </div>
      <div class="expense-details">
        <p class="expense-name text-body-normal">${category}</p>
        <p class="expense-date grey text-body-small">${date}</p>
      </div>
    </div>
    <div class="expense-amount">
      <p style="font-weight: 700;" class="expense-amount-value text-body-normal">
        <span>₦</span>${amount}
      </p>
    </div>
  `;

  // Append the new expense item to the expense list
  expenseList.appendChild(expenseItem);
}
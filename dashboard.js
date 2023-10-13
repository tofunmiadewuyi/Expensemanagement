const newExpenseButton = document.getElementById("new-exp-btn");
const seeExpensesButton = document.getElementById("see-exp-btn");

newExpenseButton.addEventListener("click", () => {
   window.location.href = "newexpense.html";
});

seeExpensesButton.addEventListener("click", () => {
   window.location.href = "allexpenses.html";
});

// Retrieve the expenses data from local storage
const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

//re-arrange the expensese from last to first
const reversedExpenses = storedExpenses.slice().reverse();
let count = 0;

// Loop through the stored expenses and create elements to display them
reversedExpenses.forEach((expense) => {
  // Create elements and display the expense data on the page
  if (count >= 5) {
    return;}
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
  count++;
}

function displayTotalSpent() {
  const totalSpent = document.getElementById("total-spent");
  
  // Calculate the total amount spent on expenses
  let totalAmount = 0;
  storedExpenses.forEach((expense) => {
    const withoutComma = expense.amount.replace(/,/g, '');
    totalAmount += parseFloat(withoutComma);
  });
  
  // Format the total amount with commas for thousands and two decimal places
  const formattedTotalAmount = totalAmount.toLocaleString('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Update the total amount spent on expenses
  totalSpent.textContent = `${formattedTotalAmount}`;

  console.log(totalAmount);
}

//Retrieve the expenses data from local storage
const storedUser = JSON.parse(localStorage.getItem('user'));

displayUser(storedUser.name, storedUser.initial);

function displayUser(name, initial) {
  const user = document.querySelector("#user");
  const userDetails = document.createElement("div");

  //truncate name
  const maxLength = 16;
  const truncatedName = storedUser.name.length > maxLength ? name.slice(0, maxLength) + "..." : name;

  userDetails.innerHTML = `
  <div class="user-details"> 
    <div id="fallback">
      <span class="fallback-avatar">${initial}</span>
    </div>
    <p id="greeting">Hi, ${truncatedName}</p>
  </div>
  `;

  user.appendChild(userDetails);
}

displayTotalSpent();
setDeleteButtonState();

const deleteButton = document.getElementById("delete-btn");

deleteButton.addEventListener("click", () => {
  localStorage.removeItem('expenses');
  window.location.href = "dashboard.html";
});

function setDeleteButtonState() {
  if (storedExpenses.length === 0) {
    document.getElementById("delete-btn").disabled = true;
  } else {
    document.getElementById("delete-btn").disabled = false;
  }
}

const closeAppButton = document.getElementById("close-app-btn");

closeAppButton.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "index.html";
});

function truncateText(element, maxLength) {
  const text = element.textContent;
  if (text.length > maxLength) {
    element.textContent = text.slice(0, maxLength) + '...';
  }
}

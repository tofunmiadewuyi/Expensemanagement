const cancelButton = document.getElementById("cancel-btn");

cancelButton.addEventListener("click", () => {
   window.location.href = "dashboard.html";
});


const form = document.getElementById("expense-form");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the values of the input fields
  const amount = document.getElementById("amount").value;
  const category = document.querySelector('input[name="category"]:checked').value;
  const date = document.getElementById("date").value;

  function formatDate(inputDate) {
  const date = new Date(inputDate);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
  const formattedDate = formatDate(date);
  const parsedAmount = parseFloat(amount);

  // Format the total amount with commas for thousands and two decimal places
const formattedAmount = parsedAmount.toLocaleString('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

  
  //alert for empty date field
  if (date === "") {
    alert("date field is empty");
    return;
  } else {
    // Call the function to add the new expense item
  addExpense(formattedAmount, category, formattedDate);
      // Reset the form or perform other actions as needed
    this.reset();
  }
  
});

function addExpense(amount, category, date) {
// Store the data as JSON in local storage
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.push({amount, category, date});
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Reload the page
  window.location.href = 'dashboard.html';
  console.log(amount);
}



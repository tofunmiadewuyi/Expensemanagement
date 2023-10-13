//Stay logged in

//Retrieve the expenses data from local storage
const storedUser = JSON.parse(localStorage.getItem('user'));

if (storedUser !== null && storedUser !== "" && storedUser !== undefined) {
   window.location.href = "dashboard.html";
} 


const form = document.getElementById("welcome-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  let initial = "";
  
  const fullName = name.trim();
  const nameParts = fullName.split(" ");
  
  if (nameParts.length === 1) {
      initial = name.charAt(0);
  } else if (nameParts.length === 2) {
      const initials = nameParts[0].charAt(0) + nameParts[1].charAt(0);
      initial = initials.toUpperCase();
  } else {
    alert("Enter a valid name");
  }
  
  storeUser(name,initial);
  window.location.href = 'dashboard.html';
  form.reset();
});


function storeUser(name, initial) {
  const user = { name, initial }; // Create the user object

  // Store the user object in localStorage
  localStorage.setItem('user', JSON.stringify(user));

}
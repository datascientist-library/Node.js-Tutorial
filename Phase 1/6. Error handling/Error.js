// The 'try catch' syntax. 
// If an error happens inside try, control moves to catch.

try {
  let result = 10 / 0;
  console.log(result);

} catch (error) {

  console.log("An error occurred:", error.message);
}

// 'try catch' syntax

try {
  console.log(user.name);

} catch (error) {

  console.log("Error:", error.message);

}

// Custom error

function checkAge(age) {
  if (age < 18) {
    throw new Error("You must be at least 18 years old");
  }

  return "Access granted";
}

try {
  checkAge(16);
} catch (error) {
  console.log(error.message);
}
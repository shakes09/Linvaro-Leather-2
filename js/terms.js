document.addEventListener("DOMContentLoaded", () => {
  const acceptCheckbox = document.getElementById("acceptTerms");
  const proceedBtn = document.getElementById("proceedBtn");

  // Initially disable the button
  proceedBtn.disabled = true;

  // Toggle button enabled state based on checkbox
  acceptCheckbox.addEventListener("change", () => {
    proceedBtn.disabled = !acceptCheckbox.checked;
  });

  // Handle proceed button click
  proceedBtn.addEventListener("click", () => {
    if (acceptCheckbox.checked) {
      // TODO: Replace this alert with actual proceed action (redirect, form submit, etc)
      alert("Thank you for accepting the Terms & Conditions.");
    } else {
      alert("Please accept the Terms & Conditions to proceed.");
    }
  });
});

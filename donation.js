document.addEventListener("DOMContentLoaded", function() {
    const donationForm = document.getElementById("donation-form"); // Assuming your form has the ID 'donation-form'
    const nameInput = document.getElementById("name");           // Assuming your Full Name input has the ID 'name'

    if (donationForm && nameInput) {
        donationForm.addEventListener("submit", function(event) {
            let name = nameInput.value.trim();
            const nameRegex = /^[a-zA-Z\s]+$/; // Regular expression for only letters and spaces

            if (!nameRegex.test(name)) {
                event.preventDefault(); // Prevent form submission
                alert("Full Name must contain only letters and spaces. No numbers or symbols allowed.");
                return;
            }

            // Add your existing validation for other fields (email, amount, payment) here:
            let email = document.getElementById("email").value.trim();
            let amount = parseFloat(document.getElementById("amount").value);
            let payment = document.getElementById("payment").value;

            if (!email || isNaN(amount) || !payment) {
                alert("Please fill in all required fields.");
                return; // Keep preventDefault from the name check
            }

            if (amount < 5) {
                alert("Minimum donation amount is RM5.");
                return; // Keep preventDefault from the name check
            }

            // If all validations pass, you can proceed
            alert("Thank you for your donation!");
        });

        nameInput.addEventListener("input", function() {
            const nameValue = this.value.trim();
            const nameRegex = /^[a-zA-Z\s]+$/;
            const errorElement = document.getElementById("name-error"); // Assuming you have an element with this ID to display errors

            if (!nameRegex.test(nameValue)) {
                if (errorElement) {
                    errorElement.textContent = "Full Name must contain only letters and spaces.";
                } else {
                    alert("Full Name must contain only letters and spaces.No numbers or symbols allowed"); // Fallback if no error element
                    this.value = nameValue.replace(/[^a-zA-Z\s]/g, ''); // Optionally remove invalid characters
                }
            } else {
                if (errorElement) {
                    errorElement.textContent = ""; // Clear any previous error message
                }
            }
        });
    } else {
        console.error("Donation form or Full Name input not found. Ensure the IDs are correct.");
    }
});
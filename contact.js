const contactForm = document.querySelector('form');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get input values
    const nameInput = document.getElementById('full-name'); // Get the input element
    const name = nameInput.value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation for Full Name (only letters and spaces)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        alert('Full Name must contain only letters and spaces. No numbers or symbols allowed.');
        return; // Stop further processing if the name is invalid
    }

    // Basic validation for other fields
    if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    if (message.length < 10) {
        alert("Message must be at least 10 characters long.");
        return;
    }

    alert("Your message has been sent successfully!");
    contactForm.reset();
});

const fullNameInput = document.getElementById('full-name');
if (fullNameInput) {
    fullNameInput.addEventListener('input', function() {
        const nameValue = this.value.trim();
        const nameRegex = /^[a-zA-Z\s]+$/;
        const errorElement = document.getElementById('full-name-error'); // Assuming you have an element with this ID for errors

        if (!nameRegex.test(nameValue)) {
            if (errorElement) {
                errorElement.textContent = 'Full Name must contain only letters and spaces.';
            } else {
                alert('Full Name must contain only letters and spaces.'); // Fallback if no error element
                this.value = nameValue.replace(/[^a-zA-Z\s]/g, ''); // Optionally remove invalid characters
            }
        } else {
            if (errorElement) {
                errorElement.textContent = ''; // Clear any previous error message
            }
        }
    });
}